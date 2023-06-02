import { toAbsolute, getstat, isMD, readFileLinks, getLinks } from "./api.js";

export const mdLinks = (path, options) => {
  const absolutePath = toAbsolute(path);
  return new Promise((resolve, reject) => {
    getstat(absolutePath).then((stat) => {
      if (stat.isFile()) {
        if (isMD(absolutePath)) {
          const arrLinks = readFileLinks(absolutePath);
          let links = [];

          if (arrLinks) {
            links = getLinks(absolutePath);
            resolve(links);
          } else {
            reject(new Error("No se pueden obtener los links"));
          }

          //console.log("links",links);
        } else {
          reject(new Error("El archivo no es un archivo Markdown (.md)"));
        }
      } else {
        reject(new Error("La ruta no existe"));
      }
    });
  });
};
