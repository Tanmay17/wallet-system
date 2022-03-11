const express = require( 'express' );
const { Validator } = require( '../../lib/plugin' );
const { createWallet, addTransaction, getWalletTransaction, getWallet } = require( './handler' );

const router = express.Router();

router.post( '/setup', Validator.validate( 'createWallet' ), createWallet );

router.post( '/transact/:walletId', Validator.validate( 'addTransaction' ), addTransaction );

router.get( '/transactions', Validator.validate( 'getWalletTransaction' ), getWalletTransaction );

router.get( '/wallet/:id', Validator.validate( 'getWallet' ), getWallet );

module.exports = router;