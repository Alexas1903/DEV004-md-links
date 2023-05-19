import { mdLinks } from "./components.js"
import chalk from "chalk";

const path = "./README.md";
mdLinks(path)
.then((links) => console.log(links))
  .catch((err) => console.error(err));

console.log(chalk.blue('mdLinksByAlexa'));
console.log("hola mundo");
