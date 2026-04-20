import type { ReactNode } from 'react';
import { View } from 'react-native';

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <View
      className={`rounded-shell border border-surface-border bg-surface-card p-5 ${className}`.trim()}
    >
      {children}
    </View>
  );
}
