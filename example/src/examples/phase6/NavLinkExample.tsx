import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
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
    </ExampleWrapper>
  );
};
