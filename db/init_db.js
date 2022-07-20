const client  = require("./client");
const { user } = require('.');    

 // drop tables in correct order
async function dropTables() {
      try {    
    console.log("Drop tables...");
   
    await client.query(`
        DROP TABLE IF EXISTS history;
        DROP TABLE IF EXISTS cart;
        DROP TABLE IF EXISTS creature;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS address;
      `);

    console.log("Tables dropped successfully!");
  } catch (error) {
    console.error("Error dropping tables!");
  }
}

// build tables in correct order
async function createTables() {
  try {
      console.log("Starting to build tables...");

      await client.query(`

          CREATE TABLE address (
            addressid SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            firstname VARCHAR(255) NOT NULL,
            lastname VARCHAR(255) NOT NULL,
            street VARCHAR(255) NOT NULL,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            zip VARCHAR(255) NOT NULL,
            payment VARCHAR(255) NOT NULL,
            currency VARCHAR(255) NOT NULL
          );
          CREATE TABLE users (
            userid SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
          );
          CREATE TABLE creature (
            creatureid SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price VARCHAR(255) NOT NULL,
            stock VARCHAR(255) NOT NULL,
            environment VARCHAR(255) NOT NULL,
            size VARCHAR(255) NOT NULL,
            food VARCHAR(255) NOT NULL,
            temper VARCHAR(255) NOT NULL
          );
          CREATE TABLE cart (
            cartid SERIAL PRIMARY KEY,
            userid INTEGER REFERENCES users(userid) NOT NULL,
            creatureid INTEGER REFERENCES creature(creatureid) NOT NULL,
            count VARCHAR(255) NOT NULL,
            payment VARCHAR(255) NOT NULL
          );
          CREATE TABLE history (
            historyid SERIAL PRIMARY KEY,
            creatureid INTEGER REFERENCES creature(creatureid) NOT NULL,
            price VARCHAR(255) NOT NULL,
            count VARCHAR(255) NOT NULL,
            status VARCHAR(255) NOT NULL,
            date VARCHAR(255) NOT NULL
          );
      `);

          console.log("Tables created successfully!");
  } catch (error) {
          console.error("Error creating tables!"+error);
  }
}      
/*   -------------------------------GIVEN CODE?
}
async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    console.error("Error of throws!");
  }
}
*/

async function createInitialUsers() {
  console.log("Starting to create users...")
  try {
    const usersToCreate = [
      { username: "moby", password: "mobymoby" },
      { username: "squanchie", password: "jerryisdumb" },
      { username: "docbrown", password: "backtothefuture" },
    ]
    const users = await Promise.all(usersToCreate.map(user.createUser))

    console.log("Users created:")
    console.log(users)
    console.log("Finished creating inital users!")
  } catch (error) {
    console.error("Error creating initial users!"+error)
  }
}


async function createInitialAddress() {
  try {
    console.log("Creating address...");

    await creatAddress({ 
      firstname: 'moby', 
      Lastname: 'bukhari',
      street: '123 main street',
      city: 'washington',
      state:"DC",
      zip:"20009",
      payment:"paypal" 
    });

    console.log("Finished creating address!");
  } catch (error) {
    console.error("Error creating address!");
    throw error;
  }
}


async function createInitialCreatures() {
  try {
    console.log("Creating creatures...")

    const CreaturesToCreate = [
      {
        name: "626 Stitch",
        price: "$5000 USD",
        stock: "1",
        environment: "land",
        size: "M",
        food: "omnivore",
        temper: "stubborn"
      },
      {
        name: "150 Butter Robot",
        price: "$750 USD",
        stock: "10",
        environment: "land",
        size: "S",
        food: "electricity",
        temper: "compliant"
      },
      {
        name: "123 Mogwai",
        price: "$1000 USD",
        stock: "999",
        environment: "land",
        size: "S",
        food: "Omnivore",
        temper: "Varies"
      },
    ]
    const creatures = await Promise.all(creaturesToCreate.map(createCreatures))

    console.log("creatures created:")
    console.log(creatures)

    console.log("Finished creating creatures!")
  } catch (error) {
    console.error("Error creating creatures!")
    throw error
  }
}


async function rebuildDB() {
  try {
    client.connect()

    await dropTables()
    await createTables()

  } catch (error) {
    console.log("Error during rebuildDB")
  }
}


  rebuildDB()
  .then(createInitialUsers, createInitialCreatures, createInitialAddress)
  .catch(console.error)
  .finally(() => client.end());


  module.exports = {
    rebuildDB,
    dropTables,
    createTables,
  }