import { UserModule } from "@/domain/user/user.module";
import { getTestModule } from "../get-test-module";

describe('remove', () => {
    let module: UserModule;

    beforeAll(async () => {
        module = getTestModule();
    });

    it('should delete an existing user', async () => {

    });
});