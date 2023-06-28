import {
  readAndGetFileLinks,
  getstat,
  isMD,
  getLinks,
  validateLinks,
} from "./api.js";
import path from "path";
import fs, { readdirSync } from "fs";
import { totalStats } from "./totalStats.js";


export const mdLinks = (route, options) => {
  const absolutePath = path.resolve(route);
  return new Promise((resolve, reject) => {
    getstat(absolutePath)
      .then((stat) => {
        if (stat.isFile()) {
          // ----------------------------------------------------------------------------------------
          if (isMD(absolutePath)) {
            readAndGetFileLinks(absolutePath)
              .then((data) => {
                // Obtener los enlaces del archivo y guardarlos en la variable array3props
                const array3props = getLinks(data, absolutePath);

                // Verificar si la opción "validate" es verdadera
                if (options && options.validate) {
                  // Crear un array de promesas de validación para cada enlace en array3props
                  const linkPromises = array3props.map((link) => {
                    return validateLinks(link);
                  });
            
                  // Esperar a que todas las promesas de validación se resuelvan
                  Promise.all(linkPromises)
                    .then((validatedLinks) => {
                      // Resolver la promesa principal con los enlaces validados
                      resolve(validatedLinks);
                    })
                    .catch((error) => reject(error));
                } else {
                  // Resolver la promesa principal con array3props si no se requiere validación
                  resolve(array3props);
                }
                if(options && options.stats){ 
                  const stats = array3props.then(linksToCalculate => totalStats(linksToCalculate, options.validate));
                  resolve(stats);
                } else {
                  resolve(array3props)
                }
              })
              .catch((error) => reject(error));
            }else {
              resolve("Not an MD file");
          }
        } else if (stat.isDirectory()) {
          ///-------------------------------------------------------------------------------
          const files = readdirSync(absolutePath); // Lee los archivos dentro del directorio
          const promises = files.map((element) => {
            const filePath = `${absolutePath}/${element}`; // Obtiene la ruta completa del archivo/directorio
            return mdLinks(filePath, options); // Llama recursivamente a mdLinks para procesar el archivo/directorio
          });
          Promise.all(promises)
            .then((results) => {
              const flattenedResults = results.flat(); // Aplana el resultado para obtener una matriz plana de enlaces
              resolve(flattenedResults); // Resuelve la promesa con la matriz de enlaces plana
            })
            .catch((error) => reject(error)); // Rechaza la promesa si ocurre un error durante el procesamiento
        } else {
          reject(new Error("Invalid path"));
        }
      })
      .catch((error) => reject(error));
  });
};
