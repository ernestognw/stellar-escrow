const StellarSDK = require('stellar-sdk');
const { server } = require('../../api');
const { alice, escrow } = require('../../config');

const createEscrow = async () => {
  const aliceKeyPair = StellarSDK.Keypair.fromSecret(alice.secret);

  const aliceAccount = await server.loadAccount(alice.public);

  const escrowAccountConfig = {
    destination: escrow.public,
    startingBalance: '2.5000000'
  };

  const txOptions = {
    fee: StellarSDK.BASE_FEE,
    networkPassphrase: StellarSDK.Networks.TESTNET
  };

  const transaction = new StellarSDK.TransactionBuilder(aliceAccount, txOptions)
    .addOperation(StellarSDK.Operation.createAccount(escrowAccountConfig))
    .setTimeout(100)
    .build();

  transaction.sign(aliceKeyPair);

  await server.submitTransaction(transaction);
};

module.exports = createEscrow;
