# Project Title

Asset Tracker (Backend)


## Installing

```
 Step 1 -> Go to the project directory in the terminal
 Step 2 -> Key in 'nodemon'
 Step 3 -> On browser tab http://localhost:3000
```

## Parameter API to find all users
http://localhost:3000/users

It will display details of all users.

Details shown will be: 
i. user_id
ii. name
iii. email
iv. date_created
v. date_updated


## Parameter API to find a user by ID
http://localhost:3000/user/1

It will display details of a person searched by ID.

Details shown will be: 
i. user_id
ii. name
iii. email
iv. date_created
v. date_updated


## Parameter API to find all assets by ID
http://localhost:3000/assets

It will display details of an item searched by ID.

Details shown will be: 
i. asset_id
ii. asset_type
iii. asset_name
iv. asset_status


## Parameter API to find an asset by ID
http://localhost:3000/asset/1

It will display details of an item searched by ID.

Details shown will be: 
i. asset_id
ii. asset_type
iii. asset_name
iv. asset_status


## Parameter API to find all loans
http://localhost:3000/loans

It will display details of all loans searched.

Details shown will be: 
i. loan_id
ii. asset_id
iii. user_id
iv. loan_date
v. reuturn_date
vi. message
vii. blob


## Parameter API to find loan by loan ID
http://localhost:3000/loan/1

It will display details of a loan searched by ID.

Details shown will be: 
i. loan_id
ii. asset_id
iii. user_id
iv. loan_date
v. reuturn_date
vi. message
vii. blob


## Parameter API to find loan by user ID
http://localhost:3000/loan/user/1

It will display details of loans searched by user ID.

Details shown will be: 
i. loan_id
ii. asset_id
iii. user_id
iv. loan_date
v. reuturn_date
vi. message
vii. blob


## Parameter API to find loan by asset ID
http://localhost:3000/loan/asset/1

It will display details of loans searched by asset ID.

Details shown will be: 
i. loan_id
ii. asset_id
iii. user_id
iv. loan_date
v. reuturn_date
vi. message
vii. blob


### CRUD project

This project demonstrates the Create Read Update and Delete functions of the resources.

