import path from "path";
import fs, { Stats, readFile } from "fs";

//conviert la ruta a absoluta
const toAbsolute = (route) => {
  return path.isAbsolute(route) ? route : path.resolve(route);
};
//obtenemos las estadisticas de la ruta para verificar si es un archivo
const getstat = (route) => { 
 return new Promise((resolve, reject) => {
    fs.stat(route,(error,stats)=>{
        if(error){
            reject(error);
        };
       resolve(stats);
    });
});
}
//se lee los archivos
const readFileLinks = (route) => {
  return new Promise((resolve, reject) => {
    fs.readFile(route, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } 
      else {
        resolve (data);
      }
    });
  });
};
// se obtienen los link
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
}
// es directorio
const directory  = (absolutePath) => {
  return statSync(absolutePath).isDirectory();
}
//verifica si los archivos son MD
const isMD = (file)=> {
    return path.extname(file)===".md";
}
//leer los archivos Md y extraer
//tiene links y los guarda en un array
//opcion existe
//Leer archivos Md y obtener links href, text, file.
//Opcions existe.
//Verificar si validate es verdadero y obtener href,text,file,status,ok.
//Si validate es falso, obtener href,text,file.
//Verificar stats y obtener total y unique.
//Verificar Stats-Validate y obtener total, unique, broken.

export { toAbsolute, readFileLinks, getLinks, directory, getstat,isMD };
