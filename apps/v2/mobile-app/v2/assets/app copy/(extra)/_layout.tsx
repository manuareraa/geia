import { Stack } from "expo-router";

const ExtraLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="misc"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

export default ExtraLayout;
