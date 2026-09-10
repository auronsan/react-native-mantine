import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { mediaQueryProps } from '../../data/props/MediaQueryProps';
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

      <ExampleSection
        title="Usage"
        description="Minimal copy-pasteable example"
      >
        <CodeBlock
          code={`import { MediaQuery, Text } from 'react-native-mantine';

<MediaQuery largerThan={768}>
  <Text>Visible only when the window is at least 768px wide</Text>
</MediaQuery>

<MediaQuery smallerThan={768} orientation="portrait">
  <Text>Visible on narrow portrait screens</Text>
</MediaQuery>`}
        />
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available MediaQuery props"
      >
        <PropsTable props={mediaQueryProps} />
      </ExampleSection>
    </ExampleWrapper>
  );
};
