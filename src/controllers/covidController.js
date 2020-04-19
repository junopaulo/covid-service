const axios = require('axios');
const { covidEndpoint } = require('../config');



const get = async function(path) {
  try {
    const response = await axios.get(`${covidEndpoint}${path}`);
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  get
}