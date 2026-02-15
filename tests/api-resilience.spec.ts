import { test, expect } from '@playwright/test';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

test.describe('Validação de Contrato e Resiliência de API', () => {

  const BASE_URL = 'https://jsonplaceholder.typicode.com';

  test('Deve criar um novo recurso via POST e validar a estrutura', async ({ request }) => {
    const newPost = {
      title: 'Engenharia de Qualidade 2026',
      body: 'Transição de Embarcados para Web',
      userId: 1,
    };

    const response = await request.post(`${BASE_URL}/posts`, {
      data: newPost,
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);

    const responseBody: Post = await response.json();

    expect(responseBody).toHaveProperty('id'); 
    expect(responseBody.title).toBe(newPost.title);

    console.log(`Recurso criado com ID: ${responseBody.id}`);
  });

  test('Deve tratar falhas de forma graciosa (Simulação de Auto-Cura)', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/999999`);

    expect(response.status()).toBe(404);
  });
});
