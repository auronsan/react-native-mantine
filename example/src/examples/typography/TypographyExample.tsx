import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { typographyProps } from '../../data/props/TypographyProps';
import {
  Blockquote,
  Code,
  List,
  Paper,
  Title,
  Typography,
} from 'react-native-mantine';

export const TypographyExample = () => {
  return (
    <ExampleWrapper
      title="Typography"
      description="Apply default typography styles to plain text content"
    >
      <ExampleSection
        title="Basic Usage"
        description="String children are wrapped in styled Text with body font size, line height and vertical rhythm"
      >
        <Paper p="md" radius="md">
          <Typography>
            Typography applies default text styles to raw strings, so you do
            not have to wrap every paragraph in a Text component yourself.
          </Typography>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Mixed Content"
        description="Element children are rendered as-is, only strings receive the body styles"
        variant="showcase"
      >
        <Paper p="md" radius="md">
          <Typography>
            <Title order={4}>Getting started</Title>
            Install the package with your favorite package manager and wrap
            your app in the Theme provider.
            <Code>yarn add react-native-mantine</Code>
            All components read colors, spacing and font sizes from the theme,
            so your screens stay consistent out of the box.
            <List>
              <List.Item>100+ components</List.Item>
              <List.Item>Dark and light color schemes</List.Item>
              <List.Item>Customizable theme</List.Item>
            </List>
          </Typography>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Custom Text Style"
        description="textStyle overrides the default styles applied to string children"
      >
        <Paper p="md" radius="md">
          <Typography
            textStyle={{ fontSize: 18, lineHeight: 30, fontStyle: 'italic' }}
          >
            This paragraph uses a larger italic font through the textStyle
            prop.
            Every string child receives the same custom style.
          </Typography>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Article Layout"
        description="Combine Typography with other typography components to render long-form content"
      >
        <Paper p="md" radius="md">
          <Typography>
            <Title order={3}>Why port Mantine?</Title>
            Mantine is one of the most complete React component libraries.
            Bringing the same API to React Native makes it easy to share
            knowledge between web and mobile teams.
            <Blockquote cite="– react-native-mantine docs">
              Same props, same theme, different platform.
            </Blockquote>
            The vertical gap between children keeps a comfortable reading
            rhythm without extra spacing components.
          </Typography>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Typography props"
      >
        <PropsTable props={typographyProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Typography, Title, Code } from 'react-native-mantine';

<Typography>
  <Title order={4}>Getting started</Title>
  Raw strings are wrapped in styled Text automatically.
  <Code>yarn add react-native-mantine</Code>
  Element children are rendered as-is.
</Typography>

// Override styles of string children
<Typography textStyle={{ fontSize: 18, lineHeight: 30 }}>
  Custom styled paragraph.
</Typography>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
