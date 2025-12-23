export type RootStackParamList = {
  Home: undefined;
  BaseComponents: undefined;
  Phase1Components: undefined;
  Phase2Components: undefined;
  Phase3Components: undefined;
  Phase4Components: undefined;
  Phase5Components: undefined;
  Phase6Components: undefined;

  // Base Components
  BoxViewExample: undefined;
  GroupExample: undefined;
  StackExample: undefined;
  TextExample: undefined;
  ButtonExample: undefined;
  UnstyledButtonExample: undefined;
  ActionIconExample: undefined;
  InputExample: undefined;
  LoaderExample: undefined;

  // Phase 1 Components
  CenterExample: undefined;
  ContainerExample: undefined;
  FlexExample: undefined;
  SpaceExample: undefined;
  TitleExample: undefined;
  HighlightExample: undefined;
  MarkExample: undefined;
  CodeExample: undefined;

  // Phase 2 Components
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

  // Phase 3 Components
  OverlayExample: undefined;
  PortalExample: undefined;
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

  // Phase 4 Components
  SliderExample: undefined;
  RatingExample: undefined;
  StepperExample: undefined;
  SegmentedControlExample: undefined;
  PaginationExample: undefined;
  CardExample: undefined;
  TimelineExample: undefined;
  TableExample: undefined;
  ListExample: undefined;

  // Phase 5 Components
  ImageExample: undefined;
  BackgroundImageExample: undefined;
  ThemeIconExample: undefined;
  ColorSwatchExample: undefined;
  TransitionExample: undefined;
  CloseButtonExample: undefined;
  CopyButtonExample: undefined;
  BurgerExample: undefined;

  // Phase 6 Components
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
