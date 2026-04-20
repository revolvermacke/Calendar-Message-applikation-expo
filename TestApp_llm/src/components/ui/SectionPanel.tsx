import type { ReactNode } from 'react';
import { Text } from 'react-native';

import { GlassCard } from './GlassCard';

type SectionPanelProps = {
  children: ReactNode;
  title: string;
};

export function SectionPanel({ children, title }: SectionPanelProps) {
  return (
    <GlassCard>
      <Text className="text-lg font-semibold text-text-primary">{title}</Text>
      {children}
    </GlassCard>
  );
}
