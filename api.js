import path from "path";
import fs, {
  Stats,
  readFile,
  statSync,
  readdirSync,
  stat,
  existsSync,
} from "fs";

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
  match.map((elem)=>{
    // console.log(elem, '-------------------------');
    links.push({
            href:  elem.match(/https*?:([^"')\s]+)/)[0], // url encontrada
            text: elem.match(/\[(.*)\]/)[1], // texto que representa el enlace
            file: absolutePath, // archivo en el que se encontró el enlace
          });

  })
  // console.log(links, 'links++++++++');
  return links;

//   const links = [];
//   let match;
//   while ((match = regex.exec(data)) !== null) {
//     console.log(match, 'mathc');
//     links.push({
//       href: match[2], // url encontrada
//       text: match[1], // texto que representa el enlace
//       file: absolutePath, // archivo en el que se encontró el enlace
//     });
//     return links;
// //     str.match(/[^!]\[.+?\]\(.+?\)/g);
// // elm.match(/https*?:([^"')\s]+)/)
// // elm.match(/\[(.*)\]/)[1]
//   }
};
//se lee y obtiene los links
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
    })
  });
  return Promise.all(total);
};

// lee los archivos del directorio
// const directoryFiles = (absolutePath) => {
//   let readFileDir = Promise.resolve([]);
//   const filesDir = readdirSync(absolutePath);

//   filesDir.forEach((file) => {
//     const path = `${absolutePath}/${file}`;
//     if (directoryTrue(path)) {
//       const result = directoryFiles(path); // recursividad
//       readFileDir = readFileDir.concat(result);
//     } else if (isMD(path)) {
//       readFileDir.push(readFileLinks(path).then((data) => getLinks(data, path)))
//     }
//   });
//   readFileDir = Promise.all(readFileDir)
//   return Promise.all(readFileDir);
// };

//opcion existe

//Verificar si validate es verdadero y obtener href,text,file,status,ok.

//Si validate es falso, obtener href,text,file.

//Verificar stats y obtener total y unique.

//Verificar Stats-Validate y obtener total, unique, broken.

export {
  isPath,
  toAbsolute,
  // readFileLinks,
  getLinks,
  getstat,
  isMD,
  directoryTrue,
  readAndGetFileLinks,
  validateLinks,
  // directoryFiles,
};
