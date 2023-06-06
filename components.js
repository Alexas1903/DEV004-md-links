import {
  toAbsolute,
  directoryTrue,
  // directoryFiles,
  readAndGetFileLinks,
  getstat,
  isMD,
  validateLinks,
  // readFileLinks,
  getLinks,
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
      } else {
        reject("Por el momento solo leemos archivos, espera la version 2.0");
      }
    });
  });
};

     /* if (options.validate) {
        const numLinks = links.length;
        let validatedLinks = 0;
        //FIXME: cambiar a map y crear un Promise.all. Limitar numero de promesas
        links.forEach((link) => {
          fetch(link.href)
            .then((res) => {
              link.status = res.status;
              link.statusMessage = res.statusText;
              results.push(link);
            })
            .catch(() => {
              link.status = "error";
              link.statusMessage = "Link not found";
              results.push(link);
            })
            .finally(() => {
              validatedLinks++;
              if (validatedLinks === numLinks) {
                resolve(results);
              }
            });
        });
      }
    });
  });*/
