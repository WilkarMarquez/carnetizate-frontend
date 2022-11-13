export interface createTurno{
    start: Date,
    user_id: string | undefined,
    queue_id: string,
    isPay: boolean,
    code?: string
}