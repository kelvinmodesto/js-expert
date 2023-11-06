const  assert = require('assert');
const { constants } = require('./constants');
const { csvToJSON } = require("./csvToJSON");

// IFEE
;(async () => {

    {
        const filePath = './mocks/emptyFile-invalid.csv';
        const expected = new Error(constants.error.FILE_LENGTH_ERROR_MESSAGE);
        const result =  csvToJSON(filePath)

        assert.rejects(result,expected);
    }

    {
        const filePath = './mocks/invalid-header.csv';
        const expected = new Error(constants.error.FILE_FIELDS_ERROR_MESSAGE);

        expect(() =>  csvToJSON(filePath)).toThrow(expected);
    }

    {
        const filePath = './mocks/fiveItems-invalid.csv';
        const expected = new Error(constants.error.FILE_LENGTH_ERROR_MESSAGE);

        expect(() =>  csvToJSON(filePath)).toThrow(expected);
    }
    {
        const filePath = './mocks/threeItems-valid.csv';
        const expected = [
            {
                id: '1',
                name: "xuxa da silva",
                profession: "developer",
                age: '120'
            },
            {
                id: '2',
                name: "jose da silva",
                profession: "manager",
                age: '30'
            },
            {
                id: '3',
                name: "zezin",
                profession: "QA",
                age: '25'
            },
        ];
        const result = await csvToJSON(filePath);

        expect(result).toStrictEqual(expected);
    }
});
