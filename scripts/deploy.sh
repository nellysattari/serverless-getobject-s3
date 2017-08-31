#!/bin/bash
set -e

echo "1) Remove node_module and reinstall libraries" 
rm -fr node_modules
npm install

echo "2) build up node_env"  
npm run config

echo   $STAGE
# npm install serverless@"1.5.1" &&
# node_modules/serverless/bin/serverless deploy -v --stage dev
# sls deploy -v --stage dev --region ap-southeast-2 --vpcId vpc-610fe205 --subnetId subnet-7f83281b,subnet-9f3beae9
  
 sls deploy -v --stage dev --region ap-southeast-2 
#  sls remove --stage dev --region us-east-1
  
