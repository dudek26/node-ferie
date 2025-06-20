import { addSingleHoliday, addRangeHoliday } from '../holidays.js';

export function setupNationalHolidays() {
    addSingleHoliday('Nowy Rok', 'national', new Date(1970, 0, 1));
    addSingleHoliday(
        'Trzech Króli (Objawienie Pańskie)',
        'national',
        new Date(1970, 0, 6),
    );
    addSingleHoliday('Święto Pracy', 'national', new Date(1970, 4, 1));
    addSingleHoliday(
        'Święto Konstytucji 3 Maja',
        'national',
        new Date(1970, 4, 3),
    );
    addSingleHoliday(
        'Święto Wojska Polskiego',
        'national',
        new Date(1970, 7, 15),
    );
    addSingleHoliday('Wszystkich Świętych', 'national', new Date(1970, 10, 1));
    addSingleHoliday(
        'Święto Niepodległości',
        'national',
        new Date(1970, 10, 11),
    );
    addSingleHoliday(
        'Wigilia Bożego Narodzenia',
        'national',
        new Date(1970, 11, 24),
    );
    addRangeHoliday(
        'Boże Narodzenie',
        'national',
        new Date(1970, 11, 25),
        new Date(1970, 11, 26),
    );
}
