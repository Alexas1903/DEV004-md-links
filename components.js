import {
  
  readAndGetFileLinks,
  getstat,
  isMD,
  validateLinks,
  getLinks,
  directoryTrue,
  
} from "./api.js";
import path from "path";
import fs, {readdirSync } from "fs";

export const mdLinks = (route, options) => {
  const absolutePath = path.resolve(route);
  return new Promise((resolve, reject) => {
    getstat(absolutePath).then((stat) => {
      if (stat.isFile()) {
        if (isMD(absolutePath)) {
          // resolve("ok is file");
          readAndGetFileLinks(absolutePath)
            .then((data) => {
             // console.log("esto es data", data);
              // resolve(data)
               console.log( getLinks(data, absolutePath), '********')
              const array3props = getLinks(data, absolutePath);
              validateLinks(array3props).then((algo) => {
                resolve(algo);
              })
            })
            .catch((error) => reject(error));
         }
      }else if (directoryTrue(absolutePath)) {
       // console.log("entro al directorio")
        const files = readdirSync(absolutePath);
        files.forEach(element => { 
          const path = `${absolutePath}/${element}`; // concatenamos el path del directorio con el nombre del archivo/directorio
          mdLinks(path);
          
        });
      }else {
        reject(error);
        }
        
      })
    })
  }
  

