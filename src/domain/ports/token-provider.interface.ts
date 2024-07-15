export interface ITokenProvider {
    generate(data: string | object): string;
    validate(token: string): string | object | boolean;
}