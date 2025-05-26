"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uuidToBuffer = exports.bufferToUUID = void 0;
const bufferToUUID = (buffer) => {
    return [
        buffer.toString("hex", 0, 4),
        buffer.toString("hex", 4, 6),
        buffer.toString("hex", 6, 8),
        buffer.toString("hex", 8, 10),
        buffer.toString("hex", 10, 16),
    ].join("-");
};
exports.bufferToUUID = bufferToUUID;
const uuidToBuffer = (uuid) => {
    return Buffer.from(uuid.replace(/-/g, ""), "hex");
};
exports.uuidToBuffer = uuidToBuffer;
