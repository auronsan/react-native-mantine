import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { notificationProps } from '../../data/props/NotificationProps';
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

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Notification props"
      >
        <PropsTable props={notificationProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Notification } from 'react-native-mantine';

<Notification
  title="Success"
  message="Your changes have been saved successfully"
  color="green"
  withCloseButton
  onClose={() => console.log('Closed')}
/>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
