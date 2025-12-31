import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { closeButtonProps } from '../../data/props/CloseButtonProps';
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

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available CloseButton props"
      >
        <PropsTable props={closeButtonProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { CloseButton } from 'react-native-mantine';

<CloseButton
  onPress={() => console.log('Close pressed')}
  size="lg"
  radius="md"
/>

// With custom icon color
<CloseButton
  iconColor="#fa5252"
  size="md"
  onPress={handleClose}
/>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
