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
exports.__esModule = true;
exports.studentGrade = void 0;
var cheerio = require("cheerio");
var axios_1 = require("axios");
function studentGrade(studentId) {
    return __awaiter(this, void 0, void 0, function () {
        var response, $, scrappedTable, gradeTable, studentInfo, GroupGrade, i, StudentGrade, j;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1["default"].get("https://gazw5fi7d2.execute-api.ap-southeast-1.amazonaws.com/production/grade/" + studentId)];
                case 1:
                    response = _a.sent();
                    $ = cheerio.load(response.data);
                    scrappedTable = [];
                    gradeTable = $('body > center > table > tbody > tr > td > font > center:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td').each(function (index, element) {
                        scrappedTable.push($(element).text());
                    });
                    studentInfo = [];
                    $('body > center > table > tbody > tr > td > font > center:nth-child(2) > table > tbody > tr > td > font:nth-child(1) > center').each(function (index, element) {
                        var parseinfo = $(element)
                            .text()
                            .split(' ', 10);
                        studentInfo.push(Object.assign({
                            studentId: parseinfo[1],
                            studentFirstName: parseinfo[4],
                            studentLastName: parseinfo[6],
                            graduatedFrom: parseinfo[8]
                        }));
                    });
                    GroupGrade = [];
                    for (i = 1; i < scrappedTable.length / 7; i++) {
                        GroupGrade.push(scrappedTable.slice(i * 7, i * 7 + 7));
                    }
                    StudentGrade = [];
                    for (j = 0; j < GroupGrade.length; j++) {
                        StudentGrade.push(Object.assign({
                            term: GroupGrade[j][0],
                            section: GroupGrade[j][1],
                            subjectCode: GroupGrade[j][2],
                            subjectName: GroupGrade[j][3],
                            credit: GroupGrade[j][4],
                            studentGrade: GroupGrade[j][5],
                            subjectGroup: GroupGrade[j][6]
                        }));
                    }
                    return [2 /*return*/, { studentInfo: studentInfo, StudentGrade: StudentGrade }];
            }
        });
    });
}
exports.studentGrade = studentGrade;
