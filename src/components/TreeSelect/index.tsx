import React, { forwardRef, useState } from 'react';
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
  type TextInput as RNTextInput,
} from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import {
  findTreeNode,
  getAllTreeValues,
  getTreeLeafValues,
  type TreeNodeData,
} from '../Tree/use-tree';
import type {
  DefaultProps,
  MantineNumberSize,
  MantineSize,
} from '../../theme/types';
import { useComponentDefaultProps, useTheme } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

export interface TreeSelectProps extends DefaultProps {
  /** Tree data */
  data: TreeNodeData[];

  /** Selection mode */
  mode?: 'single' | 'multiple' | 'checkbox';

  /** Controlled value: string or null for single mode, string[] for multiple and checkbox modes */
  value?: string | string[] | null;

  /** Default value for uncontrolled component */
  defaultValue?: string | string[] | null;

  /** Called when value changes */
  onChange?: (value: string | string[] | null) => void;

  /** In single mode, determines whether pressing the selected node deselects it */
  allowDeselect?: boolean;

  /** Maximum number of selected values in multiple and checkbox modes */
  maxValues?: number;

  /** Maximum number of values displayed in the input, the rest is shown as +N */
  maxDisplayedValues?: number;

  /** Node values that are expanded by default */
  defaultExpandedValues?: string[];

  /** Determines whether all nodes should be expanded by default */
  defaultExpandAll?: boolean;

  /** Determines whether the search input should be displayed in the dropdown */
  searchable?: boolean;

  /** Search input placeholder */
  searchPlaceholder?: string;

  /** Message displayed when no nodes match the search */
  nothingFoundMessage?: React.ReactNode;

  /** Determines whether the clear option should be displayed */
  clearable?: boolean;

  /** Clear option label */
  clearButtonLabel?: string;

  /** Called when the value is cleared */
  onClear?: () => void;

  /** Input label */
  label?: React.ReactNode;

  /** Input description */
  description?: React.ReactNode;

  /** Error message */
  error?: React.ReactNode;

  /** Input placeholder */
  placeholder?: string;

  /** Controls input height and font size */
  size?: MantineSize;

  /** Key of theme.radius or any valid value to set border-radius */
  radius?: MantineNumberSize;

  /** Displays required asterisk */
  required?: boolean;

  /** If set, the input is disabled */
  disabled?: boolean;

  /** Maximum height of the dropdown list */
  maxDropdownHeight?: number;
}

const useStyles = createStyles((theme) => ({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.themeColor('dark', 7)
        : theme.white,
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
    maxHeight: '80%',
  },
  searchContainer: {
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor:
      theme.colorScheme === 'dark'
        ? theme.fn.themeColor('dark', 4)
        : theme.fn.themeColor('gray', 2),
  },
  listContainer: {
    paddingVertical: rem(8),
    paddingHorizontal: theme.spacing.sm,
  },
  node: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: rem(10),
    paddingHorizontal: rem(8),
    borderRadius: theme.fn.radius('sm') as number,
  },
  nodeSelected: {
    backgroundColor: theme.fn.variant({
      variant: 'light',
      color: theme.primaryColor,
    }).background,
  },
  chevronButton: {
    width: rem(24),
    alignItems: 'center',
  },
  chevron: {
    fontSize: theme.fontSizes.xs as number,
    color: theme.fn.dimmed(),
  },
  checkbox: {
    width: rem(18),
    height: rem(18),
    borderRadius: theme.fn.radius('xs') as number,
    borderWidth: 1,
    borderColor:
      theme.colorScheme === 'dark'
        ? theme.fn.themeColor('dark', 3)
        : theme.fn.themeColor('gray', 4),
    marginRight: rem(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: theme.fn.themeColor(theme.primaryColor, 6),
    borderColor: theme.fn.themeColor(theme.primaryColor, 6),
  },
  checkboxLabel: {
    color: theme.white,
    fontSize: rem(12),
    lineHeight: rem(14),
    fontWeight: '700',
  },
  nodeLabel: {
    flex: 1,
    fontSize: theme.fontSizes.sm as number,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
  nodeLabelSelected: {
    fontWeight: '600',
    color: theme.fn.themeColor(theme.primaryColor, 6),
  },
  clearButton: {
    paddingVertical: rem(10),
    paddingHorizontal: rem(8),
  },
  clearButtonLabel: {
    fontSize: theme.fontSizes.sm as number,
    color: theme.fn.dimmed(),
  },
  nothingFound: {
    padding: theme.spacing.xl,
    fontSize: theme.fontSizes.sm as number,
    color: theme.fn.dimmed(),
    textAlign: 'center',
  },
}));

