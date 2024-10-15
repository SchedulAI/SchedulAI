import { useContext } from "react";
import { ScheduleContext } from "../providers/ScheduleProvider";

export const useSchedule = () => {
    const context = useContext(ScheduleContext);
    if (!context) {
        throw new Error('useSchedule must be used within a ScheduleProvider');
    }
    return context;
};