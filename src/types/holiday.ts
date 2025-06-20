export interface Holiday {
    name: string;
    type: HolidayType;
}

export interface InternalHoliday extends Holiday {
    predicate: (date: Date) => boolean;
}

export type HolidayType = 'national' | 'school';
