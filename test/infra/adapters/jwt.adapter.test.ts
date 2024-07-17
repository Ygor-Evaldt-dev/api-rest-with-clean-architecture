import { JwtAdapter } from "@/infra/adapters/jwt.adapter";

describe('JWT token', () => {
    const tokenProvider = new JwtAdapter('secret');

    it('should generate a valid token', () => {
        const accessToken = tokenProvider.generate({
            email: 'user@email.com',
            password: 'any@password'
        });
        expect(accessToken).toBeDefined();
    });

    it('should return true if access token is valid', () => {
        const accessToken = tokenProvider.generate({});
        const isValidAccessToken = tokenProvider.validate(accessToken);

        expect(isValidAccessToken).toBeTruthy();
    });

    it('should return false if access token is invalid', () => {
        const exec = () => tokenProvider.validate('invalidToken');
        expect(exec).toThrow();
    });
});