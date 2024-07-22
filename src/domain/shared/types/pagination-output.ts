export type PaginationOutput<T> = {
    page: number;
    take: number;
    registers: T[];
    totalPages: number;
    totalRegisters: number;
}