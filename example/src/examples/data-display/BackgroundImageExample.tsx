import {
  ExampleWrapper,
  ExampleSection,
} from '../../components/ExampleWrapper';
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
    </ExampleWrapper>
  );
};
