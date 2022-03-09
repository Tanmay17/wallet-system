const express = require( 'express' );
const { Validator } = require( '../../lib/plugin' );
const { addWallet, addTransaction, getWalletTransaction, getWallet } = require( './handler' );

const router = express.Router();

router.post( '/setup', Validator.validate( 'addWallet' ), addWallet );

router.post( '/transact/:walletId', Validator.validate( 'addTransaction' ), addTransaction );

router.get( '/transactions?walletId={}&skip={}&limit={}', Validator.validate( 'getWalletTransaction' ), getWalletTransaction );

router.get( '/wallet/:id', Validator.validate( 'getWallet' ), getWallet );

module.exports = router;