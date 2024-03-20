"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStringDeserializationSuite = void 0;
const suite_1 = require("../suite");
const BSON = require("../../../../");
function getStringDeserializationSuite() {
    const DOC = BSON.serialize({
        nextBatch: Array.from({ length: 1000 }, () => {
            return {
                _id: new BSON.ObjectId(),
                arrayField: Array.from({ length: 20 }, (_, i) => `5e99f3f5d3ab06936d36000${i}`)
            };
        })
    });
    const suite = new suite_1.Suite('string deserialization');
    for (const utf8Validation of [true, false]) {
        suite.task({
            name: `stringDeserializationUTF8${utf8Validation ? 'On' : 'Off'}-${process.env.WEB === 'true' ? 'web' : 'node'}`,
            data: DOC,
            fn: serializedDoc => BSON.deserialize(serializedDoc, { validation: { utf8: utf8Validation } }),
            iterations: 10000,
            resultUnit: 'megabytes_per_second',
            transform: (runtimeMS) => {
                return DOC.byteLength / 1024 ** 2 / (runtimeMS / 1000);
            }
        });
    }
    return suite;
}
exports.getStringDeserializationSuite = getStringDeserializationSuite;
//# sourceMappingURL=string_deserialization.js.map