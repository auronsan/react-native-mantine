// Replacement for react-native/jest/mockComponent.js
// Fixes compatibility issue with React Native 0.81 + React 19
// where forwardRef components don't have .prototype

const React = require('react');

function mockComponent(moduleName, instanceMethods, isESModule) {
  let RealComponent;
  try {
    RealComponent = isESModule
      ? jest.requireActual(moduleName).default
      : jest.requireActual(moduleName);
  } catch (e) {
    RealComponent = null;
  }

  // Check if the component is a class component safely
  let SuperClass;
  try {
    if (
      typeof RealComponent === 'function' &&
      RealComponent.prototype &&
      RealComponent.prototype.constructor &&
      RealComponent.prototype.constructor instanceof React.Component
    ) {
      SuperClass = RealComponent;
    }
  } catch (e) {
    // ignore
  }

  const name =
    (RealComponent && (RealComponent.displayName || RealComponent.name)) ||
    (RealComponent && RealComponent.render && (RealComponent.render.displayName || RealComponent.render.name)) ||
    'Unknown';

  const nameWithoutPrefix = name.replace(/^(RCT|RK)/, '');

  if (SuperClass) {
    // Class component path - use original approach
    const Component = class extends SuperClass {
      static displayName = 'Component';
      render() {
        const props = { ...(RealComponent.defaultProps || {}) };
        if (this.props) {
          Object.keys(this.props).forEach((prop) => {
            if (this.props[prop] !== undefined) {
              props[prop] = this.props[prop];
            }
          });
        }
        return React.createElement(nameWithoutPrefix, props, this.props.children);
      }
    };

    Object.defineProperty(Component, 'name', {
      value: name,
      writable: false,
      enumerable: false,
      configurable: true,
    });

    Component.displayName = nameWithoutPrefix;

    if (RealComponent) {
      Object.keys(RealComponent).forEach((classStatic) => {
        Component[classStatic] = RealComponent[classStatic];
      });
    }

    if (instanceMethods) {
      Object.assign(Component.prototype, instanceMethods);
    }

    return Component;
  }

  // Function/forwardRef component path
  const MockComponent = React.forwardRef(function (props, ref) {
    return React.createElement(nameWithoutPrefix, { ...props, ref }, props.children);
  });
  MockComponent.displayName = nameWithoutPrefix;
  if (instanceMethods) {
    Object.assign(MockComponent, instanceMethods);
  }
  if (RealComponent) {
    try {
      Object.keys(RealComponent).forEach((key) => {
        if (!(key in MockComponent)) {
          MockComponent[key] = RealComponent[key];
        }
      });
    } catch (e) {
      // ignore
    }
  }
  return MockComponent;
}

module.exports = mockComponent;
module.exports.default = mockComponent;
