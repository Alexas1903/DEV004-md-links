import { mdLinks } from "./components.js"
import chalk from "chalk";

const path = "./prueba/prueba1.md";
 //const path = "./README.md";
mdLinks(path)
.then((links) => console.log(links))
  .catch((err) => console.error(err));

console.log(chalk.blue('*********************mdLinksByAlexa************************************\n'));

/*calcula los stats
export const calculateStats = (links, validate = false) => {
  const count = links.length;
  const linksUniqueArray = [...new Set(links.map(link => link.href))]
  const stats = {
    total: count,
    unique: linksUniqueArray.length
  }

  if(validate) {
    stats.broken = links.reduce((accumulator, currentElement) => {
      accumulator += currentElement.status < 400 || currentElement.status == 'Es un enlace interno' ? 0 : 1;
      return accumulator;
    }, 0)
  }
return stats;
}*/