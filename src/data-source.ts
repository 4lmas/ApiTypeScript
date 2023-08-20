import { DataSource } from "typeorm";

export const AppdataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password:  '159753258aA',
    database: 'ejemplo',
    logging: true,
    synchronize: true,
    entities: ['dist/models/**/*.js'],
    subscribers: ['dist/suscribe/**/*.js'],
    migrations: ['dist/migration/**/*.js']
})