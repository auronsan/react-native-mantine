export type RootStackParamList = {
  Home: undefined;

  // Category routes - aligned with Mantine web structure
  LayoutComponents: undefined;
  ButtonComponents: undefined;
  InputComponents: undefined;
  NavigationComponents: undefined;
  DataDisplayComponents: undefined;
  OverlayComponents: undefined;
  TypographyComponents: undefined;
  FeedbackComponents: undefined;
  MiscComponents: undefined;
  ThemingComponents: undefined;

  // Core Components
  BoxViewExample: undefined;
  GroupExample: undefined;
  StackExample: undefined;
  TextExample: undefined;
  ButtonExample: undefined;
  UnstyledButtonExample: undefined;
  ActionIconExample: undefined;
  InputExample: undefined;
  LoaderExample: undefined;
  IconExample: undefined;

  // Layout & Typography
  CenterExample: undefined;
  ContainerExample: undefined;
  FlexExample: undefined;
  SpaceExample: undefined;
  TitleExample: undefined;
  HighlightExample: undefined;
  MarkExample: undefined;
  CodeExample: undefined;

  // Feedback & Forms
  BadgeExample: undefined;
  AvatarExample: undefined;
  PaperExample: undefined;
  DividerExample: undefined;
  ProgressExample: undefined;
  SkeletonExample: undefined;
  TextInputExample: undefined;
  TextareaExample: undefined;
  PasswordInputExample: undefined;
  SwitchExample: undefined;
  CheckboxExample: undefined;
  RadioExample: undefined;
  UseFormExample: undefined;

  // Overlays & Dialogs
  OverlayExample: undefined;
  ModalExample: undefined;
  DrawerExample: undefined;
  DialogExample: undefined;
  CollapseExample: undefined;
  AccordionExample: undefined;
  SpoilerExample: undefined;
  NotificationExample: undefined;
  NumberInputExample: undefined;
  PinInputExample: undefined;
  ChipExample: undefined;
  NativeSelectExample: undefined;

  // Data Display
  RatingExample: undefined;
  StepperExample: undefined;
  SegmentedControlExample: undefined;
  PaginationExample: undefined;
  CardExample: undefined;
  TimelineExample: undefined;
  ListExample: undefined;
  TableExample: undefined;

  // Media & Utilities
  ImageExample: undefined;
  BackgroundImageExample: undefined;
  ThemeIconExample: undefined;
  ColorSwatchExample: undefined;
  TransitionExample: undefined;
  CloseButtonExample: undefined;
  CopyButtonExample: undefined;

  // Navigation & Advanced
  AnchorExample: undefined;
  KbdExample: undefined;
  IndicatorExample: undefined;
  GridExample: undefined;
  SimpleGridExample: undefined;
  AspectRatioExample: undefined;
  MediaQueryExample: undefined;
  BlockquoteExample: undefined;
  BreadcrumbsExample: undefined;
  NavLinkExample: undefined;
  LoadingOverlayExample: undefined;
  TooltipExample: undefined;
  PopoverExample: undefined;
  MenuExample: undefined;
  SelectExample: undefined;
  MultiSelectExample: undefined;
  RingProgressExample: undefined;
  TransferListExample: undefined;

  // Style System Showcase
  ShadowSystemExample: undefined;
  GradientExample: undefined;
  ColorPaletteExample: undefined;
  ColorManipulationExample: undefined;
  ResponsiveUtilitiesExample: undefined;
  PrimaryColorExample: undefined;
  VariantsExample: undefined;
  ThemeCustomizationExample: undefined;
  ColorSchemeConstantsExample: undefined;
  ThemeOverrideExample: undefined;
  CustomFontsExample: undefined;

  // Mantine v7+ sync components
  AffixExample: undefined;
  AngleSliderExample: undefined;
  AppShellExample: undefined;
  ColorInputExample: undefined;
  ColorPickerExample: undefined;
  ComboboxExample: undefined;
  DataListExample: undefined;
  EmptyStateExample: undefined;
  FieldsetExample: undefined;
  FileButtonExample: undefined;
  FileInputExample: undefined;
  FloatingIndicatorExample: undefined;
  FloatingWindowExample: undefined;
  HoverCardExample: undefined;
  InputBaseExample: undefined;
  JsonInputExample: undefined;
  MarqueeExample: undefined;
  MaskInputExample: undefined;
  MenubarExample: undefined;
  NumberFormatterExample: undefined;
  OverflowListExample: undefined;
  PillExample: undefined;
  PillsInputExample: undefined;
  PortalExample: undefined;
  RollingNumberExample: undefined;
  ScrollAreaExample: undefined;
  ScrollerExample: undefined;
  SemiCircleProgressExample: undefined;
  SplitterExample: undefined;
  TableOfContentsExample: undefined;
  TagsInputExample: undefined;
  TreeExample: undefined;
  TreeSelectExample: undefined;
  TypographyExample: undefined;
  VisuallyHiddenExample: undefined;
};

export interface ComponentCategory {
  title: string;
  description: string;
  route: keyof RootStackParamList;
  components: ComponentInfo[];
}

export interface ComponentInfo {
  name: string;
  description: string;
  route: keyof RootStackParamList;
}
