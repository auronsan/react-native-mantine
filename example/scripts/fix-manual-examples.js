const fs = require('fs');
const path = require('path');

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
  { name: 'BoxView', description: 'Basic view container with styling' },
  { name: 'Group', description: 'Horizontal layout group' },
  { name: 'Stack', description: 'Vertical layout stack' },
  { name: 'Text', description: 'Text component with theming' },
  { name: 'Button', description: 'Interactive button component' },
];

const phaseDir = path.join(__dirname, '../src/examples/base');

componentsToFix.forEach(({ name, description }) => {
  const filePath = path.join(phaseDir, `${name}Example.tsx`);
  const content = createTemplate(name, description);
  fs.writeFileSync(filePath, content);
  console.log(`Fixed: ${name}Example.tsx`);
});

console.log('Manual examples fixed!');
