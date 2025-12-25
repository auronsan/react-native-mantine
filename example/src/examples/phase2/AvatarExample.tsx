import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Avatar, Group , Paper } from 'react-native-mantine';

export const AvatarExample = () => {
  return (
    <ExampleWrapper
      title="Avatar"
      description="User avatar with fallback support"
    >
      <ExampleSection
        title="Basic Usage"
        description="Avatar component"
      >
        <Paper p="md" radius="md">
          <Group spacing={16}>
            <Avatar size="sm">JD</Avatar>
            <Avatar size="md">AB</Avatar>
            <Avatar size="lg">XY</Avatar>
          </Group>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
