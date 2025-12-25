import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Rating , Paper } from 'react-native-mantine';

export const RatingExample = () => {
  return (
    <ExampleWrapper
      title="Rating"
      description="Interactive star rating"
    >
      <ExampleSection
        title="Basic Usage"
        description="Rating component"
      >
        <Paper p="md" radius="md">
          <Rating defaultValue={3} />
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
