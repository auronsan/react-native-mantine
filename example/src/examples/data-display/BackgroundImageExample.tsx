import {
  ExampleWrapper,
  ExampleSection,
  CodeBlock,
} from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { backgroundImageProps } from '../../data/props/BackgroundImageProps';
import { BackgroundImage, Text, Paper } from 'react-native-mantine';

export const BackgroundImageExample = () => {
  return (
    <ExampleWrapper
      title="BackgroundImage"
      description="Container with background image"
    >
      <ExampleSection
        title="Basic Usage"
        description="BackgroundImage component"
      >
        <Paper p="md" radius="md">
          <BackgroundImage
            source={{ uri: 'https://unsplash.it/640/425' }}
            style={{ height: 150, borderRadius: 8 }}
          >
            <Text style={{ color: '#fff', padding: 16 }}>
              Content over image
            </Text>
          </BackgroundImage>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Usage"
        description="Minimal copy-pasteable example"
      >
        <CodeBlock
          code={`import { BackgroundImage, Text } from 'react-native-mantine';

<BackgroundImage
  source={{ uri: 'https://unsplash.it/640/425' }}
  radius="md"
  style={{ height: 150 }}
>
  <Text style={{ color: '#fff', padding: 16 }}>Content over image</Text>
</BackgroundImage>`}
        />
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available BackgroundImage props"
      >
        <PropsTable props={backgroundImageProps} />
      </ExampleSection>
    </ExampleWrapper>
  );
};
