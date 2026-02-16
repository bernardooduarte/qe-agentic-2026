import { test, expect } from '@playwright/test';
import { AiAction } from './utils/AiAction';

test.describe('Resiliência Agêntica (Self-Healing)', () => {
  
  test('Deve recuperar um clique falho usando Gemini AI', async ({ page }) => {
   
    const ai = new AiAction(page);

    await page.goto('http://localhost:3000');
    
    await page.waitForLoadState('networkidle'); 

    console.log('--- Início do Teste Agêntico ---');

    const seletorQuebrado = '#botao-comprar-v1-antigo';
    
    await ai.smartClick(seletorQuebrado);

    await expect(page.locator('.cart-count')).not.toBe('0');
    
    console.log('--- Teste Finalizado com Sucesso ---');
  });
});