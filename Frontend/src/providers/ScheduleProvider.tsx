import { createContext, useState, ReactNode } from 'react';

interface ScheduleContextType {
  schedule_id: string | null;
  setScheduleId: (id: string) => void;
}

export const ScheduleContext = createContext<ScheduleContextType | undefined>(
  undefined
);

export const ScheduleProvider = ({ children }: { children: ReactNode }) => {
  const [schedule_id, setScheduleId] = useState<string | null>(null);

  return (
    <ScheduleContext.Provider value={{ schedule_id, setScheduleId }}>
      {children}
    </ScheduleContext.Provider>
  );
};
