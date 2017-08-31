'use strict';
require('dotenv').config();
var app = require('express')();
const bodyParser = require('body-parser');
const PORT = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const _ = require('underscore');

const handler = require('./functions/handler');

// const choco = require('./choco.json');

const handleError = (err, callback) => {
  const body = err.body || { errorMessage: err.message };
  console.log(body);
};
 
 

// const preprocess = (next) => {
//   return (req, res) => {
//     try { requestJSON = JSON.parse(req.path.param); }
//     catch (err) { handleError(err, callback); return; }
//      const result = next(req.body, null,  (data,error)=>
//        {res.json(JSON.parse(JSON.stringify(data)))}
//     , handleError,false,false);
//    }
//   var requestJSON;
  

//  var result= next(requestJSON, null, handleSuccess, handleError);
// }

 

function expressCallback(method) {
  return (req, res) => {
      const result = method(buildEvent(req), null, (error, result) => {
      res.statusCode = result.statusCode || 200;
      res.json(JSON.parse(result.body));
    });
  }
}

const buildEvent = (req) => {
  return {
    path: {
      chocotype: req.params.chocotype,
    },
    body: JSON.stringify(req.body),
    headers: req.headers,
    requestContext: {
      stage: process.env.NODE_ENV || 'dev',
    },
  };
};


 app.get('/choco/getList/:chocotype', expressCallback(handler.chocolates));

//app.get('/choco/getList', preprocess(chocoService.chocolates));

// app.get('/choco/getList/:chocotype', function(request, response, next) {
//   var cocotypee = request.params.chocotype;
//   const allList=choco;
//   const filteredList = _.filter(allList, function (containItem) {
//                          if(containItem.dsc.indexOf(cocotypee)!== -1) return containItem;
//                     });
//          res.statusCode = result.statusCode || 200;
//       res.json(JSON.parse(filteredList));
//  return res;              
// });

app.listen(PORT, () => console.warn('Choco Services local app listening on port ', PORT));
 
module.exports = app;

