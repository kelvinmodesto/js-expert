const [nodePath, filePath, ...commands] = process.argv;

function parseArguments(commands) {
  const cmd = new Map();
  const CMD_PREFIX = '--';

  for (const key in commands) {
    const index = parseInt(key);
    const command = commands[key];

    if (!command.includes(CMD_PREFIX)) continue;

    cmd.set(command.replace(CMD_PREFIX, ''), commands[index + 1]);
  }

  return Object.fromEntries(cmd);
}

console.log(parseArguments(commands));
