import React, { forwardRef, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type {
  DefaultProps,
  MantineNumberSize,
  MantineSize,
} from '../../theme/types';
import { useComponentDefaultProps, useTheme } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';
import { useTree, type TreeNodeData, type UseTreeReturnType } from './use-tree';

export {
  useTree,
  findTreeNode,
  getTreeLeafValues,
  getAllTreeValues,
  type TreeNodeData,
  type UseTreeInput,
  type UseTreeReturnType,
} from './use-tree';

export interface RenderTreeNodePayload {
  /** Node data */
  node: TreeNodeData;

  /** Nesting level, starts from 0 */
  level: number;

  /** Determines whether the node is expanded */
  expanded: boolean;

  /** Determines whether the node has child nodes */
  hasChildren: boolean;

  /** Determines whether the node is selected */
  selected: boolean;

  /** Determines whether the node is checked */
  checked: boolean;

  /** Determines whether some but not all child nodes are checked */
  indeterminate: boolean;

  /** Tree controller */
  tree: UseTreeReturnType;

  /** Props that should be spread on the node element */
  elementProps: {
    onPress: () => void;
  };
}

export interface TreeProps extends DefaultProps {
  /** Tree data */
  data: TreeNodeData[];

  /** Tree controller returned by useTree hook, uses internal state if not set */
  tree?: UseTreeReturnType;

  /** Key of theme.spacing or number, offset of nested levels */
  levelOffset?: MantineNumberSize;

  /** Determines whether the node is expanded/collapsed when it is pressed */
  expandOnClick?: boolean;

  /** Determines whether the node is selected when it is pressed */
  selectOnClick?: boolean;

  /** Custom node renderer */
  renderNode?: (payload: RenderTreeNodePayload) => React.ReactNode;
}

const useStyles = createStyles((theme) => ({
  node: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: rem(4),
    paddingHorizontal: rem(8),
    borderRadius: theme.fn.radius('sm') as number,
  },
  nodeSelected: {
    backgroundColor: theme.fn.variant({
      variant: 'light',
      color: theme.primaryColor,
    }).background,
  },
  chevron: {
    width: rem(16),
    fontSize: theme.fontSizes.xs as number,
    color: theme.fn.dimmed(),
  },
  label: {
    flex: 1,
    fontSize: theme.fontSizes.sm as number,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
}));

const defaultProps: Partial<TreeProps> = {
  levelOffset: 'lg',
  expandOnClick: true,
  selectOnClick: false,
};

/**
 * Tree displays a hierarchical list of nodes with expand/collapse,
 * selection and checked state support. Port of Mantine v7.17 Tree component.
 */
export const Tree = forwardRef<View, TreeProps>((props, ref) => {
  const {
    data,
    tree,
    levelOffset,
    expandOnClick,
    selectOnClick,
    renderNode,
    style,
    ...others
  } = useComponentDefaultProps('Tree', defaultProps, props);

  const theme = useTheme();
  const defaultController = useTree();
  const controller = tree || defaultController;

  const { initialize } = controller;
  useEffect(() => {
    initialize(data);
  }, [data, initialize]);

  const { styles, sx } = useStyles({}, { name: 'Tree' });

  const offset =
    typeof levelOffset === 'number'
      ? levelOffset
      : (theme.spacing[levelOffset as MantineSize] ?? theme.spacing.lg);

  const renderTreeNode = (
    node: TreeNodeData,
    level: number
  ): React.ReactNode => {
    const hasChildren =
      Array.isArray(node.children) && node.children.length > 0;
    const expanded = !!controller.expandedState[node.value];
    const selected = controller.selectedState.includes(node.value);
    const checked = controller.isNodeChecked(node.value);
    const indeterminate = controller.isNodeIndeterminate(node.value);

    const handlePress = () => {
      if (expandOnClick && hasChildren) {
        controller.toggleExpanded(node.value);
      }
      if (selectOnClick) {
        controller.toggleSelected(node.value);
      }
    };

    const nodeElement = renderNode ? (
      renderNode({
        node,
        level,
        expanded,
        hasChildren,
        selected,
        checked,
        indeterminate,
        tree: controller,
        elementProps: { onPress: handlePress },
      })
    ) : (
      <TouchableOpacity
        style={[styles.node, selected && styles.nodeSelected]}
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityState={{ expanded: hasChildren ? expanded : undefined }}
        {...node.nodeProps}
      >
        <Text style={styles.chevron}>
          {hasChildren ? (expanded ? '▼' : '▶') : ''}
        </Text>
        {typeof node.label === 'string' || typeof node.label === 'number' ? (
          <Text style={styles.label}>{node.label}</Text>
        ) : (
          node.label
        )}
      </TouchableOpacity>
    );

    return (
      <View key={node.value}>
        {nodeElement}
        {hasChildren && expanded && (
          <View style={{ paddingLeft: offset }}>
            {node.children!.map((child) => renderTreeNode(child, level + 1))}
          </View>
        )}
      </View>
    );
  };

  return (
    <BoxView ref={ref} style={sx(style)} {...others}>
      {data.map((node) => renderTreeNode(node, 0))}
    </BoxView>
  );
});

Tree.displayName = 'Tree';
