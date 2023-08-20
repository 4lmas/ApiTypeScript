"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppdataSource = void 0;
var typeorm_1 = require("typeorm");
exports.AppdataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '159753258aA',
    database: 'ejemplo',
    logging: true,
    synchronize: true,
    entities: ['dist/models/**/*.js'],
    subscribers: ['dist/suscribe/**/*.js'],
    migrations: ['dist/migration/**/*.js']
});
//# sourceMappingURL=data-source.js.map