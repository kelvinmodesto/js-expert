import { describe, expect, test } from '@jest/globals';
import { error } from './constants';
import {csvToJSON} from "./csvToJSON";

describe('csvToJSON Module', () => {

    test('it should return an error if the file is empty', async () => {
        const filePath = './mocks/emptyFile-invalid.csv';
        const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = await csvToJSON(filePath);

        expect(result).toBe(expected);
    });

    test('it should return an error if the header is invalid', async () => {
        const filePath = './mocks/invalid-header.csv';
        const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
        const result = await csvToJSON(filePath);

        expect(result).toBe(expected);
    });

    test('it should return an error if the file is longer than 4 lines including the header', async () => {
        const filePath = './mocks/fiveItems-invalid.csv';
        const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = await csvToJSON(filePath);

        expect(result).toBe(expected);
    });

    test('it should return a valid items list', async () => {
        const filePath = './mocks/threeItems-valid.csv';
        const expected = [
            {
                id: 1,
                name: "xuxa da silva",
                profession: "developer",
                age: 120
            },
            {
                id: 2,
                name: "jose da silva",
                profession: "manager",
                age: 30
            },
            {
                id: 3,
                name: "zezin",
                profession: "QA",
                age: 25
            },
        ];
        const result = await csvToJSON(filePath);

        expect(result).toBe(expected);
    });
});
