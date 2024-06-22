const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const config = require('./config/config.ts');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Add this line to parse JSON bodies

const emailRoutes = require('./routes/emailRoutes');
const searchRoutes = require('./routes/searchRoutes');
const downloadReportsRoutes = require('./routes/downloadReportsRoutes');

app.use('/email', emailRoutes);
app.use('/search', searchRoutes);
app.use('/downloadReports', downloadReportsRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = config.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
