import { sum } from '@/index';

describe('sum', () => {
    it('should return the correct sum', () => {
        const result = sum(1, 2);
        expect(result).toBe(3);
    });
});