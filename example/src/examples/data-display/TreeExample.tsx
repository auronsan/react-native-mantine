import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { treeProps, treeNodeDataProps } from '../../data/props/TreeProps';
import {
  Button,
  Checkbox,
  Group,
  Paper,
  Stack,
  Text,
  Tree,
  useTree,
} from 'react-native-mantine';
import type { TreeNodeData } from 'react-native-mantine';

const data: TreeNodeData[] = [
  {
    value: 'src',
    label: 'src',
    children: [
      {
        value: 'src/components',
        label: 'components',
        children: [
          { value: 'src/components/Button.tsx', label: 'Button.tsx' },
          { value: 'src/components/Badge.tsx', label: 'Badge.tsx' },
        ],
      },
      {
        value: 'src/hooks',
        label: 'hooks',
        children: [
          { value: 'src/hooks/use-tree.ts', label: 'use-tree.ts' },
        ],
      },
      { value: 'src/index.tsx', label: 'index.tsx' },
    ],
  },
  {
    value: 'package.json',
    label: 'package.json',
  },
  {
    value: 'tsconfig.json',
    label: 'tsconfig.json',
  },
];

export const TreeExample = () => {
  const selectTree = useTree();
  const checkboxTree = useTree();
  const controlledTree = useTree();

  return (
    <ExampleWrapper
      title="Tree"
      description="Display a hierarchical list of nodes with expand, select and checkbox support"
    >
      <ExampleSection
        title="Basic Usage"
        description="Press a node with children to expand or collapse it (expandOnClick is enabled by default)"
      >
        <Paper p="md" radius="md">
          <Tree data={data} />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Select On Click"
        description="With selectOnClick, pressing a node also selects it"
        variant="showcase"
      >
        <Paper p="md" radius="md">
          <Stack spacing={12}>
            <Tree data={data} tree={selectTree} selectOnClick />
            <Text size="sm" color="dimmed">
              Selected: {selectTree.selectedState.join(', ') || 'none'}
            </Text>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Custom Render Node with Checkboxes"
        description="renderNode gives full control over the node element, use the tree controller to manage checked state"
        variant="showcase"
      >
        <Paper p="md" radius="md">
          <Stack spacing={12}>
            <Tree
              data={data}
              tree={checkboxTree}
              renderNode={({
                node,
                expanded,
                hasChildren,
                checked,
                indeterminate,
                tree,
                elementProps,
              }) => (
                <View style={styles.node}>
                  <TouchableOpacity
                    style={styles.chevron}
                    onPress={elementProps.onPress}
                    disabled={!hasChildren}
                  >
                    <Text size="xs" color="dimmed">
                      {hasChildren ? (expanded ? '▼' : '▶') : ' '}
                    </Text>
                  </TouchableOpacity>
                  <Checkbox
                    size="sm"
                    label={node.label}
                    checked={checked}
                    indeterminate={indeterminate}
                    onChange={(value) =>
                      value
                        ? tree.checkNode(node.value)
                        : tree.uncheckNode(node.value)
                    }
                  />
                </View>
              )}
            />
            <Text size="sm" color="dimmed">
              Checked leaves: {checkboxTree.checkedState.length}
            </Text>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="useTree Controller"
        description="Pass a useTree() controller to expand or collapse all nodes programmatically"
      >
        <Paper p="md" radius="md">
          <Stack spacing={12}>
            <Group spacing={8}>
              <Button size="xs" onPress={() => controlledTree.expandAllNodes()}>
                Expand all
              </Button>
              <Button
                size="xs"
                variant="outline"
                onPress={() => controlledTree.collapseAllNodes()}
              >
                Collapse all
              </Button>
            </Group>
            <Tree data={data} tree={controlledTree} />
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Tree props"
      >
        <PropsTable props={treeProps} />
      </ExampleSection>

      <ExampleSection
        title="TreeNodeData"
        description="Shape of a single node in the data array"
      >
        <PropsTable props={treeNodeDataProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Tree, useTree } from 'react-native-mantine';
import type { TreeNodeData } from 'react-native-mantine';

const data: TreeNodeData[] = [
  {
    value: 'src',
    label: 'src',
    children: [
      { value: 'src/index.tsx', label: 'index.tsx' },
    ],
  },
];

const tree = useTree();

<Tree data={data} tree={tree} selectOnClick />

// Programmatic control
tree.expandAllNodes();
tree.checkNode('src');
tree.isNodeChecked('src');
tree.isNodeIndeterminate('src');`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};

const styles = StyleSheet.create({
  node: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  chevron: {
    width: 24,
    alignItems: 'center',
  },
});
