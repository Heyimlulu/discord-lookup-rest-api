import { Sequelize } from 'sequelize';
import { logsModel } from './models/logs';
import { userModel } from './models/user';
import { development, production }  from './config';

let config: any = undefined;

if (process.env.NODE_ENV === 'production') {
    config = production;
} else {
    config = development;
}

const sequelize = new Sequelize(config);

sequelize.authenticate()
    .then(() => console.log('Connection to the database has been successfully established '))
    .catch((err) => console.error(`Could not connect to the database: ${err}`));

export const Logs = logsModel(sequelize);
export const User = userModel(sequelize);

export const initDb = () => {
    return sequelize.sync().then(() => {
        console.log('Database has successfully been synced');
    }).catch((err) => {
        console.error(err);
    });
}
