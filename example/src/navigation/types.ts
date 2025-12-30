export type RootStackParamList = {
  Home: undefined;
  BaseComponents: undefined;
  Phase1Components: undefined;
  Phase2Components: undefined;
  Phase3Components: undefined;
  Phase4Components: undefined;
  Phase5Components: undefined;
  Phase6Components: undefined;
  StyleSystemComponents: undefined;

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
  TableExample: undefined;
  ListExample: undefined;

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
