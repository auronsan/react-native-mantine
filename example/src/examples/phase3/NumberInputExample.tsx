import { useState } from 'react';
import { Alert } from 'react-native';
import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import {
  NumberInput,
  Paper,
  Stack,
  Button,
  Group,
  Text,
  useForm,
} from 'react-native-mantine';

interface OrderFormValues {
  quantity: number;
  discount: number;
  shippingCost: number;
}

const BasicNumberInputExample = () => {
  const [value, setValue] = useState<number | ''>(1);

  return (
    <Paper p="md" radius="md">
      <Stack spacing={16}>
        <NumberInput label="Quantity" defaultValue={1} min={0} max={100} />
        <NumberInput
          label="Controlled Number Input"
          value={value}
          onChange={(val) => setValue(val)}
          min={1}
          max={10}
          step={1}
        />
        <Text size="sm" style={{ color: '#868e96' }}>
          Current value: {value}
        </Text>
      </Stack>
    </Paper>
  );
};

const NumberInputFormExample = () => {
  const form = useForm<OrderFormValues>({
    initialValues: {
      quantity: 1,
      discount: 0,
      shippingCost: 10,
    },
    validate: {
      quantity: (value) => {
        if (value < 1) return 'Quantity must be at least 1';
        if (value > 100) return 'Quantity cannot exceed 100';
        return null;
      },
      discount: (value) => {
        if (value < 0) return 'Discount cannot be negative';
        if (value > 100) return 'Discount cannot exceed 100%';
        return null;
      },
      shippingCost: (value) => {
        if (value < 0) return 'Shipping cost cannot be negative';
        return null;
      },
    },
  });

  const calculateTotal = () => {
    const subtotal = form.values.quantity * 50; // Assume $50 per item
    const discountAmount = subtotal * (form.values.discount / 100);
    const total = subtotal - discountAmount + form.values.shippingCost;
    return total.toFixed(2);
  };

  const handleSubmit = (values: OrderFormValues) => {
    const total = calculateTotal();
    Alert.alert(
      'Order Summary',
      `Quantity: ${values.quantity}\nDiscount: ${values.discount}%\nShipping: $${values.shippingCost}\nTotal: $${total}`
    );
  };

  return (
    <Paper p="md" radius="md">
      <Stack spacing={15}>
        <Text weight="500" size="md">
          Order Form
        </Text>

        <NumberInput
          label="Quantity"
          value={form.values.quantity}
          onChange={(val) => form.setFieldValue('quantity', typeof val === 'number' ? val : 0)}
          error={form.errors.quantity}
          min={1}
          max={100}
          step={1}
        />

        <NumberInput
          label="Discount (%)"
          value={form.values.discount}
          onChange={(val) => form.setFieldValue('discount', typeof val === 'number' ? val : 0)}
          error={form.errors.discount}
          min={0}
          max={100}
          step={5}
        />

        <NumberInput
          label="Shipping Cost ($)"
          value={form.values.shippingCost}
          onChange={(val) => form.setFieldValue('shippingCost', typeof val === 'number' ? val : 0)}
          error={form.errors.shippingCost}
          min={0}
          step={5}
        />

        <Paper p="sm" style={{ backgroundColor: '#f1f3f5' }}>
          <Stack spacing={5}>
            <Text size="sm">
              Subtotal: ${(form.values.quantity * 50).toFixed(2)}
            </Text>
            <Text size="sm">
              Discount: -$
              {((form.values.quantity * 50 * form.values.discount) / 100).toFixed(2)}
            </Text>
            <Text size="sm">
              Shipping: ${form.values.shippingCost.toFixed(2)}
            </Text>
            <Text weight="500" size="md">
              Total: ${calculateTotal()}
            </Text>
          </Stack>
        </Paper>

        <Group spacing={10}>
          <Button
            onPress={form.onSubmit(handleSubmit)}
            disabled={!form.isValid()}
          >
            Place Order
          </Button>
          <Button variant="outline" onPress={form.reset}>
            Reset
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
};

export const NumberInputExample = () => {
  return (
    <ExampleWrapper
      title="NumberInput"
      description="Numeric input with increment controls"
    >
      <ExampleSection
        title="Basic Usage"
        description="NumberInput component with controlled state"
      >
        <BasicNumberInputExample />
      </ExampleSection>

      <ExampleSection
        title="Form Integration"
        description="NumberInput in an order form with live calculations"
      >
        <NumberInputFormExample />
      </ExampleSection>
    </ExampleWrapper>
  );
};
