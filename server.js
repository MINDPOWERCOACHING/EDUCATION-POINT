const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('./'));

// Load result data
const results = JSON.parse(fs.readFileSync('results.json', 'utf8'));

// API Endpoint
app.post('/get-result', (req, res) => {
  const { class: className, stream, name, roll } = req.body;

  const result = results[className]?.[stream]?.[roll];
  if (result && result.name.toLowerCase() === name.toLowerCase()) {
    res.json({ success: true, marks: result.marks });
  } else {
    res.json({ success: false, message: 'Result not found!' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(Server is running on http://localhost:${PORT});
});
