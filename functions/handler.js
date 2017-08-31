'use strict';

const ChocolateService = require('../services');

const handleError = (err, callback) => {
    console.error('handler-error-message', `${err.message}`);
    console.error('handler-error-stack', `${err.stack}`);  
    console.error('handler-error-stage', `${process.env.NODE_ENV}`);
 
  const body = err.body || { errorMessage: err.message };
  callback(null, {
    statusCode: err.statusCode,
    body: JSON.stringify(body),
  });
};
 

const handleSuccess = (result, callback) => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(result),
  });
  };
	

 
module.exports.chocolates = (event, context, callback) => {
// watch it in log group
  new ChocolateService().getChocoList((event.path.chocotype)?event.path.chocotype:'')
  .then(result => handleSuccess(result, callback))
  .catch(err => handleError(err, callback));
};
 


// const preprocess = (event, callback, next) => {
// 	var requestJSON;
//   try { requestJSON = JSON.parse(event.path.param); }
//   catch (err) { handleError(err, callback); return; }
// 	next(requestJSON, callback, handleSuccess, handleError);
// }

 
// module.exports.chocolates = (event, context, callback) => {
// 	preprocess(event, callback, ChocolateService.getChocoist);
// };