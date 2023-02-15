// Set up express server
const app = require('./app')
const port = process.env.PORT || '3003'

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});