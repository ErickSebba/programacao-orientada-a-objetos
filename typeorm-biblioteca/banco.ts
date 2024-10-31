import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "poo",
    password: process.env.DB_PASSWORD ?? "",
    database: "typeorm",
    synchronize: true,
    logging: true,
    entities: ["./entity/**.ts"],
    subscribers: [],
    migrations: [],
})