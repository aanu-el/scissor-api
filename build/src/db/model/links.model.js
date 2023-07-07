"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Links = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Links = exports.Links = (() => {
    let _classDecorators = [(0, sequelize_typescript_1.Table)({
            timestamps: true,
            tableName: 'links'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _id_decorators;
    let _id_initializers = [];
    let _userUuid_decorators;
    let _userUuid_initializers = [];
    let _url_decorators;
    let _url_initializers = [];
    let _customDomain_decorators;
    let _customDomain_initializers = [];
    let _customUrl_decorators;
    let _customUrl_initializers = [];
    let _finalUrl_decorators;
    let _finalUrl_initializers = [];
    let _qrCode_decorators;
    let _qrCode_initializers = [];
    var Links = _classThis = class extends sequelize_typescript_1.Model {
        constructor() {
            super(...arguments);
            this.id = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _id_initializers, void 0));
            this.userUuid = __runInitializers(this, _userUuid_initializers, void 0);
            this.url = __runInitializers(this, _url_initializers, void 0);
            this.customDomain = __runInitializers(this, _customDomain_initializers, void 0);
            this.customUrl = __runInitializers(this, _customUrl_initializers, void 0);
            this.finalUrl = __runInitializers(this, _finalUrl_initializers, void 0);
            this.qrCode = __runInitializers(this, _qrCode_initializers, void 0);
        }
    };
    __setFunctionName(_classThis, "Links");
    (() => {
        _id_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.INTEGER,
                primaryKey: true
            })];
        _userUuid_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.STRING,
                allowNull: true,
            })];
        _url_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.STRING,
                allowNull: false,
            })];
        _customDomain_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.STRING,
                allowNull: true,
            })];
        _customUrl_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.STRING,
                allowNull: true,
            })];
        _finalUrl_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.STRING,
                allowNull: true,
            })];
        _qrCode_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.STRING,
                allowNull: true,
            })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } } }, _id_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _userUuid_decorators, { kind: "field", name: "userUuid", static: false, private: false, access: { has: obj => "userUuid" in obj, get: obj => obj.userUuid, set: (obj, value) => { obj.userUuid = value; } } }, _userUuid_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _url_decorators, { kind: "field", name: "url", static: false, private: false, access: { has: obj => "url" in obj, get: obj => obj.url, set: (obj, value) => { obj.url = value; } } }, _url_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _customDomain_decorators, { kind: "field", name: "customDomain", static: false, private: false, access: { has: obj => "customDomain" in obj, get: obj => obj.customDomain, set: (obj, value) => { obj.customDomain = value; } } }, _customDomain_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _customUrl_decorators, { kind: "field", name: "customUrl", static: false, private: false, access: { has: obj => "customUrl" in obj, get: obj => obj.customUrl, set: (obj, value) => { obj.customUrl = value; } } }, _customUrl_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _finalUrl_decorators, { kind: "field", name: "finalUrl", static: false, private: false, access: { has: obj => "finalUrl" in obj, get: obj => obj.finalUrl, set: (obj, value) => { obj.finalUrl = value; } } }, _finalUrl_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _qrCode_decorators, { kind: "field", name: "qrCode", static: false, private: false, access: { has: obj => "qrCode" in obj, get: obj => obj.qrCode, set: (obj, value) => { obj.qrCode = value; } } }, _qrCode_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        Links = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Links = _classThis;
})();
