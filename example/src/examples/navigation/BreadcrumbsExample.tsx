import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { breadcrumbsProps } from '../../data/props/BreadcrumbsProps';
import { Anchor, Breadcrumbs, Text , Paper } from 'react-native-mantine';

export const BreadcrumbsExample = () => {
  return (
    <ExampleWrapper
      title="Breadcrumbs"
      description="Navigation breadcrumb trail"
    >
      <ExampleSection
        title="Basic Usage"
        description="Breadcrumbs component"
      >
        <Paper p="md" radius="md">
          <Breadcrumbs>
            <Anchor>Home</Anchor>
            <Anchor>Products</Anchor>
            <Text>Current Page</Text>
          </Breadcrumbs>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Usage"
        description="Minimal copy-pasteable example"
      >
        <CodeBlock
          code={`import { Breadcrumbs, Anchor, Text } from 'react-native-mantine';

<Breadcrumbs separator="/">
  <Anchor onPress={() => navigate('Home')}>Home</Anchor>
  <Anchor onPress={() => navigate('Products')}>Products</Anchor>
  <Text>Current page</Text>
</Breadcrumbs>`}
        />
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Breadcrumbs props"
      >
        <PropsTable props={breadcrumbsProps} />
      </ExampleSection>
    </ExampleWrapper>
  );
};
