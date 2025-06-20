import type { InternalHoliday } from '../types/holiday.js';
import { areDatesEqual } from '../util/dates-equal.js';
import { isDateInRange } from '../util/dates-range.js';

/**
 * Zwraca datę Wielkanocy dla podanego roku.
 * https://pl.wikipedia.org/wiki/Wielkanoc#Metoda_Meeusa/Jonesa/Butchera
 * @param year
 */
export function easter(year: number) {
	const a = year % 19;
	const b = Math.floor(year / 100);
	const c = year % 100;
	const d = Math.floor(b / 4);
	const e = b % 4;
	const f = Math.floor((b + 8) / 25);
	const g = Math.floor((b - f + 1) / 3);
	const h = (19 * a + b - d - g + 15) % 30;
	const i = Math.floor(c / 4);
	const k = c % 4;
	const l = (32 + 2 * e + 2 * i - h - k) % 7;
	const m = Math.floor((a + 11 * h + 22 * l) / 451);
	const p = (h + l - 7 * m + 114) % 31;

	const day = p + 1;
	const month = Math.floor((h + l - 7 * m + 114) / 31);

	return new Date(year, month - 1, day);
}

function easterPredicate(date: Date) {
	if (date.getFullYear() < 1583) {
		throw new Error('Easter is not defined before 1583');
	}
	const easterDate = easter(date.getFullYear());
	return areDatesEqual(date, easterDate);
}

function easterMondayPredicate(date: Date) {
	if (date.getFullYear() < 1583) {
		throw new Error('Easter is not defined before 1583');
	}
	const easterMondayDate = easter(date.getFullYear());
	easterMondayDate.setDate(easterMondayDate.getDate() + 1);
	return areDatesEqual(date, easterMondayDate);
}

function bozeCialoPredicate(date: Date) {
	// 60 dni po Wielkanocy
	const bozeCialo = new Date(easter(date.getFullYear()));
	bozeCialo.setDate(bozeCialo.getDate() + 60);
	return areDatesEqual(date, bozeCialo);
}

function zieloneSwiatkiPredicate(date: Date) {
	// 49 dni po Wielkanocy
	const zieloneSwiatki = new Date(easter(date.getFullYear()));
	zieloneSwiatki.setDate(zieloneSwiatki.getDate() + 49);
	return areDatesEqual(date, zieloneSwiatki);
}

export function setupEaster(holidays: InternalHoliday[]) {
	holidays.push({
		name: 'Wielkanoc',
		type: 'national',
		predicate: easterPredicate,
	});
	holidays.push({
		name: 'Poniedziałek Wielkanocny',
		type: 'national',
		predicate: easterMondayPredicate,
	});
	holidays.push({
		name: 'Boże Ciało',
		type: 'national',
		predicate: bozeCialoPredicate,
	});
	holidays.push({
		name: 'Zielone Świątki',
		type: 'national',
		predicate: zieloneSwiatkiPredicate,
	});
}
