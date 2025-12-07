import { EducationalTopic } from './types';

export const EDUCATIONAL_TOPICS: EducationalTopic[] = [
  {
    id: 'investing-101',
    title: 'O que é investir?',
    icon: 'Lightbulb',
    summary: 'A diferença entre guardar e investir.',
    content: `💡 **O que é investir?**

Investir é colocar seu dinheiro em algo que pode gerar mais dinheiro com o tempo.

*   **Guardar:** Mantém o valor (mas perde para a inflação).
*   **Investir:** Faz o dinheiro crescer!

O objetivo é fazer o dinheiro trabalhar para você, gerando renda passiva no futuro.`
  },
  {
    id: 'types',
    title: 'Tipos de Investimentos',
    icon: 'PieChart',
    summary: 'Renda Fixa vs. Renda Variável.',
    content: `📊 **Tipos de Investimentos**

**🟩 Renda Fixa (Mais segura):**
*   **CDB:** Emprestar dinheiro para o banco.
*   **Tesouro Direto:** Emprestar dinheiro para o governo.
*   **LCI/LCA:** Isentos de Imposto de Renda.
*   **Poupança:** Rendimento baixo, geralmente perde para a inflação.

**🟥 Renda Variável (Maior risco/retorno):**
*   **Ações:** Torne-se sócio de empresas.
*   **Fundos Imobiliários (FIIs):** Receba aluguéis sem ter imóvel.
*   **Criptomoedas:** Moedas digitais descentralizadas.
*   **ETFs:** Fundos que replicam índices de mercado.`
  },
  {
    id: 'amount',
    title: 'Quanto posso investir?',
    icon: 'Wallet',
    summary: 'Você pode começar com pouco!',
    content: `💰 **Quanto posso investir?**

Você pode começar com **MUITO pouco**! Não é preciso ser rico.

*   **Tesouro Direto:** a partir de ~R$ 30,00 (ou R$ 1,00 em apps específicos).
*   **CDBs:** a partir de R$ 1,00 ou R$ 10,00.
*   **FIIs:** Cotas custam cerca de R$ 10,00 a R$ 100,00.
*   **Ações (fracionado):** Compre frações de ações por R$ 5,00 a R$ 50,00.

**O importante é começar e ter constância!**`
  },
  {
    id: 'risk',
    title: 'Risco x Retorno',
    icon: 'Scale',
    summary: 'Entendendo a balança do mercado.',
    content: `⚖️ **Risco x Retorno**

A regra fundamental do mercado financeiro:
**Quanto maior o retorno possível, maior costuma ser o risco.**

*   **Renda Fixa:** Mais segura, mas rende menos a longo prazo.
*   **Renda Variável:** Pode render muito mais, mas oscila (sobe e desce) diariamente.

**Regra de ouro:** NUNCA invista no que você não entende! Comece pela Renda Fixa.`
  },
  {
    id: 'tips',
    title: 'Dicas para começar',
    icon: 'BookOpen',
    summary: '6 passos essenciais.',
    content: `📘 **Dicas para começar a investir**

1.  **Comece pequeno:** Não coloque todo seu dinheiro de uma vez.
2.  **Poupe todo mês:** Aporte mensal é mais importante que taxa no início.
3.  **Reserva de Emergência:** Tenha 6 meses de custo de vida guardados em liquidez diária (CDB ou Tesouro Selic) antes de arriscar.
4.  **Reinvista:** Use os juros/dividendos para comprar mais.
5.  **Evite dívidas:** Juros de dívida são maiores que juros de investimento.
6.  **Estude:** O conhecimento é seu maior ativo.`
  },
  {
    id: 'economics',
    title: 'Selic, CDI e Inflação',
    icon: 'TrendingUp',
    summary: 'Os indicadores que movem seu dinheiro.',
    content: `📌 **Selic, CDI e Inflação**

*   **SELIC:** A taxa básica de juros da economia definida pelo Banco Central. Se ela sobe, a Renda Fixa rende mais.
*   **CDI:** Taxa que os bancos usam para emprestar dinheiro entre si. Segue a Selic de perto. A maioria dos investimentos rende uma % do CDI (ex: 100% do CDI).
*   **Inflação (IPCA):** O aumento generalizado dos preços.

**Objetivo:** Seu investimento deve render **MAIS** que a inflação para você ter ganho real!`
  }
];