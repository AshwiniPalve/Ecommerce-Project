const express = require('express')
const db = require('../db')
const utils = require('../utils')
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
//const mailer=require('../mailer.js')
const config = require('../config')
// router will be used to add routes in  application 
const router = express.Router()


router.get('/user/profile', (req, res) => {
//we get jwt token ,after sending token in headers it will find id and return user associated with id
    const statement = `select id,firstname,lastname,phoneno,email from user where id=${req.id} `  //req.id explained in server.js
    db.execute(statement, (error, data) => {
        const result = utils.createdResult(error, data)
        res.send(result)
    })

})

router.post('/user/signup', (req, res) => {
    const { firstname, lastname, email, password } = req.body

    //encrypt the  password
    const encryptedPassword = crypto.SHA256(password)
    //by dfault every user will br non-verified
    const statement = `insert into user (firstname,lastname,email,password,status)values ('${firstname}','${lastname}','${email}','${encryptedPassword}',0)`
    db.execute(statement, (error, data) => {
        // const result = {
        //     status: ''
        // }
        // if (error) {
        //     //if there is an error while performing the operation
        //     // console.log(`error = ${error}`)
        //     result['status'] = "error"  //if  error present
        //     result['error'] = error     //cause of an error
        //     //res.send('error')
        // }
        // else {
        //     //there is no error
        //     // console.log(data)
        //     result['status'] = "success" //if no error
        //     result['data'] = data  //then result
        //     // res.send('okay')
        // }
        const result = utils.createdResult(error, data)
        if (error != null) {
            // mailer.sendEmail(
            //     'signup.html',
            //     'Welcome to Ecommerce Application',
            //     email,
            //     (error,info)=>{
            //         res.send(result)
            //     }
            // )
            res.send(result)
        }
       else{
        res.send(result)
       }

    })

})



router.post('/user/signin', (req, res) => {
    const { email, password } = req.body

    const encryptedPassword = '' + crypto.SHA256(password)

    const statement = `select id, firstname, lastname, email,status from user where email='${email}' and Password='${encryptedPassword}'`
    db.execute(statement, (error, data) => {
        const result = {
            status: ''

        }
        if (error) {

            result['status'] = "error"
            result['error'] = error

        }
        else {
            if (data.length == 0) {
                //  console.log("in length = 0")
                //user  does not exist 

                result['status'] = "error"
                result['error'] = "User does not exist"

            } else {
                const user = data[0]
                //check the user status
                //0:user not verified 1:active 2:suspended
                if (user['status'] == 0) {
                    result['status'] = "error"
                    result['error'] = "You have not verified your account yet.Please verify your account.."
                }
                else if (user['status'] == 2) {
                    result['status'] = "error"
                    result['error'] = "Your account has been suspended please contact admin"
                }
                else {
                    //const data = { id: 'user[id]' }
                    const token = jwt.sign({ id: user['id'] }, config.secret)

                    result['status'] = 'success'

                    result['data'] = {
                        token: token,
                        id: user['id'],
                        firstname: user['firstname'],
                        lastname: user['lastname'],
                        email: user['email'],
                        phone: user['phone']

                    }
                }

            }
            res.send(result)
            console.log('signed in')

        }


    })

})


//to verify user account
router.get('/user/verify/:id', (req, res) => {
    const { id } = req.params
    const statement = `update user set status=1 where id=${id} `
    db.execute(statement, (error, data) => {

        res.send(utils.createdResult(error, data))
    })
})


//to toggle status
router.patch('/user/toggle-status/:id', (req, res) => {
    const { id } = req.params
    const{status}=req.body
    const statement = `update user set status=${status} where id=${id} `
    db.execute(statement, (error, data) => {

        res.send(utils.createdResult(error, data))
    })
})
module.exports = router