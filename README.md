# Stellar Escrow Smart Contract

This is an example of how to create a smart contract in Stellar Network, just follow the instructions below:

1. Copy .env.example into a .env
2. Go to [Stellar Laboratory](https://laboratory.stellar.org/#account-creator?network=test) and create 2 accounts, copy their public and secret keys to .env for Bob and Alice
3. Fund those accounts using Stellar Friendbot
4. Create a third account for the Escrow and copy it into the .env

At this point, you can run `npm start` to interact with the smart contract.

To show how it works, run the scripts in the following order:

## Alice
1. Crear el escrow
2. Añadir el mecanismo multifirma
3. Fondear el escrow
4. Liberar los fondos
5. Firmar la liberacion de fondos

## Bob
1. Retirar fondos

## Cheers!