const defaultProps: Partial<TreeSelectProps> = {
  mode: 'single',
  allowDeselect: true,
  searchable: false,
  searchPlaceholder: 'Search...',
  clearable: false,
  clearButtonLabel: 'Clear',
  size: 'sm',
  radius: 'sm',
  maxDropdownHeight: 400,
  defaultExpandAll: false,
};

function normalizeValue(value: string | string[] | null | undefined): string[] {
  if (value === undefined || value === null) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}

function getNodeLabelText(node: TreeNodeData): string {
  return typeof node.label === 'string' || typeof node.label === 'number'
    ? String(node.label)
    : node.value;
}

function filterTree(data: TreeNodeData[], query: string): TreeNodeData[] {
  const trimmed = query.trim().toLowerCase();
  if (trimmed.length === 0) {
    return data;
  }

  const result: TreeNodeData[] = [];

  for (const node of data) {
    if (getNodeLabelText(node).toLowerCase().includes(trimmed)) {
      result.push(node);
      continue;
    }

    if (node.children) {
      const children = filterTree(node.children, query);
      if (children.length > 0) {
        result.push({ ...node, children });
      }
    }
  }

  return result;
}

/**
 * TreeSelect allows picking one or more values from a hierarchical data set,
 * with single, multiple and checkbox selection modes. Port of Mantine v9
 * TreeSelect component, options are displayed in a bottom sheet modal.
 */
