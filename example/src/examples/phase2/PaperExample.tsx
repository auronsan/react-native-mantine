import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Text , Paper } from 'react-native-mantine';

export const PaperExample = () => {
  return (
    <ExampleWrapper
      title="Paper"
      description="Container with shadow and border radius"
    >
      <ExampleSection
        title="Basic Usage"
        description="Paper component"
      >
        <Paper p="md" radius="md">
          <Paper p="lg" shadow="md" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text>Content inside a Paper component</Text>
          </Paper>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
