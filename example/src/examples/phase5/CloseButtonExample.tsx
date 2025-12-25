import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { CloseButton , Paper } from 'react-native-mantine';

export const CloseButtonExample = () => {
  return (
    <ExampleWrapper
      title="CloseButton"
      description="Universal close button"
    >
      <ExampleSection
        title="Basic Usage"
        description="CloseButton component"
      >
        <Paper p="md" radius="md">
          <CloseButton />
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
