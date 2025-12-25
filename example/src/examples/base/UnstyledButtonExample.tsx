import { View } from 'react-native';
import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { Text, UnstyledButton, Stack  } from 'react-native-mantine';

export const UnstyledButtonExample = () => {
  const [count, setCount] = useState(0);

  return (
    <ExampleWrapper
      title="UnstyledButton"
      description="Accessible button without default styles"
    >
      <ExampleSection
        title="Basic Usage"
        description="Simple unstyled button"
        variant="showcase"
      >
        <UnstyledButton onPress={() => {}}>
          <Text style={{ color: '#228be6', textDecorationLine: 'underline' }}>
            Clickable unstyled button
          </Text>
        </UnstyledButton>
      </ExampleSection>

      <ExampleSection
        title="Custom Styled Button"
        description="UnstyledButton with custom styling"
      >
        <UnstyledButton
          onPress={() => {}}
          style={{
            backgroundColor: '#e7f5ff',
            padding: 16,
            borderRadius: 8,
            borderWidth: 2,
            borderColor: '#228be6',
          }}
        >
          <Text style={{ color: '#228be6', fontWeight: 'bold', textAlign: 'center' }}>
            Custom Styled Button
          </Text>
        </UnstyledButton>
      </ExampleSection>

      <ExampleSection
        title="Interactive Example"
        description="Button with state management"
        variant="showcase"
      >
        <Stack spacing={12}>
          <UnstyledButton
            onPress={() => setCount(count + 1)}
            style={{
              backgroundColor: '#f8f9fa',
              padding: 16,
              borderRadius: 8,
            }}
          >
            <Text style={{ textAlign: 'center' }}>
              Click me! Clicked {count} times
            </Text>
          </UnstyledButton>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Card-Style Button"
        description="UnstyledButton as a card container"
      >
        <UnstyledButton
          onPress={() => {}}
          style={{
            backgroundColor: '#fff',
            padding: 20,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#dee2e6',
          }}
        >
          <View>
            <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Interactive Card</Text>
            <Text style={{ color: '#666' }}>Tap anywhere on this card to trigger an action</Text>
          </View>
        </UnstyledButton>
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { UnstyledButton, Text  } from 'react-native-mantine';

<UnstyledButton
  onPress={() => console.log('Clicked')}
  style={{ padding: 16 }}
>
  <Text>Custom Button</Text>
</UnstyledButton>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};