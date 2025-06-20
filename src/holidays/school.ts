import { checkHolidays } from '../holidays.js';
import type { InternalHoliday } from '../types/holiday.js';
import { isDateInRange } from '../util/dates-range.js';
import { easter } from './easter.js';

function winterBreakPredicate(date: Date) {
    const year = date.getFullYear();
    const start = new Date(year, 11, 23);
    if (new Date(year, 11, 22).getDay() === 1) start.setDate(22);
    const end = new Date(year, 11, 31);
    return isDateInRange(date, start, end);
}

function springBreakPredicate(date: Date) {
    const easterSunday = easter(date.getFullYear());
    const start = new Date(easterSunday);
    start.setDate(start.getDate() - 3);
    const end = new Date(easterSunday);
    end.setDate(end.getDate() + 2);
    return isDateInRange(date, start, end);
}

function summerBreakPredicate(date: Date) {
    const year = date.getFullYear();
    const start = new Date(year, 5, 21);
    while (start.getDay() !== 5) {
        start.setDate(start.getDate() + 1);
    }
    const thursday = new Date(start);
    thursday.setDate(thursday.getDate() - 1);
    if (checkHolidays(thursday, 'national').length > 0) {
        start.setDate(start.getDate() - 2);
    }
    start.setDate(start.getDate() + 1);

    const end = new Date(year, 8, 1);
    while ([5, 6, 0].includes(end.getDay())) {
        end.setDate(end.getDate() + 1);
    }
    end.setDate(end.getDate() - 1);

    return isDateInRange(date, start, end);
}

/**
 * https://prawo.vulcan.edu.pl/przegdok.asp?qdatprz=akt&qplikid=4393
 */
export function setupSchoolBreaks(holidays: InternalHoliday[]) {
    holidays.push({
        name: 'Zimowa Przerwa Świąteczna',
        type: 'school',
        predicate: winterBreakPredicate,
    });
    holidays.push({
        name: 'Wiosenna Przerwa Świąteczna',
        type: 'school',
        predicate: springBreakPredicate,
    });
    holidays.push({
        name: 'Ferie Letnie',
        type: 'school',
        predicate: summerBreakPredicate,
    });
}
