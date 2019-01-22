import {BotFrameworkAdapter} from "botbuilder";
import * as restify from "restify";
//import {EchoBot} from "./bot";
import {TableService} from "azure-storage";
import { isNullOrUndefined } from "util";



//interface ArrayContainer {
 //   [cmd:string] : Array<String>;
//} 
let temp : Array<String> = new Array<String>();
let command : string[] =[
    "+10PM",
    "+12MN",
    "+330PM",
    "-10PM",
    "-12MN",
    "-330PM",
    "CLEARLIST",
    "SHOWLIST"
];
let timeslots : string[] = [
    "10PM",
    "12MN",
    "330PM",
];
let arrayContainer = {
    "10PM" : [],
    "12MN": [],
    "330PM": [],
};

let server = restify.createServer();
server.listen( process.env.port || process.env.PORT || 3978, () => {
    console.log(`${server.name} listening on ${server.url}`)
});

const adapter = new BotFrameworkAdapter({
   appId: process.env.MICROSOFT_APP_ID,
   appPassword : process.env.MICROSOFT_APP_PASSWORD
});

//const echo = new EchoBot();
//echo.y = temp;

server.post("/api/messages", (req,res) => {
    adapter.processActivity(req,res, async (context) => {
        //check if activity.type === message
        if (context.activity.type === "message"){
            let tempCmd : Array<String> = new Array<String>();  
            let tempSubCmd : string;
            let tempCmdStr : String;
            let indexOfCmd;
            //check all commands available
            for (this.j = 0; this.j < command.length; this.j++){
                //if it is a valid command
                if (context.activity.text.toUpperCase().includes(command[this.j])){
                    //push command to tempCmd.
                    indexOfCmd = context.activity.text.toUpperCase().indexOf(command[this.j]);
                    const lengthOfCmd = command[this.j].length;
                    const commandString = context.activity.text.substring(indexOfCmd, lengthOfCmd).toUpperCase();
                 
                        tempCmd.push(commandString.trim());
                    
        
                    //await context.sendActivity(`${commandString}`);
                }
            }

            //valid command inserted.
            if (tempCmd.length === 1) {
                //analyze command.
                if (tempCmd.indexOf("CLEARLIST") > -1 ){
                    //clear arrayContainer
                    arrayContainer = {
                        "10PM" : [],
                        "12MN" : [],
                        "330PM" : []
                    };
                    await context.sendActivity(`List Cleared Successfully.`);
                }
                else if (tempCmd.indexOf("SHOWLIST") > -1 ){
                    let botFeedback : string = "";
                    timeslots.forEach(timeslot => {
                        if (arrayContainer[timeslot].length > 0) {
                            let l = 1;
                            //let boldText = timeslot.bold();
                            botFeedback += ':';
                            switch(timeslot){
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

                            for (let k of arrayContainer[timeslot]){
                                botFeedback += `: ${l}. ${k} \n`;
                                l++;
                            }
                  

                        }
                    });
                    await context.sendActivity(`${botFeedback}`);
                }
                else {
                    //arrayContainer[tempCmd.]
                    tempCmd.forEach(commander => {
                        //insert the data.
                        //const indexOfCmd = commander.indexOf(commander.toString());
                       // const indexOfCmd = 0;
                        const lengthOfCmd = commander.length;
                        tempSubCmd = commander.trim().substring(indexOfCmd, indexOfCmd + 1);
                        tempCmdStr = commander.trim().substring(indexOfCmd + 1);
                        //check this at debug. if index of command is > n then there are 2 commands
                        // get the text after that,
                        const message = context.activity.text.trim().substring(indexOfCmd + lengthOfCmd + 1);
                        if ( tempSubCmd === "+")
                            arrayContainer[tempCmdStr.toString()].push(message);
                        else if (tempSubCmd === "-")
                        arrayContainer[tempCmdStr.toString()].pop(message);
                    });

                    let botFeedback : string = "";
                    botFeedback += `${context.activity.from.name} is IN!\n`;
                    botFeedback += "__________________\n";
                    timeslots.forEach(timeslot => {
                        if (arrayContainer[timeslot].length > 0) {
                            let l = 1;
                            //let boldText = timeslot.bold();
                            botFeedback += ':';
                            switch(timeslot){
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

                            for (let k of arrayContainer[timeslot]){
                                botFeedback += `: ${l}. ${k} \n`;
                                l++;
                            }
                  

                        }
                    });
                    

                    await context.sendActivity(`${botFeedback}`);
                }
                //await context.sendActivity(`${arrayContainer["10PM"]}`);
                //await echo.onTurn(context,temp);
                
                
                
            } else
            {
                await context.sendActivity(`Please use +TIME NAME DROPOFFPOINT Format. e.g. +330PM Ian PH2`);
            }

            
        }
        // add "temp" on the onTurn.
    });
});