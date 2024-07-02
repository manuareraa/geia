import { Stack } from "expo-router";

const ExtraLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

export default ExtraLayout;
