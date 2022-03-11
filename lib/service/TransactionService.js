const { TransactionModel, WalletModel } = require("../model");

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
          afterBalance: finalWalletBalance,
          description,
          type: amount < 0 ? "DEBIT" : "CREDIT",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);

      if (!transaction[0]) {
        console.error(
          `Error while inserting transaction of amount(${amount}) in wallet(${walletId})`
        );
        return;
      }
      console.log(
        `Added transaction in wallet(${walletId}) of amount(${data.amount})`
      );

      console.log(
        `Updating balance of wallet(${walletId}) after transaction(${transaction[0]._id})`
      );
      const updatedWalletData = await WalletModel.updateOne(
        { _id: walletId },
        { balance: finalWalletBalance, updatedAt: new Date().toISOString() }
      );

      if (!updatedWalletData) {
        console.error(
          `Unable to update the wallet(${walletId}) after new transaction( ${transaction[0]._id} )`
        );
        return;
      }
      console.log(
        `Updated balance of wallet(${walletId}) after transaction(${transaction[0]._id})`
      );
      return {
        balance: transaction[0].afterBalance,
        transactionId: transaction[0]._id,
      };
    } else {
      console.error(`Wallet( ${walletId} ) doesn't exists`);
      return;
    }
  } catch (error) {
    throw error;
  }
};

const getWalletTransactionHistory = async (data) => {
  try {
    const { walletId, skip, limit } = data;

    console.log(`Extracting Wallet( ${walletId} ) trasaction history`);
    const transactions = await TransactionModel.find({ wallet: walletId })
      .skip(skip)
      .limit(limit);

    if (!transactions) {
      console.error(
        `Error while extracting Wallet( ${walletId} ) trasaction history`
      );
      return;
    }
    console.log(`Extracted wallet( ${walletId} ) trasaction history`);
    return transactions.map((transaction) => ({
      id: transaction._id,
      walletId,
      amount: transaction.amount,
      balance: transaction.afterBalance,
      description: transaction.description,
      date: transaction.createdAt,
      type: transaction.type,
    }));
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addTransaction,
  getWalletTransactionHistory,
};
