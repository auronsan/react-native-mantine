import { View } from 'react-native';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { spaceProps } from '../../data/props/SpaceProps';
import { Space, Text, Stack , Badge } from 'react-native-mantine';

export const SpaceExample = () => {
  return (
    <ExampleWrapper
      title="Space"
      description="Add horizontal or vertical spacing between elements"
    >
      <ExampleSection
        title="Vertical Spacing"
        description="Space between elements in vertical layout"
        variant="showcase"
      >
        <View style={{ backgroundColor: '#f8f9fa', padding: 16, borderRadius: 8 }}>
          <Text>First element</Text>
          <Space h="xs" />
          <Text>After XS space (4px)</Text>
          <Space h="sm" />
          <Text>After SM space (8px)</Text>
          <Space h="md" />
          <Text>After MD space (12px)</Text>
          <Space h="lg" />
          <Text>After LG space (16px)</Text>
          <Space h="xl" />
          <Text>After XL space (20px)</Text>
        </View>
      </ExampleSection>

      <ExampleSection
        title="Horizontal Spacing"
        description="Space between inline elements"
      >
        <View style={{ backgroundColor: '#e7f5ff', padding: 16, borderRadius: 8, flexDirection: 'row', alignItems: 'center' }}>
          <Badge>Item 1</Badge>
          <Space w="xs" />
          <Badge>Item 2</Badge>
          <Space w="md" />
          <Badge>Item 3</Badge>
          <Space w="lg" />
          <Badge>Item 4</Badge>
        </View>
      </ExampleSection>

      <ExampleSection
        title="Custom Spacing"
        description="Space with custom numeric values"
      >
        <View style={{ backgroundColor: '#fff5f5', padding: 16, borderRadius: 8 }}>
          <Text>Element 1</Text>
          <Space h={30} />
          <Text>Element 2 (30px space)</Text>
          <Space h={50} />
          <Text>Element 3 (50px space)</Text>
        </View>
      </ExampleSection>

      <ExampleSection
        title="Mixed Spacing"
        description="Combining horizontal and vertical space"
      >
        <Stack spacing={8}>
          <Text style={{ fontWeight: 'bold' }}>Section 1</Text>
          <Text>Content here</Text>
          <Space h="xl" />
          <Text style={{ fontWeight: 'bold' }}>Section 2</Text>
          <Text>More content here</Text>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Space props"
      >
        <PropsTable props={spaceProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Space, Text , Badge } from 'react-native-mantine';

// Vertical spacing
<Text>First element</Text>
<Space h="md" />
<Text>Second element</Text>

// Horizontal spacing
<View style={{ flexDirection: 'row' }}>
  <Badge>Item 1</Badge>
  <Space w="lg" />
  <Badge>Item 2</Badge>
</View>

// Custom spacing
<Space h={50} />
<Space w={100} />`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};