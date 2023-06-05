import db from "@/database/models";
import customer from "@/database/models/customer";

// responsable de detectar el tipo de request 
// e invocar la funcion adecuada 
export default function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return showLocalities(req, res);
        default:
            res.status(400).json({error: true, message: 'Petición errónea'});
    }
  }

  const showLocalities = async (req, res) => {
    try {
        // leer la categoria
        const city = await db.City.findOne({
            where: {id: req.query.slug},
            include: 'localities'
        }); 

        if(!city) {
            return res.status(404).json({
                message: 'El Municipio no existe',
            });
        }
    
      return res.json({ ...city.dataValues});
    } catch (error) {
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrió un error al procesar la petición: ${error.message}`
            }
        )
    }
  }
