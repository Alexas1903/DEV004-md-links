import {
  toAbsolute
  
} from "../api.js";
import fs from "fs";
import pathModule from "path";

describe("toAbsolute", () => {
  it("debería devolver una ruta absoluta si recibe una absoluta", () => {
    const absoluteroute ="./ruta/absoluta";
    const expectPathAbsolute = pathModule.isAbsolute(absoluteroute);
    const absolutePath = toAbsolute(absoluteroute);
    expect(expectPathAbsolute).toBe(expectPathAbsolute); 
    
  });
  it("debería devolver la ruta absoluta si se proporciona una ruta relativa", () => {
    const relativePath = "./ruta/relativa";
    const expectedAbsolutePath = pathModule.resolve(relativePath);
    const absolutePath = toAbsolute(relativePath);
    expect(absolutePath).toBe(expectedAbsolutePath); // Verificar que se devuelva la ruta absoluta correcta
  });


  
 /* it("debería devolver una ruta absoluta si recibe una absoluta", () => {
      const absolutePath = toAbsolute("ruta\absoluta");
      expect(absolutePath).toBe(""); 
    });
 /* it("debe retornar un array de objetos con los enlaces encontrados", () => {
      const mdLinks = mdLinks("");
      expect(mdLinks('./ruta-del-archivo.md')).resolves.toEqual([
        {
          href: 'https://ejemplo.com',
          text: 'Ejemplo',
          file: '/ruta-absoluta/ruta-del-archivo.md',
        },
        
      ]);
    });
  });
    
  it('should...', () => {
    console.log('FIX ME!');*/
  });


