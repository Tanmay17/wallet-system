const { body, param, query } = require( 'express-validator' )

exports.validate = ( method ) => {

    switch ( method ) {
        case 'addWallet':
            return [
                body( 'name', 'Invalid Name' ).isString().notEmpty(),
                body( 'balance', 'Invalid Balance' ).isInt( { min: 0 } ),
            ]
        case 'addTransaction':
            return [
                param( 'walletId', 'Invalid Wallet ID' ).isString().notEmpty(),
                body( 'amount', 'Invalid Amount' ).isFloat(),
                body( 'description', 'Invalid Description' ).isString().notEmpty()
            ]
        case 'getWalletTransaction':
            return [
                query( 'walletId', 'Invalid Wallet ID' ).isString().notEmpty(),
                query( 'skip', 'Invalid Skip' ).isInt( { min: 0 } ),
                query( 'limit', 'Invalid type' ).isInt( { min: 0 } )
            ]
        case 'getWallet':
            return [
                param( 'id', 'Invalid Wallet ID' ).isString().notEmpty()
            ]
    }

}