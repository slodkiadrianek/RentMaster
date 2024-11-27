import {app} from './app.js';
import {configDotenv} from "dotenv";
configDotenv();
const port :string = process.env.PORT || '3000';
app.listen(port, () =>{
    console.log(`Server started on port ${port}`);
});