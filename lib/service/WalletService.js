const { WalletModel, TransactionModel } = require("../model");

const addWallet = async (data) => {
  try {
    console.log(
      `Adding wallet with ${data.name} and Balance( ${data.balance} )`
    );
    const wallet = await WalletModel.insertMany([
      {
        balance,
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    if (!wallet) {
      throw new Error("Error while inserting wallet");
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
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    if (!transaction) {
      throw new Error(
        `Error while inserting transaction in wallet(${wallet._id})`
      );
    }
    console.log(
      `Added CREDIT transaction in wallet(${wallet._id}) of amount( ${data.balance} )`
    );

    return wallet;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addWallet
};