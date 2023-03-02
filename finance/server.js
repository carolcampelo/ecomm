const app = require('./index.js');

const port = 3004;

app.listen(port, () => {
  console.log(`Server listening on ${port}.`);
});
