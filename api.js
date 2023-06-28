import path from "path";
import fs, { readFile, statSync, existsSync, readdirSync } from "fs";
import "node-fetch";



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
  match.map((arr) => {
    // console.log(arr, '-------------------------');
    links.push({
      href: arr.match(/https*?:([^"')\s]+)/)[0], // url encontrada
      text: arr.match(/\[(.*)\]/)[1], // texto que representa el enlace
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

const liDirectory = (absolutePath) => { //C:\Users\alexa\OneDrive\Escritorio\proyecto 4 MD links\DEV004-md-links\prueba/directorioprueba/*
 
  const files = readdirSync(absolutePath);//[directorioprueba, prueba.md, prueba1.md, prueba1]

}

const validateLinks = (array) => {
  return new Promise((resolve) => {
    fetch(array.href)
      .then((res) => {
        array.status = res.status;
        array.ok = res.statusText;
        resolve(array);
      })
      .catch((err) => {
        array.status = err.status || 500;
        array.ok = err.statusText || "Internal Server Error";
        resolve(array);
      });
  });
}

export {
  isPath,
  getLinks,
  getstat,
  isMD,
  readAndGetFileLinks,
  validateLinks,
  liDirectory
};