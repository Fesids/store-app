/*import dotenv from "dotenv";
import app from "./app";

dotenv.config();

process.on("uncaughtException", (err:Error) => {
    console.log("UncaughtException! Application shutingdown...", err);
    console.log(err.name, err.message);
    process.exit(1);
});

const server = app.listen(process.env.PORT, () => 
    console.log(`The Server are running at port ${process.env.PORT}`)
);

process.on("uncaughtExceptionMonitor", (err: any) => {
    console.log("UNHANDLED REJECTION! shutting down application...");
    server.close();
    server.close(() => {
        process.exit(1);
    });
});*/

// server.ts
import 'module-alias/register';
import * as dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import { initialise } from './app';
import config from "./config/main"
import {  Application as ExpressApplication } from 'express';

process.on('uncaughtException', (err: Error) => {
  console.error('Uncaught Exception! Shutting down...', err);
  process.exit(1);
});

(async () => {
  const container = await initialise();

  const server = container.get<ExpressApplication>('ExpressApplication');
    
  // Assuming container binds this
  const port = process.env.PORT || config.API_PORT;
  
  const appServer = server.listen(port, () => 
    console.log(`The Server is running at port ${port}`)
  );

  process.on('unhandledRejection', (err: any) => {
    console.error('Unhandled Rejection! Shutting down...');
    appServer.close(() => process.exit(1));
  });
})();
