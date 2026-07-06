// Jest setup file
// Expo module mocks are handled via moduleNameMapper in package.json

// react-native 0.81 ships a broken jest mock for Modal (its class extends a
// non-constructor), replace it with a simple function component that renders
// children when visible.
jest.mock('react-native/Libraries/Modal/Modal', () => {
  const React = require('react');
  const Modal = (props) => {
    if (props.visible === false) {
      return null;
    }
    return React.createElement('Modal', props, props.children);
  };
  Modal.displayName = 'Modal';
  return { __esModule: true, default: Modal };
});

// Same problem for ScrollView: RN's jest mock does
// `class ScrollViewMock extends mockComponent(...)`, but mockComponent returns
// a forwardRef object, which cannot be extended.
jest.mock('react-native/Libraries/Components/ScrollView/ScrollView', () => {
  const React = require('react');
  const ScrollView = React.forwardRef((props, ref) => {
    React.useImperativeHandle(ref, () => ({
      scrollTo: jest.fn(),
      scrollToEnd: jest.fn(),
      flashScrollIndicators: jest.fn(),
      getScrollResponder: jest.fn(),
      getScrollableNode: jest.fn(),
      getInnerViewNode: jest.fn(),
      getInnerViewRef: jest.fn(),
      getNativeScrollRef: jest.fn(),
    }));
    return React.createElement(
      'ScrollView',
      props,
      props.refreshControl,
      React.createElement(require('react-native').View, null, props.children)
    );
  });
  ScrollView.displayName = 'ScrollView';
  return { __esModule: true, default: ScrollView };
});
