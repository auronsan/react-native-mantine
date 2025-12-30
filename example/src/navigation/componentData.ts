import type { ComponentCategory } from './types';

/**
 * Component categories organized following Mantine web's structure.
 * Categories are ordered based on the official Mantine documentation:
 * 1. Layout - Components for page structure and positioning
 * 2. Buttons - Button components and variations
 * 3. Inputs - Form inputs and controls
 * 4. Navigation - Navigation components and links
 * 5. Data display - Components for presenting data
 * 6. Overlays - Modals, popovers, and overlay components
 * 7. Typography - Text formatting components
 * 8. Feedback - Loading states and user feedback
 * 9. Miscellaneous - Utility components
 * 10. Theming - Style system and theming utilities
 */
export const componentCategories: ComponentCategory[] = [
  {
    title: 'Layout',
    description: 'Components for page structure and positioning',
    route: 'LayoutComponents',
    components: [
      { name: 'AspectRatio', description: 'Maintain fixed aspect ratio', route: 'AspectRatioExample' },
      { name: 'BoxView', description: 'Flexible view container with styling props', route: 'BoxViewExample' },
      { name: 'Center', description: 'Center content both horizontally and vertically', route: 'CenterExample' },
      { name: 'Container', description: 'Responsive container with max-width constraints', route: 'ContainerExample' },
      { name: 'Flex', description: 'Flexible box layout with full control', route: 'FlexExample' },
      { name: 'Grid', description: 'Flexible grid layout', route: 'GridExample' },
      { name: 'Group', description: 'Horizontal layout with spacing control', route: 'GroupExample' },
      { name: 'MediaQuery', description: 'Responsive visibility control', route: 'MediaQueryExample' },
      { name: 'SimpleGrid', description: 'Auto-responsive grid layout', route: 'SimpleGridExample' },
      { name: 'Space', description: 'Add consistent spacing between elements', route: 'SpaceExample' },
      { name: 'Stack', description: 'Vertical layout with spacing control', route: 'StackExample' },
    ],
  },
  {
    title: 'Buttons',
    description: 'Button components and variations',
    route: 'ButtonComponents',
    components: [
      { name: 'ActionIcon', description: 'Compact icon button for actions', route: 'ActionIconExample' },
      { name: 'Button', description: 'Full-featured interactive button', route: 'ButtonExample' },
      { name: 'CloseButton', description: 'Universal close button', route: 'CloseButtonExample' },
      { name: 'CopyButton', description: 'Copy text to clipboard', route: 'CopyButtonExample' },
      { name: 'UnstyledButton', description: 'Accessible button without default styles', route: 'UnstyledButtonExample' },
    ],
  },
  {
    title: 'Inputs',
    description: 'Form inputs and controls',
    route: 'InputComponents',
    components: [
      { name: 'Checkbox', description: 'Checkbox with indeterminate state', route: 'CheckboxExample' },
      { name: 'Chip', description: 'Selectable tag with checkmark', route: 'ChipExample' },
      { name: 'Input', description: 'Versatile text input field', route: 'InputExample' },
      { name: 'MultiSelect', description: 'Multi-option select with tags', route: 'MultiSelectExample' },
      { name: 'NativeSelect', description: 'Platform-native dropdown select', route: 'NativeSelectExample' },
      { name: 'NumberInput', description: 'Numeric input with increment controls', route: 'NumberInputExample' },
      { name: 'PasswordInput', description: 'Secure password input with visibility toggle', route: 'PasswordInputExample' },
      { name: 'PinInput', description: 'PIN or OTP input with auto-focus', route: 'PinInputExample' },
      { name: 'Radio', description: 'Radio button for exclusive selections', route: 'RadioExample' },
      { name: 'Rating', description: 'Interactive star rating', route: 'RatingExample' },
      { name: 'SegmentedControl', description: 'Segmented button group selector', route: 'SegmentedControlExample' },
      { name: 'Select', description: 'Searchable select dropdown', route: 'SelectExample' },
      { name: 'Switch', description: 'Toggle switch with labels', route: 'SwitchExample' },
      { name: 'TextInput', description: 'Single-line text input with validation', route: 'TextInputExample' },
      { name: 'Textarea', description: 'Multi-line text input with auto-resize', route: 'TextareaExample' },
      { name: 'TransferList', description: 'Dual-list selection transfer', route: 'TransferListExample' },
      { name: 'useForm', description: 'Form state management hook with validation', route: 'UseFormExample' },
    ],
  },
  {
    title: 'Navigation',
    description: 'Navigation components and links',
    route: 'NavigationComponents',
    components: [
      { name: 'Anchor', description: 'Styled link component', route: 'AnchorExample' },
      { name: 'Breadcrumbs', description: 'Navigation breadcrumb trail', route: 'BreadcrumbsExample' },
      { name: 'NavLink', description: 'Navigation link with active state', route: 'NavLinkExample' },
      { name: 'Pagination', description: 'Page navigation with controls', route: 'PaginationExample' },
      { name: 'Stepper', description: 'Multi-step form navigation', route: 'StepperExample' },
    ],
  },
  {
    title: 'Data display',
    description: 'Components for presenting data',
    route: 'DataDisplayComponents',
    components: [
      { name: 'Accordion', description: 'Expandable accordion panels', route: 'AccordionExample' },
      { name: 'Avatar', description: 'User avatar with fallback support', route: 'AvatarExample' },
      { name: 'BackgroundImage', description: 'Container with background image', route: 'BackgroundImageExample' },
      { name: 'Badge', description: 'Status badge with color variants', route: 'BadgeExample' },
      { name: 'Card', description: 'Content card with sections', route: 'CardExample' },
      { name: 'ColorSwatch', description: 'Color preview swatch', route: 'ColorSwatchExample' },
      { name: 'Image', description: 'Responsive image with placeholder', route: 'ImageExample' },
      { name: 'Indicator', description: 'Notification dot indicator', route: 'IndicatorExample' },
      { name: 'Kbd', description: 'Keyboard shortcut display', route: 'KbdExample' },
      { name: 'Spoiler', description: 'Content reveal with show more/less', route: 'SpoilerExample' },
      { name: 'ThemeIcon', description: 'Icon with themed background', route: 'ThemeIconExample' },
      { name: 'Timeline', description: 'Vertical timeline with items', route: 'TimelineExample' },
    ],
  },
  {
    title: 'Overlays',
    description: 'Modals, popovers, and overlay components',
    route: 'OverlayComponents',
    components: [
      { name: 'Dialog', description: 'Lightweight floating dialog', route: 'DialogExample' },
      { name: 'Drawer', description: 'Side panel with slide animation', route: 'DrawerExample' },
      { name: 'LoadingOverlay', description: 'Full-screen loading state', route: 'LoadingOverlayExample' },
      { name: 'Menu', description: 'Dropdown menu with items', route: 'MenuExample' },
      { name: 'Modal', description: 'Full-featured modal dialog', route: 'ModalExample' },
      { name: 'Overlay', description: 'Customizable overlay backdrop', route: 'OverlayExample' },
      { name: 'Popover', description: 'Rich content popover', route: 'PopoverExample' },
      { name: 'Tooltip', description: 'Contextual tooltip popup', route: 'TooltipExample' },
    ],
  },
  {
    title: 'Typography',
    description: 'Text formatting and display components',
    route: 'TypographyComponents',
    components: [
      { name: 'Blockquote', description: 'Styled quotation block', route: 'BlockquoteExample' },
      { name: 'Code', description: 'Inline code with monospace styling', route: 'CodeExample' },
      { name: 'Highlight', description: 'Highlight specific text portions', route: 'HighlightExample' },
      { name: 'List', description: 'Ordered and unordered lists', route: 'ListExample' },
      { name: 'Mark', description: 'Marked/highlighted inline text', route: 'MarkExample' },
      { name: 'Table', description: 'Styled data table', route: 'TableExample' },
      { name: 'Text', description: 'Typography component with theme support', route: 'TextExample' },
      { name: 'Title', description: 'Semantic heading with size variants', route: 'TitleExample' },
    ],
  },
  {
    title: 'Feedback',
    description: 'Loading states and user feedback',
    route: 'FeedbackComponents',
    components: [
      { name: 'Loader', description: 'Animated loading indicator', route: 'LoaderExample' },
      { name: 'Notification', description: 'Styled notification message', route: 'NotificationExample' },
      { name: 'Progress', description: 'Progress bar with animations', route: 'ProgressExample' },
      { name: 'RingProgress', description: 'Circular progress indicator', route: 'RingProgressExample' },
      { name: 'Skeleton', description: 'Loading placeholder with pulse animation', route: 'SkeletonExample' },
    ],
  },
  {
    title: 'Miscellaneous',
    description: 'Utility and helper components',
    route: 'MiscComponents',
    components: [
      { name: 'Collapse', description: 'Smooth collapsible content', route: 'CollapseExample' },
      { name: 'Divider', description: 'Visual separator with label support', route: 'DividerExample' },
      { name: 'Icon', description: 'FontAwesome icon component', route: 'IconExample' },
      { name: 'Paper', description: 'Container with shadow and border radius', route: 'PaperExample' },
      { name: 'Transition', description: 'Animated mount/unmount transitions', route: 'TransitionExample' },
    ],
  },
  {
    title: 'Theming',
    description: 'Theme system, colors, and styling utilities',
    route: 'ThemingComponents',
    components: [
      { name: 'Color Manipulation', description: 'Theme functions: lighten, darken, dimmed', route: 'ColorManipulationExample' },
      { name: 'Color Palette', description: 'Complete color system aligned with Mantine web', route: 'ColorPaletteExample' },
      { name: 'Component Variants', description: 'Guide to all 8 built-in component variants', route: 'VariantsExample' },
      { name: 'Gradients', description: 'Gradient support for buttons and backgrounds', route: 'GradientExample' },
      { name: 'Primary Color System', description: 'primaryColor and primaryShade configuration', route: 'PrimaryColorExample' },
      { name: 'Responsive Utilities', description: 'Breakpoint utilities: largerThan and smallerThan', route: 'ResponsiveUtilitiesExample' },
      { name: 'Shadow System', description: 'Shadow sizes aligned with Mantine web (xs, sm, md, lg, xl)', route: 'ShadowSystemExample' },
      { name: 'Theme Customization', description: 'Customize colors, typography, and spacing', route: 'ThemeCustomizationExample' },
    ],
  },
];
