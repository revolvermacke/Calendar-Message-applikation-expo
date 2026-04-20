import { Text, View } from "react-native";

import { useNotices } from "../store/noticeStore";
import { GlassCard } from "./ui/GlassCard";

export function NoticesScreen() {
  const { notices } = useNotices();

  return (
    <View>
      <Text className="text-2xl font-bold text-text-primary">Notiser</Text>
      <Text className="mt-2 text-base leading-6 text-text-secondary">
        Här visas tidigare notiser när det finns något att visa.
      </Text>

      {notices.length === 0 ? (
        <GlassCard className="mt-6">
          <Text className="text-lg font-semibold text-text-primary">
            Inga notiser än
          </Text>
          <Text className="mt-2 text-sm leading-6 text-text-tertiary">
            När appen börjar skapa eller hämta notiser kommer de att listas här.
          </Text>
        </GlassCard>
      ) : (
        <View className="mt-6 gap-4">
          {notices.map((notice) => (
            <GlassCard key={notice.id}>
              <Text className="text-lg font-semibold text-text-primary">
                {notice.title}
              </Text>
              <Text className="mt-2 text-sm leading-6 text-text-secondary">
                {notice.description}
              </Text>
              <Text className="mt-3 text-xs uppercase tracking-[1px] text-text-tertiary">
                {notice.timestamp}
              </Text>
            </GlassCard>
          ))}
        </View>
      )}
    </View>
  );
}
