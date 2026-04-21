import {
  ActivityIndicator,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { useState } from "react";
import { useNotices } from "../store/noticeStore";

import { useCalendarData } from "../hooks/useCalendarData";
import { formatEventDate } from "../lib/formatters";
import { generateMessage } from "../lib/api";

import { GlassCard } from "./ui/GlassCard";
import { SectionPanel } from "./ui/SectionPanel";

type CalendarScreenProps = {
  isActive: boolean;
};

export function CalendarScreen({ isActive }: CalendarScreenProps) {
  const { calendars, error, events, isLoading, permissionStatus, refresh } =
    useCalendarData(isActive);

  // AI state
  const [aiMessage, setAiMessage] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { addNotice } = useNotices();

  // AI function
  const handleGenerate = async () => {
    try {
      setIsGenerating(true);

      const mappedEvents = events.map((event) => ({
        title: event.title ?? "Event",
        time: new Date(event.startDate).toISOString(),
      }));

      const data = await generateMessage(mappedEvents);

      addNotice({
        id: Date.now().toString(),
        title: "AI Genererad notis",
        description: data.summary,
        timestamp: new Date().toLocaleString(),
      });
      console.log(data);

      setAiMessage(data.summary);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <View>
      <View className="flex-row items-center justify-between gap-3">
        <View className="flex-1">
          <Text className="text-2xl font-bold text-text-primary">Kalender</Text>
          <Text className="mt-2 text-base leading-6 text-text-secondary">
            Hämtar kalendrar och kommande aktiviteter från enheten.
          </Text>
        </View>

        <Pressable
          className="rounded-chip bg-surface-glassStrong px-4 py-3"
          onPress={() => {
            void refresh();
          }}
        >
          <Text className="text-sm font-semibold text-text-primary">
            Uppdatera
          </Text>
        </Pressable>
      </View>

      <Pressable
        className="mt-4 rounded-chip bg-surface-glassStrong px-4 py-3"
        onPress={() => {
          handleGenerate();
        }}
      >
        <Text className="text-sm font-semibold text-text-primary">
          {isGenerating ? "Genererar..." : "Generera AI-meddelande"}
        </Text>
      </Pressable>

      {Platform.OS === "web" ? (
        <StateCard
          title="Kalenderkoppling finns på mobil"
          description="Webben kan inte läsa lokal kalenderdata. Öppna appen i Android eller iPhone för att ansluta enhetens kalender."
        />
      ) : isLoading ? (
        <View className="mt-8 items-center justify-center">
          <ActivityIndicator size="small" color="#ffffff" />
          <Text className="mt-3 text-sm text-text-secondary">
            Hämtar kalenderdata...
          </Text>
        </View>
      ) : permissionStatus === "denied" ? (
        <StateCard
          title="Kalenderbehörighet behövs"
          description={
            error ??
            "Godkänn kalenderåtkomst för att visa dina lokala kalendrar och aktiviteter."
          }
        />
      ) : (
        <View className="mt-6 gap-5">
          <SectionPanel title="Tillgängliga kalendrar">
            {calendars.length === 0 ? (
              <Text className="mt-2 text-sm leading-6 text-text-tertiary">
                Inga kalendrar hittades på enheten.
              </Text>
            ) : (
              <View className="mt-4 gap-3">
                {calendars.map((calendar) => (
                  <View
                    key={`${calendar.id}-${calendar.title}-${calendar.source?.name ?? "local"}`}
                    className="flex-row items-center justify-between rounded-2xl bg-surface-cardSoft px-4 py-3"
                  >
                    <View className="mr-3 flex-1">
                      <Text className="text-base font-semibold text-text-primary">
                        {calendar.title}
                      </Text>
                      <Text className="mt-1 text-sm text-text-tertiary">
                        {calendar.source?.name ?? "Lokal kalender"}
                      </Text>
                    </View>
                    <View
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: calendar.color ?? "#ffffff" }}
                    />
                  </View>
                ))}
              </View>
            )}
          </SectionPanel>

          <SectionPanel title="Kommande aktiviteter">
            {events.length === 0 ? (
              <Text className="mt-2 text-sm leading-6 text-text-tertiary">
                Inga aktiviteter hittades för de kommande 30 dagarna.
              </Text>
            ) : (
              <View className="mt-4 gap-3">
                {events.map((event) => (
                  <View
                    key={`${event.id}-${new Date(event.startDate).toISOString()}-${event.title ?? "event"}`}
                    className="rounded-2xl bg-surface-cardSoft px-4 py-3"
                  >
                    <Text className="text-base font-semibold text-text-primary">
                      {event.title || "Namnlös aktivitet"}
                    </Text>
                    <Text className="mt-1 text-sm text-text-tertiary">
                      {event.allDay
                        ? "Heldag"
                        : `${formatEventDate(new Date(event.startDate))} - ${formatEventDate(
                            new Date(event.endDate),
                          )}`}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </SectionPanel>

          {aiMessage ? (
            <GlassCard className="mt-4">
              <Text className="text-lg font-semibold text-text-primary">
                AI Meddelande
              </Text>
              <Text className="mt-2 text-sm text-text-tertiary">
                {aiMessage}
              </Text>
            </GlassCard>
          ) : null}
        </View>
      )}
    </View>
  );
}

type StateCardProps = {
  description: string;
  title: string;
};

function StateCard({ description, title }: StateCardProps) {
  return (
    <GlassCard className="mt-6">
      <Text className="text-lg font-semibold text-text-primary">{title}</Text>
      <Text className="mt-2 text-sm leading-6 text-text-tertiary">
        {description}
      </Text>
    </GlassCard>
  );
}
