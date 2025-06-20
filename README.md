# @dudek26/node-ferie

Pakiet NPM do określania ustawowych dni wolnych od pracy i zajęć dydaktycznych w Polsce.

## Instalacja

```bash
npm i @dudek26/node-ferie
```

## Użycie

Funkcja `checkHolidays(data)` zwraca tablicę dni wolnych dla podanej daty.

Dni wolne są zwracane w postaci

```ts
{
	name: string;
	type: 'national' | 'school';
}
```

> Dni wolne od pracy typu `'national'` są zdefiniowane na podstawie dni ustawowo wolnych od pracy na rok 2025.<br>
> Dni wolne od zajęć dydaktycznych typu `'school'` są zdefiniowane na podstawie Rozporządzenia Ministra Edukacji Narodowej z dnia 11 sierpnia 2017 r. w sprawie organizacji roku szkolnego i nie uwzględniają terminów ferii zimowych.

## Przykład

Poniższy kod wyszuka wszystkie dni wolne od pracy i zajęć dydaktycznych dla dnia 15 stycznia 2023 roku:

```ts
const holidays = checkHolidays(new Date('2023-08-15'));
console.log(JSON.stringify(holidays));
```

Wynik:

```bash
[{"name":"Święto Wojska Polskiego","type":"national"},{"name":"Ferie Letnie","type":"school"}]
```
