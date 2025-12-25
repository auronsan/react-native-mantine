import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Image , Paper } from 'react-native-mantine';

export const ImageExample = () => {
  return (
    <ExampleWrapper
      title="Image"
      description="Responsive image with placeholder"
    >
      <ExampleSection
        title="Basic Usage"
        description="Image component"
      >
        <Paper p="md" radius="md">
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={{ width: 150, height: 150, borderRadius: 8 }}
          />
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
