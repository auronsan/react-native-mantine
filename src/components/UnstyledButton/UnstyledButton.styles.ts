import { createStyles } from "../../theme";

export default createStyles((theme, {variant} ) => ({
  root: {
    cursor: 'pointer',
    border: 0,
    padding: 0,
    appearance: 'none',
    fontSize: theme.fontSizes.md,
    textAlign: 'left',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9],
    textDecoration: 'none',
    boxSizing: 'border-box',
    backgroundColor: variant === 'transparent'
      ? 'transparent'
      : theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },
}));
