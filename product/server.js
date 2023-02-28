import app from './src/app.js';

const port = process.env.PORT || 3002;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`);
});
