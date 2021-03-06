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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class GamesControllers {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield database_1.default.query('SELECT * FROM games');
            res.json(games);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const game = yield database_1.default.query("SELECT * FROM games WHERE id = ?", req.params.id);
            if (game.length > 0) {
                res.json(game[0]);
            }
            else {
                res.status(404).json({ "text": "Game dont exist" });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO games SET ?', [req.body]);
            res.json({ "message": "Game saved" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("DELETE FROM games WHERE id = ?", req.params.id);
            res.json({ "text": "Game deleted" });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query("UPDATE games SET ? WHERE id = ?", [req.body, req.params.id]);
            res.json({ "text": "Game updated" });
        });
    }
}
exports.gamesController = new GamesControllers();
