"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePurchase = exports.deletePurchase = exports.getPurchase = exports.createPurchase = exports.getPurchases = void 0;
var typeorm_1 = require("typeorm");
var ProductPurchase_1 = require("../entity/ProductPurchase");
var Product_1 = require("../entity/Product");
var User_1 = require("../entity/User");
/**
 * Get a list of purchases of the current user saved on the purchases database table
 * @param req
 * @param res
 * @returns list of purchases
 */
var getPurchases = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var currentUser, user, purchases;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                currentUser = JSON.stringify(req.user);
                user = JSON.parse(currentUser);
                return [4 /*yield*/, (0, typeorm_1.getRepository)(ProductPurchase_1.ProductPurchase).find({ user: user })];
            case 1:
                purchases = _a.sent();
                return [2 /*return*/, res.status(200).json(purchases)];
        }
    });
}); };
exports.getPurchases = getPurchases;
/**
 * Create a purchase, then save it into the product database table
 * @param req
 * @param req
 * @param res
 * @returns the saved purchase
 */
var createPurchase = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var manager, currentUser, products, productList, total, newPurchase, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                manager = (0, typeorm_1.getManager)();
                return [4 /*yield*/, (0, typeorm_1.getRepository)(User_1.User).findOne(req.user)];
            case 1:
                currentUser = _a.sent();
                products = req.body.products;
                return [4 /*yield*/, manager.createQueryBuilder(Product_1.Product, "product") // then get all products with those ids
                        .where("product.id IN (:...products)", { products: products })
                        .getMany()];
            case 2:
                productList = _a.sent();
                total = 0;
                productList.forEach(function (product) {
                    total += product.price * product.quantity; // get the price by each product based on its price and quantity
                });
                if (!(currentUser && currentUser.money - total > 0)) return [3 /*break*/, 5];
                // edit the user ammount badge
                return [4 /*yield*/, (0, typeorm_1.getRepository)(User_1.User).merge(currentUser, {
                        money: currentUser.money - total
                    })];
            case 3:
                // edit the user ammount badge
                _a.sent();
                // save the updated user
                return [4 /*yield*/, (0, typeorm_1.getRepository)(User_1.User).save(currentUser)];
            case 4:
                // save the updated user
                _a.sent();
                return [3 /*break*/, 6];
            case 5: return [2 /*return*/, res.status(400).json({ msg: "Insufficient money" })];
            case 6: return [4 /*yield*/, (0, typeorm_1.getRepository)(ProductPurchase_1.ProductPurchase).create({
                    user: currentUser,
                    products: productList,
                    total: total
                })];
            case 7:
                newPurchase = _a.sent();
                return [4 /*yield*/, (0, typeorm_1.getRepository)(ProductPurchase_1.ProductPurchase).save(newPurchase)];
            case 8:
                result = _a.sent();
                if (result) {
                    return [2 /*return*/, res.status(201).json(result)];
                }
                return [2 /*return*/, res.status(400).json({ msg: "Failed to save purchase" })];
        }
    });
}); };
exports.createPurchase = createPurchase;
/**
 * Gets a purchase based on the request id
 * @param req
 * @param res
 * @returns a purchase
 */
var getPurchase = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, typeorm_1.getRepository)(ProductPurchase_1.ProductPurchase).findOne(req.params.id)];
            case 1:
                result = _a.sent();
                if (result) {
                    return [2 /*return*/, res.status(302).json(result)];
                }
                return [2 /*return*/, res.status(404).json({ msg: "Purchase id not found" })];
        }
    });
}); };
exports.getPurchase = getPurchase;
/**
 * delete a purchase based on its id
 */
var deletePurchase = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, typeorm_1.getRepository)(ProductPurchase_1.ProductPurchase).delete(req.params.id)];
            case 1:
                result = _a.sent();
                if (result) {
                    return [2 /*return*/, res.status(200).json(result)];
                }
                return [2 /*return*/, res.status(404).json({ msg: "Purchase id not found" })];
        }
    });
}); };
exports.deletePurchase = deletePurchase;
/**
 * Update an purchase based on request id and a product list
 * @param req
 * @param res
 * @returns updated purchase
 */
var updatePurchase = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var manager, purchase, products, productList, total_1, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                manager = (0, typeorm_1.getManager)();
                return [4 /*yield*/, (0, typeorm_1.getRepository)(ProductPurchase_1.ProductPurchase).findOne(req.params.id)];
            case 1:
                purchase = _a.sent();
                if (!purchase) return [3 /*break*/, 4];
                products = req.body.products;
                return [4 /*yield*/, manager.createQueryBuilder(Product_1.Product, "product") // then get all products with those ids
                        .where("product.id IN (:...products)", { products: products })
                        .getMany()];
            case 2:
                productList = _a.sent();
                total_1 = 0;
                productList.forEach(function (product) {
                    total_1 += product.price * product.quantity; // get the price by each product based on its price and quantity
                });
                // update the purchase
                return [4 /*yield*/, (0, typeorm_1.getRepository)(ProductPurchase_1.ProductPurchase).merge(purchase, {
                        products: productList,
                        total: total_1
                    })];
            case 3:
                // update the purchase
                _a.sent();
                result = (0, typeorm_1.getRepository)(ProductPurchase_1.ProductPurchase).save(purchase);
                return [2 /*return*/, res.status(200).json(result)];
            case 4: return [2 /*return*/, res.status(404).json({ msg: "Purchase id not found" })];
        }
    });
}); };
exports.updatePurchase = updatePurchase;
