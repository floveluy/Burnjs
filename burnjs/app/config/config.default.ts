export default {
    database: 'asd',
    sequelize: { // egg-sequelize 配置
        dialect: "mysql", // db type
        database: 'trainnote',
        host: "localhost",
        port: "3306",
        username: "root",
        password: "metal_gear2",
        dialectOptions: {
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
            supportBigNumbers: true,
            bigNumberStrings: true
        },
        define: {
            'underscored': true,
            charset: 'utf8mb4'
        },
    }
}