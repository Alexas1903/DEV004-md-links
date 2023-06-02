import path from "path";
import fs, { Stats, readFile, statSync, readdirSync } from "fs";

//conviert la ruta a absoluta
const toAbsolute = (route) => {
  return path.isAbsolute(route) ? route : path.resolve(route);
};
//obtenemos las estadisticas de la ruta para verificar si es un archivo
const getstat = (route) => {
  return new Promise((resolve, reject) => {
    fs.stat(route, (error, stats) => {
      if (error) {
        reject(error);
      }
      resolve(stats);
    });
  });
};
//se lee los archivos
const readFileLinks = (route) => {
  return new Promise((resolve, reject) => {
    fs.readFile(route, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
//verifica si los archivos son MD
const isMD = (file) => {
  return path.extname(file) === ".md";
};
//Leer archivos Md y obtener links href, text, file.
const getLinks = (data) => {
  const regex = /\[(?<text>.*?)\]\((?<url>https?:\/\/[^\s)]+)(?<!#)\)/g;
  const links = [];
  let match;
  while ((match = regex.exec(data)) !== null) {
    links.push({
      href: match[2], // url encontrada
      text: match[1], // texto que representa el enlace
      file: absolutePath, // archivo en el que se encontró el enlace
    });
  }
  return links;
};
// es directorio
const directoryTrue = (absolutePath) => {
  return statSync(absolutePath).isDirectory();
};
// lee los archivos del directorio
const directoryFiles = (absolutePath) => {
  let readFileDir = [];
  const filesDir = readdirSync(absolutePath);

  filesDir.forEach((file) => {
    const path = `${absolutePath}/${file}`;
    if (directoryTrue(path)) {
      const result = directoryFiles(path); // recursividad
      readFileDir = readFileDir.concat(result);
    } else if (isMD(path)) {
      // si es md se lee el archivo
      readFileDir.push(getLinks(path)); // tiene que retornar un array de promesas o archivos??. Si es de promesas se agrega readFileAndSearchLinks antes de path
    }
  });

  return Promise.all(readFileDir);
};

//opcion existe

//Leer archivos Md y obtener links href, text, file.
//Opcions existe.
//Verificar si validate es verdadero y obtener href,text,file,status,ok.
//Si validate es falso, obtener href,text,file.
//Verificar stats y obtener total y unique.
//Verificar Stats-Validate y obtener total, unique, broken.

export {
  toAbsolute,
  readFileLinks,
  getLinks,
  getstat,
  isMD,
  directoryTrue,
  directoryFiles,
};
