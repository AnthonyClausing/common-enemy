const express = require('express');
const app  = express();


var testData = {first: "anthony", last: "clausing", age:23}

app.get('/', function(req,res){
  res.send(testData)
})
app.listen(3000, function(){
  console.log('Youre listening on port 3000!')
})