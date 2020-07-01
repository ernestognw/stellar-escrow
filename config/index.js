const dotenv = require('dotenv');
dotenv.config();

const alice = {
  secret: process.env.ALICE_SK,
  public: process.env.ALICE_PK
};

const bob = {
  secret: process.env.BOB_SK,
  public: process.env.BOB_PK
};

const escrow = {
  secret: process.env.ESCROW_SK,
  public: process.env.ESCROW_PK
};

module.exports = {
  alice,
  bob,
  escrow
};
