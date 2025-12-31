import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { avatarProps } from '../../data/props/AvatarProps';
import { Avatar, Group, Stack, Paper, Text } from 'react-native-mantine';

export const AvatarExample = () => {
  return (
    <ExampleWrapper
      title="Avatar"
      description="User avatar with fallback support and initials generation"
    >
      <ExampleSection
        title="Avatar Sizes"
        description="Available size options"
      >
        <Paper p="md" radius="md">
          <Group spacing={16} alignCenter>
            <Avatar size="xs" alt="John Doe" />
            <Avatar size="sm" alt="Jane Smith" />
            <Avatar size="md" alt="Alice Brown" />
            <Avatar size="lg" alt="Bob Wilson" />
            <Avatar size="xl" alt="Charlie Davis" />
          </Group>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Avatar Colors"
        description="Theme colors for avatars"
      >
        <Paper p="md" radius="md">
          <Group spacing={16} alignCenter>
            <Avatar color="blue" alt="User One" />
            <Avatar color="green" alt="User Two" />
            <Avatar color="red" alt="User Three" />
            <Avatar color="orange" alt="User Four" />
            <Avatar color="grape" alt="User Five" />
          </Group>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Avatar with Images"
        description="Avatars with image sources and fallbacks"
        variant="showcase"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <Group spacing={12} alignCenter>
              <Avatar
                src="https://avatars.githubusercontent.com/u/10353856?v=4"
                alt="GitHub Avatar"
                size="lg"
              />
              <Text>Avatar with valid image source</Text>
            </Group>
            <Group spacing={12} alignCenter>
              <Avatar
                src="invalid-url"
                alt="Fallback User"
                size="lg"
                color="blue"
              />
              <Text>Avatar with fallback to initials</Text>
            </Group>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Avatar props"
      >
        <PropsTable props={avatarProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Avatar } from 'react-native-mantine';

// Avatar with image
<Avatar
  src="https://example.com/avatar.jpg"
  alt="John Doe"
  size="lg"
/>

// Avatar with initials fallback
<Avatar
  alt="Jane Smith"
  color="blue"
  size="md"
/>

// Avatar with custom content
<Avatar size="xl">
  <CustomIcon />
</Avatar>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
