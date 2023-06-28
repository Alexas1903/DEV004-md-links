import { validateLinks } from '../api.js';

        
//getLinks
//readAndGetFileLinks
//liDirectory
//validateLinks

describe('validateLinks', () => {
    it('should be return true if the path is a MdFile', () => {
      expect(validateLinks('..\DEV004-md-links\prueba\prueba1')).toBe(true)
    })
  
    it('should be return false if the path is not a MdFile', () => {
      expect(validateLinks('..\DEV004-md-links\prueba\prueba1')).toBe(false)
    })
  });

