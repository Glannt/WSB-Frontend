import { Flex, Box, Card, Text, Avatar, Inset, Strong } from '@radix-ui/themes';

export const SubcriptionCard = () => {
  return (
    <div className="rounded-lg border-solid border-2 border-sky-500 w-82">
      <Box maxWidth="700px">
        <Card size="3">
          <Inset clip="padding-box" side="top" pb="current">
            <img
              src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
              alt="Bold typography"
              style={{
                display: 'block',
                objectFit: 'cover',
                width: '100%',
                height: 140,
                backgroundColor: 'var(--gray-5)',
              }}
            />
          </Inset>
          <Text asChild>
            <h2 className="font-bold text-lg">Quick Start</h2>
          </Text>
          <Text as="div" color="gray" size="2">
            Start building your next project in minutes
          </Text>
        </Card>
      </Box>
    </div>
  );
};
