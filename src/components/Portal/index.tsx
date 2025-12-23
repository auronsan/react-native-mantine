import React, { createContext, useContext, useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';

interface PortalContextValue {
  mount: (child: React.ReactNode) => number;
  unmount: (key: number) => void;
}

const PortalContext = createContext<PortalContextValue | null>(null);

export interface PortalProviderProps {
  children: React.ReactNode;
}

export const PortalProvider: React.FC<PortalProviderProps> = ({ children }) => {
  const [portals, setPortals] = useState<Map<number, React.ReactNode>>(new Map());
  const nextKey = React.useRef(0);

  const mount = useCallback((child: React.ReactNode) => {
    const key = nextKey.current++;
    setPortals((prev) => {
      const next = new Map(prev);
      next.set(key, child);
      return next;
    });
    return key;
  }, []);

  const unmount = useCallback((key: number) => {
    setPortals((prev) => {
      const next = new Map(prev);
      next.delete(key);
      return next;
    });
  }, []);

  return (
    <PortalContext.Provider value={{ mount, unmount }}>
      {children}
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        {Array.from(portals.entries()).map(([key, child]) => (
          <React.Fragment key={key}>{child}</React.Fragment>
        ))}
      </View>
    </PortalContext.Provider>
  );
};

export interface PortalProps {
  children: React.ReactNode;
}

export const Portal: React.FC<PortalProps> = ({ children }) => {
  const context = useContext(PortalContext);
  const [, setKey] = useState<number | null>(null);

  React.useEffect(() => {
    if (!context) {
      console.warn('Portal used without PortalProvider');
      return;
    }

    const portalKey = context.mount(children);
    setKey(portalKey);

    return () => {
      context.unmount(portalKey);
    };
  }, [children, context]);

  return null;
};

Portal.displayName = 'Portal';
PortalProvider.displayName = 'PortalProvider';
