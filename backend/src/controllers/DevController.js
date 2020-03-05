const axios = require('axios');
const Dev =  require('../models/Dev');
const parseArrayAsString = require('../utils/parseStringAsArray');

module.exports = {
  async index(req, res) {
    const dev = await Dev.find();

    return res.json(dev);
  },
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });
    
    // dont create if user already exists
    if (dev) return;

    const techsArray = parseArrayAsString(techs);
    
    const response = await axios.get(`https://api.github.com/users/${github_username}`);
  
    const { name = login, avatar_url, bio  } = response.data;
    
    const location = {
      type: 'Point',
      coordinates: [longitude, latitude], // longiture, latitude
    }

    dev = await Dev.create({
      github_username,
      name,
      bio,
      avatar_url,
      techs: techsArray,
      location
    });

    return res.json(dev);
  },
  async find(req, res) {
    const { latitude, longitude, techs } = req.query;

    const techsArray = parseArrayAsString(techs);

    const devs = await Dev.find({
      techs:{
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude], // mongo always require first longitude
          },
          $maxDistance: 10000,
        },
      },
    });

    return res.json({ devs });
  },
  async update(req, res) {
    const userId = req.params.id;
    const dev = await Dev.find({ _id: userId });

    if(!dev) return res.json({ error: 'Usuário não existe' });

    const { name, techs, avatar_url = dev.avatar_url } = req.body;

    const updatedDev = await Dev.findByIdAndUpdate(userId, { name, techs, avatar_url });

    return res.json({ dev: updatedDev });

  },
  async destroy(req, res) {
    const userId = req.params.id;
    
    const dev = await Dev.findByIdAndDelete(userId);

    return res.json({ dev });
  },
}