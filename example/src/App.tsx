import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Theme } from 'react-native-mantine';
import type { RootStackParamList } from './navigation/types';
import { HomeScreen } from './screens/HomeScreen';
import { CategoryScreen } from './screens/CategoryScreen';
import { componentCategories } from './navigation/componentData';

// Import all example screens
import * as Examples from './examples';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Theme forceMode="light">
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#228be6',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Mantine Components' }}
          />

          {/* Category Screens - Aligned with Mantine web structure */}
          <Stack.Screen
            name="LayoutComponents"
            options={{ title: 'Layout' }}
          >
            {(props) => (
              <CategoryScreen {...props} category={componentCategories[0]!} />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="ButtonComponents"
            options={{ title: 'Buttons' }}
          >
            {(props) => (
              <CategoryScreen {...props} category={componentCategories[1]!} />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="InputComponents"
            options={{ title: 'Inputs' }}
          >
            {(props) => (
              <CategoryScreen {...props} category={componentCategories[2]!} />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="NavigationComponents"
            options={{ title: 'Navigation' }}
          >
            {(props) => (
              <CategoryScreen {...props} category={componentCategories[3]!} />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="DataDisplayComponents"
            options={{ title: 'Data display' }}
          >
            {(props) => (
              <CategoryScreen {...props} category={componentCategories[4]!} />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="OverlayComponents"
            options={{ title: 'Overlays' }}
          >
            {(props) => (
              <CategoryScreen {...props} category={componentCategories[5]!} />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="TypographyComponents"
            options={{ title: 'Typography' }}
          >
            {(props) => (
              <CategoryScreen {...props} category={componentCategories[6]!} />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="FeedbackComponents"
            options={{ title: 'Feedback' }}
          >
            {(props) => (
              <CategoryScreen {...props} category={componentCategories[7]!} />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="MiscComponents"
            options={{ title: 'Miscellaneous' }}
          >
            {(props) => (
              <CategoryScreen {...props} category={componentCategories[8]!} />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="ThemingComponents"
            options={{ title: 'Theming' }}
          >
            {(props) => (
              <CategoryScreen {...props} category={componentCategories[9]!} />
            )}
          </Stack.Screen>

          {/* Core Component Examples */}
          <Stack.Screen
            name="BoxViewExample"
            component={Examples.BoxViewExample}
            options={{ title: 'BoxView' }}
          />
          <Stack.Screen
            name="GroupExample"
            component={Examples.GroupExample}
            options={{ title: 'Group' }}
          />
          <Stack.Screen
            name="StackExample"
            component={Examples.StackExample}
            options={{ title: 'Stack' }}
          />
          <Stack.Screen
            name="TextExample"
            component={Examples.TextExample}
            options={{ title: 'Text' }}
          />
          <Stack.Screen
            name="ButtonExample"
            component={Examples.ButtonExample}
            options={{ title: 'Button' }}
          />
          <Stack.Screen
            name="UnstyledButtonExample"
            component={Examples.UnstyledButtonExample}
            options={{ title: 'UnstyledButton' }}
          />
          <Stack.Screen
            name="ActionIconExample"
            component={Examples.ActionIconExample}
            options={{ title: 'ActionIcon' }}
          />
          <Stack.Screen
            name="InputExample"
            component={Examples.InputExample}
            options={{ title: 'Input' }}
          />
          <Stack.Screen
            name="LoaderExample"
            component={Examples.LoaderExample}
            options={{ title: 'Loader' }}
          />
          <Stack.Screen
            name="IconExample"
            component={Examples.IconExample}
            options={{ title: 'Icon' }}
          />

          {/* Layout & Typography Examples */}
          <Stack.Screen
            name="CenterExample"
            component={Examples.CenterExample}
            options={{ title: 'Center' }}
          />
          <Stack.Screen
            name="ContainerExample"
            component={Examples.ContainerExample}
            options={{ title: 'Container' }}
          />
          <Stack.Screen
            name="FlexExample"
            component={Examples.FlexExample}
            options={{ title: 'Flex' }}
          />
          <Stack.Screen
            name="SpaceExample"
            component={Examples.SpaceExample}
            options={{ title: 'Space' }}
          />
          <Stack.Screen
            name="TitleExample"
            component={Examples.TitleExample}
            options={{ title: 'Title' }}
          />
          <Stack.Screen
            name="HighlightExample"
            component={Examples.HighlightExample}
            options={{ title: 'Highlight' }}
          />
          <Stack.Screen
            name="MarkExample"
            component={Examples.MarkExample}
            options={{ title: 'Mark' }}
          />
          <Stack.Screen
            name="CodeExample"
            component={Examples.CodeExample}
            options={{ title: 'Code' }}
          />

          {/* Feedback & Forms Examples */}
          <Stack.Screen
            name="BadgeExample"
            component={Examples.BadgeExample}
            options={{ title: 'Badge' }}
          />
          <Stack.Screen
            name="AvatarExample"
            component={Examples.AvatarExample}
            options={{ title: 'Avatar' }}
          />
          <Stack.Screen
            name="PaperExample"
            component={Examples.PaperExample}
            options={{ title: 'Paper' }}
          />
          <Stack.Screen
            name="DividerExample"
            component={Examples.DividerExample}
            options={{ title: 'Divider' }}
          />
          <Stack.Screen
            name="ProgressExample"
            component={Examples.ProgressExample}
            options={{ title: 'Progress' }}
          />
          <Stack.Screen
            name="SkeletonExample"
            component={Examples.SkeletonExample}
            options={{ title: 'Skeleton' }}
          />
          <Stack.Screen
            name="TextInputExample"
            component={Examples.TextInputExample}
            options={{ title: 'TextInput' }}
          />
          <Stack.Screen
            name="TextareaExample"
            component={Examples.TextareaExample}
            options={{ title: 'Textarea' }}
          />
          <Stack.Screen
            name="PasswordInputExample"
            component={Examples.PasswordInputExample}
            options={{ title: 'PasswordInput' }}
          />
          <Stack.Screen
            name="SwitchExample"
            component={Examples.SwitchExample}
            options={{ title: 'Switch' }}
          />
          <Stack.Screen
            name="CheckboxExample"
            component={Examples.CheckboxExample}
            options={{ title: 'Checkbox' }}
          />
          <Stack.Screen
            name="RadioExample"
            component={Examples.RadioExample}
            options={{ title: 'Radio' }}
          />
          <Stack.Screen
            name="UseFormExample"
            component={Examples.UseFormExample}
            options={{ title: 'useForm Hook' }}
          />

          {/* Overlays & Dialogs Examples */}
          <Stack.Screen
            name="OverlayExample"
            component={Examples.OverlayExample}
            options={{ title: 'Overlay' }}
          />
          <Stack.Screen
            name="ModalExample"
            component={Examples.ModalExample}
            options={{ title: 'Modal' }}
          />
          <Stack.Screen
            name="DrawerExample"
            component={Examples.DrawerExample}
            options={{ title: 'Drawer' }}
          />
          <Stack.Screen
            name="DialogExample"
            component={Examples.DialogExample}
            options={{ title: 'Dialog' }}
          />
          <Stack.Screen
            name="CollapseExample"
            component={Examples.CollapseExample}
            options={{ title: 'Collapse' }}
          />
          <Stack.Screen
            name="AccordionExample"
            component={Examples.AccordionExample}
            options={{ title: 'Accordion' }}
          />
          <Stack.Screen
            name="SpoilerExample"
            component={Examples.SpoilerExample}
            options={{ title: 'Spoiler' }}
          />
          <Stack.Screen
            name="NotificationExample"
            component={Examples.NotificationExample}
            options={{ title: 'Notification' }}
          />
          <Stack.Screen
            name="NumberInputExample"
            component={Examples.NumberInputExample}
            options={{ title: 'NumberInput' }}
          />
          <Stack.Screen
            name="PinInputExample"
            component={Examples.PinInputExample}
            options={{ title: 'PinInput' }}
          />
          <Stack.Screen
            name="ChipExample"
            component={Examples.ChipExample}
            options={{ title: 'Chip' }}
          />
          <Stack.Screen
            name="NativeSelectExample"
            component={Examples.NativeSelectExample}
            options={{ title: 'NativeSelect' }}
          />

          {/* Data Display Examples */}
          <Stack.Screen
            name="RatingExample"
            component={Examples.RatingExample}
            options={{ title: 'Rating' }}
          />
          <Stack.Screen
            name="StepperExample"
            component={Examples.StepperExample}
            options={{ title: 'Stepper' }}
          />
          <Stack.Screen
            name="SegmentedControlExample"
            component={Examples.SegmentedControlExample}
            options={{ title: 'SegmentedControl' }}
          />
          <Stack.Screen
            name="PaginationExample"
            component={Examples.PaginationExample}
            options={{ title: 'Pagination' }}
          />
          <Stack.Screen
            name="CardExample"
            component={Examples.CardExample}
            options={{ title: 'Card' }}
          />
          <Stack.Screen
            name="TimelineExample"
            component={Examples.TimelineExample}
            options={{ title: 'Timeline' }}
          />
          <Stack.Screen
            name="TableExample"
            component={Examples.TableExample}
            options={{ title: 'Table' }}
          />
          <Stack.Screen
            name="ListExample"
            component={Examples.ListExample}
            options={{ title: 'List' }}
          />

          {/* Media & Utilities Examples */}
          <Stack.Screen
            name="ImageExample"
            component={Examples.ImageExample}
            options={{ title: 'Image' }}
          />
          <Stack.Screen
            name="BackgroundImageExample"
            component={Examples.BackgroundImageExample}
            options={{ title: 'BackgroundImage' }}
          />
          <Stack.Screen
            name="ThemeIconExample"
            component={Examples.ThemeIconExample}
            options={{ title: 'ThemeIcon' }}
          />
          <Stack.Screen
            name="ColorSwatchExample"
            component={Examples.ColorSwatchExample}
            options={{ title: 'ColorSwatch' }}
          />
          <Stack.Screen
            name="TransitionExample"
            component={Examples.TransitionExample}
            options={{ title: 'Transition' }}
          />
          <Stack.Screen
            name="CloseButtonExample"
            component={Examples.CloseButtonExample}
            options={{ title: 'CloseButton' }}
          />
          <Stack.Screen
            name="CopyButtonExample"
            component={Examples.CopyButtonExample}
            options={{ title: 'CopyButton' }}
          />

          {/* Navigation & Advanced Examples */}
          <Stack.Screen
            name="AnchorExample"
            component={Examples.AnchorExample}
            options={{ title: 'Anchor' }}
          />
          <Stack.Screen
            name="KbdExample"
            component={Examples.KbdExample}
            options={{ title: 'Kbd' }}
          />
          <Stack.Screen
            name="IndicatorExample"
            component={Examples.IndicatorExample}
            options={{ title: 'Indicator' }}
          />
          <Stack.Screen
            name="GridExample"
            component={Examples.GridExample}
            options={{ title: 'Grid' }}
          />
          <Stack.Screen
            name="SimpleGridExample"
            component={Examples.SimpleGridExample}
            options={{ title: 'SimpleGrid' }}
          />
          <Stack.Screen
            name="AspectRatioExample"
            component={Examples.AspectRatioExample}
            options={{ title: 'AspectRatio' }}
          />
          <Stack.Screen
            name="MediaQueryExample"
            component={Examples.MediaQueryExample}
            options={{ title: 'MediaQuery' }}
          />
          <Stack.Screen
            name="BlockquoteExample"
            component={Examples.BlockquoteExample}
            options={{ title: 'Blockquote' }}
          />
          <Stack.Screen
            name="BreadcrumbsExample"
            component={Examples.BreadcrumbsExample}
            options={{ title: 'Breadcrumbs' }}
          />
          <Stack.Screen
            name="NavLinkExample"
            component={Examples.NavLinkExample}
            options={{ title: 'NavLink' }}
          />
          <Stack.Screen
            name="LoadingOverlayExample"
            component={Examples.LoadingOverlayExample}
            options={{ title: 'LoadingOverlay' }}
          />
          <Stack.Screen
            name="TooltipExample"
            component={Examples.TooltipExample}
            options={{ title: 'Tooltip' }}
          />
          <Stack.Screen
            name="PopoverExample"
            component={Examples.PopoverExample}
            options={{ title: 'Popover' }}
          />
          <Stack.Screen
            name="MenuExample"
            component={Examples.MenuExample}
            options={{ title: 'Menu' }}
          />
          <Stack.Screen
            name="SelectExample"
            component={Examples.SelectExample}
            options={{ title: 'Select' }}
          />
          <Stack.Screen
            name="MultiSelectExample"
            component={Examples.MultiSelectExample}
            options={{ title: 'MultiSelect' }}
          />
          <Stack.Screen
            name="RingProgressExample"
            component={Examples.RingProgressExample}
            options={{ title: 'RingProgress' }}
          />
          <Stack.Screen
            name="TransferListExample"
            component={Examples.TransferListExample}
            options={{ title: 'TransferList' }}
          />

          {/* Style System Showcase Examples */}
          <Stack.Screen
            name="ShadowSystemExample"
            component={Examples.ShadowSystemExample}
            options={{ title: 'Shadow System' }}
          />
          <Stack.Screen
            name="GradientExample"
            component={Examples.GradientExample}
            options={{ title: 'Gradients' }}
          />
          <Stack.Screen
            name="ColorPaletteExample"
            component={Examples.ColorPaletteExample}
            options={{ title: 'Color Palette' }}
          />
          <Stack.Screen
            name="ColorManipulationExample"
            component={Examples.ColorManipulationExample}
            options={{ title: 'Color Manipulation' }}
          />
          <Stack.Screen
            name="ResponsiveUtilitiesExample"
            component={Examples.ResponsiveUtilitiesExample}
            options={{ title: 'Responsive Utilities' }}
          />
          <Stack.Screen
            name="PrimaryColorExample"
            component={Examples.PrimaryColorExample}
            options={{ title: 'Primary Color System' }}
          />
          <Stack.Screen
            name="VariantsExample"
            component={Examples.VariantsExample}
            options={{ title: 'Component Variants' }}
          />
          <Stack.Screen
            name="ThemeCustomizationExample"
            component={Examples.ThemeCustomizationExample}
            options={{ title: 'Theme Customization' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Theme>
  );
}
