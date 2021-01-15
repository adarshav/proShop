import express from 'express';
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js';

const router = express.Router();

// the code is moved to controllers for good looking
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

export default router;
