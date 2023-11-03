import { readFile } from 'fs/promises';
import { error } from './constants.js';

const DEFAULT_OPTION = {
    maxLines: 3,
    fields: ['id', 'name', 'profession', 'age']
};

const parseCsvToJSON = () => {

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
            error: error.FILE_FIELDS_ERROR_MESSAGE,
            valid: false
        };
    }
    return { valid: true };
}
/**
 *
 * @param {string} filePath
 */
export const csvToJSON = async (filePath) => {
    const content = await readFile(filePath, 'utf8');
    const validation = isValid(content);

    if(!validation.valid) throw new Error(validation.error);
}
