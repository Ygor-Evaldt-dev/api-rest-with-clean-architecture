import { IEncrypter } from "@/domain/shared/ports/encrypter.interface";
import { BcryptAdapter } from "@/infra/adapters/bcrypt.adapter";

describe('encrypt password', () => {
    const encrypter: IEncrypter = new BcryptAdapter();
    const anyPassword = 'AnyP@ssw0rd';

    it('should encrypt a password', async () => {
        const encryptedPassword = await encrypter.encrypt(anyPassword);

        expect(encryptedPassword).toBeDefined();
        expect(encryptedPassword.length).toBe(60);
    });

    it('should return true if password is correct', async () => {
        const encryptedPassword = await encrypter.encrypt(anyPassword);
        const matchPasswords = await encrypter.compare(anyPassword, encryptedPassword);

        expect(matchPasswords).toBeTruthy();
    });

    it('should return false if password is not correct', async () => {
        const encryptedPassword = await encrypter.encrypt(anyPassword);
        const matchPasswords = await encrypter.compare('anyPassword', encryptedPassword);

        expect(matchPasswords).toBeFalsy();
    });
});