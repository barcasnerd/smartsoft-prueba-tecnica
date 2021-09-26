"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var purchase_controller_1 = require("../controllers/purchase.controller");
//import { getPurchases, createPurchase, getPurchase, updatePurchase, deletePurchase } from "../controllers/purchase.controller";
var router = (0, express_1.Router)();
router.get('/', purchase_controller_1.getPurchases);
router.post('/', purchase_controller_1.createPurchase);
// router.get('/:id', getPurchase);
// router.put('/:id', updatePurchase);
// router.delete('/:id', deletePurchase);
exports.default = router;