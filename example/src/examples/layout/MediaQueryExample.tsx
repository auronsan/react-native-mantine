import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { MediaQuery, Text , Paper } from 'react-native-mantine';

export const MediaQueryExample = () => {
  return (
    <ExampleWrapper
      title="MediaQuery"
      description="Responsive visibility control"
    >
      <ExampleSection
        title="Basic Usage"
        description="MediaQuery component"
      >
        <Paper p="md" radius="md">
          <MediaQuery largerThan="sm">
            <Text>Visible on screens larger than 'sm'</Text>
          </MediaQuery>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
