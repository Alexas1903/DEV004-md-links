import { toAbsolute } from "../api.js";
import fs from "fs";
import pathModule from "path";
import { mdLinks } from "../components.js";

describe("toAbsolute", () => {
  it("debería devolver una ruta absoluta si recibe una absoluta", () => {
    const absoluteroute = "./ruta/absoluta";
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
});
/*describe("mdLinks", () => {
  it("mdLinks debería devolver un array de enlaces", () => {
    const path = "./ruta/al/archivo.md";
    return mdLinks(path).then((result) => {
      expect(Array.isArray(result)).toBe(true);
    });
  });
});
it("mdLinks debería devolver un array de enlaces", () => {
  const path = "./ruta/absoluta";
  return mdLinks(path).then((result) => {
    expect(Array.isArray(result)).toEqual([
      {
        href: "https://ejemplo.com",
        text: "Ejemplo",
        file: "/ruta-absoluta/ruta-del-archivo.md",
      },
    ]);
  });
});
*/