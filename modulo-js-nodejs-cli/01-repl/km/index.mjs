import http from 'http';

// curl "localhost:3000?salary=3000&discount=15"

function liquidSalary({ salary, discount }) {
  const cost = salary * (discount / 100);
  return salary - cost;
}

http
  .createServer((req, res) => {
    const url = req.url.replace('/', '');
    const params = new URLSearchParams(url);
    const data = Object.fromEntries(params);
    const result = liquidSalary(data);
    // debugger
    res.end(`O seu salario final é: ${result}`);
  })
  .listen(3000, () => console.log('Listening at 3000...'));
