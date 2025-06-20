import { setupEaster } from './holidays/easter.js';
import { setupNationalHolidays } from './holidays/national.js';
import { setupSchoolBreaks } from './holidays/school.js';
import type { InternalHoliday, HolidayType, Holiday } from './types/holiday.js';
import { areDatesEqual } from './util/dates-equal.js';
import { isDateInRange } from './util/dates-range.js';

const holidays: InternalHoliday[] = [];
let setup = false;

export function addSingleHoliday(name: string, type: HolidayType, date: Date) {
	holidays.push({
		name,
		type,
		predicate: (d) => areDatesEqual(d, date),
	});
}

export function addRangeHoliday(
	name: string,
	type: HolidayType,
	start: Date,
	end: Date,
) {
	holidays.push({
		name,
		type,
		predicate: (d) => isDateInRange(d, start, end),
	});
}

export function setupHolidays() {
	if (setup) return;
	setup = true;
	setupNationalHolidays();
	setupEaster(holidays);
	setupSchoolBreaks(holidays);
}

export function checkHolidays(date: Date, type?: HolidayType) {
	const hdays = holidays
		.filter((holiday) => !type || type === holiday.type)
		.filter((holiday) => holiday.predicate(date));
	return hdays.map(
		(holiday) => ({ name: holiday.name, type: holiday.type }) as Holiday,
	);
}
