const bots = [
  {
    id: 0,
    name: 'Shredder',
    attack: 5,
    hp: 10
  }
];

let id = 1;

module.exports = {
  getBots: (req, res) => {
    res.status(200).send(bots);
  },
  createBot: (req, res) => {
    const { name, attack, hp } = req.body;
    bots.push({
      id,
      name,
      attack,
      hp
    });
    id++;
    res.status(200).send(bots);
  },
  deleteBot: (req, res) => {
    const { id } = req.params;

    const index = bots.findIndex(bot => bot.id == id);

    bots.splice(index, 1);

    res.status(200).send(bots);
  },
  updateBot: (req, res) => {
    const { id } = req.params;
    const { name, attack, hp } = req.body;

    let index = bots.findIndex(bot => bot.id == id);

    let foundBot = bots[index];

    foundBot = {
      id: foundBot.id,
      name: name || foundBot.name,
      attack: attack || foundBot.attack,
      hp: hp || foundBot.hp
    };

    bots.splice(index, 1, foundBot);

    res.status(200).send(bots);
  }
};
