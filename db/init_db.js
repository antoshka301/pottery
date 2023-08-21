const client = require("./client");

// Seed data to initialize DB

const { user,
  address,
  pot,
  history,
  cart
} = require('./');

// Drop tables in correct order
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

// Build tables in correct order
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

// Create initial users
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

// Create initial addresses
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

// Create initial pottery listings
async function createInitialPottery() {
  console.log("Creating creatures...")

  try {
    const potteryToCreate = [
      {
        name: "Quilted Speckled White Mug on Brown Clay", //1
        price: 40,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/1.png?alt=media&token=92539e63-7bd8-47bc-9c64-542f6f4b347b"
      },
      {
        name: "Ridged Speckled Aqua Mug", //2
        price: 26,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/2.png?alt=media&token=28097abd-6374-4e6a-8341-2da1e39cc2ac"
      },
      {
        name: "Ying Yang Split Catch-All Dish", //12
        price: 35,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/12.png?alt=media&token=2238a97f-18d5-4bc5-9a96-5b35370bfc4c"
      },
      {
        name: "Tall Speckled Striped Mug on Natural Clay", //3
        price: 38,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/3.png?alt=media&token=04e03acf-0c83-4b24-ae19-1dc79cc609cd"
      },
      {
        name: "Hand Painted Leaf Mug on Natural Clay", //15
        price: 40,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/15.png?alt=media&token=61368fff-eb7c-4000-a494-bdf42ecc0d7f"
      },
      {
        name: "Speckled White Bubble Mug", //13
        price: 27,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/13.png?alt=media&token=c8e405bd-f1f0-4caf-8657-f5f1fe77677e"
      },
      {
        name: "Bue and White Speckled Stripe Plates", //17
        price: 25,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/17.png?alt=media&token=ceb4ee43-bf1c-45ac-b588-61fa2f5d5be5"
      },
      {
        name: "Blue Carved Mug on Brown Clay", //4
        price: 35,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/4.png?alt=media&token=a0706bf7-cd0e-4647-8abf-f3f34f52f873"
      },
      {
        name: "Brown Carved Catch-All Bowl", //16
        price: 20,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/16.png?alt=media&token=cd3948fe-b228-4ec7-99f8-394f369a2697"
      },
      {
        name: "Blue and Brown Blend Mug", //5
        price: 24,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/5.png?alt=media&token=c8d42ff1-8bb7-4279-a6c4-bbe769042f28"
      },
      {
        name: "Speckled Emerald Striped Mug on Brown Clay", //6
        price: 30,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/6.png?alt=media&token=6140ec12-2744-4542-856e-2c7a488d96b3"
      },
      {
        name: "Blue and Brown Fade Bubble Mug", //14
        price: 27,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/14.png?alt=media&token=5d22a888-8c3a-42d4-907b-e9795223b1f1"
      },
      {
        name: "Speckled Gold and White Blend Carved Mug", //7
        price: 30,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/7.png?alt=media&token=ef085e92-123c-4ec3-b622-c0cf528e3d95"
      },
      {
        name: "White and Violet Drip Mug", //8
        price: 25,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/8.png?alt=media&token=345c76fe-e577-4bb1-ac79-691ffe9d9f74"
      },
      {
        name: "Quilted Blue Mug on Brown Clay", //9
        price: 40,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/9.png?alt=media&token=9e05e80f-4a74-450b-a332-a1e380edc1be"
      },
      {
        name: "Speckled White Gold Rim Drip Tray", //11
        price: 30,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/11.png?alt=media&token=ffa4ab58-804c-45cf-ad0d-d2d14ff800dd"
      },
      {
        name: "Speckled White and Brown Brushed Mug", //18
        price: 20,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/18.png?alt=media&token=9c4968f6-fc35-4f5e-89ca-f6ef8196d388"
      },
      {
        name: "Moss Green Carved Mug", //10
        price: 25,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/10.png?alt=media&token=c36eb7ca-61ed-4e6f-a574-cab38a98c758"
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

// Create initial order history
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

// Create initial cart
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

// Create initial cart items
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

// Rebuild database
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
  .catch(console.error)
  .finally(() => client.end());

// Export
module.exports = {
  rebuildDB,
  dropTables,
  createTables,
}