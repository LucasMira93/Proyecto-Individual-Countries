//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Country } = require('./src/db.js');
const axios = require("axios");

// Syncing all the models at once.
conn.sync({ force: true }).then( async () => {


  try{ const apiUrl = await axios.get("https://restcountries.com/v3/all")
    const apiInfo = apiUrl.data.map(c =>{
        return {
          name: c.name["common"],
          alpha3Code: c.cca3,
          capital: c.capital ? c.capital[0] : "capital not found",
          continents: c.continents[0],
          area: c.area,
          region: c.subregion,
          flags: c.flags.find((el) => el.includes("svg")),
          population: c.population
        }
    })                       //BUSCAR DEFINICIÓN
    const dB = await Country.bulkCreate(apiInfo);
  }catch(error){console.log(error)}


  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
