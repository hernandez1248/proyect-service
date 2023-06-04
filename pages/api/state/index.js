//Detecta el reqyesr e invoca la función.

import db from "@/database/models"

export default function handler(req, res) {
  switch(req.method){
    case 'GET':
      return stateList(req, res);
    case 'POST':
      return addState(req, res);
    case 'PUT':
      return updateState(req, res);
    case 'DELETE': 
      return deleteState(req, res);
    default:
      res.status(400).json({error: true, message: 'Petición errónea'});
  }
}

const stateList = async (req, res) => {
  try {
      // leeer los estados
      const state = await db.State.findAll({
        include:['cities'],
      });  

      return res.json(state);
  } catch (error) {
      return res.status(400).json(
          {
              error: true,
              message: `Ocurrió un error al procesar la petición: ${error.message}`
          }
      )
  }
}



const addState = async (req, res) => {
  try {
    console.log(req.body);
    //leer los estados
    const state = await db.State.create({...req.body});
    res.json({
      state,
      message: "El estado fue agregado con éxito"
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

const updateState = async(req, res) => {
  try {
    const {id} = req.query;
    await db.State.update({...req.body}, {
      where: {
        id:id
      }
    })
    res.json({
      message: "El estado fue actualizado con éxito"
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

const deleteState = async(req, res) =>{
  try {
    const {id} = req.query;
    await db.State.destroy({
      where: {
        id: id
      }
    });
    res.json({
      message: "El estado fue eliminado correctamente"
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
