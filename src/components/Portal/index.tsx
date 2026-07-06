import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { StyleSheet, View } from 'react-native';

export const DEFAULT_PORTAL_HOST = 'default';

type PortalRegistry = Record<string, Record<string, React.ReactNode>>;

interface PortalActionsContextValue {
  mount: (host: string, key: string, children: React.ReactNode) => void;
  unmount: (host: string, key: string) => void;
}

const PortalActionsContext = createContext<PortalActionsContextValue | null>(
  null
);
const PortalRegistryContext = createContext<PortalRegistry>({});

let portalKeyCounter = 0;
let warnedAboutMissingProvider = false;

export interface PortalProviderProps {
  children: React.ReactNode;
}

/**
 * PortalProvider enables the Portal component. Wrap your app with it (inside
 * ThemeProvider). Portals without an explicit target render into an
 * absolute-fill overlay on top of the provider children.
 */
export function PortalProvider({ children }: PortalProviderProps) {
  const [registry, setRegistry] = useState<PortalRegistry>({});

  const actionsRef = useRef<PortalActionsContextValue>({
    mount: (host, key, node) => {
      setRegistry((current) => ({
        ...current,
        [host]: { ...current[host], [key]: node },
      }));
    },
    unmount: (host, key) => {
      setRegistry((current) => {
        if (!current[host]) {
          return current;
        }
        const nextHost = { ...current[host] };
        delete nextHost[key];
        return { ...current, [host]: nextHost };
      });
    },
  });

  return (
    <PortalActionsContext.Provider value={actionsRef.current}>
      <PortalRegistryContext.Provider value={registry}>
        {children}
        <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
          <PortalHost name={DEFAULT_PORTAL_HOST} />
        </View>
      </PortalRegistryContext.Provider>
    </PortalActionsContext.Provider>
  );
}

export interface PortalHostProps {
  /** Host name, portals with a matching target render here */
  name: string;
}

/**
 * PortalHost renders portals that target the given host name at its own
 * position in the tree.
 */
export function PortalHost({ name }: PortalHostProps) {
  const registry = useContext(PortalRegistryContext);
  const hostPortals = registry[name];

  if (!hostPortals) {
    return null;
  }

  return (
    <>
      {Object.entries(hostPortals).map(([key, node]) => (
        <React.Fragment key={key}>{node}</React.Fragment>
      ))}
    </>
  );
}

export interface PortalProps {
  /** Content rendered inside the portal host */
  children: React.ReactNode;

  /** Name of the PortalHost to render into, defaults to the provider overlay */
  target?: string;
}

/**
 * Portal renders its children into the nearest PortalProvider overlay (or a
 * named PortalHost) instead of its own position in the tree. Adaptation of
 * Mantine Portal for React Native. Renders children in place when no
 * PortalProvider is found.
 */
export function Portal({ children, target = DEFAULT_PORTAL_HOST }: PortalProps) {
  const actions = useContext(PortalActionsContext);
  const keyRef = useRef<string | null>(null);
  if (keyRef.current === null) {
    portalKeyCounter += 1;
    keyRef.current = `portal-${portalKeyCounter}`;
  }
  const key = keyRef.current;

  useEffect(() => {
    if (!actions) {
      return undefined;
    }

    actions.mount(target, key, children);
    return () => actions.unmount(target, key);
  }, [actions, target, key, children]);

  if (!actions) {
    if (!warnedAboutMissingProvider) {
      warnedAboutMissingProvider = true;
      console.warn(
        'Portal: no PortalProvider found, rendering children in place. Wrap your app with PortalProvider to enable portals.'
      );
    }
    return <>{children}</>;
  }

  return null;
}

Portal.displayName = 'Portal';
PortalHost.displayName = 'PortalHost';
PortalProvider.displayName = 'PortalProvider';
