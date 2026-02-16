import { Page, test } from "@playwright/test";
import { GeminiAgent } from "./GeminiAgent";

export class AiAction {
    private page: Page;
    private agent: GeminiAgent;

    constructor(page: Page) {
        this.page = page;
        this.agent = new GeminiAgent();
    }

    async smartClick(originalSelector: string) {
        return await test.step(`Smart Click: ${originalSelector}`, async () => {
            try {
                await this.page.click(originalSelector, { timeout: 3000 });

            } catch (error) {
                console.log("Click falhou. Acionando protocolo de cura...");

                const newSelector = await this.agent.healSelector(
                    this.page,
                    originalSelector,
                    (error as Error).message
                );

                if (newSelector) {
                    console.log(`Cura Realizada! Novo seletor encontrado: ${newSelector}`);

                    test.info().annotations.push({
                        type: 'was_healed',
                        description: `Seletor original '${originalSelector}' falhou. IA corrigiu para '${newSelector}'.`
                    });

                    await this.page.click(newSelector);

                } else {
                    throw new Error(`Falha crítica: O elemento '${originalSelector}' não foi encontrado e a IA não conseguiu recuperá-lo.`);
                }
            }
        });
    }
}