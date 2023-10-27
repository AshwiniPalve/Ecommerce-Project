const express = require('express')
const utils=require('../utils')
const pool = require('../db')
// router will be used to add routes in  routerlication 
const router = express.Router()

router.get('/category', (req, res) => {
    const statement = `select id ,title, description from category`
    pool.execute(statement, (error, data) => {
        res.send(utils.createdResult(error,data))
    })
    // res.send('list of categories')
})

router.post('/category', (req, res) => {
    const { title, description } = req.body
    const statement = `insert into category (title,description)values('${title}','${description}')`
    pool.execute(statement, (error, data) => {
        console.log('category created')
        res.send(utils.createdResult(error,data))
    })
    
})

router.put('/category/:id', (req, res) => {
    const { id } = req.params
    const { title } = req.body
    const statement = `update category set title='${title}' where id=${id} `
    pool.execute(statement, (error, data) => {
        console.log('category updated')
        res.send(utils.createdResult(error,data))
    })
    
})

router.delete('/category/:id', (req, res) => {
    const { id } = req.params
    const statement = `delete from category where id=${id}`;
    pool.execute(statement, (error, data) => {
        res.send(utils.createdResult(error,data))
    })
    //res.send('category deleted')
})


//exporting an router having all routes related categories
module.exports = router