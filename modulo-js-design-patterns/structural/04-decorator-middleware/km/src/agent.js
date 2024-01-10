import Http from 'http';
async function InjectHttpInterceptor() {
  const originEmit = Http.Server.prototype.emit;

  Http.Server.prototype.emit = function (...args) {
    const [type, req, response] = args;

    if (type === 'request') {
      response.setHeader('X-Instrumented-By', 'kelvinmodesto');
    }

    return originEmit.apply(this, args);
  };
}

export { InjectHttpInterceptor };
