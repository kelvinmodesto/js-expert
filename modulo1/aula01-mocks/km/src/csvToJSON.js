const { readFile } = require('fs/promises');
const { constants } = require('./constants.js');

const DEFAULT_OPTION = {
    maxLines: 3,
    fields: ['id', 'name', 'profession', 'age']
};

const parseCsvToJSON = (csvString) => {
    const lines = csvString.split(/\r?\n/);
    const firstLine = lines.shift();
    const header = firstLine.split(',');

    return lines.map((l) => {
        const columns = l.split(',');
        const user = {};

        for(const index in columns) {
            user[header[index]] = columns[index].trim();
        }

        return user;
    });
}

/**
 *
 * @param {string} csvString
 * @param {object} options
 * @param {number} options.maxLines
 * @param {string[]} options.fields
 */
const isValid = (csvString, options = DEFAULT_OPTION) => {
    const [header, ...fileWithoutHeader] = csvString.split(/\r?\n/);
    const isHeaderValid = header === options.fields.join(',');
    if(!isHeaderValid) {
        return {
            error: constants.error.FILE_FIELDS_ERROR_MESSAGE,
            valid: false
        };
    }

    if(
        !fileWithoutHeader.length ||
        fileWithoutHeader.length > options.maxLines
    ) {
        return {
            error: constants.error.FILE_LENGTH_ERROR_MESSAGE,
            valid: false
        }
    }

    return { valid: true };
}
/**
 *
 * @param {string} filePath
 */
async function csvToJSON(filePath) {
    const content = await readFile(filePath, "utf-8");
    const validation = isValid(content);

    if (!validation.valid) throw new Error(validation.error);

    const result =  parseCsvToJSON(content);
    return result;
}

module.exports = { csvToJSON }
