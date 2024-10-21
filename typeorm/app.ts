import "reflect-metadata";
import { AppDataSource } from "./banco";
import { Photo } from "./entity/Photo";

AppDataSource.initialize()
    .then(async() => {
        const photo = new Photo()
        photo.name = "Me and Bears"
        photo.description = "I am near polar bears"
        photo.filename = "photo-with-bears.jpg"
        photo.views = 1
        photo.isPublished = true

        await AppDataSource.manager.save(photo)
    })
    .catch((error) => console.log(error))