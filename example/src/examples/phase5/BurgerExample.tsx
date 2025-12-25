import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Burger , Paper } from 'react-native-mantine';

export const BurgerExample = () => {
  return (
    <ExampleWrapper
      title="Burger"
      description="Animated hamburger menu icon"
    >
      <ExampleSection
        title="Basic Usage"
        description="Burger component"
      >
        <Paper p="md" radius="md">
          <Burger opened={false} />
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
