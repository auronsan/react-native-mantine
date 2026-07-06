import { useCallback, useState } from 'react';
import type React from 'react';

export interface TreeNodeData {
  /** Node label */
  label: React.ReactNode;

  /** Unique node value */
  value: string;

  /** Props passed to the rendered node */
  nodeProps?: Record<string, any>;

  /** Child nodes */
  children?: TreeNodeData[];
}

export interface UseTreeInput {
  /** Initial expanded state, keys are node values */
  initialExpandedState?: Record<string, boolean>;

  /** Initial selected state, array of node values */
  initialSelectedState?: string[];

  /** Initial checked state, array of node values */
  initialCheckedState?: string[];

  /** Determines whether multiple nodes can be selected at a time */
  multiple?: boolean;
}

export interface UseTreeReturnType {
  /** Tree data registered with initialize */
  data: TreeNodeData[];

  /** Registers tree data, called by Tree component automatically */
  initialize: (data: TreeNodeData[]) => void;

  /** Record of expanded node values */
  expandedState: Record<string, boolean>;

  /** Array of selected node values */
  selectedState: string[];

  /** Array of checked leaf node values */
  checkedState: string[];

  toggleExpanded: (value: string) => void;
  expand: (value: string) => void;
  collapse: (value: string) => void;
  expandAllNodes: () => void;
  collapseAllNodes: () => void;

  toggleSelected: (value: string) => void;
  select: (value: string) => void;
  deselect: (value: string) => void;
  clearSelected: () => void;

  checkNode: (value: string) => void;
  uncheckNode: (value: string) => void;
  checkAllNodes: () => void;
  uncheckAllNodes: () => void;
  isNodeChecked: (value: string) => boolean;
  isNodeIndeterminate: (value: string) => boolean;

  /** Returns data of all fully checked leaf nodes */
  getCheckedNodes: () => TreeNodeData[];
}

export function findTreeNode(
  data: TreeNodeData[],
  value: string
): TreeNodeData | undefined {
  for (const node of data) {
    if (node.value === value) {
      return node;
    }
    if (node.children) {
      const found = findTreeNode(node.children, value);
      if (found) {
        return found;
      }
    }
  }
  return undefined;
}

export function getTreeLeafValues(node: TreeNodeData): string[] {
  if (!node.children || node.children.length === 0) {
    return [node.value];
  }
  return node.children.flatMap((child) => getTreeLeafValues(child));
}

export function getAllTreeValues(data: TreeNodeData[]): string[] {
  return data.flatMap((node) => [
    node.value,
    ...(node.children ? getAllTreeValues(node.children) : []),
  ]);
}

function getAllLeafValues(data: TreeNodeData[]): string[] {
  return data.flatMap((node) => getTreeLeafValues(node));
}

/**
 * useTree manages expanded, selected and checked state of the Tree component.
 * Port of Mantine v7.17 use-tree hook.
 */
export function useTree({
  initialExpandedState = {},
  initialSelectedState = [],
  initialCheckedState = [],
  multiple = false,
}: UseTreeInput = {}): UseTreeReturnType {
  const [data, setData] = useState<TreeNodeData[]>([]);
  const [expandedState, setExpandedState] = useState<Record<string, boolean>>(
    initialExpandedState
  );
  const [selectedState, setSelectedState] =
    useState<string[]>(initialSelectedState);
  const [checkedState, setCheckedState] =
    useState<string[]>(initialCheckedState);

  const initialize = useCallback((nextData: TreeNodeData[]) => {
    setData(nextData);
  }, []);

  const toggleExpanded = useCallback((value: string) => {
    setExpandedState((current) => ({ ...current, [value]: !current[value] }));
  }, []);

  const expand = useCallback((value: string) => {
    setExpandedState((current) => ({ ...current, [value]: true }));
  }, []);

  const collapse = useCallback((value: string) => {
    setExpandedState((current) => ({ ...current, [value]: false }));
  }, []);

  const expandAllNodes = useCallback(() => {
    setExpandedState(
      Object.fromEntries(getAllTreeValues(data).map((value) => [value, true]))
    );
  }, [data]);

  const collapseAllNodes = useCallback(() => {
    setExpandedState({});
  }, []);

  const toggleSelected = useCallback(
    (value: string) => {
      setSelectedState((current) => {
        if (current.includes(value)) {
          return current.filter((item) => item !== value);
        }
        return multiple ? [...current, value] : [value];
      });
    },
    [multiple]
  );

  const select = useCallback(
    (value: string) => {
      setSelectedState((current) => {
        if (current.includes(value)) {
          return current;
        }
        return multiple ? [...current, value] : [value];
      });
    },
    [multiple]
  );

  const deselect = useCallback((value: string) => {
    setSelectedState((current) => current.filter((item) => item !== value));
  }, []);

  const clearSelected = useCallback(() => {
    setSelectedState([]);
  }, []);

  const checkNode = useCallback(
    (value: string) => {
      const node = findTreeNode(data, value);
      if (!node) {
        return;
      }
      const leaves = getTreeLeafValues(node);
      setCheckedState((current) => [
        ...current,
        ...leaves.filter((leaf) => !current.includes(leaf)),
      ]);
    },
    [data]
  );

  const uncheckNode = useCallback(
    (value: string) => {
      const node = findTreeNode(data, value);
      if (!node) {
        return;
      }
      const leaves = getTreeLeafValues(node);
      setCheckedState((current) =>
        current.filter((item) => !leaves.includes(item))
      );
    },
    [data]
  );

  const checkAllNodes = useCallback(() => {
    setCheckedState(getAllLeafValues(data));
  }, [data]);

  const uncheckAllNodes = useCallback(() => {
    setCheckedState([]);
  }, []);

  const isNodeChecked = useCallback(
    (value: string) => {
      const node = findTreeNode(data, value);
      if (!node) {
        return false;
      }
      const leaves = getTreeLeafValues(node);
      return (
        leaves.length > 0 && leaves.every((leaf) => checkedState.includes(leaf))
      );
    },
    [data, checkedState]
  );

  const isNodeIndeterminate = useCallback(
    (value: string) => {
      const node = findTreeNode(data, value);
      if (!node) {
        return false;
      }
      const leaves = getTreeLeafValues(node);
      const checkedCount = leaves.filter((leaf) =>
        checkedState.includes(leaf)
      ).length;
      return checkedCount > 0 && checkedCount < leaves.length;
    },
    [data, checkedState]
  );

  const getCheckedNodes = useCallback(() => {
    return checkedState
      .map((value) => findTreeNode(data, value))
      .filter((node): node is TreeNodeData => node !== undefined);
  }, [data, checkedState]);

  return {
    data,
    initialize,
    expandedState,
    selectedState,
    checkedState,
    toggleExpanded,
    expand,
    collapse,
    expandAllNodes,
    collapseAllNodes,
    toggleSelected,
    select,
    deselect,
    clearSelected,
    checkNode,
    uncheckNode,
    checkAllNodes,
    uncheckAllNodes,
    isNodeChecked,
    isNodeIndeterminate,
    getCheckedNodes,
  };
}
