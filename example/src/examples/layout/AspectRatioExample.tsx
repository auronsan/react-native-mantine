import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { aspectRatioProps } from '../../data/props/AspectRatioProps';
import { AspectRatio, Text , Paper } from 'react-native-mantine';

export const AspectRatioExample = () => {
  return (
    <ExampleWrapper
      title="AspectRatio"
      description="Maintain fixed aspect ratio"
    >
      <ExampleSection
        title="Basic Usage"
        description="AspectRatio component"
      >
        <Paper p="md" radius="md">
          <AspectRatio ratio={16 / 9}>
            <Text>16:9 aspect ratio content</Text>
          </AspectRatio>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Usage"
        description="Minimal copy-pasteable example"
      >
        <CodeBlock
          code={`import { AspectRatio, Image } from 'react-native-mantine';

<AspectRatio ratio={16 / 9}>
  <Image source={{ uri: 'https://unsplash.it/640/360' }} fit="cover" />
</AspectRatio>`}
        />
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available AspectRatio props"
      >
        <PropsTable props={aspectRatioProps} />
      </ExampleSection>
    </ExampleWrapper>
  );
};
