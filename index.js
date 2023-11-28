const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3002; // Choisissez le port que vous préférez

app.use(cors()); // Activez CORS pour toutes les routes
app.use(express.json());

app.get('/api/players/:playerName', async (req, res) => {
  try {
    const playerName = req.params.playerName;
    const response = await axios.get(`https://transfermarkt-api.vercel.app/players/search/${playerName}?page_number=1`, {
      timeout: 20000,
    });
    res.json(response.data);
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des données:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/playersdetail/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const response = await axios.get(`https://transfermarkt-api.vercel.app/players/${id}/transfers`, {
      timeout: 20000,
    });
    res.json(response.data);
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des données:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Le serveur backend est en écoute sur le port ${port}`);
});
