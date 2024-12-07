import UserInteraction from "src/domain/spi/user/UserInteraction.ts";
import SystemChat from "src/domain/context/SystemChat.ts";
import FunctionResult from "src/domain/context/FunctionResult.ts";
import AssistantToolCalls from "src/domain/context/AssistantToolCalls.ts";
import AssistantChat from "src/domain/context/AssistantChat.ts";
import {log, text} from "@clack/prompts";
import chalk from "chalk";



export default class ConsoleUserInteraction implements UserInteraction {
    print(conversationItem: AssistantChat | AssistantToolCalls | FunctionResult | SystemChat): void {
        if (conversationItem instanceof AssistantToolCalls) {
            for (const functionCall of conversationItem.functionCalls) {
                if (["replace_file", "create_file"].includes(functionCall.name)) {
                    log.step(
                        `📝 ${chalk.white(functionCall.parameters.filePath)}\n`
                    )
                } else if (functionCall.name == "read_file") {
                    log.step(
                        `👁️ ${chalk.white(functionCall.parameters.filePath)}\n`
                    )
                } else if (functionCall.name == "test") {
                    log.step(
                        `🚥 ${chalk.white("Run the tests")}\n`
                    )
                }
            }
        } else if(conversationItem instanceof FunctionResult) {

        }
        else if (conversationItem instanceof AssistantChat) {
            log.info(`🤖 ${chalk.whiteBright(conversationItem.content)}\n`);
        }
    }

    async ask(question: string): Promise<string> {
        return text({
            message: "🤖 : " + question,
        });
    }



}