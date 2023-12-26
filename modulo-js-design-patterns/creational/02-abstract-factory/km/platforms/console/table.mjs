import chalk from 'chalk';
import chalkTable from 'chalk-table';
import TableComponent from '../../shared/base/tableComponent.mjs';

export default class TableConsoleComponent extends TableComponent {
  render(data) {
    const columns = this.processData(data);
    const options = {
      leftPad: 2,
      columns,
    };

    const table = chalkTable(options, data);

    console.log(table);
  }
  processData(data) {
    const [headerLine] = data;
    const headers = Object.keys(headerLine);
    const formatHeader = (data, index) =>
      index % 2 === 0 ? chalk.yellow(data) : chalk.cyan(data);

    const columns = headers.map((item, index) => ({
      field: item,
      name: formatHeader(item, index),
    }));

    return columns;
  }
}
