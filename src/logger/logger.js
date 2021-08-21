/**
 * @fileoverview Initializes the Logality library and provides the .get() method.
 * @see https://github.com/thanpolas/logality
 */

const Logality = require('logality');

/**
 * WARNING
 *
 * Do not require any other modules at this point, before the log service
 * init() method has been invoked.
 *
 * WARNING
 */

// Serializers
const relaySerializer = require('./log-serializers/relay.serializer');
const emojiSerializer = require('./log-serializers/emoji.serializer');
const guildSerializer = require('./log-serializers/guild.serializer');
const callRecordSerializer = require('./log-serializers/callrecord.serializer');
const callWriteSerializer = require('./log-serializers/callwrite.serializer');
const callCompleteSerializer = require('./log-serializers/callcomplete.serializer');
const memberAlertRecordSerializer = require('./log-serializers/member-alert-record.serializer');
const tokenSerializer = require('./log-serializers/token.serializer');
const tokenDataSerializer = require('./log-serializers/token-data.serializer');
const priceAlertMessageSerializer = require('./log-serializers/price-alert-message.serializer');

const logger = (module.exports = {});

logger.logality = null;
logger.get = null;

/**
 * Initialize the logging service.
 *
 * @param {Object} bootOpts boot options. This module will check for:
 * @param {string=} bootOpts.appName Set a custom appname for the logger.
 * @param {boolean=} bootOpts.suppressLogging Do not log to stdout.
 */
logger.init = function (bootOpts = {}) {
  // check if already initialized.
  if (logger.logality) {
    return;
  }

  const appName = bootOpts.appName || 'uniswap-chain-queries';

  const serializers = {
    relay: relaySerializer(),
    emoji: emojiSerializer(),
    guild: guildSerializer(),
    callRecord: callRecordSerializer(),
    callWrite: callWriteSerializer(),
    callComplete: callCompleteSerializer(),
    memberAlertRecord: memberAlertRecordSerializer(),
    token: tokenSerializer(),
    tokenData: tokenDataSerializer(),
    priceAlertMessage: priceAlertMessageSerializer(),
  };

  logger.logality = new Logality({
    prettyPrint: true,
    appName,
    async: true,
    serializers,
  });

  // Create the get method
  logger.get = logger.logality.get.bind(logger.logality);
};

// Boot the logger
logger.init();
