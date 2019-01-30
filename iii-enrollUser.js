const logger = require('log4js').getLogger('iii-enrollUser.js');
const path = require('path');
const loader = require('./loader');
const util = require('util');
const environment = process.env.MODE || 'ibp';
const config = require(`./config-${environment}.json`);
const enrollUser = require('./enroll-user.js');

const CHANNEL_NAME = config.channelName;
const CHAINCODE_NAME = config.chaincodeName;

logger.setLevel(process.env.LOGLEVEL || 'info');
const helper = loader(path.join(__dirname, config.connectionProfileDir));

//Get Certificate Authority Object for org2. Using registrar admin registered previously, we enroll a new user
const casOrg2 = helper.getCASForOrg('org2');
const caOrg2 = casOrg2[0];

return enrollUser(caOrg2, 'Regional Store Manager')
    .then((res) => {
        logger.info(res);
    })
    .catch((err) => {
        logger.error(err);
    });
