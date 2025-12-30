import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { ratingProps } from '../../data/props/RatingProps';
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

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Rating props"
      >
        <PropsTable props={ratingProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Rating } from 'react-native-mantine';
import { useState } from 'react';

const [value, setValue] = useState(3);

<Rating
  value={value}
  onChange={setValue}
  count={5}
  size="lg"
  color="yellow"
/>

// Read-only rating
<Rating value={4.5} readOnly />`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
