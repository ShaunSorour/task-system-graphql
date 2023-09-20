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
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = require("glob");
const promises_1 = require("fs/promises");
const fs_1 = require("fs");
const merge_1 = require("@graphql-tools/merge");
const graphql_1 = require("graphql");
(0, glob_1.glob)('src/**/*graphql', (err, files) => __awaiter(void 0, void 0, void 0, function* () {
    if (err)
        throw err;
    let typesArray = [];
    yield (0, promises_1.unlink)('schema.graphql');
    (0, fs_1.writeFileSync)('schema.graphql', '# generated - do not edit #\n\n', { flag: 'a+' });
    files.forEach((filePath) => {
        const schema = (0, fs_1.readFileSync)(filePath, { encoding: 'utf-8' });
        typesArray.push(schema);
    });
    const typeDefs = (0, graphql_1.print)((0, merge_1.mergeTypeDefs)(typesArray));
    (0, fs_1.appendFile)('schema.graphql', typeDefs, function (err) {
        if (err)
            throw err;
    });
    console.info("GQL Schema Generated");
}));
