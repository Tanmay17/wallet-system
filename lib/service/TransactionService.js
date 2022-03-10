const { TransactionModel, WalletModel } = require("../model");
const moment = require("moment");

const addTransaction = async (data, walletId) => {
  try {
    const { amount, description } = data;

    console.log(`Extracting Wallet( ${walletId} ) information`);
    const wallet = await WalletModel.findOne({ _id: walletId });

    if (wallet) {
      console.log(
        `Checking transaction of amount(${amount}) is possible for wallet(${walletId})`
      );
      const finalWalletBalance = wallet.balance + amount;
      if (finalWalletBalance < 0) {
        console.error(
          `Transaction of amount(${amount}) is impossible to made for wallet(${walletId})`
        );
        return;
      }
      console.log(
        `Transaction of amount(${amount}) is possible for wallet(${walletId})`
      );

      console.log(
        `Adding transaction in wallet(${walletId}) of amount(${data.amount})`
      );
      const transaction = await TransactionModel.insertMany([
        {
          wallet: walletId,
          amount,
          description,
          type: amount < 0 ? "DEBIT" : "CREDIT",
          createdAt: moment().unix(),
          updatedAt: moment().unix(),
        },
      ]);

      if (!transaction) {
        console.error(
          `Error while inserting transaction of amount(${amount}) in wallet(${walletId})`
        );
        return;
      }
      console.log(
        `Added transaction in wallet(${walletId}) of amount(${data.amount})`
      );

      console.log(
        `Updating balance of wallet(${walletId}) after transaction(${transaction._id})`
      );
      const updatedWalletData = await WalletModel.updateOne(
        { _id: walletId },
        { balance: finalWalletBalance, updatedAt: moment().unix() }
      );

      if (!updatedWalletData) {
        console.error(
          `Unable to update the wallet(${walletId}) after new transaction( ${transaction._id} )`
        );
        return;
      }
      console.log(
        `Updated balance of wallet(${walletId}) after transaction(${transaction._id})`
      );
      return transaction;
    } else {
      console.error(`Wallet( ${walletId} ) doesn't exists`);
      return;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addTransaction,
};
