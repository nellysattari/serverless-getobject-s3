const config = require('../config');
const aws = require('aws-sdk');
const s3 = new aws.S3({ apiVersion: '2017-08-27', region: 'ap-southeast-2' });
const _ = require('underscore');

module.exports = class ChocolateService {
    constructor() { }

    getChocoList(chocoType) {
        let bucketParams;
        bucketParams = { Bucket: `${process.env.NODE_ENV}-${config.BucketName}`, Key: config.KeyName };
        console.log("bucket" + bucketParams.Bucket);
        return s3.getObject(bucketParams).promise()
            //.then(result => JSON.parse(result.Body.toString()))
            .then(result => {
                const allList = JSON.parse(result.Body.toString());
                if (chocoType) {
                    const filteredList = _.filter(allList, function (containItem) {
                        if(containItem.dsc.indexOf(chocoType)!== -1) return containItem;
                     });
                    console.log('list filtered');
                    return filteredList;
                }
                console.log('actual list'); return allList;
            })
            .catch((error) => {
                console.log("try to get s3");
                console.log(error);
            });
    }
}
 