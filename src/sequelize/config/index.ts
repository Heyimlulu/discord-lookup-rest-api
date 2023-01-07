export const development: any = {
  database: "discordlookupdb",
  username: "root",
  password: "",
  host: "127.0.0.1",
  dialect: "mysql"
};

export const production: any = {
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: "postgres",
  logging: false
};
