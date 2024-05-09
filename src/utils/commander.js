const { Command } = require("commander");
const program = new Command();

program.option("--mode <mode>", "Modo de trabajo", "Produccion");
program.parse();

module.exports = program;
