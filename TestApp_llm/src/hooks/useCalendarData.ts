import * as Calendar from 'expo-calendar';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import type {
  CalendarPermissionStatus,
  DeviceCalendar,
  DeviceEvent,
} from '../types/app';

type UseCalendarDataResult = {
  calendars: DeviceCalendar[];
  events: DeviceEvent[];
  error: string | null;
  isLoading: boolean;
  permissionStatus: CalendarPermissionStatus;
  refresh: () => Promise<void>;
};

export const useCalendarData = (enabled: boolean): UseCalendarDataResult => {
  const [permissionStatus, setPermissionStatus] =
    useState<CalendarPermissionStatus>(
      Platform.OS === 'web' ? 'denied' : 'idle'
    );
  const [isLoading, setIsLoading] = useState(false);
  const [calendars, setCalendars] = useState<DeviceCalendar[]>([]);
  const [events, setEvents] = useState<DeviceEvent[]>([]);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    if (Platform.OS === 'web') {
      setPermissionStatus('denied');
      setError('Lokal kalender ar inte tillganglig i webbversionen.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const permission = await Calendar.requestCalendarPermissionsAsync();

      if (permission.status !== 'granted') {
        setPermissionStatus('denied');
        setCalendars([]);
        setEvents([]);
        setError('Kalenderatkomst nekades pa enheten.');
        return;
      }

      setPermissionStatus('granted');

      const loadedCalendars = (await Calendar.getCalendarsAsync(
        Calendar.EntityTypes.EVENT
      )) as DeviceCalendar[];

      setCalendars(loadedCalendars);

      const calendarIds = loadedCalendars.map((calendar) => calendar.id);

      if (calendarIds.length === 0) {
        setEvents([]);
        return;
      }

      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 30);

      const loadedEvents = (await Calendar.getEventsAsync(
        calendarIds,
        startDate,
        endDate
      )) as DeviceEvent[];

      loadedEvents.sort(
        (left, right) =>
          new Date(left.startDate).getTime() - new Date(right.startDate).getTime()
      );

      setEvents(loadedEvents.slice(0, 8));
    } catch {
      setError('Det gick inte att lasa in lokal kalenderdata.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (enabled && Platform.OS !== 'web' && permissionStatus === 'idle') {
      void refresh();
    }
  }, [enabled, permissionStatus]);

  return {
    calendars,
    events,
    error,
    isLoading,
    permissionStatus,
    refresh,
  };
};
