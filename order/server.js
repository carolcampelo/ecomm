const app = require('./index.js');

const port = 3005;

app.listen(port, () => {
  console.log(`Server listening on ${port}.`);
});
