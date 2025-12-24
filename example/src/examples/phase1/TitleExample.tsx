import { View } from 'react-native';
import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Title, Text, Paper } from 'react-native-mantine';

export const TitleExample = () => {
  return (
    <ExampleWrapper title="Title">
      <ExampleSection
        title="Heading Levels"
        description="Title component supports all heading levels (h1-h6)"
      >
        <Paper p="md" radius="md">
          <View style={{ gap: 12 }}>
            <Title order={1}>Heading 1</Title>
            <Title order={2}>Heading 2</Title>
            <Title order={3}>Heading 3</Title>
            <Title order={4}>Heading 4</Title>
            <Title order={5}>Heading 5</Title>
            <Title order={6}>Heading 6</Title>
          </View>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Custom Styling"
        description="Title can be styled with custom colors and styles"
      >
        <Paper p="md" radius="md">
          <View style={{ gap: 12 }}>
            <Title order={2} style={{ color: '#228be6' }}>
              Colored Title
            </Title>
            <Title order={3} style={{ fontStyle: 'italic' }}>
              Italic Title
            </Title>
            <Text>
              Titles automatically use the theme's heading configuration
              including font family, sizes, and weights.
            </Text>
          </View>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
