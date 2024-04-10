

import http from "http";
import { App } from "./src/app.js";

const PORT = 3333;

App.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})




