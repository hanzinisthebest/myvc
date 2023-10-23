import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions:DataSourceOptions = process.env.NODE_ENV ==='development' ? 
{
    type: 'sqlite',
    database: 'db.sqlite',
    entities: ['**/*.entity.js'],
    migrations: ['dist/db/migration/*.js']
}
:process.env.NODE_ENV ==='test' ?{
    type: 'sqlite',
    database: 'test.sqlite',
    entities: ['**/*.entity.js'],
    migrations: ['dist/db/migration/*.js'],
     migrationsRun: true
}:{
    type: 'postgres',
    url:process.env.DATABASE_URL,
    database: 'db.sqlite',
    entities: ['**/*.entity.js'],
    migrations: ['dist/db/migration/*.js'],
    migrationsRun: true,
    ssl:{
        rejectUnauthorized:false,
    }
};
// "pg": "^8.11.3",

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
