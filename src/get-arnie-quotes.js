const { httpGet } = require('./mock-http-interface');

const mapResponse = response => {
  const responseBody = JSON.parse(response.body);
  return response?.status === 200 ? { 'Arnie Quote': responseBody.message } : { 'FAILURE': responseBody.message };
};

const getArnieQuotes = async urls => {
  if (!urls || urls.length === 0) {
    return [];
  }

  return (await Promise.all(urls.map(url => httpGet(url))))?.map(response => mapResponse(response));
};

module.exports = {
  getArnieQuotes,
};
