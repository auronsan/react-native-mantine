const React = require('react');

const createIconSet = () => {
  const Icon = React.forwardRef((props, ref) => {
    return React.createElement('View', { testID: props.testID, style: props.style, ref });
  });
  Icon.displayName = 'Icon';
  return Icon;
};

module.exports = createIconSet();
module.exports.default = createIconSet();
