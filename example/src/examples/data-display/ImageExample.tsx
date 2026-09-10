import {
  ExampleWrapper,
  ExampleSection,
  CodeBlock,
} from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { imageProps } from '../../data/props/ImageProps';
import { Image, Paper } from 'react-native-mantine';

export const ImageExample = () => {
  return (
    <ExampleWrapper
      title="Image"
      description="Responsive image with placeholder"
    >
      <ExampleSection title="Basic Usage" description="Image component">
        <Paper p="md" radius="md">
          <Image
            source={{ uri: 'https://unsplash.it/640/425' }}
            style={{ width: 150, height: 150, borderRadius: 8 }}
          />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Usage"
        description="Minimal copy-pasteable example"
      >
        <CodeBlock
          code={`import { Image } from 'react-native-mantine';

<Image
  source={{ uri: 'https://unsplash.it/640/425' }}
  width={150}
  height={150}
  radius="md"
  fit="cover"
  alt="Random landscape"
/>`}
        />
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Image props"
      >
        <PropsTable props={imageProps} />
      </ExampleSection>
    </ExampleWrapper>
  );
};
