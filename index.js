const inquirer = require('inquirer');
const createEscrow = require('./functions/alice/create-escrow.js');
const fundEscrow = require('./functions/alice/fund-escrow.js');
const releaseFunds = require('./functions/alice/release-funds.js');
const setEscrowMultisig = require('./functions/alice/set-escrow-multisig.js');
const signFundsRelease = require('./functions/alice/sign-funds-release.js');
const withdraw = require('./functions/bob/withdraw.js');

const start = async () => {
  try {
    const whoAreYou = [
      {
        type: 'list',
        name: 'whois',
        message: '¿Eres Alice o Bob?',
        choices: ['Alice', 'Bob']
      }
    ];

    const { whois } = await inquirer.prompt(whoAreYou);

    if (whois === 'Alice') {
      const aliceActions = [
        {
          type: 'list',
          name: 'action',
          message: '¿Que quieres hacer?',
          choices: [
            {
              name: 'Crear el escrow',
              value: 'createEscrow'
            },
            {
              name: 'Añadir el mecanismo multifirma',
              value: 'setEscrowMultisig'
            },
            {
              name: 'Fondear el escrow',
              value: 'fundEscrow'
            },
            {
              name: 'Liberar los fondos',
              value: 'releaseFunds'
            },
            {
              name: 'Fimar la liberación de fondos',
              value: 'signFundsRelease'
            }
          ]
        }
      ];

      const { action } = await inquirer.prompt(aliceActions);

      switch (action) {
        case 'createEscrow':
          createEscrow();
          break;
        case 'setEscrowMultisig':
          setEscrowMultisig();
          break;
        case 'fundEscrow':
          fundEscrow();
          break;
        case 'releaseFunds':
          releaseFunds();
          break;
        case 'signFundsRelease':
          signFundsRelease();
          break;
      }
    } else {
      const bobActions = [
        {
          type: 'list',
          name: 'action',
          message: '¿Que quieres hacer?',
          choices: [
            {
              name: 'Retirar fondos',
              value: 'withdraw'
            }
          ]
        }
      ];

      const { action } = await inquirer.prompt(bobActions);

      switch (action) {
        case 'withdraw':
          withdraw();
          break;
      }
    }
  } catch (err) {
    console.log(err);
  }
};

start();
