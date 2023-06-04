//Detecta el reqyesr e invoca la función.

import db from "@/database/models"

export default function handler(req, res) {
  switch(req.method){
    case 'GET':
      return localityList(req, res);
    case 'POST':
      return addLocality(req, res);
    case 'PUT':
      return updateLocality (req, res);
    case 'DELETE': 
      return deleteLocality(req, res);
    default:
      res.status(400).json({error: true, message: 'Petición errónea'});
  }
}

const localityList = async (req, res) => {
  try {
      // leeer las localidades
      const locality = await db.Locality.findAll({
        include: ['city'],
      });  

      return res.json(locality);
  } catch (error) {
      return res.status(400).json(
          {
              error: true,
              message: `Ocurrió un error al procesar la petición: ${error.message}`
          }
      )
  }
}



const addLocality = async (req, res) => {
  try {
    console.log(req.body);
    //leer las localidades
    const locality = await db.Locality.create({...req.body});
    res.json({
      locality,
      message: "La localidad fue agregada con éxito"
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

const updateLocality = async(req, res) => {
  try {
    const {id} = req.query;
    await db.Locality.update({...req.body}, {
      where: {
        id:id
      }
    })
    res.json({
      message: "La localidad fue actualizada con éxito"
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

const deleteLocality = async(req, res) =>{
  try {
    const {id} = req.query;
    await db.Locality.destroy({
      where: {
        id: id
      }
    });
    res.json({
      message: "La localidad fue eliminada correctamente"
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
