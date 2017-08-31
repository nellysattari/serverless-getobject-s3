'use strict';

console.log('Loading function');

exports.handler = (event, context, callback) => {
    //event
    console.log('Received event:', JSON.stringify(event, null, 2));
   
    //context: provide you with runtime info about function
    console.log('remaining time =', context.getRemainingTimeInMillis());
    console.log('functionName =', context.functionName);
    console.log('logGroupName =', context.logGroupName);
    
    //callback
    callback(null,'Your very first serverless func executed successfully');
};



// ----------------
// servertles
choco:
handler: functions/handler.choco
events:
  - http:
      path: v1/choco
      method: get         
      integration: lambda
      cors: true

// ----------
// handler

module.exports.choco = (event, context, callback) => {
    // watch it in log group
      new ChocolateService().getChocoList('')
      .then(result => handleSuccess(result, callback))
      .catch(err => handleError(err, callback));
    };