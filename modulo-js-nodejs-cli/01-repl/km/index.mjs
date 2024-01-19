import http from 'http';

// curl "localhost:3000?salary=3000&discount=15"

function liquidSalary({ salary, discount }) {
  const cost = salary * (discount / 100);
  return salary - cost;
}
