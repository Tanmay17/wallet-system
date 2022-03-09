const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema( {

} );

module.exports = mongoose.model( "Wallet", WalletSchema );