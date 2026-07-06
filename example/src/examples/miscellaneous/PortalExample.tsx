import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import {
  portalProps,
  portalHostProps,
  portalProviderProps,
} from '../../data/props/PortalProps';
import {
  Badge,
  Button,
  Paper,
  Portal,
  PortalHost,
  PortalProvider,
  Stack,
  Switch,
  Text,
} from 'react-native-mantine';

export const PortalExample = () => {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [hostMounted, setHostMounted] = useState(false);

  return (
    <ExampleWrapper
      title="Portal"
      description="Render children into the PortalProvider overlay or a named PortalHost instead of their own position in the tree"
    >
      <ExampleSection
        title="Default Overlay"
        description="PortalProvider renders an absolute-fill overlay on top of its children. The box is declared inside the Stack but appears pinned to the corner of the bordered area"
        variant="showcase"
      >
        <View style={styles.demoArea}>
          <PortalProvider>
            <Stack spacing={12} style={styles.demoContent}>
              <Switch
                label="Show portal content"
                checked={overlayVisible}
                onChange={setOverlayVisible}
              />
              <Text size="sm" color="dimmed">
                The overlay covers the whole PortalProvider area, so the portal
                box renders above everything inside this frame.
              </Text>
              {overlayVisible && (
                <Portal>
                  <View pointerEvents="none" style={styles.portalBox}>
                    <Text size="xs" style={styles.portalBoxText}>
                      Rendered in the overlay
                    </Text>
                  </View>
                </Portal>
              )}
            </Stack>
          </PortalProvider>
        </View>
      </ExampleSection>

      <ExampleSection
        title="Named PortalHost"
        description='Portals with target="portal-example-host" render inside the matching <PortalHost name="portal-example-host" /> at its own position in the tree'
        variant="showcase"
      >
        <View style={styles.demoArea}>
          <PortalProvider>
            <Stack spacing={12} style={styles.demoContent}>
              <Button
                size="xs"
                variant="light"
                onPress={() => setHostMounted((current) => !current)}
              >
                {hostMounted ? 'Unmount portal' : 'Mount portal into host'}
              </Button>
              {hostMounted && (
                <Portal target="portal-example-host">
                  <Badge color="teal" variant="filled">
                    Teleported into the host
                  </Badge>
                </Portal>
              )}
              <Paper p="sm" radius="md" style={styles.hostArea}>
                <Stack spacing={8}>
                  <Text size="xs" color="dimmed">
                    PortalHost &quot;portal-example-host&quot;
                  </Text>
                  <PortalHost name="portal-example-host" />
                </Stack>
              </Paper>
            </Stack>
          </PortalProvider>
        </View>
      </ExampleSection>

      <ExampleSection
        title="Portal Props"
        description="Complete reference of all available Portal props"
      >
        <PropsTable props={portalProps} />
      </ExampleSection>

      <ExampleSection
        title="PortalHost Props"
        description="Named host that renders portals with a matching target"
      >
        <PropsTable props={portalHostProps} />
      </ExampleSection>

      <ExampleSection
        title="PortalProvider Props"
        description="Wrap your app with PortalProvider to enable portals, without it Portal renders children in place"
      >
        <PropsTable props={portalProviderProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import {
  Portal,
  PortalHost,
  PortalProvider,
} from 'react-native-mantine';

// Wrap your app (inside ThemeProvider)
<PortalProvider>
  <App />
</PortalProvider>

// Renders into the provider overlay on top of everything
<Portal>
  <Notification title="Teleported" />
</Portal>

// Renders into a named host somewhere else in the tree
<Portal target="bottom-bar">
  <Badge>Teleported</Badge>
</Portal>

<PortalHost name="bottom-bar" />`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};

const styles = StyleSheet.create({
  demoArea: {
    height: 240,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    overflow: 'hidden',
  },
  demoContent: {
    padding: 12,
  },
  portalBox: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: '#228be6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  portalBoxText: {
    color: '#fff',
  },
  hostArea: {
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
});
