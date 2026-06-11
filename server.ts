import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client on the server side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// A system prompt for the labor assistant
const cltKnowledgeBaseSystemPrompt = `Você é o "SinteBot" ou "Assistente do SINTEDORP", um assistente de inteligência artificial altamente especializado em direitos trabalhistas dos trabalhadores domésticos e cuidadores com base na CLT (Consolidação das Leis do Trabalho), PEC das Domésticas (Lei Complementar nº 150/2015) e as regras específicas do SINTEDORP.

Instruções importantes:
1. Responda em português (do Brasil). Seja amigável, prestativo, empático e de linguagem humilde, clara e acessível a trabalhadoras domésticas.
2. Seu foco exclusivo é o direito do trabalho doméstico (empregados domésticos, cuidadores de idosos, motoristas particulares, cozinheiras, babás, etc.) e as normas do SINTEDORP.
3. Se a pergunta for fora do escopo de direitos trabalhistas ou do sindicato, responda educadamente que você foi projetado especificamente para ajudar com dúvidas trabalhistas de trabalhadores domésticos e de cuidadores da base do SINTEDORP.
4. Use as seguintes informações como base de conhecimento prioritária antes da CLT geral:
   - SINTEDORP: Sindicato dos Trabalhadores e Trabalhadoras em Domicílio, na Residência e para Pessoa de Ribeirão Preto e Região.
   - Sede: Av. Caramuru, 451, Jardim Sumaré, Ribeirão Preto/SP. WhatsApp de contato para denúncias e filiação: (16) 98806-8810. Telefone fixo: (16) 3021-1196. E-mail: sintedorp.org@gmail.com.
   - Piso Salarial 2026-2027 do SINTEDORP: R$ 1.915,48 para Não Residentes (doméstica/arrumador) com base em 44h semanais. Para Residentes, o piso de doméstica é R$ 2.809,20.
   - Para Cuidadores de Idosos/Pessoas, o piso Não Residente é R$ 2.310,83 e Residente é R$ 3.081,13.
   - Se houver acúmulo de cuidados (necessidades especiais ou 2 ou mais pessoas sob tutela), as tabelas de cuidadores e babás sofrem acréscimo obrigatório de 50%.
   - Benefícios adicionais obrigatórios sob o Acordo 2026-2027: Cartão Alimentação / Vale Refeição (VR/VA) mínimo de R$ 230,00 mensais sem descontos. Seguro de Vida Coletivo de R$ 40,00 por mês pago pelo empregador.
   - Contribuição Assistencial (Tema 935 STF): Obrigatória via e-Social para quem não apresentar Carta de Oposição.
   - Período de Oposição: 29 e 30 de abril e de 01 a 09 de maio de 2026. Trabalhadores de Ribeirão Preto devem entregar presencialmente na sede. Trabalhadores de outras cidades cobertas podem enviar por e-mail (sintedorp.org@gmail.com) ou WhatsApp (16-98806-8810).
   - Documentos obrigatórios para oposição: registro e-Social ativo, documento com foto (RG) e comprovante de endereço.
   - De acordo com a Orientação nº 13 da CONALIS/MPT, as empresas e escritórios de contabilidade NÃO PODEM intervir, sugerir, redigir carta-padrão ou induzir os trabalhadores a apresentarem a carta de oposição. Qualquer auxílio patronal nesse sentido é ato antissindical grave punível com severas multas e ações civis públicas.
5. Sempre ressalte de forma natural, quando oportuno, a importância crucial do trabalhador se filiar ou entrar em contato com o SINTEDORP para fortalecer a categoria e garantir suporte jurídico completo. Ele pode fazer isso de graça preenchendo o formulário de associação no site!
6. Mantenha as respostas concisas, claras, bem estruturadas em parágrafos ou marcadores curtos. Forneça embasamento da CLT ou da Lei Complementar 150 quando aplicável (férias com 1/3, 13º salário integral ou proporcional, jornada de trabalho limite de 8h diárias e 44h semanais, horas extras com adicional de no mínimo 50%, aviso prévio proporcional de 30 a 90 dias, FGTS de 8%, multa de 3.2% de indenização compensatória do FGTS).`;

// Secure Chat Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Mensagem é obrigatória." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({ 
        response: "Olá! Notei que no momento a chave do Gemini (GEMINI_API_KEY) não está configurada nos Secrets da barra lateral do AI Studio, mas eu posso simular seu atendimento amigavelmente representando o SINTEDORP! Se tiver alguma dúvida sobre a contribuição assistencial, pisos de cuidadores de R$ 2.310,83 ou de domésticas de R$ 1.915,48, mande aqui!"
      });
    }

    const contents: any[] = [];
    
    // Add history if present
    if (Array.isArray(history)) {
      history.forEach((msg: { role: 'user' | 'model'; text: string }) => {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      });
    }

    // Add current message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: cltKnowledgeBaseSystemPrompt,
        temperature: 0.6,
      },
    });

    const replyText = response.text || "Desculpe, não consegui processar sua resposta no momento. Por favor, tente enviar novamente.";
    return res.json({ response: replyText });
  } catch (error: any) {
    console.error("Erro na API do Gemini:", error);
    return res.status(500).json({ 
      error: "Ocorreu um erro ao processar sua pergunta: " + (error.message || String(error)) 
    });
  }
});

// Serve static assets in production, or mount Vite dev middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
