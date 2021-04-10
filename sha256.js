const sha256 = require("sha256");
const convertTosha256 = (str) => {
  return sha256(str);
};

export default convertTosha256;
