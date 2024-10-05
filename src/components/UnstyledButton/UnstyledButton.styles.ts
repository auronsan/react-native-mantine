import { createStyles } from "../../theme";

export default createStyles((theme, {variant} ) => ({
  root: {
    cursor: 'pointer',
    border: 0,
    padding: 0,
    appearance: 'none',
    fontSize: theme.fontSizes.md,
    textAlign: 'left',
    color: theme.light.text,
    textDecoration: 'none',
    boxSizing: 'border-box',
    backgroundColor: variant === 'transparent' ? 'transparent' : theme.light.background,
  },
}));
