import { Sequelize } from 'sequelize';
import { logsModel } from './models/logs';
import { lookupModel } from './models/lookup';
import { development, production }  from './config';

let config: object = {};

if (process.env.NODE_ENV === 'production') {
    // I use Postgres for production
    config = production;
} else {
    config = development;
}

const sequelize = new Sequelize(config);

sequelize.authenticate()
    .then(() => console.log('Connection to the database has been successfully established '))
    .catch((err) => console.error(`Could not connect to the database: ${err}`));

export const Logs = logsModel(sequelize);
export const Lookup = lookupModel(sequelize);

export const initDb = () => {
    return sequelize.sync().then(() => {
        console.log('Database has successfully been synced');
    }).catch((err) => {
        console.error(err);
    });
}
