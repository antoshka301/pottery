//SEED DATA


const client = require("./client");
const { user,
  address,
  pot,
  history,
  cart
} = require('./');

// drop tables in correct order
async function dropTables() {
  try {
    client.connect();
    console.log("Drop tables...");

    await client.query(`
        DROP TABLE IF EXISTS history_items;  
        DROP TABLE IF EXISTS history;
        DROP TABLE IF EXISTS cart_items;
        DROP TABLE IF EXISTS cart;
        DROP TABLE IF EXISTS pot;
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
            firstname VARCHAR(255) NOT NULL,
            lastname VARCHAR(255) NOT NULL,
            street VARCHAR(255) NOT NULL,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            zip INTEGER NOT NULL,
            payment VARCHAR(255) NOT NULL,
            currency VARCHAR(255) NOT NULL
          );
          CREATE TABLE users (
            userid SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            isAdmin INTEGER DEFAULT 0
          );
          CREATE TABLE pot (
            potid SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price INTEGER NOT NULL,
            stock VARCHAR(255) NOT NULL,
            size VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL
          );
          CREATE TABLE cart (
            cartid SERIAL PRIMARY KEY,
            sessionid INTEGER NOT NULL,
            userid INTEGER REFERENCES users(userid)
          );
          CREATE TABLE cart_items (
            cartid INTEGER REFERENCES cart(cartid) NOT NULL,
            potid INTEGER REFERENCES pot(potid) ON DELETE CASCADE,
            count INTEGER NOT NULL
          );
          CREATE TABLE history (
            historyid SERIAL PRIMARY KEY,
            price INTEGER NOT NULL,
            count INTEGER NOT NULL,
            status VARCHAR(255) NOT NULL,
            date VARCHAR(255) NOT NULL
          );
          CREATE TABLE history_items (
            historyid INTEGER REFERENCES history(historyid) NOT NULL,
            potid INTEGER REFERENCES pot(potid) NOT NULL,
            count INTEGER NOT NULL
          );
      `);

    console.log("Tables created successfully!");
  } catch (error) {
    console.error("Error creating tables!" + error);
  }
}

//working
async function createInitialUsers() {
  console.log("Starting to create users...")
  try {
    const usersToCreate = [
      { username: "admin", password: "admin", isAdmin: 1 },
      { username: "moby", password: "mobymoby", isAdmin: 0 },
      { username: "squanchie", password: "jerryisdumb", isAdmin: 0 },
      { username: "docbrown", password: "backtothefuture", isAdmin: 0 }
    ]
    const users = await Promise.all(usersToCreate.map(user.createUser))

    console.log("Users created:")
    console.log(users)
    console.log("Finished creating inital users!")
  } catch (error) {
    console.error("Error creating initial users!" + error)
  }
}


async function createInitialAddress() {
  console.log("Creating address...");
  try {
    const addressToCreate = [
      {
        firstname: 'Moby',
        lastname: 'Bukhari',
        street: '123 Rumplover St',
        city: 'Washington',
        state: "DC",
        zip: 20009,
        payment: "paypal",
        currency: "USD"
      },
      {
        firstname: 'Rick',
        lastname: 'Sanchez',
        street: '6910 Birdman Ave',
        city: 'Ann Arbor',
        state: "MI",
        zip: 48013,
        payment: "stripe",
        currency: "USD"
      },
      {
        firstname: 'Emmet',
        lastname: 'Brown',
        street: '1640 Candyland Ln',
        city: 'Hillside',
        state: "CA",
        zip: 90210,
        payment: "stripe",
        currency: "USD"
      }
    ]
    const addresses = await Promise.all(addressToCreate.map(address.createAddresses))

    console.log("address created:")
    console.log(addresses)
    console.log("Finished creating address!");
  } catch (error) {
    console.error("Error creating address!");
    throw error;
  }
}

