import UserInteraction from "src/domain/spi/user/UserInteraction.ts";
import SystemChat from "src/domain/context/SystemChat.ts";
import FunctionResult from "src/domain/context/FunctionResult.ts";
import AssistantToolCalls from "src/domain/context/AssistantToolCalls.ts";
import AssistantChat from "src/domain/context/AssistantChat.ts";
import {group, isCancel, log, outro, spinner, text} from "@clack/prompts";
import chalk from "chalk";



export default class ConsoleUserInteraction implements UserInteraction {
    private readonly spinner;

    constructor() {
        this.spinner = spinner();
    }
    print(conversationItem: AssistantChat | AssistantToolCalls | FunctionResult | SystemChat): void {
        if (conversationItem instanceof AssistantToolCalls) {
            let messages = [];
            for (const functionCall of conversationItem.functionCalls) {
                if (["replace_file", "create_file"].includes(functionCall.name)) {
                    messages.push(
                        `📝 ${chalk.white(functionCall.parameters.filePath)}\n`
                    )
                } else if (functionCall.name == "read_file") {
                    messages.push(
                        `👁️ ${chalk.white(functionCall.parameters.filePath)}\n`
                    )
                } else if (functionCall.name == "test") {
                    messages.push(
                        `🚥 ${chalk.white("Run the tests")}\n`
                    )
                }
            }
            log.message(messages.join('\n'));
        } else if(conversationItem instanceof FunctionResult) {

        }
        else if (conversationItem instanceof AssistantChat) {
            log.info(`🤖 ${chalk.whiteBright(conversationItem.content)}\n`);
        }
    }

    async ask(question: string): Promise<string> {
        const textPromise = text({
            message: `🤖 : ${chalk.whiteBright(question)}`,
        });

        textPromise.then((text) => {
            if (isCancel(text) || !text) {
                outro(`🤖 : ${chalk.whiteBright("Bye ! Have a good day !")}`)
                process.exit();
            }
        })

        return textPromise;

    }

    startThinking(): void {
        this.spinner.start(chalk.white(`Milo${chalk.green("w")} is thinking...`));
    }

    stopThinking(): void {
        this.spinner.stop(chalk.white('── ── ── ── ── ── ── ── ── ── ──'));
    }





}