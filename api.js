import path from "path";
import fs, { readFile, statSync, existsSync, readdirSync } from "fs";
import fetch from "node-fetch";

// path existe
const isPath = (path) => existsSync(path);


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
const directoryTrue = (absolutePath) => {
  return statSync(absolutePath).isDirectory();
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
//lee y 
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
//obtiene la lista de directorios
/*const liDirectory = (absolutePath) => { //C:\Users\alexa\OneDrive\Escritorio\proyecto 4 MD links\DEV004-md-links\prueba/directorioprueba/*
  let readFilePromises = [];
  const files = readdirSync(absolutePath);//[directorioprueba]

  files.forEach((file) => {
    const path = `${absolutePath}/${file}`; // concatenamos el path del directorio con el nombre del archivo/directorio
    //C:\Users\alexa\OneDrive\Escritorio\proyecto 4 MD links\DEV004-md-links\prueba/directorioprueba
    if (directoryTrue(path)) {
      const result = liDirectory(path); // recursividad
    //  
      readFilePromises = readFilePromises.concat(result);
      console.log(`lista de directorio ${path}`, readFilePromises)
      //
    }
  })
  return readFilePromises;
}*/
const liDirectory = (absolutePath) => { //C:\Users\alexa\OneDrive\Escritorio\proyecto 4 MD links\DEV004-md-links\prueba/directorioprueba/*
 
  const files = readdirSync(absolutePath);//[directorioprueba, prueba.md, prueba1.md, prueba1]

}

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
  getLinks,
  getstat,
  isMD,
  readAndGetFileLinks,
  validateLinks,
  directoryTrue,
  liDirectory
};
