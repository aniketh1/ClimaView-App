import express from 'express';
import weatherData from '../utils/weatherData.js';
import path from 'path';
import hbs from 'hbs'
import { fileURLToPath } from 'url';
const app = express();
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")
app.set("view engine","hbs");
app.set("views",viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));

app.get("/",(req,res)=>{
    res.render("index",{title:"ClimaView App"});
})

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({ error: 'You must provide an address' });
    }
    weatherData(address, (error, data) => {
        if (error) {
            return res.send({ error: 'Unable to fetch weather data' });
            
        }
        res.send(data);
    });
});
app.get("*",(req,res)=>{
    res.render("404",{title : "page not found"});
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});
