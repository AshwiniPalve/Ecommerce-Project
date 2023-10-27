const express = require('express')
const utils = require('../utils')
const pool = require('../db')
// router will be used to add routes in  application 
const router = express.Router()

router.get('/company', (req, res) => {
    const statement = ` select id,title,description from company`
    pool.execute(statement, (error, data) => {
        const result = utils.createdResult(error, data)
        res.send(result)
    })
    //  res.send('list of companies')
})

router.post('/company', (req, res) => {
    const { title, description } = req.body
    const statement = `insert into company (title,description)values('${title}','${description}')`
    pool.execute(statement, (error, data) => {
        //console.log('company created')
        res.send(utils.createdResult(error, data))
    })
})

router.put('/company/:id', (req, res) => {
    const { id } = req.params
    const { title, description } = req.body
    const statement = `update company set title='${title}' ,description='${description}'  where id=${id} `
    pool.execute(statement, (error, data) => {
        // console.log(' company updated')
        res.send(utils.createdResult(error, data))

    })
})

router.delete('/company/:id', (req, res) => {
    const { id } = req.params
    const statement = `delete from company where id='${id}'`
    pool.execute(statement, (error, data) => {
        // console.log(' company deleted')
        res.send(utils.createdResult(error, data))
    })

})

//exporting an router having all routes related categories
module.exports = router