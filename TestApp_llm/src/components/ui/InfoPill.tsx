import { Text, View } from 'react-native';

type InfoPillProps = {
  label: string;
  value: string;
};

export function InfoPill({ label, value }: InfoPillProps) {
  return (
    <View className="rounded-chip bg-surface-glassStrong px-3 py-2">
      <Text className="text-xs font-semibold uppercase tracking-[1px] text-text-primary">
        {label}: {value}
      </Text>
    </View>
  );
}
