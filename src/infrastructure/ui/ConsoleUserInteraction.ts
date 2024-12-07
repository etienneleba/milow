import UserInteraction from "src/domain/spi/user/UserInteraction.ts";
import SystemChat from "src/domain/context/SystemChat.ts";
import FunctionResult from "src/domain/context/FunctionResult.ts";
import AssistantToolCalls from "src/domain/context/AssistantToolCalls.ts";
import AssistantChat from "src/domain/context/AssistantChat.ts";
import CreateFileFunction from "src/domain/function/functions/CreateFileFunction.ts";
import {log, note, text} from "@clack/prompts";
import ReplaceFileFunction from "src/domain/function/functions/ReplaceFileFunction.ts";
import chalk from "chalk";
import ReadFileFunction from "src/domain/function/functions/ReadFileFunction.ts";
import TestFunction from "src/domain/function/functions/TestFunction.ts";

export default class ConsoleUserInteraction implements UserInteraction {
    print(conversationItem: AssistantChat | AssistantToolCalls | FunctionResult | SystemChat): void {
        if (conversationItem instanceof AssistantToolCalls) {
            for (const functionCall of conversationItem.functionCalls) {
                if (["replace_file", "create_file"].includes(functionCall.name)) {
                    console.log(
                        `📝 ${chalk.white(functionCall.parameters.filePath)}\n`
                    )
                } else if (functionCall.name == "read_file") {
                    console.log(
                        `👁️ ${chalk.white(functionCall.parameters.filePath)}\n`
                    )
                } else if (functionCall.name == "test") {
                    console.log(
                        `🚥 ${chalk.white("Run the tests")}\n`
                    )
                }
            }
        } else if(conversationItem instanceof FunctionResult) {

        }
        else if (conversationItem instanceof AssistantChat) {
            console.log(`🤖 ${chalk.white(conversationItem.content)}\n`);
        }
    }

}