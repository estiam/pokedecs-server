const mongoose = require('mongoose');

const PokemonSchema = mongoose.Schema({
    name: String,
    description: String,
    captured: Boolean,
    type: String,
    attacks: String,
    image: String
});

module.exports = mongoose.model('Pokemon', PokemonSchema);
