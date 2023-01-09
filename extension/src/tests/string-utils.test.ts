import { remove_whitespaces } from "../utils/string_utils";

test('removes all whitespaces from a string', () => {
    const input = '   Hello,    World!   ';
    const expectedOutput = 'Hello,World!';
    expect(remove_whitespaces(input)).toBe(expectedOutput);
});

test('removes all whitespaces from an empty string', () => {
    const input = '';
    const expectedOutput = '';
    expect(remove_whitespaces(input)).toBe(expectedOutput);
});