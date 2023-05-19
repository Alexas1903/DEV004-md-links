//import  error  from "console";
import fs from "fs";
//import https from "https";
import path from "path";
import chalk from "chalk";

//leer ruta ...extrae los links del archivo, si hay error rechaza la promesa sino busca 
//enlaces con una expresion regular
export const mdLinks = (route, opctions) => {
    const absolutePath = path.isAbsolute(route) ? route : path.resolve(route);//convierte ruta a absolta
    return new Promise((resolve, reject) => {
        fs.readFile(absolutePath, 'utf-8', (err, data) => {
            if (err) {
              reject(err);
            } else {
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
             resolve(links);
            }


    });
    });
}