export const TreeSelect = forwardRef<RNTextInput, TreeSelectProps>(
  (props, ref) => {
    const {
      data,
      mode,
      value: controlledValue,
      defaultValue,
      onChange,
      allowDeselect,
      maxValues,
      maxDisplayedValues,
      defaultExpandedValues,
      defaultExpandAll,
      searchable,
      searchPlaceholder,
      nothingFoundMessage,
      clearable,
      clearButtonLabel,
      onClear,
      label,
      description,
      error,
      placeholder,
      size,
      radius,
      required,
      disabled,
      maxDropdownHeight,
      style,
      ...others
    } = useComponentDefaultProps('TreeSelect', defaultProps, props);

    useTheme();
    const { styles } = useStyles({}, { name: 'TreeSelect' });

    const [opened, setOpened] = useState(false);
    const [search, setSearch] = useState('');
    const [uncontrolledValue, setUncontrolledValue] = useState<string[]>(
      normalizeValue(defaultValue)
    );
    const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
      if (defaultExpandAll) {
        return Object.fromEntries(
          getAllTreeValues(data).map((value) => [value, true])
        );
      }
      return Object.fromEntries(
        (defaultExpandedValues || []).map((value) => [value, true])
      );
    });

    const selected =
      controlledValue !== undefined
        ? normalizeValue(controlledValue)
        : uncontrolledValue;

    const emitChange = (next: string[]) => {
      if (controlledValue === undefined) {
        setUncontrolledValue(next);
      }
      if (mode === 'single') {
        onChange?.(next.length > 0 ? next[0]! : null);
      } else {
        onChange?.(next);
      }
    };

    const isNodeChecked = (node: TreeNodeData) => {
      const leaves = getTreeLeafValues(node);
      return (
        leaves.length > 0 && leaves.every((leaf) => selected.includes(leaf))
      );
    };

    const isNodeIndeterminate = (node: TreeNodeData) => {
      const leaves = getTreeLeafValues(node);
      const count = leaves.filter((leaf) => selected.includes(leaf)).length;
      return count > 0 && count < leaves.length;
    };

    const handleNodePress = (node: TreeNodeData) => {
      if (mode === 'single') {
        if (selected.includes(node.value)) {
          if (allowDeselect) {
            emitChange([]);
          }
        } else {
          emitChange([node.value]);
        }
        setOpened(false);
        setSearch('');
        return;
      }

      if (mode === 'multiple') {
        if (selected.includes(node.value)) {
          emitChange(selected.filter((item) => item !== node.value));
        } else if (maxValues === undefined || selected.length < maxValues) {
          emitChange([...selected, node.value]);
        }
        return;
      }

      const leaves = getTreeLeafValues(node);
      if (isNodeChecked(node)) {
        emitChange(selected.filter((item) => !leaves.includes(item)));
      } else {
        const additions = leaves.filter((leaf) => !selected.includes(leaf));
        const next = [...selected, ...additions];
        if (maxValues === undefined || next.length <= maxValues) {
          emitChange(next);
        }
      }
    };

    const handleClear = () => {
      emitChange([]);
      onClear?.();
    };

    const selectedLabels = selected.map((value) => {
      const node = findTreeNode(data, value);
      return node ? getNodeLabelText(node) : value;
    });

    const displayValue =
      maxDisplayedValues !== undefined &&
      selectedLabels.length > maxDisplayedValues
        ? `${selectedLabels.slice(0, maxDisplayedValues).join(', ')} (+${
            selectedLabels.length - maxDisplayedValues
          })`
        : selectedLabels.join(', ');

    const searching = search.trim().length > 0;
    const filteredData = filterTree(data, search);

    const renderNode = (
      node: TreeNodeData,
      level: number
    ): React.ReactNode => {
      const hasChildren =
        Array.isArray(node.children) && node.children.length > 0;
      const isExpanded = searching || !!expanded[node.value];
      const isSelected =
        mode === 'checkbox'
          ? isNodeChecked(node)
          : selected.includes(node.value);
      const indeterminate = mode === 'checkbox' && isNodeIndeterminate(node);

      return (
        <View key={node.value}>
          <TouchableOpacity
            style={[styles.node, isSelected && mode !== 'checkbox' && styles.nodeSelected]}
            onPress={() => handleNodePress(node)}
            accessibilityRole={mode === 'checkbox' ? 'checkbox' : 'menuitem'}
            accessibilityState={{
              selected: isSelected,
              checked: mode === 'checkbox' ? isSelected : undefined,
              expanded: hasChildren ? isExpanded : undefined,
            }}
            accessibilityLabel={getNodeLabelText(node)}
            {...node.nodeProps}
          >
            <TouchableOpacity
              style={styles.chevronButton}
              disabled={!hasChildren}
              onPress={() =>
                setExpanded((current) => ({
                  ...current,
                  [node.value]: !current[node.value],
                }))
              }
              accessibilityRole="button"
              accessibilityLabel={isExpanded ? 'Collapse' : 'Expand'}
            >
              <Text style={styles.chevron}>
                {hasChildren ? (isExpanded ? '▼' : '▶') : ''}
              </Text>
            </TouchableOpacity>

            {mode === 'checkbox' && (
              <View
                style={[
                  styles.checkbox,
                  (isSelected || indeterminate) && styles.checkboxActive,
                ]}
              >
                {(isSelected || indeterminate) && (
                  <Text style={styles.checkboxLabel}>
                    {indeterminate ? '−' : '✓'}
                  </Text>
                )}
              </View>
            )}

            {typeof node.label === 'string' || typeof node.label === 'number' ? (
              <Text
                style={[
                  styles.nodeLabel,
                  isSelected && mode !== 'checkbox' && styles.nodeLabelSelected,
                ]}
              >
                {node.label}
              </Text>
            ) : (
              node.label
            )}
          </TouchableOpacity>

          {hasChildren && isExpanded && (
            <View style={{ paddingLeft: rem(20) }}>
              {node.children!.map((child) => renderNode(child, level + 1))}
            </View>
          )}
        </View>
      );
    };

    return (
      <>
        <TextInput
          ref={ref}
          label={label}
          description={description}
          error={error}
          size={size}
          radius={radius}
          required={required}
          value={displayValue}
          placeholder={placeholder}
          editable={!disabled}
          onPress={() => !disabled && setOpened(true)}
          style={style}
          accessibilityRole="button"
          accessibilityState={{ expanded: opened, disabled }}
          {...others}
        />

        <Modal
          visible={opened}
          transparent
          animationType="slide"
          onRequestClose={() => setOpened(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalOverlay}
            onPress={() => {
              setOpened(false);
              setSearch('');
            }}
          >
            <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
              {searchable && (
                <BoxView style={styles.searchContainer}>
                  <TextInput
                    placeholder={searchPlaceholder}
                    value={search}
                    onChangeText={setSearch}
                    autoFocus
                  />
                </BoxView>
              )}

              <ScrollView
                style={{ maxHeight: maxDropdownHeight }}
                contentContainerStyle={styles.listContainer}
                keyboardShouldPersistTaps="handled"
              >
                {clearable && selected.length > 0 && (
                  <TouchableOpacity
                    style={styles.clearButton}
                    onPress={handleClear}
                    accessibilityRole="button"
                    accessibilityLabel={clearButtonLabel}
                  >
                    <Text style={styles.clearButtonLabel}>
                      {clearButtonLabel}
                    </Text>
                  </TouchableOpacity>
                )}

                {filteredData.map((node) => renderNode(node, 0))}

                {filteredData.length === 0 && (
                  <Text style={styles.nothingFound}>
                    {nothingFoundMessage ?? 'Nothing found'}
                  </Text>
                )}
              </ScrollView>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </>
    );
  }
);

TreeSelect.displayName = 'TreeSelect';
