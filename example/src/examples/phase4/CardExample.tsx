import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Card, Text , Paper } from 'react-native-mantine';

export const CardExample = () => {
  return (
    <ExampleWrapper
      title="Card"
      description="Content card with sections"
    >
      <ExampleSection
        title="Basic Usage"
        description="Card component"
      >
        <Paper p="md" radius="md">
          <Card shadow="sm" p="lg" radius="md">
            <Text style={{ fontWeight: '600', marginBottom: 8 }}>Card Title</Text>
            <Text>Card content goes here</Text>
          </Card>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
