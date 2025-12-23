const fs = require('fs');
const path = require('path');

const componentsByPhase = {
  base: [
    { name: 'UnstyledButton', description: 'Button without default styles' },
    { name: 'ActionIcon', description: 'Icon button component' },
    { name: 'Input', description: 'Basic input field' },
    { name: 'Loader', description: 'Loading spinner' },
  ],
  phase1: [
    { name: 'Center', description: 'Center children horizontally and vertically' },
    { name: 'Container', description: 'Constrained width container' },
    { name: 'Flex', description: 'Flexible box layout' },
    { name: 'Space', description: 'Add spacing between elements' },
    { name: 'Title', description: 'Heading text component' },
    { name: 'Highlight', description: 'Highlight text portions' },
    { name: 'Mark', description: 'Mark/highlight inline text' },
    { name: 'Code', description: 'Inline code text' },
  ],
  phase2: [
    { name: 'Badge', description: 'Small status badge' },
    { name: 'Avatar', description: 'User avatar component' },
    { name: 'Paper', description: 'Paper background container' },
    { name: 'Divider', description: 'Visual divider line' },
    { name: 'Progress', description: 'Progress bar indicator' },
    { name: 'Skeleton', description: 'Loading skeleton placeholder' },
    { name: 'TextInput', description: 'Text input field' },
    { name: 'Textarea', description: 'Multi-line text input' },
    { name: 'PasswordInput', description: 'Password input field' },
    { name: 'Switch', description: 'Toggle switch control' },
    { name: 'Checkbox', description: 'Checkbox control' },
    { name: 'Radio', description: 'Radio button control' },
  ],
  phase3: [
    { name: 'Overlay', description: 'Overlay background layer' },
    { name: 'Portal', description: 'Render component in portal' },
    { name: 'Modal', description: 'Modal dialog' },
    { name: 'Drawer', description: 'Side drawer panel' },
    { name: 'Dialog', description: 'Simple dialog component' },
    { name: 'Collapse', description: 'Collapsible content' },
    { name: 'Accordion', description: 'Accordion/expandable list' },
    { name: 'Spoiler', description: 'Expandable spoiler content' },
    { name: 'Notification', description: 'Notification message' },
    { name: 'NumberInput', description: 'Number input with controls' },
    { name: 'PinInput', description: 'PIN/OTP input field' },
    { name: 'Chip', description: 'Selectable chip component' },
    { name: 'NativeSelect', description: 'Native dropdown select' },
  ],
  phase4: [
    { name: 'Slider', description: 'Slider control' },
    { name: 'Rating', description: 'Star rating component' },
    { name: 'Stepper', description: 'Step-by-step navigation' },
    { name: 'SegmentedControl', description: 'Segmented button group' },
    { name: 'Pagination', description: 'Page navigation' },
    { name: 'Card', description: 'Card container' },
    { name: 'Timeline', description: 'Timeline display' },
    { name: 'Table', description: 'Data table' },
    { name: 'List', description: 'Styled list component' },
  ],
  phase5: [
    { name: 'Image', description: 'Image component' },
    { name: 'BackgroundImage', description: 'Background image container' },
    { name: 'ThemeIcon', description: 'Themed icon container' },
    { name: 'ColorSwatch', description: 'Color swatch display' },
    { name: 'Transition', description: 'Animated transitions' },
    { name: 'CloseButton', description: 'Close button' },
    { name: 'CopyButton', description: 'Copy to clipboard button' },
    { name: 'Burger', description: 'Hamburger menu button' },
  ],
  phase6: [
    { name: 'Anchor', description: 'Link/anchor component' },
    { name: 'Kbd', description: 'Keyboard key display' },
    { name: 'Indicator', description: 'Notification indicator' },
    { name: 'Grid', description: 'CSS Grid layout' },
    { name: 'SimpleGrid', description: 'Simple responsive grid' },
    { name: 'AspectRatio', description: 'Fixed aspect ratio container' },
    { name: 'MediaQuery', description: 'Responsive media query' },
    { name: 'Blockquote', description: 'Blockquote text' },
    { name: 'Breadcrumbs', description: 'Breadcrumb navigation' },
    { name: 'NavLink', description: 'Navigation link' },
    { name: 'LoadingOverlay', description: 'Loading overlay' },
    { name: 'Tooltip', description: 'Tooltip popup' },
    { name: 'Popover', description: 'Popover dropdown' },
    { name: 'Menu', description: 'Dropdown menu' },
    { name: 'Select', description: 'Custom select dropdown' },
    { name: 'MultiSelect', description: 'Multi-select dropdown' },
    { name: 'RingProgress', description: 'Ring progress indicator' },
    { name: 'TransferList', description: 'Transfer list component' },
  ],
};

const generateExampleFile = (componentName, description, phase) => {
  return `import React from 'react';
import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { ${componentName}, Stack, Text } from 'react-native-mantine';

export const ${componentName}Example = () => {
  return (
    <ExampleWrapper title="${componentName}">
      <ExampleSection
        title="Basic ${componentName}"
        description="${description}"
      >
        <Stack spacing="md">
          <${componentName}>
            {/* Add ${componentName} content here */}
            <Text>${componentName} content</Text>
          </${componentName}>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Variants"
        description="Different ${componentName} variants"
      >
        <Stack spacing="md">
          <Text>Add variant examples here</Text>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Sizes"
        description="Different ${componentName} sizes"
      >
        <Stack spacing="md">
          <Text>Add size examples here</Text>
        </Stack>
      </ExampleSection>
    </ExampleWrapper>
  );
};
`;
};

// Create example files
Object.entries(componentsByPhase).forEach(([phase, components]) => {
  const dirPath = path.join(__dirname, '../src/examples', phase);

  // Create directory if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  components.forEach(({ name, description }) => {
    const filePath = path.join(dirPath, `${name}Example.tsx`);

    // Only create if it doesn't exist
    if (!fs.existsSync(filePath)) {
      const content = generateExampleFile(name, description, phase);
      fs.writeFileSync(filePath, content);
      console.log(`Created: ${filePath}`);
    } else {
      console.log(`Skipped (exists): ${filePath}`);
    }
  });
});

console.log('Example generation complete!');
