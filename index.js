const express = require('express');
const axios = require('axios');

const app = express();

async function getUniqueNumbersFromUrls(urls) {
  const uniqueNumbers = new Set();

  try {
    const promises = urls.map(url => axios.get(url));
    const responses = await Promise.all(promises);

    responses.forEach(response => {
      if (response.status === 200) {
        const numbers = response.data.numbers || [];
        numbers.forEach(number => uniqueNumbers.add(number));
      }
    });
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }

  return Array.from(uniqueNumbers).sort((a, b) => a - b);
}

app.get('/numbers', async (req, res) => {
  const { url } = req.query;

  if (!url || !Array.isArray(url) || url.length === 0) {
    return res.status(400).json({ error: 'Invalid request. Please provide a valid array of URLs.' });
  }

  try {
    const uniqueNumbers = await getUniqueNumbersFromUrls(url);
    res.json({ numbers: uniqueNumbers });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});