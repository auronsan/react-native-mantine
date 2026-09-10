import { Text as RNText } from 'react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { Affix } from '../index';
import { PortalProvider, PortalHost } from '../../Portal';

describe('Affix', () => {
  it('renders children inline with default position when withinPortal is false', () => {
    render(
      <Affix withinPortal={false} testID="affix">
        <RNText>Affixed</RNText>
      </Affix>
    );

    const affix = screen.getByTestId('affix');
    expect(screen.getByText('Affixed')).toBeTruthy();
    expect(affix).toHaveStyle({
      position: 'absolute',
      zIndex: 300,
      bottom: 0,
      right: 0,
    });
  });

  it('applies custom position, zIndex and style', () => {
    render(
      <Affix
        withinPortal={false}
        position={{ top: 10, left: 20 }}
        zIndex={5}
        style={{ opacity: 0.5 }}
        testID="affix"
      >
        <RNText>Affixed</RNText>
      </Affix>
    );

    expect(screen.getByTestId('affix')).toHaveStyle({
      top: 10,
      left: 20,
      zIndex: 5,
      opacity: 0.5,
    });
  });

  it('renders in place (with a warning) when no PortalProvider is present', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <Affix testID="affix">
        <RNText>Portal-less</RNText>
      </Affix>
    );

    expect(screen.getByText('Portal-less')).toBeTruthy();
    warn.mockRestore();
  });

  it('renders into the PortalProvider overlay by default', () => {
    render(
      <PortalProvider>
        <Affix testID="affix">
          <RNText>In portal</RNText>
        </Affix>
      </PortalProvider>
    );

    expect(screen.getByText('In portal')).toBeTruthy();
    expect(screen.getByTestId('affix')).toBeTruthy();
  });

  it('renders into a named PortalHost when portalTarget is set', () => {
    render(
      <PortalProvider>
        <Affix portalTarget="custom" testID="affix">
          <RNText>Targeted</RNText>
        </Affix>
        <PortalHost name="custom" />
      </PortalProvider>
    );

    expect(screen.getByText('Targeted')).toBeTruthy();
  });
});
