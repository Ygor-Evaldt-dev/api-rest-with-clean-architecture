export interface IService<IN, OUT> {
    execute(params: IN): Promise<OUT>
}