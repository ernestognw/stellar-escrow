const fs = require('fs').promises;
const { join } = require('path');
const StellarSDK = require('stellar-sdk');
const { alice } = require('../../config');

const signFundsReleased = async () => {
  const fundsReleaseTx = await fs.readFile(
    join(__dirname, '../../fundsReleaseTx.txt'),
    {
      encoding: 'base64'
    }
  );

  const envelope = StellarSDK.xdr.TransactionEnvelope.fromXDR(
    fundsReleaseTx,
    'base64'
  );

  const transaction = new StellarSDK.Transaction(
    envelope,
    StellarSDK.Networks.TESTNET
  );

  const aliceKeypair = StellarSDK.Keypair.fromSecret(alice.secret);

  transaction.sign(aliceKeypair);

  const txEnvelopeXDR = transaction.toEnvelope().toXDR('base64');

  await fs.writeFile(
    join(__dirname, '../../fundsReleaseTx.txt'),
    txEnvelopeXDR,
    {
      encoding: 'base64'
    }
  );
};

module.exports = signFundsReleased;
