export function calculateDays(start: Date, end: Date): number {
    const startDate = new Date(new Date(start).setHours(0,0,0,0))
    const endDate = new Date(new Date(end).setHours(0,0,0,0))
    let timeDifference = endDate.getTime() - startDate.getTime();
    let daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference;
}
