import {
  toAbsolute,
  readAndGetFileLinks,
  getstat,
  isMD,
  validateLinks,
  getLinks,
 /* directoryTrue,
  listDirectory,*/
} from "./api.js";

export const mdLinks = (path, options) => {
  const absolutePath = toAbsolute(path);
  return new Promise((resolve, reject) => {
    getstat(absolutePath).then((stat) => {
      if (stat.isFile()) {
        if (isMD(absolutePath)) {
          // resolve("ok is file");
          readAndGetFileLinks(absolutePath)
            .then((data) => {
              // resolve(data)
              // console.log( getLinks(data, absolutePath), '********')
              const array3props = getLinks(data, absolutePath);
              validateLinks(array3props).then((algo) => {
                resolve(algo);
              });
            })
            .catch((error) => reject(error));
        }
        else{
          reject ("por los momentos no leemos directorios");
        }
      /*} else if (directoryTrue(absolutePath)) {
        listDirectory(absolutePath)
        
           
            const arrayFileLinks = listDirectory(absolutePath);
            console.log(listDirectory,"***********");
            return arrayFileLinks;
          };
      */
      
      /*} else if (directoryTrue(route)) {
        listDirectory(absolutePath)
        .then(data) => {
          const arrayFileLinks = getLinks.listDirectory(data, absolutePath);
          console.log(listDirectory(absolutePath),"***********")
          return arrayFileLinks;
*/
      };
    });
  });
};

     
