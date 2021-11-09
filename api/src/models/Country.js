const { DataTypes, DATE } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  //  sequelize.define defino el modelo
  sequelize.define('country', { 

    alpha3Code:{
      type: DataTypes.STRING(3),
      allowNull: false, // allowNull permite que el campo sea requerido, es decir que deba tener si o si ese id por ejemplo
      primaryKey: true,  // clave primaria

    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flags:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '---',
    },
    continents:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '---',
    },
    capital:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '---',
    },
    region:{
      type: DataTypes.STRING,
      defaultValue: '---',
    },
    population:{
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    area:{
      type: DataTypes.DECIMAL,
      allowNull: true,
      
    },
  },

  //consultar esto
  { timestamps: false },
  );
};