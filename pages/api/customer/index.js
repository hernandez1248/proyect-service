//Detecta el reqyesr e invoca la función.

import db from "@/database/models"

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return customerList(req, res);
    case 'POST':
      return addCustomer(req, res);
    case 'PUT':
      return updateCustomer(req, res);
    case 'DELETE':
      return deleteCustomer(req, res);
    default:
      res.status(400).json({ error: true, message: 'Petición errónea' });
  }
}

const customerList = async (req, res) => {
  try {
    // leeer los estados
    const customer = await db.Customer.findAll({});

    return res.json(customer);
  } catch (error) {
    return res.status(400).json(
      {
        error: true,
        message: `Ocurrió un error al procesar la petición: ${error.message}`
      }
    )
  }
}

const addCustomer = async (req, res) => {
  try {
    console.log(req.body);
    //leer los productos
    const customer = await db.Customer.create({ ...req.body},
      {
        include: 'address'
      });
    

    res.json({
      customer,
      message: "El Cliente fue agregado con éxito"
    });
  } catch (error) {
    return res.status(400).json(
      {
        error: true,
        message: `Ocurrió un error al procesar la petición: ${error.message}`
      }
    )
  }
}

const updateCustomer = async (req, res) => {
  try {
    const { id } = req.query;
    await db.Customer.update({ ...req.body }, {
      where: {
        id: id
      }
    })
    res.json({
      message: "El Cliente fue actualizado con éxito"
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(
      {
        error: true,
        message: `Ocurrió un error al procesar la petición: ${error.message}`
      }
    )
  }
}

const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.query;
    await db.Customer.destroy({
      where: {
        id: id
      }
    });
    res.json({
      message: "El Cliente fue eliminado correctamente"
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(
      {
        error: true,
        message: `Ocurrió un error al procesar la petición: ${error.message}`
      }
    )
  }
}
