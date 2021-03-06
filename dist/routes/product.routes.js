"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var product_controller_1 = require("../controllers/product.controller");
var router = (0, express_1.Router)();
router.get('/', product_controller_1.getProducts);
router.post('/', product_controller_1.createProduct);
router.get('/:id', product_controller_1.getProduct);
router.put('/:id', product_controller_1.updateProduct);
router.delete('/:id', product_controller_1.deleteProduct);
exports.default = router;
