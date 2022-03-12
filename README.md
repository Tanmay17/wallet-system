# go-high-level-assignment

### RUN Project
1. Add a file with name `.env` with following data:
    ```json
       MONGO_URL=mongodb://localhost:27017/wallet
       PORT=3000
    `Note`:  DB NAME can be anything here in above example, I'm using database name as `wallet`
2. Install node packages:
   Run `npm i` on terminal where your working directory should be project folder to install all the required packages

3. Run API Server:
    on console: `$ node server.js`

    Your server will start after this.

#### API details:
    List of APIs and there routes:
        1. `POST /setup` : Initialise the wallet
            * Request: 
                ** ```json
                { balance: float, name: string }
                ```
            * Response:
                ** StatusCode `200` : ```json{
                    data: { id, balance, transactionId, name’, date }
                }```
                ** StatusCode 422`
                ** StatusCode 400`
                ** StatusCode 500`
    
        2. `POST /transact/:walletId` : To make transaction (Credit/Debit amount)
            * Request: 
                ** ```json
                { amount: float, description: string }
                ```
            * Response:
                ** StatusCode `200` : ```json{
                    data: { balance, transactionId }
                }```
                ** StatusCode 422`
                ** StatusCode 400`
                ** StatusCode 500`

        3. `GET /transactions` : To fetch transactions history of a wallet
            * Request: 
                ** Query Params```json
                { walletId: string, skip: integer, limit: integer }
                ```
            * Response:
                ** StatusCode `200` : ```json{
                    data: [ { id, walletId, amount, balance, description, date, type }, ... ]```
                ** StatusCode 422`
                ** StatusCode 400`
                ** StatusCode 500`
        
        4. `GET /wallet/:id` : To fetch wallet information
            * Response:
                ** StatusCode `200` : ```json{
                    data: { id, balance, name, date }```
                ** StatusCode 422`
                ** StatusCode 400`
                ** StatusCode 500`