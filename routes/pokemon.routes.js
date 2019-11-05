module.exports = (app) => {
    const pokemons = require('../controllers/pokemon.controller.js');

    // Create a new Pokemon
    app.post('/pokemons', pokemons.create);

    // Retrieve all Pokemons
    app.get('/pokemons', pokemons.findAll);

    // Retrieve a single Pokemon with pokemonId
    app.get('/pokemons/:pokemonId', pokemons.findOne);

    // Update a Pokemon with pokemonId
    app.put('/pokemons/:pokemonId', pokemons.update);

    // Delete a Pokemon with pokemonId
    app.delete('/pokemons/:pokemonId', pokemons.delete);
}
