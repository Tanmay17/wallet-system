const { Service: { WalletService, TransactionService } } = require( '../../lib' );
const { validationResult } = require( 'express-validator' );

const createWallet = async ( req, res ) => {
  const errors = validationResult( req );

  if ( !errors.isEmpty() ) {
        
    return res.status( 400 ).json( { errors: errors.array() } );
        
  }
  
  try {
    const { name, balance } = req.body;
  
    console.log( `POST /setup => Creating wallet of ${name} and Balance( ${balance} )` );

    const wallet = await WalletService.addWallet( req.body );
    if ( !wallet ) {

      console.error( `POST /setup => Some error occured while creating wallet of ${name}` );
      return res.status( 422 ).json( { message: 'Unable to add the wallet' } );

    }
    console.log( `POST /setup => Created wallet of ${name} and Balance( ${balance} )` );

    return res.status( 200 ).json( { data: wallet } );

  } catch ( err ) {

    console.error( 'POST /setup =>', err.message );
    return res.status( 500 );

  }
};

const addTransaction = async ( req, res ) => {
  const errors = validationResult( req );

  if ( !errors.isEmpty() ) {
        
    return res.status( 400 ).json( { errors: errors.array() } );
        
  }
  
  try {

    const { walletId } = req.params;
  
    console.log( `POST /transact/:walletId => Adding transaction in a Wallet(${walletId})` );

    const transaction = await TransactionService.addTransaction( req.body, walletId );
    if ( !transaction ) {

      console.error( `POST /transact/:walletId => Some error occured while adding transaction in Wallet(${walletId})` );
      return res.status( 422 ).json( { message: `Unable to add the transactionin a Wallet(${walletId})` } );

    }
    console.log( `POST /transact/:walletId => Added transaction in a Wallet(${walletId})` );

    return res.status( 200 ).json( { data: transaction } );

  } catch ( err ) {

    console.error( 'POST /transact/:walletId =>', err.message );
    return res.status( 500 );

  }
};

const getWalletTransaction = async ( req, res ) => {
};

const getWallet = async ( req, res ) => {
}

module.exports = {

  createWallet,
  addTransaction,
  getWalletTransaction,
  getWallet

}