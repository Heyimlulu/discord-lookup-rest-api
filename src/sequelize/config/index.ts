export const development: any = {
  database: "discordlookupdb",
  username: "root",
  password: "",
  host: "127.0.0.1",
  dialect: "mysql"
};

export const production: any = {
  database_url: "postgres://nqjzcxpamkaunm:a97fd6fc2829b881fa5e62da26e7e3ee3f80bd47ddc0b37df4880698b506ed4f@ec2-34-199-200-115.compute-1.amazonaws.com:5432/d9tl9fltjsjvqc?sslmode=require",
  host: "ec2-34-199-200-115.compute-1.amazonaws.com",
  database: "d9tl9fltjsjvqc",
  username: "nqjzcxpamkaunm",
  password: "a97fd6fc2829b881fa5e62da26e7e3ee3f80bd47ddc0b37df4880698b506ed4f",
  dialect: "postgres",
  logging: false
};