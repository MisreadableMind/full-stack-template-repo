import * as os from 'os';

export function logMemoryUsage(): void {
    const memoryUsage = process.memoryUsage();

    const rss = (memoryUsage.rss / (1024 ** 2)).toFixed(2);
    const heapTotal = (memoryUsage.heapTotal / (1024 ** 2)).toFixed(2);
    const heapUsed = (memoryUsage.heapUsed / (1024 ** 2)).toFixed(2);
    const external = (memoryUsage.external / (1024 ** 2)).toFixed(2);

    console.log(`Process Memory Usage:`);
    console.log(`RSS (Resident Set Size): ${rss} MB`);
    console.log(`Heap Total: ${heapTotal} MB`);
    console.log(`Heap Used: ${heapUsed} MB`);
    console.log(`External: ${external} MB`);
}

export function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
}

export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function sanitizeString(str: string): string {
    return str.replace(/[<>'"&]/g, '');
}

export function paginate<T>(
    array: T[],
    page: number = 1,
    limit: number = 10
): { data: T[]; total: number; page: number; limit: number; totalPages: number } {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
        data: array.slice(startIndex, endIndex),
        total: array.length,
        page,
        limit,
        totalPages: Math.ceil(array.length / limit)
    };
}