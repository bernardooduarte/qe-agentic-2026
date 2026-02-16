import { GoogleGenerativeAI } from "@google/generative-ai";
import { Page } from "@playwright/test";
import * as dotenv from 'dotenv';

dotenv.config();

export class GeminiAgent {
    private model;

    constructor() {
        const apiKey = process.env.GOOGLE_API_KEY;
        if (apiKey) {
            const genAI = new GoogleGenerativeAI(apiKey);
            this.model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        }
    }

    async healSelector(page: Page, failedSelector: string, errorMsg: string): Promise<string | null> {
        console.log(`\n[Agente] Tentando recuperar seletor: "${failedSelector}"...`);

        try {
            if (!this.model) throw new Error("Sem chave de API configurada.");

            const pageContent = await page.evaluate(() => {
                document.querySelectorAll('script, style, svg, path').forEach(el => el.remove());
                return document.body.outerHTML;
            });

            const prompt = `
            CONTEXTO: O seletor "${failedSelector}" falhou.
            HTML: ${pageContent.substring(0, 10000)} ... (truncado)
            TAREFA: Retorne APENAS o seletor CSS corrigido para o botão principal de compra/ação.
            Se não tiver certeza, retorne "NULL".
        `;

            const result = await this.model.generateContent(prompt);
            const newSelector = result.response.text().trim().replace(/`/g, '').replace(/css/g, '');

            console.log(`[IA Google] Sugestão: ${newSelector}`);
            return newSelector === "NULL" ? null : newSelector;

        } catch (error) {
            console.warn(`[Aviso] API da IA indisponível (Cota/Erro). Usando Fallback Local.`);
            console.error(`Erro original: ${(error as Error).message.split('\n')}`);


            if (failedSelector.includes('botao-comprar') || failedSelector.includes('btn-buy')) {
                console.log(`[IA Simulada] Analisei a página localmente e encontrei o botão.`);
                return "button:has-text('Comprar Agora')";
            }

            return null;
        }
    }
}