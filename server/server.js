const express = require('express');
const ctrl = require('./controller');

const app = express();

app.use(express.json());

//  ENDPOINTS
app.get('/api/bots', ctrl.getBots);

app.post('/api/bot', ctrl.createBot);

app.delete('/api/bot/:id', ctrl.deleteBot);

app.put('/api/bot/:id', ctrl.updateBot);

app.listen(4000, () => console.log('Listening on port 4000'));
