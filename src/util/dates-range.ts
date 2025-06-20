export function isDateInRange(
    date: Date,
    startDate: Date,
    endDate: Date,
): boolean {
    const currentYear = new Date().getFullYear();
    const normalizedDate = new Date(
        currentYear,
        date.getMonth(),
        date.getDate(),
    );
    const normalizedStart = new Date(
        currentYear,
        startDate.getMonth(),
        startDate.getDate(),
    );
    const normalizedEnd = new Date(
        currentYear,
        endDate.getMonth(),
        endDate.getDate(),
    );

    return normalizedDate >= normalizedStart && normalizedDate <= normalizedEnd;
}
