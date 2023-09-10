import "reflect-metadata";
import dotenv from "dotenv";
import Server from "./server/server";
import { AppdataSource } from "./data-source";

dotenv.config();

const server = new Server();
server.listen()

AppdataSource.initialize().then(async (conection) => {
    if(conection){
        console.log("*** Database conection is succesfull! ****");
    }
})
.catch((error) => console.log("*** An error has been ocurred *** " + error))