const React = require('react');
const { View } = require('react-native');

const LinearGradient = React.forwardRef((props, ref) => {
  return React.createElement(View, { ...props, ref });
});

LinearGradient.displayName = 'LinearGradient';

module.exports = { LinearGradient };
