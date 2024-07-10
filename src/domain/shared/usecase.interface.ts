export interface IUseCase<IN, OUT> {
    execute(data: IN): Promise<OUT>
}