# Props Documentation Pattern

This directory contains prop definitions for React Native Mantine components to be used in the example app.

## Structure

Each component should have its own props file that exports:
1. An array of `PropDefinition` objects
2. Named export matching the pattern `{componentName}Props`

## PropDefinition Interface

```typescript
export interface PropDefinition {
  name: string;           // Prop name as it appears in code
  type: string;          // TypeScript type (can be union types)
  description: string;   // Clear description of what the prop does
  default?: string;      // Default value if any
  required?: boolean;    // Whether the prop is required
}
```

## Example: ButtonProps.ts

```typescript
export const buttonProps: PropDefinition[] = [
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    description: 'Predefined button size that controls padding, font size, and height',
    default: "'sm'",
    required: false,
  },
  {
    name: 'variant',
    type: "'filled' | 'outline' | 'light' | 'subtle' | 'gradient'",
    description: 'Controls button appearance and visual style',
    default: "'filled'",
    required: false,
  },
  // ... more props
];
```

## How to Create Props Documentation for a New Component

### Step 1: Analyze the Component Interface

Read the component's TypeScript interface file (e.g., `/src/components/Button/index.tsx`) and identify all props from the interface.

### Step 2: Create the Props Definition File

Create a new file: `{ComponentName}Props.ts`

```typescript
import type { PropDefinition } from './ButtonProps';

export const {componentName}Props: PropDefinition[] = [
  // Add all props here
];
```

### Step 3: Document Each Prop

For each prop in the component interface:

1. **name**: Exact prop name from the interface
2. **type**: Copy the TypeScript type, simplifying complex types if needed
   - Use string representation of union types: `"'sm' | 'md' | 'lg'"`
   - For complex types, use the type name: `"MantineColor"`, `"ViewStyle"`
3. **description**: Write a clear, concise description
   - Start with a verb: "Controls...", "Sets...", "Adds...", "Indicates..."
   - Explain the purpose and effect
   - Include examples if helpful: "(e.g., 'blue', 'red', 'green')"
4. **default**: Include if the component has a default value
   - Use the exact default from `defaultProps` in the component
   - Quote string values: `"'sm'"`, `"'filled'"`
   - Use as-is for others: `"false"`, `"true"`, `"0"`
5. **required**: Set to `true` only if the prop is required (rare in Mantine)

### Step 4: Update the Component Example

In your component example file (e.g., `ButtonExample.tsx`):

```typescript
import { PropsTable } from '../../components/PropsTable';
import { buttonProps } from '../../data/props/ButtonProps';

// Inside your component's ExampleWrapper:
<ExampleSection
  title="Component Props"
  description="Complete reference of all available {ComponentName} props"
>
  <PropsTable props={buttonProps} />
</ExampleSection>
```

## Best Practices

1. **Order Props Logically**: Group related props together
   - Visual props (variant, color, size) first
   - Layout props (fullWidth, radius)
   - Content props (children, leftIcon, rightIcon)
   - State props (loading, disabled)
   - Event handlers (onPress, onChange)
   - Utility props (style, className)

2. **Type Formatting**:
   - Keep union types readable: `"'sm' | 'md' | 'lg'"` not `"string"`
   - Use interface names for complex types: `"MantineColor"` not full definition
   - For React nodes: `"React.ReactNode"`
   - For functions: Show signature: `"(value: string) => void"`

3. **Description Guidelines**:
   - Be concise but complete
   - Include usage context when helpful
   - Mention related props if applicable
   - Include examples for props that accept specific values

4. **Defaults**:
   - Always include default values when they exist
   - Match the format of the actual default in code
   - Use `theme.{property}` notation for theme-based defaults

## Example Component Integration

```typescript
// TextExample.tsx
import { View } from 'react-native';
import {
  ExampleWrapper,
  ExampleSection,
  CodeBlock,
} from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { textProps } from '../../data/props/TextProps';
import { Text } from 'react-native-mantine';

export const TextExample = () => {
  return (
    <ExampleWrapper
      title="Text"
      description="Text component with theme integration"
    >
      {/* Visual examples */}
      <ExampleSection title="Sizes">
        <Text size="xs">Extra Small</Text>
        <Text size="sm">Small</Text>
        <Text size="md">Medium</Text>
      </ExampleSection>

      {/* Props documentation */}
      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Text props"
      >
        <PropsTable props={textProps} />
      </ExampleSection>

      {/* Code example */}
      <ExampleSection title="Usage Example">
        <CodeBlock code={`import { Text } from 'react-native-mantine';

<Text size="md" color="blue" weight={600}>
  Styled text
</Text>`} />
      </ExampleSection>
    </ExampleWrapper>
  );
};
```

## Checklist for New Component Props Documentation

- [ ] Create `{ComponentName}Props.ts` file
- [ ] Export `PropDefinition` interface (or import from ButtonProps)
- [ ] Document ALL props from the component interface
- [ ] Include accurate TypeScript types
- [ ] Add clear, concise descriptions
- [ ] Include default values where applicable
- [ ] Mark required props (if any)
- [ ] Order props logically
- [ ] Import PropsTable in example component
- [ ] Import props definition in example component
- [ ] Add "Component Props" section with PropsTable
- [ ] Test the example app to ensure correct rendering
