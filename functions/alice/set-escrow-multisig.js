const StellarSDK = require('stellar-sdk');
const { server } = require('../../api');
const { alice, bob, escrow } = require('../../config');

const setEscrowMultisig = async () => {
  const escrowKeyPair = StellarSDK.Keypair.fromSecret(escrow.secret);

  const escrowAccount = await server.loadAccount(escrow.public);

  const thresholds = {
    masterWeight: 0, // Escrow account has a weight of 0, no rights :)
    lowThreshold: 1,
    medThreshold: 2, // payment is medium threshold
    highThreshold: 2
  };

  const aliceSigner = {
    signer: {
      ed25519PublicKey: alice.public,
      weight: 1
    }
  };

  const bobSigner = {
    signer: {
      ed25519PublicKey: bob.public,
      weight: 1
    }
  };

  const txOptions = {
    fee: StellarSDK.BASE_FEE,
    networkPassphrase: StellarSDK.Networks.TESTNET
  };

  let transaction = new StellarSDK.TransactionBuilder(escrowAccount, txOptions)
    .addOperation(StellarSDK.Operation.setOptions(thresholds))
    .addOperation(StellarSDK.Operation.setOptions(aliceSigner))
    .addOperation(StellarSDK.Operation.setOptions(bobSigner))
    .setTimeout(100)
    .build();

  transaction.sign(escrowKeyPair);

  await server.submitTransaction(transaction);
};

module.exports = setEscrowMultisig;
