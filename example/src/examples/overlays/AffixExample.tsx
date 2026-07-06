import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { affixProps } from '../../data/props/AffixProps';
import {
  Affix,
  Badge,
  Button,
  PortalProvider,
  Stack,
  Switch,
  Text,
} from 'react-native-mantine';

export const AffixExample = () => {
  const [affixVisible, setAffixVisible] = useState(true);

  return (
    <ExampleWrapper
      title="Affix"
      description="Render content at a fixed position inside the PortalProvider overlay"
    >
      <ExampleSection
        title="Basic Usage"
        description="The affix is rendered through the PortalProvider overlay and pinned to the bottom-right corner of the bordered area, toggle the switch to show or hide it"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Switch
            label="Show affix"
            checked={affixVisible}
            onChange={setAffixVisible}
          />
          <View style={styles.demoArea}>
            <PortalProvider>
              <Stack spacing={8} style={styles.demoContent}>
                <Text size="sm" weight="600">
                  Screen content
                </Text>
                <Text size="sm" color="dimmed">
                  In a real app, wrap the whole app with PortalProvider so the
                  affix is pinned to the screen, like a scroll-to-top button.
                </Text>
              </Stack>
              {affixVisible && (
                <Affix position={{ bottom: 12, right: 12 }}>
                  <Button size="xs" onPress={() => setAffixVisible(false)}>
                    Scroll to top
                  </Button>
                </Affix>
              )}
            </PortalProvider>
          </View>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Without Portal"
        description="withinPortal={false} positions the affix relative to the nearest positioned ancestor instead of the provider overlay"
        variant="showcase"
      >
        <View style={styles.demoArea}>
          <Stack spacing={8} style={styles.demoContent}>
            <Text size="sm" color="dimmed">
              This affix is absolutely positioned inside the bordered view, no
              PortalProvider required.
            </Text>
          </Stack>
          <Affix withinPortal={false} position={{ top: 12, right: 12 }}>
            <Badge color="teal" variant="filled">
              top-right
            </Badge>
          </Affix>
          <Affix withinPortal={false} position={{ bottom: 12, left: 12 }}>
            <Badge color="grape" variant="filled">
              bottom-left
            </Badge>
          </Affix>
        </View>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Affix props"
      >
        <PropsTable props={affixProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Affix, PortalProvider } from 'react-native-mantine';

// Wrap your app once to enable portal rendering
<PortalProvider>
  <App />
</PortalProvider>

// Pinned to the bottom-right corner of the screen
<Affix position={{ bottom: 20, right: 20 }}>
  <Button onPress={scrollToTop}>Scroll to top</Button>
</Affix>

// Position relative to the parent instead of the overlay
<Affix withinPortal={false} position={{ top: 12, left: 12 }}>
  <Badge>Pinned</Badge>
</Affix>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};

const styles = StyleSheet.create({
  demoArea: {
    height: 220,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    overflow: 'hidden',
  },
  demoContent: {
    padding: 12,
  },
});
