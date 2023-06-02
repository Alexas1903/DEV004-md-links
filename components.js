

import { toAbsolute,getstat,isMD, readFileLinks } from "./api.js";


export const mdLinks = (path, opctions) => {
    const absolutePath = toAbsolute(path);
    return new Promise((resolve, reject) => {
      getstat(absolutePath).then((stat) => {
        if(stat.isFile()){
          if(isMD(absolutePath)){
          const arrLinks = readFileLinks(absolutePath);
          reject(new Error('la ruta no existe'));
          }
          else{
            resolve (arrLinks);
            console.log('arrLinks');
          }
        }
      })
     
    });
}


