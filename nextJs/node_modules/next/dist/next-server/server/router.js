"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_match_1 = __importDefault(require("./lib/path-match"));
exports.route = path_match_1.default();
class Router {
    constructor(routes = []) {
        this.routes = routes;
    }
    add(route) {
        this.routes.unshift(route);
    }
    async execute(req, res, parsedUrl) {
        let parsedUrlUpdated = parsedUrl;
        for (const route of this.routes) {
            const newParams = route.match(parsedUrlUpdated.pathname);
            // Check if the match function matched
            if (newParams) {
                // Combine parameters and querystring
                if (route.type === 'rewrite' || route.type === 'redirect') {
                    parsedUrlUpdated.query = Object.assign({}, parsedUrlUpdated.query, newParams);
                }
                const result = await route.fn(req, res, newParams, parsedUrlUpdated);
                // The response was handled
                if (result.finished) {
                    return true;
                }
                if (result.pathname) {
                    parsedUrlUpdated.pathname = result.pathname;
                }
            }
        }
        return false;
    }
}
exports.default = Router;
