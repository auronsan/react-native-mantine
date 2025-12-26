import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { Text, Paper, Stack, Button, Group } from 'react-native-mantine';

export const PaginationExample = () => {
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);
  const totalPages1 = 5;
  const totalPages2 = 10;

  return (
    <ExampleWrapper
      title="Pagination"
      description="Page navigation with controls"
    >
      <ExampleSection
        title="Basic Pagination"
        description="Simple page navigation controls"
        variant="showcase"
      >
        <Paper p="md" radius="md" withBorder>
          <Stack spacing={16}>
            <Text weight="600">
              Page {page1} of {totalPages1}
            </Text>

            <Group spacing={8}>
              <Button
                variant="outline"
                size="sm"
                onPress={() => setPage1(1)}
                disabled={page1 === 1}
              >
                First
              </Button>
              <Button
                variant="outline"
                size="sm"
                onPress={() => setPage1(Math.max(1, page1 - 1))}
                disabled={page1 === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onPress={() => setPage1(Math.min(totalPages1, page1 + 1))}
                disabled={page1 === totalPages1}
              >
                Next
              </Button>
              <Button
                variant="outline"
                size="sm"
                onPress={() => setPage1(totalPages1)}
                disabled={page1 === totalPages1}
              >
                Last
              </Button>
            </Group>

            <Text size="sm" color="dimmed">
              Showing results for page {page1}
            </Text>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Numbered Pagination"
        description="Pagination with page numbers"
        variant="showcase"
      >
        <Paper p="md" radius="md" withBorder>
          <Stack spacing={16}>
            <Text weight="600">
              Page {page2} of {totalPages2}
            </Text>

            <Group spacing={4}>
              <Button
                variant="subtle"
                size="xs"
                onPress={() => setPage2(Math.max(1, page2 - 1))}
                disabled={page2 === 1}
              >
                Prev
              </Button>

              {[...Array(Math.min(5, totalPages2))].map((_, i) => {
                const pageNum = Math.max(1, Math.min(page2 - 2 + i, totalPages2 - 4 + i));
                return (
                  <Button
                    key={i}
                    variant={page2 === pageNum ? 'filled' : 'outline'}
                    size="xs"
                    onPress={() => setPage2(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}

              <Button
                variant="subtle"
                size="xs"
                onPress={() => setPage2(Math.min(totalPages2, page2 + 1))}
                disabled={page2 === totalPages2}
              >
                Next
              </Button>
            </Group>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Simple pagination implementation"
      >
        <CodeBlock
          code={`import { useState } from 'react';
import { Button, Text, Group } from 'react-native-mantine';

const MyPagination = () => {
  const [page, setPage] = useState(1);
  const totalPages = 10;

  return (
    <>
      <Text>Page {page} of {totalPages}</Text>
      <Group>
        <Button
          onPress={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          onPress={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </Group>
    </>
  );
};`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
