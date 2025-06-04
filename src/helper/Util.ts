export function formatDateTime(iso: string): string {
    const parts = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'UTC',
    }).formatToParts(new Date(iso));

    const date = `${parts.find(p => p.type === 'day')?.value}/${parts.find(p => p.type === 'month')?.value}/${parts.find(p => p.type === 'year')?.value}`;
    const time = `${parts.find(p => p.type === 'hour')?.value}:${parts.find(p => p.type === 'minute')?.value}`;

    return `${date} ${time}`;
}
