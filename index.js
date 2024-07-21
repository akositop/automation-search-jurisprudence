const { processSearches } = require('./modules/processSearches');

(async () => {
  await processSearches();
})();