const fs = require('fs');
const path = require('path');

// Simple template without complex spacing
const createTemplate = (componentName, description) => {
  return `import { View } from 'react-native';
import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Text, Paper } from 'react-native-mantine';

export const ${componentName}Example = () => {
  return (
    <ExampleWrapper title="${componentName}">
      <ExampleSection
        title="Basic Usage"
        description="${description}"
      >
        <Paper p="md" radius="md">
          <View style={{ gap: 12 }}>
            <Text style={{ fontWeight: '600', fontSize: 16 }}>
              ${componentName} Component
            </Text>
            <Text>
              This component is part of the React Native Mantine library.
            </Text>
            <Text style={{ fontStyle: 'italic', marginTop: 8 }}>
              Interactive examples coming soon!
            </Text>
          </View>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
`;
};

const componentsToFix = [
  {dir: 'base', components: ['UnstyledButton', 'ActionIcon', 'Input', 'Loader']},
  {dir: 'phase1', components: ['Center', 'Container', 'Flex', 'Space', 'Title', 'Highlight', 'Mark', 'Code']},
  {dir: 'phase2', components: ['Badge', 'Avatar', 'Paper', 'Divider', 'Progress', 'Skeleton', 'TextInput', 'Textarea', 'PasswordInput', 'Switch', 'Checkbox', 'Radio']},
  {dir: 'phase3', components: ['Overlay', 'Portal', 'Modal', 'Drawer', 'Dialog', 'Collapse', 'Accordion', 'Spoiler', 'Notification', 'NumberInput', 'PinInput', 'Chip', 'NativeSelect']},
  {dir: 'phase4', components: ['Slider', 'Rating', 'Stepper', 'SegmentedControl', 'Pagination', 'Card', 'Timeline', 'Table', 'List']},
  {dir: 'phase5', components: ['Image', 'BackgroundImage', 'ThemeIcon', 'ColorSwatch', 'Transition', 'CloseButton', 'CopyButton', 'Burger']},
  {dir: 'phase6', components: ['Anchor', 'Kbd', 'Indicator', 'Grid', 'SimpleGrid', 'AspectRatio', 'MediaQuery', 'Blockquote', 'Breadcrumbs', 'NavLink', 'LoadingOverlay', 'Tooltip', 'Popover', 'Menu', 'Select', 'MultiSelect', 'RingProgress', 'TransferList']},
];

let fixed = 0;
componentsToFix.forEach((phase) => {
  const phaseDir = path.join(__dirname, '../src/examples', phase.dir);

  phase.components.forEach((componentName) => {
    const filePath = path.join(phaseDir, `${componentName}Example.tsx`);

    if (fs.existsSync(filePath)) {
      const description = `${componentName} component`;
      const content = createTemplate(componentName, description);
      fs.writeFileSync(filePath, content);
      fixed++;
    }
  });
});

console.log(`Created simple templates for ${fixed} examples!`);
