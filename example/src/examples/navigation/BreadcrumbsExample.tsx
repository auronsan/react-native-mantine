import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
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
    </ExampleWrapper>
  );
};
