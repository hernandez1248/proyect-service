import db from "@/database/models";
import customer from "@/database/models/customer";

// responsable de detectar el tipo de request 
// e invocar la funcion adecuada 
export default function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return showCustomer(req, res);
        default:
            res.status(400).json({error: true, message: 'Petición errónea'});
    }
  }

  const showCustomer = async (req, res) => {
    try {
        // leer la categoria
        const customer = await db.Customer.findOne({
            where: {id: req.query.slug},
            include:'address'
        }); 

        if(!customer) {
            return res.status(404).json({
                message: 'La ruta no existe',
            });
        }
    
      return res.json({ ...customer.dataValues});
    } catch (error) {
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrió un error al procesar la petición: ${error.message}`
            }
        )
    }
  }
