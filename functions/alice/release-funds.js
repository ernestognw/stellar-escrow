const fs = require('fs').promises;
const { join } = require('path');
const StellarSDK = require('stellar-sdk');
const { server } = require('../../api');
const { bob, escrow } = require('../../config');

const releaseFunds = async () => {
  const escrowAccount = await server.loadAccount(escrow.public);

  const paymentToBob = {
    destination: bob.public,
    asset: StellarSDK.Asset.native(),
    amount: '10.0000000'
  };

  const txOptions = {
    fee: StellarSDK.BASE_FEE,
    memo: StellarSDK.Memo.text('Release Funds to Bob'),
    networkPassphrase: StellarSDK.Networks.TESTNET
  };

  let transaction = new StellarSDK.TransactionBuilder(escrowAccount, txOptions)
    .addOperation(StellarSDK.Operation.payment(paymentToBob))
    .setTimeout(100)
    .build();

  const txEnvelopeXDR = transaction.toEnvelope().toXDR('base64');

  await fs.writeFile(
    join(__dirname, '../../fundsReleaseTx.txt'),
    txEnvelopeXDR,
    {
      encoding: 'base64'
    }
  );
};

module.exports = releaseFunds;
