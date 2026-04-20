export type TabKey = 'notices' | 'calendar';

export type Notice = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
};

export type AppExtraConfig = {
  appEnv?: string;
  apiUrl?: string;
};

export type DeviceCalendar = {
  id: string;
  title: string;
  color?: string;
  source?: {
    name?: string;
  };
};

export type DeviceEvent = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  allDay: boolean;
};

export type CalendarPermissionStatus = 'idle' | 'granted' | 'denied';
