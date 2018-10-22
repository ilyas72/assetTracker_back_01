// Step 1 - Libraries
const path = require('path');
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const multer = require ('multer');
const multipart = multer ({dest: path.join(__dirname, "/uploads/")});
// const utils = require('./libs/mysql-utils');
// const hbs = require('express-handlebars');

//Load MySQL and configure connection pool
const pool = mysql.createPool(require('./dbconfig'));

// Step 2 - Create instance of Express
const app = express();

// Step 3 - Configure a connection pool to the database
// console.log("process.env.DB_PORT => ",process.env.DB_PORT);

var makeQuery = (sql, pool)=>{
    
    return  (args)=>{
        let queryPromsie = new Promise((resolve, reject)=>{
            pool.getConnection((err, connection)=>{
                if(err){
                    reject(err);
                    return;
                }
                
                connection.query(sql, args || [], (err, results)=>{
                    connection.release();
                    if(err){
                        reject(err);
                        return;
                    }
                    resolve(results); 
                })
            });
        });
        return queryPromsie;
    }
}

//-----GET-----USERS-----//-----GET-----USERS-----//-----GET-----USERS-----//

//Find all users
const sqlFindUsers = "SELECT * FROM user";
var findUsers = makeQuery(sqlFindUsers, pool);

app.get("/users", (req, res)=>{
    findUsers().then((results)=>{
        console.log(results);
        res.json(results);
    }).catch((error)=>{
        res.status(500).json(error);
    })
})

//Find user by Id
const sqlFindUserId = "SELECT * FROM user WHERE (user_id = ?)";
var findUser = makeQuery(sqlFindUserId, pool);

app.get("/user/:userId", (req, res)=>{
    let userId = req.params.userId;
    console.log("in here ID");
    findUser([userId]).then((results)=>{
        res.json(results);
    }).catch((error)=>{
        res.status(500).json(error);
    })
})



//-----GET-----ASSETS-----//-----GET-----ASSETS-----//-----GET-----ASSETS-----//

//Find all assets 
const sqlFindAssets = "SELECT * FROM asset";
var findAssets = makeQuery(sqlFindAssets, pool);
app.get("/assets", (req, res)=>{
    findAssets().then((results)=>{
        console.log(results);
        res.json(results);
    }).catch((error)=>{
        res.status(500).json(error);
    })
})

//Find assets by Id
const sqlFindAssetId = "SELECT * FROM asset WHERE (asset_id = ?)";
var findAsset = makeQuery(sqlFindAssetId, pool);
app.get("/asset/:assetId", (req, res)=>{
    let assetId = req.params.assetId;
    findAsset([assetId]).then((results)=>{
        res.json(results);
    }).catch((error)=>{
        res.status(500).json(error);
    })
})


//-----GET-----LOANS-----//-----GET-----LOANS-----//-----GET-----LOANS-----//

// Find all loans 
const sqlFindLoans = "SELECT * FROM loan";
var findLoans = makeQuery(sqlFindLoans, pool);
app.get("/loans", (req, res)=>{
    findLoans().then((results)=>{
        console.log(results);
        res.json(results);
    }).catch((error)=>{
        res.status(500).json(error);
    })
 })

//Find loans by loan_id
const sqlFindLoanId = "SELECT * FROM loan WHERE (loan_id = ?)";
var findLoan = makeQuery(sqlFindLoanId, pool);
app.get("/loan/:loanId", (req, res)=>{
    let loanId = req.params.loanId;
    findLoan([loanId]).then((results)=>{
        res.json(results);
    }).catch((error)=>{
        res.status(500).json(error);
    })
})

//Find loans by user_id
const sqlFindLoanUserId = "SELECT * FROM loan WHERE (user_id = ?)";
var findLoanUser = makeQuery(sqlFindLoanUserId, pool);
app.get("/loan/user/:userId", (req, res)=>{
    let userId = req.params.userId;
    findLoanUser([userId]).then((results)=>{
        res.json(results);
    }).catch((error)=>{
        res.status(500).json(error);
    })
})

//Find loans by asset_id
const sqlFindLoanAssetId = "SELECT * FROM loan WHERE (asset_id = ?)";
var findLoanAsset = makeQuery(sqlFindLoanAssetId, pool);
app.get("/loan/asset/:assetId", (req, res)=>{
    let assetId = req.params.assetId;
    findLoanAsset([assetId]).then((results)=>{
        res.json(results);
    }).catch((error)=>{
        res.status(500).json(error);
    })
})

//-----POST-----USERS-----//-----POST-----USERS-----//-----POST-----USERS-----//

const sqlAddUser = 'INSERT INTO user (name, email) VALUES (?, ?)';
const addUser = makeQuery(sqlAddUser, pool);
app.post("/user_reg",
        bodyParser.urlencoded(),
        bodyParser.json(),
        (req, resp) => {
            console.log("xxx in user_reg --> ", JSON.stringify(req.body));
            addUser([req.body.name, req.body.email])
                .then(() => {
                    resp.status(201).json({ message: 'New user created'})
                })
                .catch(err => {
                    console.log(err);
                    resp.status(500).json({ error: err });
                })
        }
    )

    const sqlModifyUser = 'UPDATE user SET  name = ?, email = ? WHERE user_id = ?';
    const modifyUser = makeQuery(sqlModifyUser, pool);
    app.put('/user/:userId', bodyParser.json(), bodyParser.urlencoded(), (req, resp) => {
        console.log(req.body);
        modifyUser([req.body.name, req.body.email, parseInt(req.params.userId)])
            .then(() => {
                console.log('User record modified.');
                resp.status(200).json({ message: 'User details modified'})
            })
        .catch(err => resp.status(400).json({ error: err }))
    })

    const sqlRemoveUser = 'DELETE FROM user WHERE user_Id = ?';
    const removeUser = makeQuery(sqlRemoveUser, pool);
    app.delete("/user/:userId", (req, res)=>{
        removeUser([parseInt(req.params.userId)]).then((results)=>{
            res.json(results);
        }).catch((error)=>{
            res.status(500).json(error);
        })
    })


//-----//-----//-----//-----//-----//-----//-----//-----//-----//-----//-----//-----//  

//app.use
app.use(express.static(path.join(__dirname, 'public')))

//Start the server
//Ping the database before starting
pool.getConnection((err, conn) => {
    if (err) {
        console.error('STARTUP ERROR: ', err);
        process.exit(-1);
    }
    conn.ping(err => {
        if (err) {
            console.error('PING ERROR: ', err);
            process.exit(-1)
        }
        conn.release();
        const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000;
        app.listen(PORT, () => {
            console.info('Application started on PORT %d at %s', PORT, new Date());
        });
    });
});

// port and server
// const PORT = parseInt(process.argv[2]) || 
//            parseInt(process.env.APP_PORT) || 3000;
// app.listen(PORT, () => {
//    console.info(`App started on port ${PORT} at ${new Date()}`);
// });
