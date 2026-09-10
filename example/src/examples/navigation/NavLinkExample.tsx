import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { navLinkProps } from '../../data/props/NavLinkProps';
import { NavLink, Stack , Paper } from 'react-native-mantine';

export const NavLinkExample = () => {
  return (
    <ExampleWrapper
      title="NavLink"
      description="Navigation link with active state"
    >
      <ExampleSection
        title="Basic Usage"
        description="NavLink component"
      >
        <Paper p="md" radius="md">
          <Stack spacing={4}>
            <NavLink label="Dashboard" />
            <NavLink label="Settings" active />
            <NavLink label="Logout" />
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Usage"
        description="Minimal copy-pasteable example"
      >
        <CodeBlock
          code={`import { NavLink, Icon } from 'react-native-mantine';

<NavLink
  label="Dashboard"
  description="Overview of your account"
  icon={<Icon name="home" size={16} />}
  active
  onPress={() => navigate('Dashboard')}
/>

<NavLink label="Settings" onPress={() => navigate('Settings')}>
  <NavLink label="Profile" onPress={() => navigate('Profile')} />
</NavLink>`}
        />
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available NavLink props"
      >
        <PropsTable props={navLinkProps} />
      </ExampleSection>
    </ExampleWrapper>
  );
};
