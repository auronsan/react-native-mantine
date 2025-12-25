import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Text , Paper } from 'react-native-mantine';

export const SpoilerExample = () => {
  return (
    <ExampleWrapper
      title="Spoiler"
      description="Content reveal with show more/less"
    >
      <ExampleSection
        title="Basic Usage"
        description="Spoiler component"
      >
        <Paper p="md" radius="md">
          <Text>Spoiler hides content with show more/less functionality - see interactive example</Text>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
