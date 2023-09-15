import {Router} from 'express'

import{body} from 'express-validator'
import{handleInputErrors} from './modules/middleware'
import { getProductById ,getProducts,createProduct,updateProduct, deleteProduct} from './handler/products'
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handler/updates'

const router = Router()

/**
 * product
 */
router.get('/product',getProducts)
router.get('/product/:id',getProductById)
router.post('/product',body('name').isString,handleInputErrors,createProduct)
router.put('/product/:id',body('name').isString(),handleInputErrors,updateProduct)
router.delete('/product/:id',deleteProduct)

/**
 * update
 */

router.get('/update',getUpdates)
router.get('/update/:id',getOneUpdate)

router.post('/update',
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    createUpdate
)
router.put('/update/:id',
body('title').optional().isString(),
body('body').optional().isString(),
body('status').isIn(['IN_PROGRESS','SHIPPED','DEPRECATED']),
body('version').optional(),
updateUpdate
)
router.delete('/update/:id',deleteUpdate)


/**
 * Update point
 */


router.get('/updatepoint',()=>{})
router.get('/updatepoint/:id',()=>{})
router.post('/updatepoint',
    body('name').isString,
    body('description').isString(),
    body('upadteId').exists().isString,
    handleInputErrors,
    ()=>{}
)
router.put('/updatepoint/:id',
    body('name').optional().isString,
    body('description').optional().isString(),
    handleInputErrors,
    ()=>{}
)
router.delete('/updatepoint/:id',()=>{})



export default router

