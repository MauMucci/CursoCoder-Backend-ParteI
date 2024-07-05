import express from 'express';
import { ProductModel } from '../Mongo/Models/Product.model.js';

const productsRouter = express.Router()

//------------ GET ------------

productsRouter.get("/api/products",async (req,res) => {

    console.log("Se mostrarán todos los productos");
    const {page,limit,query} = req.query

        try{
            const products = await ProductModel.paginate({}, {limit,page});    
            res.json({
                status:"success",
                ...products
            })
            
        }
        catch(error){
            console.error("Error al obtener productos:", error);
            res.status(500).json({ error: "Error interno del servidor" });// OK error desde el servidor?
            }
        }
    )
        productsRouter.get('/api/products/:pid', async (req, res) => {
                try {
                    let pid = parseInt(req.params.pid);
        if (isNaN(pid)) {
            return res.status(400).json({ error: "ID de producto inválido" });
        }

        let productSelectedById = await pm.getProductsByIdAsync(pid);
        
        if (!productSelectedById) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.json(productSelectedById);
    } catch (error) {
        console.error("Error al obtener producto por ID:", error);
        res.status(404).json({ error: "Producto no encontrado" });
    }
});

//------------ POST ------------
productsRouter.post('/',async (req,res)=> {
    try {
        let newProduct = req.body;
        await pm.addProductsAsync(newProduct);
        res.status(400).send({ status: "success", message: "producto agregado" });
    } catch (error) {
        console.error("Error al agregar producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
})

//------------ PUT ------------
productsRouter.put('/:pid', async (req, res) => {
    try {
        let pid = parseInt(req.params.pid);

        if (isNaN(pid)) {
            return res.status(400).json({ error: "ID de producto inválido" });
        }

        let productToUpdate = req.body;
        await pm.updateProduct(pid, productToUpdate);
        res.send({ status: "success", message: "Producto actualizado" });
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(404).json({ error: "Producto no encontrado" });
    }
});
//------------ DELETE ------------
productsRouter.delete('/:pid', async (req, res) => {
    try {
        let pid = parseInt(req.params.pid);

        if (isNaN(pid)) {
            return res.status(400).json({ error: "ID de producto inválido" });
        }

        await pm.deleteProduct(pid);
        res.send({ status: "success", message: "Producto eliminado" });
        
    } catch (error) {
        console.error("Error al borrar producto:", error);
        res.status(404).json({ error: "Producto no encontrado" });
    }
});



export { productsRouter };