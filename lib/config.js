var fs = require('fs-extra');
var logger = require(__dirname + '/../lib/logger');

var configFile = __dirname + '/../config.json';
var dockerConfigFile = '/config/config.json';

var config;

if (process.env.TELEGRAM_BOTTOKEN) {
  if(locateConfigFile(dockerConfigFile) !== true) {
    setDefaultConfig();
  }
} else {
  if (locateConfigFile(configFile) !== true) {
    setDefaultConfig();
  }
}

function setDefaultConfig() {
  config          = {};
  config.telegram = {};
  config.bot      = {};
  config.radarr   = {};
  config.sonarr   = {};
  config.defaults = {};

}

function locateConfigFile(configFileName, result) {
  try {
    config = JSON.parse(fs.readFileSync(configFileName, 'utf8'));
    return true;
  } catch (err) {
        // JSON file is not correct
    if (err.name === 'SyntaxError') {
      throw new Error('Invalid configuration file, please make sure the file is in JSON format.');
    }

    // config file not found
    if (err.code === 'ENOENT') {
      logger.info('config file not found');
      return false;
    } 
  }
}

/*
 * set up config options, they can be passed in thru the enviroment
 */
config.telegram.botToken = config.telegram.botToken || process.env.TELEGRAM_BOTTOKEN;

config.bot.password      = config.bot.password || process.env.BOT_PASSWORD || '';
config.bot.owner         = config.bot.owner || process.env.BOT_OWNER || 0;
config.bot.notifyId      = config.bot.notifyId || process.env.BOT_NOTIFYID || 0;
config.bot.maxResults    = config.bot.maxResults || process.env.BOT_MAXRESULTS || 15;
config.bot.lang          = config.bot.lang || 'en';

// Radarr Section of Config
config.radarr.hostname   = config.radarr.hostname || process.env.RADARR_HOST || 'localhost';
config.radarr.apiKey     = config.radarr.apiKey || process.env.RADARR_APIKEY;
config.radarr.port       = config.radarr.port || process.env.RADARR_PORT || 7878;
config.radarr.urlBase    = config.radarr.urlBase || process.env.RADARR_URLBASE;
config.radarr.ssl        = config.radarr.ssl || process.env.RADARR_SSL || false;
config.radarr.username   = config.radarr.username || process.env.RADARR_USERNAME;
config.radarr.password   = config.radarr.password || process.env.RADARR_PASSWORD;
config.defaults.rootFolder = config.defaults.rootFolder || process.env.DEFAULTS_ROOT_FOLDER;
config.defaults.profileId  = config.defaults.profileId || process.env.DEFAULTS_PROFILE_ID;
config.defaults.monitor    = config.defaults.monitor || process.env.DEFAULTS_MONITOR;

// Sonarr Section of Config
config.sonarr.hostname   = config.sonarr.hostname || process.env.SONARR_HOST || 'localhost';
config.sonarr.apiKey     = config.sonarr.apiKey || process.env.SONARR_APIKEY;
config.sonarr.port       = config.sonarr.port || process.env.SONARR_PORT || 8989;
config.sonarr.urlBase    = config.sonarr.urlBase || process.env.SONARR_URLBASE;
config.sonarr.ssl        = config.sonarr.ssl || process.env.SONARR_SSL || false;
config.sonarr.username   = config.sonarr.username || process.env.SONARR_USERNAME;
config.sonarr.password   = config.sonarr.password || process.env.SONARR_PASSWORD;

module.exports = config;
