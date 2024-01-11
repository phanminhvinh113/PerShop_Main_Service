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
const User_1 = require("../models.mongo/User");
const books = [
    {
        id: 1,
        name: "Chí phèo",
        author: "Nam Cao",
    },
    {
        id: 2,
        name: "Việt Bắc",
        author: "Tố Hữu",
    },
    {
        id: 3,
        name: "Từ Ấy",
        author: "Tố Hữu",
    },
    {
        id: 4,
        name: "Lão Hạt",
        author: "Nam Cao",
    },
];
const authors = [
    {
        id: 3,
        name: "Nam Cao",
        born: "29/10/1917",
        death: "30/11/1951",
        country: "Viet Nam",
    },
    {
        id: 4,
        name: "Tố Hữu",
        born: "4/10/1920",
        country: "Viet Nam",
    },
];
const resolvers = {
    Query: {
        Books: () => books,
        Book: (_parent, args) => {
            return books.find((item) => item.id === +(args === null || args === void 0 ? void 0 : args.id));
        },
        Authors: () => authors,
        Author: (_parents, _args) => authors.find((item) => item.id === +(_args === null || _args === void 0 ? void 0 : _args.id)),
        User: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield User_1.UserModel.findById(id);
        }),
        Users: () => __awaiter(void 0, void 0, void 0, function* () { return yield User_1.UserModel.find(); }),
    },
    Book: {
        author: (_parent, _args) => {
            return authors.find((author) => author.name === _parent.author);
        },
    },
    Author: {
        book: (_parent, _args) => {
            return books.filter((book) => book.author === _parent.name);
        },
    },
    Mutation: {
        createUser: (_, { inputUser: { name, email, password } }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(name, email, password);
            const user = new User_1.UserModel({
                name,
                email,
                password,
            });
            yield user.save();
            return user;
        }),
    },
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map