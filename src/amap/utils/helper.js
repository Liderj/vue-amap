// import AError from '../error'

export default {

  equals(v1, v2) {
    if (typeof v1 === 'number' && typeof v2 === 'number' && v1 === v2) {
      return true;
    }

    if (typeof v1 === 'string' && typeof v2 === 'string' && v1 === v2) {
      return true;
    }

    if (Array.isArray(v1) && Array.isArray(v2)) {
      if (v1.length === v2.length) {
        return !v1.some((v, k) => v !== v2[k]);
      }
    }

    return false;
  },

  uppercaseFirst(str) {
    return str.replace(/(\w)/, function(v) {
      return v.toUpperCase();
    });
  }
};
