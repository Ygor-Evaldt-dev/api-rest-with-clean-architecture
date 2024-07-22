export type TaskDto = {
    id: string;
    title: string;
    description: string | undefined;
    status: string;
    userId: string;
}