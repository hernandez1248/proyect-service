//Detecta el reqyesr e invoca la función.

import db from "@/database/models"

export default function handler(req, res) {
  switch(req.method){
    case 'GET':
      return cityList(req, res);
    case 'POST':
      return addCity(req, res);
    case 'PUT':
      return updateCity (req, res);
    case 'DELETE': 
      return deleteCity(req, res);
    default:
      res.status(400).json({error: true, message: 'Petición errónea'});
  }
}

const cityList = async (req, res) => {
  try {
      // leeer las ciudades 
      const city = await db.City.findAll({
        include: ['localities'],
      });  

      return res.json(city);
  } catch (error) {
      return res.status(400).json(
          {
              error: true,
              message: `Ocurrió un error al procesar la petición: ${error.message}`
          }
      )
  }
}



const addCity = async (req, res) => {
  try {
    console.log(req.body);
    //leer las ciudades
    const city = await db.City.create({...req.body});
    res.json({
      city,
      message: "El Municipio fue agregado con éxito"
    });
  }catch (error){
    console.log(error);
    let errors = [];
    //si catch tiene mensajes de error
    if(error.errors){
      //extraer la información de los campos con error
      errors = error.errors.map((item) => ({
        error: item.message,
        field: item.path,
      }));
    }
    return res.status(400).json(
      {
        error:true,
        message: `Ocurrió un error al procesar la petición: ${error.message}`,
        errors
      }
    )
  }
}

const updateCity = async(req, res) => {
  try {
    const {id} = req.query;
    await db.City.update({...req.body}, {
      where: {
        id:id
      }
    })
    res.json({
      message: "El Municipio fue actualizado con éxito"
    });
  } catch (error) {
    console.log(error);
    let errors = [];
    //si catch tiene mensajes de error
    if(error.errors){
      //extraer la información de los campos con error
      errors = error.errors.map((item) => ({
        error: item.message,
        field: item.path,
      }));
    }
    return res.status(400).json(
      {
        error:true,
        message: `Ocurrió un error al procesar la petición: ${error.message}`,
        errors
      }
    )
  }
}

const deleteCity = async(req, res) =>{
  try {
    const {id} = req.query;
    await db.City.destroy({
      where: {
        id: id
      }
    });
    res.json({
      message: "El Municipio fue eliminado correctamente"
    });
  }catch (error){
    console.log(error);
    let errors = [];
    //si catch tiene mensajes de error
    if(error.errors){
      //extraer la información de los campos con error
      errors = error.errors.map((item) => ({
        error: item.message,
        field: item.path,
      }));
    }
    return res.status(400).json(
      {
        error:true,
        message: `Ocurrió un error al procesar la petición: ${error.message}`,
        errors
      }
    )
  }
}
