const objectValuesToLowerCase = <T extends Object>(obj: T) => {
  if (typeof obj !== 'object') return obj;

  for(const prop in obj) {
    if (typeof obj[prop] === 'object') {
      obj[prop] = objectValuesToLowerCase(obj[prop]);
    } else if (typeof obj[prop] === 'string') {
      obj[prop] = (obj[prop] as any).toLowerCase() as any;
    }
  }

  return obj;
};

export default objectValuesToLowerCase;
