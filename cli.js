import { argv } from "process"; // libreria para leer argumentos de la terminal
// importo  mdLinks
import { mdLinks } from "./components.js";
import chalk from "chalk";

const CLI = () => {
  const path = argv[2];
  const validate = argv.includes("--validate");
  const stats = argv.includes("--stats");
  const help = argv.includes("--help");

  if (argv[2] === undefined) {
    console.log(
      chalk.cyan(`Por favor, entrar a path ${chalk.green.bold("--help")}.`)
    );
  } else if (help) {
    {
      console.log(chalk("Usage: md-link <path-to-file> [options]"));
      console.log(chalk.bold("\nOptions:"));
      
      return;
    }
  }
};
