import { Sequelize } from 'sequelize';
import { logsModel } from './models/logs';
const config = require('../../config/config.json');

const sequelize = new Sequelize(config.development);

sequelize.authenticate()
    .then(() => console.log('Connection to the database has been successfully established '))
    .catch((err) => console.error(`Could not connect to the database: ${err}`));

export const Logs = logsModel(sequelize);

export const initDb = () => {
    return sequelize.sync().then(() => {
        console.log('Database has successfully been synced');
    });
}
