const fs = require('fs').promises;
const StellarSDK = require('stellar-sdk');
const { join } = require('path');
const { server } = require('../../api');
const { bob } = require('../../config');

const releaseFundsToB = async () => {
  const fundsReleaseTx = await fs.readFile(
    join(__dirname, '../../fundsReleaseTx.txt'),
    {
      encoding: 'base64'
    }
  );

  const buffer = Buffer.from(fundsReleaseTx, 'base64');

  const envelope = StellarSDK.xdr.TransactionEnvelope.fromXDR(buffer, 'base64');

  const transaction = new StellarSDK.Transaction(
    envelope,
    StellarSDK.Networks.TESTNET
  );

  const bobKeyPair = StellarSDK.Keypair.fromSecret(bob.secret);

  transaction.sign(bobKeyPair);

  await server.submitTransaction(transaction);
};

module.exports = releaseFundsToB;