async function createInitialPottery() {
  console.log("Creating creatures...")
  try {
    const potteryToCreate = [
      {
        name: "Quilted White Mug on Brown Clay",
        price: 40,
        stock: 10,
        size: "S",
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/1.jpg?alt=media&token=5467d121-98f2-4d18-96ab-d57cec6dafe4"
      },
      {
        name: "Ridged Speckled Aqua Mug",
        price: 26,
        stock: 10,
        size: "S",
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/2.jpg?alt=media&token=1476996c-9e08-41dc-a32a-566165f3966e"
      },
      {
        name: "Tall White and Emerald Striped Mug on Natural Clay",
        price: 38,
        stock: 10,
        size: "S",
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/3.jpg?alt=media&token=d7672a92-9661-4b24-ba12-39dd5bdf7d2f"
      },
      {
        name: "Blue Carved Mug on Brown Clay",
        price: 35,
        stock: 10,
        size: "S",
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/4.jpg?alt=media&token=e9db48bb-b426-492f-9e57-4cbc94ab7f3d"
      },
      {
        name: "Blue and Brown Blend Mug",
        price: 24,
        stock: 10,
        size: "S",
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/5.jpg?alt=media&token=b121ceb7-551d-44f4-9c70-783c1ac5ea3f"
      },
      {
        name: "Blue and Brown Blend Mug",
        price: 24,
        stock: 10,
        size: "S",
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/5.jpg?alt=media&token=b121ceb7-551d-44f4-9c70-783c1ac5ea3f"
      },
      {
        name: "Short White and Emerald Striped Mug on Natural Clay",
        price: 30,
        stock: 10,
        size: "S",
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/6.jpg?alt=media&token=cc6c9e10-0326-4ba4-810d-ce72ad6c3ae2"
      },
      {
        name: "Gold and White Blend Carved Mug",
        price: 30,
        stock: 10,
        size: "S",
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/7.jpg?alt=media&token=178b791f-eb74-4d0b-90f5-99d782be36ec"
      },
      {
        name: "White and Violet Drip Mug",
        price: 25,
        stock: 10,
        size: "S",
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/8.jpg?alt=media&token=2327f614-d445-409d-8f3b-7a3b2c1c81db"
      },
      {
        name: "Quilted Blue Mug on Brown Clay",
        price: 40,
        stock: 10,
        size: "S",
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/9.jpg?alt=media&token=cf07aa31-503e-48ab-941a-79f7cfe18b22"
      },
      {
        name: "Moss Green Carved Mug",
        price: 25,
        stock: 10,
        size: "S",
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/10.jpg?alt=media&token=a47c0fba-0e25-4079-8dbb-b23fc6be3b82"
      },

    ]
    const pottery = await Promise.all(potteryToCreate.map(pot.createPot))

    console.log("creatures created:")
    console.log(pottery)

    console.log("Finished creating creatures!")
  } catch (error) {
    console.error("Error creating creatures!")
    throw error
  }
}

async function createInitialOrderHistory() {
  console.log("Loading Order History...")
  try {
    const orderHistoryToCreate = [
      {
        historyid: 1,
        price: "5000",
        count: 1,
        status: "not delievered, creature escaped packaging",
        date: "07/01/2022",
      },
      {
        historyid: 2,
        price: "750",
        count: 1,
        status: "delivered",
        date: "07/02/2022",
      },
      {
        historyid: 3,
        price: "1000",
        count: 2,
        status: "delivered",
        date: "07/03/2022",
      },
    ]
    const orderHistory = await Promise.all(orderHistoryToCreate.map(history.createHistory))

    console.log("Order History created:")
    console.log(orderHistory)

    console.log("Finished creating order history!")
  } catch (error) {
    console.error("Error creating order history!")
    throw error

  }
}


async function createInitialCart() {
  console.log("Starting to create initial cart...")
  try {
    const cartToCreate = [
      {
        cartid: 1,
        userid: 1,
        sessionid: 1
      },
      {
        cartid: 2,
        userid: 2,
        sessionid: 2
      },
      {
        cartid: 3,
        userid: 3,
        sessionid: 3
      }
    ]
    const cartItems = await Promise.all(cartToCreate.map(cart.createCart))

    console.log("Cart created:")
    console.log(cartItems)
    console.log("Finished creating inital cart!")
  } catch (error) {
    console.error("Error creating initial cart!" + error)

  }
}

async function createInitialCartItems() {
  console.log("Starting to create initialcart items...")
  try {
    const cartItemsToCreate = [
      {
        cartid: 1,
        potid: 1,
        count: 1
      },
      {
        cartid: 2,
        potid: 2,
        count: 3
      },
      {
        cartid: 3,
        potid: 3,
        count: 2
      }
    ]
    const cartItemsContent = await Promise.all(cartItemsToCreate.map(cart.createCartItems))

    console.log("Cart items created:")
    console.log(cartItemsContent)
    console.log("Finished creating inital cart items!")
  } catch (error) {
    console.error("Error creating initial cart items!" + error)

  }
}

//REBUILD
async function rebuildDB() {
  try {
    await dropTables()
    await createTables()
    await createInitialUsers()
    await createInitialAddress()
    await createInitialPottery()
    await createInitialOrderHistory()
    await createInitialCart()
    await createInitialCartItems()

  } catch (error) {
    console.log("Error during rebuildDB")
    throw error
  }
}

rebuildDB()
  //client.connect()
  .catch(console.error)
  .finally(() => client.end());


module.exports = {
  rebuildDB,
  dropTables,
  createTables,
}