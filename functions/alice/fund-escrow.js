const StellarSDK = require('stellar-sdk');
const { server } = require('../../api');
const { alice, escrow } = require('../../config');

const fundEscrow = async () => {
  const aliceKeypair = StellarSDK.Keypair.fromSecret(alice.secret);

  const aliceAccount = await server.loadAccount(alice.public);

  const paymentToEscrow = {
    destination: escrow.public,
    asset: StellarSDK.Asset.native(),
    amount: '10.0000000'
  };

  const txOptions = {
    fee: StellarSDK.BASE_FEE,
    memo: StellarSDK.Memo.text('Funding the escrow account'),
    networkPassphrase: StellarSDK.Networks.TESTNET
  };

  const transaction = new StellarSDK.TransactionBuilder(aliceAccount, txOptions)
    .addOperation(StellarSDK.Operation.payment(paymentToEscrow))
    .setTimeout(100)
    .build();

  transaction.sign(aliceKeypair); // Alice signs the transaction

  await server.submitTransaction(transaction);
};

module.exports = fundEscrow;
