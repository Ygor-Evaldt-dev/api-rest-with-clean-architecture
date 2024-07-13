import { IUuid } from "@/domain/ports/uuid.interface";
import { UuidAdapter } from "@/infra/adapters/uuid.adapter";

describe('uuid', () => {
    const uuidAdapter: IUuid = new UuidAdapter();

    it('should generate a new uuid', () => {
        const uuid = uuidAdapter.generate();
        expect(uuid).toBeDefined();
        expect(uuid.length).toBe(36);
    });

    it('should validate an uuid', () => {
        const isValidUuid = uuidAdapter.validate('355a45ae-e752-470d-9a14-15a165f5d381');
        expect(isValidUuid).toBeTruthy();
    });
});