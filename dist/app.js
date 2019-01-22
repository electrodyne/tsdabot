"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const botbuilder_1 = require("botbuilder");
const restify = require("restify");
let temp = new Array();
let command = [
    "+10PM",
    "+12MN",
    "+330PM",
    "-10PM",
    "-12MN",
    "-330PM",
    "CLEARLIST",
    "SHOWLIST"
];
let timeslots = [
    "10PM",
    "12MN",
    "330PM",
];
let arrayContainer = {
    "10PM": [],
    "12MN": [],
    "330PM": [],
};
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`${server.name} listening on ${server.url}`);
});
const adapter = new botbuilder_1.BotFrameworkAdapter({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
server.post("/api/messages", (req, res) => {
    adapter.processActivity(req, res, (context) => __awaiter(this, void 0, void 0, function* () {
        if (context.activity.type === "message") {
            let tempCmd = new Array();
            let tempSubCmd;
            let tempCmdStr;
            let indexOfCmd;
            for (this.j = 0; this.j < command.length; this.j++) {
                if (context.activity.text.toUpperCase().includes(command[this.j])) {
                    indexOfCmd = context.activity.text.toUpperCase().indexOf(command[this.j]);
                    const lengthOfCmd = command[this.j].length;
                    const commandString = context.activity.text.substring(indexOfCmd, lengthOfCmd).toUpperCase();
                    tempCmd.push(commandString.trim());
                }
            }
            if (tempCmd.length === 1) {
                if (tempCmd.indexOf("CLEARLIST") > -1) {
                    arrayContainer = {
                        "10PM": [],
                        "12MN": [],
                        "330PM": []
                    };
                    yield context.sendActivity(`List Cleared Successfully.`);
                }
                else if (tempCmd.indexOf("SHOWLIST") > -1) {
                    let botFeedback = "";
                    timeslots.forEach(timeslot => {
                        if (arrayContainer[timeslot].length > 0) {
                            let l = 1;
                            botFeedback += ':';
                            switch (timeslot) {
                                case "10PM":
                                    botFeedback += " \uD835\uDFED\uD835\uDFEC\uD835\uDDE3\uD835\uDDE0 ";
                                    break;
                                case "12MN":
                                    botFeedback += " \uD835\uDFED\uD835\uDFEE\uD835\uDDE0\uD835\uDDE1 ";
                                    break;
                                case "330PM":
                                    botFeedback += " \uD835\uDFEF\u003A\uD835\uDFEF\uD835\uDFEC\uD835\uDDE3\uD835\uDDE0 ";
                                    break;
                            }
                            botFeedback += ':';
                            botFeedback += "\n";
                            for (let k of arrayContainer[timeslot]) {
                                botFeedback += `: ${l}. ${k} \n`;
                                l++;
                            }
                        }
                    });
                    yield context.sendActivity(`${botFeedback}`);
                }
                else {
                    tempCmd.forEach(commander => {
                        const lengthOfCmd = commander.length;
                        tempSubCmd = commander.trim().substring(indexOfCmd, indexOfCmd + 1);
                        tempCmdStr = commander.trim().substring(indexOfCmd + 1);
                        const message = context.activity.text.trim().substring(indexOfCmd + lengthOfCmd + 1);
                        if (tempSubCmd === "+")
                            arrayContainer[tempCmdStr.toString()].push(message);
                        else if (tempSubCmd === "-")
                            arrayContainer[tempCmdStr.toString()].pop(message);
                    });
                    let botFeedback = "";
                    botFeedback += `${context.activity.from.name} is IN!\n`;
                    botFeedback += "__________________\n";
                    timeslots.forEach(timeslot => {
                        if (arrayContainer[timeslot].length > 0) {
                            let l = 1;
                            botFeedback += ':';
                            switch (timeslot) {
                                case "10PM":
                                    botFeedback += " \uD835\uDFED\uD835\uDFEC\uD835\uDDE3\uD835\uDDE0 ";
                                    break;
                                case "12MN":
                                    botFeedback += " \uD835\uDFED\uD835\uDFEE\uD835\uDDE0\uD835\uDDE1 ";
                                    break;
                                case "330PM":
                                    botFeedback += " \uD835\uDFEF\u003A\uD835\uDFEF\uD835\uDFEC\uD835\uDDE3\uD835\uDDE0 ";
                                    break;
                            }
                            botFeedback += ':';
                            botFeedback += "\n";
                            for (let k of arrayContainer[timeslot]) {
                                botFeedback += `: ${l}. ${k} \n`;
                                l++;
                            }
                        }
                    });
                    yield context.sendActivity(`${botFeedback}`);
                }
            }
            else {
                yield context.sendActivity(`Please use +TIME NAME DROPOFFPOINT Format. e.g. +330PM Ian PH2`);
            }
        }
    }));
});
//# sourceMappingURL=app.js.map