import path from "path";
import fs, { readFile, statSync, existsSync } from "fs";

// path existe
const isPath = (path) => existsSync(path);

//convierte la ruta a absoluta
const toAbsolute = (relativePath) => {
  return path.isAbsolute(relativePath)
    ? relativePath
    : path.resolve(relativePath);
};

//obtenemos las estadisticas de la ruta para verificar si es un archivo
const getstat = (absolutePath) => {
  return new Promise((resolve, reject) => {
    fs.stat(absolutePath, (error, stats) => {
      if (error) {
        reject(error);
      }
      resolve(stats);
    });
  });
};
// es directorio
const directoryTrue = (route) => {
  return statSync(route).isDirectory();
};

/*const listDirectory = (absolutePath) => {
  let readFilePromises = [];
  const files = readdirSync(absolutePath);

  files.forEach((file) => {
    const path = `${absolutePath}/${file}`; // concatenamos el path del directorio con el nombre del archivo/directorio
    if (directoryTrue(path)) {
      const result = listDirectory(path); // recursividad
      readFilePromises = readFilePromises.concat(result);
      console.log(`resultado directorio ${path}`, readFilePromises)
      return readFilePromises;
    }
  });
};*/

//verifica si los archivos son MD
const isMD = (file) => {
  return path.extname(file) === ".md";
};
//Leer archivos Md y obtener links href, text, file.
const getLinks = (data, absolutePath) => {
  const regex = /\[(?<text>.*?)\]\((?<url>https?:\/\/[^\s)]+)(?<!#)\)/g;
  // console.log(data.match(regex), '**************************');
  const match = data.match(regex);
  const links = [];
  match.map((elem) => {
    // console.log(elem, '-------------------------');
    links.push({
      href: elem.match(/https*?:([^"')\s]+)/)[0], // url encontrada
      text: elem.match(/\[(.*)\]/)[1], // texto que representa el enlace
      file: absolutePath, // archivo en el que se encontró el enlace
    });
  });
  // console.log(links, 'links++++++++');
  return links;
};

const readAndGetFileLinks = (file) => {
  return new Promise((resove, reject) => {
    readFile(file, "utf8", function (err, data) {
      if (err) {
        reject(err);
      } else {
        resove(data);
      }
    });
  });
};

const validateLinks = (array) => {
  const total = array.map((elem) => {
    return fetch(elem.href).then((res) => {
      // console.log(res, '--------');
      elem.status = res.status;
      elem.statusText = res.statusText;
      // console.log(elem, 'xxxxx');
      return elem;
    });
  });
  return Promise.all(total);
};

export {
  isPath,
  toAbsolute,
  getLinks,
  getstat,
  isMD,
  readAndGetFileLinks,
  validateLinks,
  directoryTrue
  //listDirectory,
};
