"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultDeserializer = exports.DefaultSerializer = exports.DefaultTrace = void 0;
const uuid_1 = require("uuid");
class DefaultTrace {
    constructor() {
        this.getId = () => uuid_1.v4();
    }
}
exports.DefaultTrace = DefaultTrace;
class DefaultSerializer {
    serialize(payload) {
        return Buffer.from(JSON.stringify(payload));
    }
}
exports.DefaultSerializer = DefaultSerializer;
class DefaultDeserializer {
    deserialize(buf) {
        return JSON.parse(buf.toString('utf-8'));
    }
}
exports.DefaultDeserializer = DefaultDeserializer;
//# sourceMappingURL=support.js.map