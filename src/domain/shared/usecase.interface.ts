export interface IUseCase<IN, OUT> {
    execute(params: IN): Promise<OUT>;
}
