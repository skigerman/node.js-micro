'use strict';

require('dotenv').config();

const slackClient = require('../server/slackClient');
const service = require('../server/service');
const http = require('http');
const server = http.createServer(service);

// wit client
const witToken = process.env.WIT_TOKEN;
const witClient = require('../server/witClient')(witToken);

// An access token (from your Slack app or custom integration - usually xoxb)
const slackToken = process.env.SLACK_TOKEN;

const slackLogLevel = 'verbose';
var no = false;
var yes = true;
const serviceRegistry = service.get('serviceRegistry');
const rtm = slackClient.init(slackToken, no, yes, slackLogLevel, witClient, serviceRegistry);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));

server.on('listening', function() {
    console.log(`MICRO is listening on ${server.address().port} in ${service.get('env')} mode.`)
});