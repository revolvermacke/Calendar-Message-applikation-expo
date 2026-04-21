import { Text, View } from "react-native";

import { InfoPill } from "./ui/InfoPill";

type AppHeaderProps = {
  apiUrl: string;
  appEnv: string;
};

export function AppHeader({ apiUrl, appEnv }: AppHeaderProps) {
  return (
    <View className="rounded-shell bg-surface-glass px-4 py-4">
      <Text className="text-center text-3xl font-bold text-text-primary">
        Översikt
      </Text>
      <Text className="text-center mt-2 text-base leading-6 text-text-secondary">
        Växla mellan tidigare notiser och din lokala kalender direkt i appen.
      </Text>
    </View>
  );
}
