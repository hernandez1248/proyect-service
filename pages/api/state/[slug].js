import db from "@/database/models";
import customer from "@/database/models/customer";

// responsable de detectar el tipo de request 
// e invocar la funcion adecuada 
export default function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return showCities(req, res);
        default:
            res.status(400).json({error: true, message: 'Petición errónea'});
    }
  }

  const showCities = async (req, res) => {
    try {
        // leer la categoria
        const state = await db.State.findOne({
            where: {id: req.query.slug},
            include:'cities'
        }); 

        if(!state) {
            return res.status(404).json({
                message: 'El Estado no existe',
            });
        }
    
      return res.json({ ...state.dataValues});
    } catch (error) {
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrió un error al procesar la petición: ${error.message}`
            }
        )
    }
  }
