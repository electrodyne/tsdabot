
import { TurnContext, TextFormatTypes } from "botbuilder";
import { stringify } from "querystring";

export class EchoBot {
    i : number;
    j : number;
   
    async onTurn(context : TurnContext, tempMem : Array<String>) {
        if (context.activity.type === "message"){
            //for each element in x, add to y, 
            let commandMem;
            for (this.j = 0; this.j < commandMem.length; this.j++){
                if (context.activity.text.toUpperCase().includes(commandMem[this.j])){
                    // get the index after +10pm/+12mn/+3pm
                    const indexOfCmd = context.activity.text.toUpperCase().indexOf(commandMem[this.j]);
                    const lengthOfCmd = commandMem[this.j].length;
                    //check this at debug. if index of command is > n then there are 2 commands
                    // get the text after that,
                    const message = context.activity.text.substring(indexOfCmd + lengthOfCmd + 1);
                    // store to temp array
                    tempMem.push(message);

                    let botFeedback : string = "";
                    let l : number = 1;
                    for (let k of tempMem){
                        botFeedback += `${l}. ${k} \n`
                        l++;
                    }

                    for (this.i = 0; this.i < tempMem.length; this.i++){ 
                        await context.sendActivity(`${botFeedback}`);
                        // push the data here.
                    }
                    //break;
                } else {
                   // await context.sendActivity(`Wrong Syntax!`);
                }
            }
            
        } else {
            await context.sendActivity(`${context.activity.type} event detected`);
        }
    }
}