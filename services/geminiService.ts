import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateFinancialAdvice = async (userQuery: string): Promise<string> => {
  if (!ai) {
    return "Erro: Chave de API não configurada. Por favor, configure a API_KEY no ambiente.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userQuery,
      config: {
        systemInstruction: `Você é o InvesteJovem AI, um assistente de educação financeira amigável, motivador e didático para jovens brasileiros.
        
        Suas diretrizes:
        1. Use linguagem simples e acessível (evite "economês" complicado sem explicar).
        2. Incentive o hábito de poupar e investir a longo prazo.
        3. Explique conceitos como Juros Compostos, Selic, CDI, Ações e FIIs de forma lúdica.
        4. Nunca faça recomendações de compra ou venda específica de ativos (ex: não diga "compre PETR4", diga "estude empresas de petróleo").
        5. Seja conciso e use formatação Markdown (negrito, listas) para facilitar a leitura.
        6. Se o usuário perguntar sobre algo não relacionado a finanças, gentilmente traga o assunto de volta para economia ou investimentos.`,
        temperature: 0.7,
      }
    });

    return response.text || "Desculpe, não consegui formular uma resposta no momento.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Desculpe, ocorreu um erro ao consultar o assistente financeiro. Tente novamente mais tarde.";
  }
};