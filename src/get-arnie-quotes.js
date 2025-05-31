const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  const results = [];

  // Process each URL
  const promises = urls?.map(async url => {
    const response = await httpGet(url);
    const responseBody = JSON.parse(response.body);

    if (response.status === 200) {
      results.push({ 'Arnie Quote': responseBody.message });
    } else {
      results.push({ 'FAILURE': responseBody.message });
    }
  });

  if (promises?.length) {
    // Wait for all requests to complete
    await Promise.all(promises);
  }

  return results;
};

module.exports = {
  getArnieQuotes,
};
