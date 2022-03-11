const { WalletModel, TransactionModel } = require("../model");
const moment = require( 'moment' );

const addWallet = async (data) => {
  try {
    console.log(
      `Adding wallet with ${data.name} and Balance( ${data.balance} )`
    );
    const wallet = await WalletModel.insertMany([
      {
        balance,
        name,
        createdAt: moment().unix(),
        updatedAt: moment().unix(),
      },
    ]);

    if (!wallet) {
      console.error(`Error while inserting wallet`);
      return;
    }
    console.log(
      `Added wallet with ${data.name} and Balance( ${data.balance} )`
    );

    console.log(
      `Adding CREDIT transaction in wallet(${wallet._id}) of amount( ${data.balance} )`
    );
    const transaction = await TransactionModel.insertMany([
      {
        wallet: wallet._id,
        amount: data.balance,
        description: "Initial wallet amount credited",
        type: "CREDIT",
        createdAt: moment().unix(),
        updatedAt: moment().unix(),
      },
    ]);

    if (!transaction) {
      console.error(
        `Error while inserting transaction in wallet(${wallet._id})`
      );
      return;
    }
    console.log(
      `Added CREDIT transaction in wallet(${wallet._id}) of amount( ${data.balance} )`
    );

    return wallet;
  } catch (error) {
    throw error;
  }
};

const getWalletById = async (id) => {
  try {
    
    console.log(`Extracting Wallet( ${id} )`);
    const wallet = await WalletModel.findById(id);

    if (!wallet) {
      console.error(
        `Error while extracting Wallet( ${id} )`
      );
      return;
    }
    console.log(`Extracted wallet( ${id} )`);
    return wallet;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addWallet,
  getWalletById
};
