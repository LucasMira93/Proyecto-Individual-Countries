const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const {Country, Activity} = require("../db");


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getDbInfo = async () => {
    const countriesinDb = await Country.findAll({
        include: {
          model: Activity,
          attributes: ["name", "difficulty", "duration", "season"],
          through: { attributes: [] },
        },
      });
      return countriesinDb;
    
}
 
router.get("/countries", async (req,res) =>{
    let name = req.query.name
    let allCountries = await getDbInfo();
    if(name){
        let countryName = await allCountries.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        countryName.length ?
        res.status(200).send(countryName) :
        res.status(404).send("No se encuentra el país");
    }else{
        res.status(200).send(allCountries);
    }

})

router.get("/countries/:id", async (req, res) =>{
    const id = req.params.id
    const infoApi = await getDbInfo()
    if(id){
        let countryId = await infoApi.filter(e => e.alpha3Code == id)
        countryId.length?
        res.status(200).json(...countryId) :
        res.status(404).send("No se encuentra lo requerido")
    }
})

router.post("/activity", async (req, res)=>{
    let {
        name,
        difficulty,
        duration,
        season,
        countries
    } = req.body
    
    if (
        !name ||
        name.length > 30 ||
        !difficulty ||
        Number.parseInt(difficulty) > 5 ||
        Number.parseInt(difficulty) <= 0
      ) {
        res.status(400).send("Valores incorrectos o incompletos");
        return;
      }
      let activity = await Activity.findOne({
        where: { name },
      });
  
      if (!activity) {
        activity = await Activity.create({
          name,
          difficulty,
          duration,
          season,
        });
      }
  
      const countriesDb = await Country.findAll({
        where: { name: countries },
      });
  
      activity.addCountries(countriesDb);
  
      return res.status(200).send("Activity created");
    })

router.get("/activity", async (req, res)=>{
  let allActivities = await Activity.findAll()
  
  if(allActivities.length){
    return res.status(200).send(allActivities)

  }
  res.status(404).send("No se encuentra la actividad");
  
})



module.exports = router;
