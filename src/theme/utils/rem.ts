// React Native needs numeric values, not rem strings
// Convert rem to actual pixel values (16px base)
function createNumericConverter() {
  return (px: unknown): number => {
    if (typeof px === 'number') {
      return px;
    }

    if (typeof px === 'string') {
      const replaced = px.replace('px', '');
      if (!Number.isNaN(Number(replaced))) {
        return Number(replaced);
      }
    }

    return typeof px === 'number' ? px : 0;
  };
}

export const rem = createNumericConverter();
export const em = createNumericConverter();
