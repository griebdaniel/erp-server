"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Product_1 = require("./Product");
var Supply_1 = require("./Supply");
var Necessary = /** @class */ (function () {
    function Necessary() {
    }
    __decorate([
        typeorm_1.PrimaryColumn({ name: 'supply_name' }),
        __metadata("design:type", Number)
    ], Necessary.prototype, "supplyName", void 0);
    __decorate([
        typeorm_1.PrimaryColumn({ name: 'product_name' }),
        __metadata("design:type", Number)
    ], Necessary.prototype, "productName", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Product_1.Product; }),
        typeorm_1.JoinColumn({ name: 'product_name' }),
        __metadata("design:type", Product_1.Product)
    ], Necessary.prototype, "product", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Supply_1.Supply; }),
        typeorm_1.JoinColumn({ name: 'supply_name' }),
        __metadata("design:type", Supply_1.Supply)
    ], Necessary.prototype, "supply", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Necessary.prototype, "quantity", void 0);
    Necessary = __decorate([
        typeorm_1.Entity()
    ], Necessary);
    return Necessary;
}());
exports.Necessary = Necessary;
//# sourceMappingURL=Necessary.js.map