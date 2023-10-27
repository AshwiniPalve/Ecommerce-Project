function createResult(error,data){
const result = {
    status: ''

}
if (error) {
    //if there is an error while performing the operation
    // console.log(`error = ${error}`)
    result['status'] = "error"  //if  error present
    result['error'] = error     //cause of an error
    //res.send('error')
}
else {
    //there is no error
    // console.log(data)
    result['status'] = "success" //if no error
    result['data'] = data  //then result
    // res.send('okay')

}
return  result ;
}

module.exports={
    createdResult:createResult ,
}