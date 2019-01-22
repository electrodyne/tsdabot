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
class EchoBot {
    onTurn(context, tempMem) {
        return __awaiter(this, void 0, void 0, function* () {
            if (context.activity.type === "message") {
                let commandMem;
                for (this.j = 0; this.j < commandMem.length; this.j++) {
                    if (context.activity.text.toUpperCase().includes(commandMem[this.j])) {
                        const indexOfCmd = context.activity.text.toUpperCase().indexOf(commandMem[this.j]);
                        const lengthOfCmd = commandMem[this.j].length;
                        const message = context.activity.text.substring(indexOfCmd + lengthOfCmd + 1);
                        tempMem.push(message);
                        let botFeedback = "";
                        let l = 1;
                        for (let k of tempMem) {
                            botFeedback += `${l}. ${k} \n`;
                            l++;
                        }
                        for (this.i = 0; this.i < tempMem.length; this.i++) {
                            yield context.sendActivity(`${botFeedback}`);
                        }
                    }
                    else {
                    }
                }
            }
            else {
                yield context.sendActivity(`${context.activity.type} event detected`);
            }
        });
    }
}
exports.EchoBot = EchoBot;
//# sourceMappingURL=bot.js.map