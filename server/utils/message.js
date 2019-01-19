const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().toLocaleString()
  };
};

const generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: new Date().toLocaleString()
  };
};


module.exports = { generateMessage, generateLocationMessage };