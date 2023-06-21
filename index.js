#!/usr/bin/env node
import { mdLinks } from "./components.js";
import chalk from "chalk";
import { argv } from "process"; // libreria para leer argumentos de la terminal
// importo  mdLinks
console.log("hola");


const CLI = () => {
  const path = argv[2];
  const validate = argv.includes("--validate");
  const stats = argv.includes("--stats");
  const help = argv.includes("--help");

  if (argv[2] === undefined) {
    console.log(
      chalk.cyan(`Por favor, entrar a path ${chalk.yellow("--help")}.`)
    );
  } else if (help) {
    
      console.log(chalk("Usage: md-link <path-to-file> [options]"));
      console.log(chalk.bold("\nOptions:"));
      console.log(chalk.green("\t only path"));
      console.log(chalk.green("\t--validate"));
      console.log(chalk.green("\t--stats"));
      console.log(chalk.green("\t--validate --stats"));
      console.log("\n");

    // ...
  } else if (path  && !validate && !stats ) {

      mdLinks(path, {validate:false})
        .then((links) => console.log(links))
        .catch((err) => console.error(err));
    
  }
  else if( path && validate && !stats ){
    mdLinks(path, {validate:true})
    .then((links) => console.log(links))
    .catch((err) => console.error(err));

  }
};

CLI();


//const path = "./prueba/prueba1.md";
/*const path = "./README.md";
mdLinks(path)
  .then((links) => console.log(links))
  .catch((err) => console.error(err));

console.log(
  chalk.blue(
    "*********************mdLinksByAlexa************************************\n"
  )
);*/
