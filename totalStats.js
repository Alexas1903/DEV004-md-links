

export const totalStats = (links, validate = false) => {
  const count = links.length;
  const linksUnique = [...new Set(links.map(link => link.href))]
  const stats = {
    total: count,
    unique: linksUnique.length
  };

  if(validate) {
    stats.broken = links.reduce((accumul, currentElement) => {
      accumul += currentElement.status < 400 || currentElement.status == 'Es un enlace interno' ? 0 : 1;
      return accumul;
    }, 0)
  };
return stats;
};
