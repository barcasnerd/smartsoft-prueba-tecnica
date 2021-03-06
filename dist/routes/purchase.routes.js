"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var purchase_controller_1 = require("../controllers/purchase.controller");
var router = (0, express_1.Router)();
router.get('/', purchase_controller_1.getPurchases);
router.post('/', purchase_controller_1.createPurchase);
router.get('/:id', purchase_controller_1.getPurchase);
router.put('/:id', purchase_controller_1.updatePurchase);
router.delete('/:id', purchase_controller_1.deletePurchase);
exports.default = router;
