import { DBType, DocConfigFile, LogType } from './BE_types';
import path from 'path';
import fs from 'fs';
import os from 'os';
import logger from './Logging/masterlog';

const home = `${os.homedir()}\\Documents\\SeeQR`;
const configFile = `config.json`;
const configPath = `${home}\\${configFile}`;

const readConfigFile = function (): DocConfigFile {
  if (fs.existsSync(configPath)) {
    try {
      const text = fs.readFileSync(configPath, 'utf-8');
      return JSON.parse(text) as DocConfigFile;
    } catch (err: any) {
      throw 'Error parsing config file: ' + err.message;
    }
  } else {
    return writeConfigDefault();
  }
};

const writeConfigDefault = function (): DocConfigFile {
  logger('Could not find config file. Creating default', LogType.WARNING);

  const defaultFile: DocConfigFile = {
    mysql_user: 'root',
    mysql_pass: 'Hello123!',
    pg_user: 'postgres',
    pg_pass: 'postgres',
  };

  fs.writeFileSync(configPath, JSON.stringify(defaultFile));

  return defaultFile;
};

interface DocConfig {
  getConfigFolder: () => string;
  getCredentials: (dbType: DBType) => { user: string; pass: string };
}

const docConfig: DocConfig = {
<<<<<<< HEAD
  getConfigFolder: function () {
    if (fs.existsSync(home)) {
      logger('Found documents directory: ' + home, LogType.SUCCESS);
    } else {
      logger(
        'Could not find documents directory. Creating at: ' + home,
        LogType.WARNING
      );
      fs.mkdirSync(home);
=======
    getConfigFolder: function() {
        if(fs.existsSync(home)) {
            logger('Found documents directory: ' + home, LogType.SUCCESS);
        }
        else {
            logger('Could not find documents directory. Creating at: ' + home, LogType.WARNING);
            fs.mkdirSync(home);
        }
        return home;
    },

    getCredentials: function(dbType: DBType) {
        this.getConfigFolder();

        let configFile: DocConfigFile;
        try {
            configFile = readConfigFile();
            logger('Got config file: ', LogType.SUCCESS, configFile);
        }
        catch(err: any) {
            logger(err.message, LogType.WARNING);
            return {user: 'none', pass: 'none'}; 
        }

        if(dbType === DBType.Postgres) {
            return {user: configFile.pg_user, pass: configFile.pg_pass};
        }
        else if(dbType === DBType.MySQL) {
            return {user: configFile.mysql_user, pass: configFile.mysql_pass};
        }
        else {
            logger('Could not get credentials of DBType: ', LogType.ERROR, dbType);
            return {user: 'none', pass: 'none'};
        }
>>>>>>> dev
    }
    return home;
  },

  getCredentials: function (dbType: DBType) {
    let configFile: DocConfigFile;
    try {
      configFile = readConfigFile();
      logger('Got config file: ', LogType.SUCCESS, configFile);
    } catch (err: any) {
      logger(err.message, LogType.WARNING);
      return { user: 'none', pass: 'none' };
    }

    if (dbType === DBType.Postgres) {
      return { user: configFile.pg_user, pass: configFile.pg_pass };
    } else if (dbType === DBType.MySQL) {
      return { user: configFile.mysql_user, pass: configFile.mysql_pass };
    } else {
      logger('Could not get credentials of DBType: ', LogType.ERROR, dbType);
      return { user: 'none', pass: 'none' };
    }
  },
};

module.exports = docConfig;
