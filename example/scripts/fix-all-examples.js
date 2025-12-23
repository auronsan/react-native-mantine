const fs = require('fs');
const path = require('path');

// Create a basic working template
const createBasicTemplate = (componentName, description) => {
  return `import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Stack, Text, Paper } from 'react-native-mantine';

export const ${componentName}Example = () => {
  return (
    <ExampleWrapper title="${componentName}">
      <ExampleSection
        title="Basic Usage"
        description="${description}"
      >
        <Paper padding="md" radius="md">
          <Stack spacing="sm">
            <Text style={{ fontWeight: '600' }}>
              ${componentName} Component
            </Text>
            <Text>
              This component is part of the React Native Mantine library.
            </Text>
            <Text style={{ fontStyle: 'italic', marginTop: 8 }}>
              Interactive examples coming soon!
            </Text>
          </Stack>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
`;
};

const phases = [
  {dir: 'phase1', components: ['Center', 'Container', 'Flex', 'Space', 'Title', 'Highlight', 'Mark', 'Code']},
  {dir: 'phase2', components: ['Badge', 'Avatar', 'Paper', 'Divider', 'Progress', 'Skeleton', 'TextInput', 'Textarea', 'PasswordInput', 'Switch', 'Checkbox', 'Radio']},
  {dir: 'phase3', components: ['Overlay', 'Portal', 'Modal', 'Drawer', 'Dialog', 'Collapse', 'Accordion', 'Spoiler', 'Notification', 'NumberInput', 'PinInput', 'Chip', 'NativeSelect']},
  {dir: 'phase4', components: ['Slider', 'Rating', 'Stepper', 'SegmentedControl', 'Pagination', 'Card', 'Timeline', 'Table', 'List']},
  {dir: 'phase5', components: ['Image', 'BackgroundImage', 'ThemeIcon', 'ColorSwatch', 'Transition', 'CloseButton', 'CopyButton', 'Burger']},
  {dir: 'phase6', components: ['Anchor', 'Kbd', 'Indicator', 'Grid', 'SimpleGrid', 'AspectRatio', 'MediaQuery', 'Blockquote', 'Breadcrumbs', 'NavLink', 'LoadingOverlay', 'Tooltip', 'Popover', 'Menu', 'Select', 'MultiSelect', 'RingProgress', 'TransferList']},
];

let fixed = 0;
phases.forEach((phase) => {
  const phaseDir = path.join(__dirname, '../src/examples', phase.dir);

  phase.components.forEach((componentName) => {
    const filePath = path.join(phaseDir, `${componentName}Example.tsx`);

    if (fs.existsSync(filePath)) {
      const description = `${componentName} component`;
      const content = createBasicTemplate(componentName, description);
      fs.writeFileSync(filePath, content);
      fixed++;
    }
  });
});

console.log(`Fixed ${fixed} example files!`);
