const express = require("express");
const creaturesRouter = express.Router();

const { requireUser } = require("./utils");

const {
  getAllCreatures,
  createCreature,
  // updateCreature,
  // getCreaturebyCategory,
} = require("../db");

// get all creatures
creaturesRouter.get("/", async (req, res, next) => {
  try {
    const allCreatures = await getAllCreatures();

    if (allCreatures) {
      res.send({
        allCreatures
      })
    }else{
      res.send({
        message: "Error getting creatures."
      })
    };
  } catch (error) {
    next(error);
  }
});


// create a creature
creaturesRouter.post('/', async (req, res, next) => {
  try {
    if(req.user.admin){ //user is an admin, idk if this is right

      const { creatureid, name, price, stock, environment, size, food, temper } = req.body;
      if (!creatureid || !name || !price || !stock || !environment || !size || !food || !temper) { //if data is missing
        next({
          name: "MissingDataError",
          message: "Please provide all info for this creature."
        });

      }
      else {
        // creatue creature
        const newCreature = await createCreature({ creatureid, name, price, stock, environment, size, food, temper });
        res.send({newCreature});

      }
    }
    else{ //user is not an admin 
      next({
        name: 'NoUserError',
        message: 'You must be an admin.'
      });

    }
    
  } catch (error) {
    next(error)
  }
})

module.exports = creaturesRouter;
