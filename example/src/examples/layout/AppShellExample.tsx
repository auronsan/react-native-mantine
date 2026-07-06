import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { appShellProps } from '../../data/props/AppShellProps';
import {
  AppShell,
  Badge,
  Stack,
  Switch,
  Text,
} from 'react-native-mantine';

export const AppShellExample = () => {
  const [navbarCollapsed, setNavbarCollapsed] = useState(false);
  const [asideCollapsed, setAsideCollapsed] = useState(true);

  return (
    <ExampleWrapper
      title="AppShell"
      description="Application layout with header, navbar, aside, footer and main sections"
    >
      <ExampleSection
        title="Basic Usage"
        description="Header, navbar, main and footer inside a fixed-height frame. Toggle the switch to collapse the navbar and remove its offset"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Switch
            label="Collapse navbar"
            checked={navbarCollapsed}
            onChange={setNavbarCollapsed}
          />
          <View style={styles.frame}>
            <AppShell
              header={{ height: 48 }}
              footer={{ height: 40 }}
              navbar={{ width: 110, collapsed: navbarCollapsed }}
              padding="md"
            >
              <AppShell.Header>
                <View style={styles.sectionInner}>
                  <Text size="sm" weight="600">
                    Header
                  </Text>
                </View>
              </AppShell.Header>
              <AppShell.Navbar>
                <Stack spacing={8} style={styles.navbarInner}>
                  <Text size="sm">Home</Text>
                  <Text size="sm">Orders</Text>
                  <Text size="sm">Settings</Text>
                </Stack>
              </AppShell.Navbar>
              <AppShell.Main>
                <Stack spacing={8}>
                  <Text size="sm" weight="600">
                    Main
                  </Text>
                  <Text size="sm" color="dimmed">
                    AppShell.Main is offset by the header, footer and navbar
                    sizes plus the configured padding.
                  </Text>
                </Stack>
              </AppShell.Main>
              <AppShell.Footer>
                <View style={styles.sectionInner}>
                  <Text size="xs" color="dimmed">
                    Footer
                  </Text>
                </View>
              </AppShell.Footer>
            </AppShell>
          </View>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="With Aside"
        description="aside={{ width, collapsed }} adds a right side section, collapsed sections are hidden and their offset is removed"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Switch
            label="Collapse aside"
            checked={asideCollapsed}
            onChange={setAsideCollapsed}
          />
          <View style={styles.frameSmall}>
            <AppShell
              header={{ height: 40 }}
              aside={{ width: 100, collapsed: asideCollapsed }}
              padding="sm"
            >
              <AppShell.Header>
                <View style={styles.sectionInner}>
                  <Text size="sm" weight="600">
                    Header
                  </Text>
                </View>
              </AppShell.Header>
              <AppShell.Main>
                <Text size="sm" color="dimmed">
                  Main content, the aside offset is applied on the right.
                </Text>
              </AppShell.Main>
              <AppShell.Aside>
                <Stack spacing={8} style={styles.navbarInner}>
                  <Text size="xs" weight="600">
                    Aside
                  </Text>
                  <Badge size="xs" variant="light">
                    Meta
                  </Badge>
                </Stack>
              </AppShell.Aside>
            </AppShell>
          </View>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available AppShell props"
      >
        <PropsTable props={appShellProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { AppShell } from 'react-native-mantine';

const [collapsed, setCollapsed] = useState(false);

<AppShell
  header={{ height: 48 }}
  footer={{ height: 40 }}
  navbar={{ width: 110, collapsed }}
  padding="md"
>
  <AppShell.Header>{/* ... */}</AppShell.Header>
  <AppShell.Navbar>{/* ... */}</AppShell.Navbar>
  <AppShell.Main>{/* ... */}</AppShell.Main>
  <AppShell.Footer>{/* ... */}</AppShell.Footer>
</AppShell>

// Sections are absolutely positioned, AppShell.Main
// receives offsets matching the configured sizes`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};

const styles = StyleSheet.create({
  frame: {
    height: 420,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    overflow: 'hidden',
  },
  frameSmall: {
    height: 260,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    overflow: 'hidden',
  },
  sectionInner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  navbarInner: {
    padding: 12,
  },
});
