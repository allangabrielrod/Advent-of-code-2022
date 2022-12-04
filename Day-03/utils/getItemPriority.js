const UpperCaseAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LowercaseAlphabet = UpperCaseAlphabet.toLowerCase();

const getItemPriority = (item) => {
  return LowercaseAlphabet.includes(item)
    ? LowercaseAlphabet.indexOf(item) + 1
    : UpperCaseAlphabet.indexOf(item) + 27;
};

module.exports = {
  getItemPriority,
};
