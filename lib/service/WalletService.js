const { WalletModel, TransactionModel } = require("../model");
const moment = require("moment");

const addWallet = async (data) => {
  try {
    console.log(
      `Adding wallet with ${data.name} and Balance( ${data.balance} )`
    );
    const wallet = await WalletModel.insertMany([
      {
        balance: data.balance,
        name: data.name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);

    if (!wallet[0]) {
      console.error(`Error while inserting wallet`);
      return;
    }
    console.log(
      `Added wallet with ${data.name} and Balance( ${data.balance} )`
    );

    console.log(
      `Adding CREDIT transaction in wallet(${wallet[0]._id}) of amount( ${data.balance} )`
    );
    const transaction = await TransactionModel.insertMany([
      {
        wallet: wallet[0]._id,
        amount: data.balance,
        afterBalance: data.balance,
        description: "Initial wallet amount credited",
        type: "CREDIT",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);

    if (!transaction) {
      console.error(
        `Error while inserting transaction in wallet(${wallet[0]._id})`
      );
      return;
    }
    console.log(
      `Added CREDIT transaction in wallet(${wallet[0]._id}) of amount( ${data.balance} )`
    );

    return {
      id: wallet[0]._id,
      balance: transaction[0].amount,
      transactionId: transaction[0]._id,
      name: wallet[0].name,
      date: wallet[0].createdAt,
    };
  } catch (error) {
    throw error;
  }
};

const getWalletById = async (id) => {
  try {
    console.log(`Extracting Wallet( ${id} )`);
    const wallet = await WalletModel.findById(id);

    if (!wallet) {
      console.error(`Error while extracting Wallet( ${id} )`);
      return;
    }
    console.log(`Extracted wallet( ${id} )`);
    return {
      id: wallet._id,
      balance: wallet.balance,
      name: wallet.name,
      date: wallet.createdAt,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addWallet,
  getWalletById,
};
