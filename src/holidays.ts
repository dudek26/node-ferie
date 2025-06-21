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

export function getHolidays(year: number) {
	let days =
		(year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 366 : 365;
	let holidays: { date: Date; holiday: Holiday }[] = [];
	const date = new Date(year, 0, 1);
	for (let day = 1; day <= days; day++) {
		const hdays = checkHolidays(date);
		holidays.push(...hdays.map((holiday) => ({ date, holiday })));
		date.setDate(date.getDate() + 1);
	}
	return holidays;
}
