import { sum, delay, getUniqueID, getFullApiUrl } from '../instruments/index';

describe('instruments', () => {
    test('sum should be a function', () => {
        expect(sum).toBeInstanceOf(Function);
    });

    test('sum should throw, when called with non-number type as second argument', () => {
        expect(() => sum(2, 'привет')).toThrow();
    });

    test('sum should throw, when called with non-number type as first argument', () => {
        expect(() => sum('привет', 2)).toThrow();
    });
    test('sum should return an addition of two arguments passed ', () => {
        expect(sum(2, 3)).toBe(5);
        expect(sum(1, 8)).toMatchSnapshot();
    });
    test('delay function should return a resolved promise', async () => {
        await expect(delay()).resolves.toBeUndefined;
    });

    test('getUniqueId function should be a function', () => {
        expect(getUniqueID).toBeInstanceOf(Function);
    });

    test('getUniqueId should throw, when called with non-number', () => {
        expect(() => getUniqueID('привет')).toThrow();
    });
    test('getUniqueId should produce, a string of a desired given length ', () => {
        expect(typeOF getUniqueID()).toBe('string');
        expect(getUniqueID(5)).toHaveLength(5);
        expect(getUniqueID(13)).toHaveLength(13);
    });

    test('getFullApiUrl function should be a function', () => {
        expect(getFullApiUrl).toBeInstanceOf(Function);
    });

    test('getFullApiUrl should throw, when called with non-string arguments', () => {
        expect(() => getFullApiUrl(1, 2)).toThrow();
        expect(() => getFullApiUrl('1', 2)).toThrow();
        expect(() => getFullApiUrl(1, '2')).toThrow();
    });

    test('getFullApiUrl should produce, a string containing arguments divided by / symbol ', () => {
        expect(typeOF getFullApiUrl()).toBe('string');
        expect(getFullApiUrl('a', 'b')).toBe('a/b');
    });

});
