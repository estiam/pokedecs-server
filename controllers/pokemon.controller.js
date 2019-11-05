const Pokemon = require('../models/pokemon.model.js');

// Create and Save a new Pokemon
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Pokemon name can not be empty"
        });
    }

    // Create a Pokemon
    const pokemon = new Pokemon({
        name: req.body.name,
        description: req.body.description,
        captured: req.body.captured,
        type: req.body.type,
        attacks: req.body.attacks,
        image: req.body.image
    });

    // Save Pokemon in the database
    pokemon.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Pokemon."
        });
    });
};

// Retrieve and return all Pokemons from the database.
exports.findAll = (req, res) => {
    Pokemon.find()
    .then(pokemons => {
        res.send(pokemons);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving pokemons."
        });
    });
};

// Find a single Pokemon with a pokemonId
exports.findOne = (req, res) => {
    Pokemon.findById(req.params.pokemonId)
    .then(pokemon => {
        if(!pokemon) {
            return res.status(404).send({
                message: "Pokemon not found with id " + req.params.pokemonId
            });            
        }
        res.send(pokemon);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Pokemon not found with id " + req.params.pokemonId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving pokemon with id " + req.params.pokemonId
        });
    });
};

// Update a Pokemon identified by the pokemonId in the request
exports.update = (req, res) => {
    // Find pokemon and update it with the request body
    Pokemon.findById(req.params.pokemonId)
    .then(pokemon => {
        if(!pokemon) {
            return res.status(404).send({
                message: "Pokemon not found with id " + req.params.pokemonId
            });            
        }
        Pokemon.findByIdAndUpdate(req.params.pokemonId, {
            name: req.body.name ? req.body.name : pokemon.name,
            description: req.body.description ? req.body.description : pokemon.description,
            captured: req.body.captured != null ? req.body.captured : pokemon.captured,
            type: req.body.type ? req.body.type : pokemon.type,
            attacks: req.body.attacks ? req.body.attacks : pokemon.attacks,
            image: req.body.image ? req.body.image : pokemon.image
        }, {new: true})
        .then(pokemon => {
            if(!pokemon) {
                return res.status(404).send({
                    message: "Pokemon not found with id " + req.params.pokemonId
                });
            }
            res.send(pokemon);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Pokemon not found with id " + req.params.pokemonId
                });                
            }
            return res.status(500).send({
                message: "Error updating pokemon with id " + req.params.pokemonId
            });
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Pokemon not found with id " + req.params.pokemonId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving pokemon with id " + req.params.pokemonId
        });
    });
};

// Delete a Pokemon with the specified pokemonId in the request
exports.delete = (req, res) => {
    Pokemon.findByIdAndRemove(req.params.pokemonId)
    .then(pokemon => {
        if(!pokemon) {
            return res.status(404).send({
                message: "Pokemon not found with id " + req.params.pokemonId
            });
        }
        res.send({message: "Pokemon deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Pokemon not found with id " + req.params.pokemonId
            });                
        }
        return res.status(500).send({
            message: "Could not delete pokemon with id " + req.params.pokemonId
        });
    });
};