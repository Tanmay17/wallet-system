const { body, param, query } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createWallet":
      return [
        body("name", "Invalid Name").isString().notEmpty(),
        body("balance", "Invalid Balance").isFloat({ min: 0 }).notEmpty(),
      ];
    case "addTransaction":
      return [
        param("walletId", "Invalid Wallet ID").isString().notEmpty(),
        body("amount", "Invalid Amount").isFloat().notEmpty(),
        body("description", "Invalid Description").isString().notEmpty(),
      ];
    case "getWalletTransaction":
      return [
        query("walletId", "Invalid Wallet ID").isString().notEmpty(),
        query("skip", "Invalid Skip").isInt({ min: 0 }).default(0),
        query("limit", "Invalid Limit").isInt({ min: 1 }).default(10),
      ];
    case "getWallet":
      return [param("id", "Invalid Wallet ID").isString().notEmpty()];
  }
};