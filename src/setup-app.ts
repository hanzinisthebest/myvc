import { ValidationPipe } from "@nestjs/common";

const cockieSession = require('cookie-session')
export const setupApp = (app:any)=>{
    app.use(cockieSession({
        keys:['fsgdsad']
      }))
      app.useGlobalPipes(
        new ValidationPipe({
          whitelist:true
        })
       ); 
}