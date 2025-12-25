import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Notification , Paper } from 'react-native-mantine';

export const NotificationExample = () => {
  return (
    <ExampleWrapper
      title="Notification"
      description="Styled notification message"
    >
      <ExampleSection
        title="Basic Usage"
        description="Notification component"
      >
        <Paper p="md" radius="md">
          <Notification title="Success" color="green">
            Your changes have been saved
          </Notification>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
