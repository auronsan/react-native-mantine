import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Anchor , Paper } from 'react-native-mantine';

export const AnchorExample = () => {
  return (
    <ExampleWrapper
      title="Anchor"
      description="Styled link component"
    >
      <ExampleSection
        title="Basic Usage"
        description="Anchor component"
      >
        <Paper p="md" radius="md">
          <Anchor>Click here to navigate</Anchor>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
