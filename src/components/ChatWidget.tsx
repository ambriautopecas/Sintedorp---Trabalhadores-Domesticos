import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, RotateCcw, AlertCircle, RefreshCw, MessageSquareQuote } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

const QUICK_QUESTIONS = [
  "Qual o valor do piso salarial?",
  "Como funciona o direito de oposição?",
  "Quais os benefícios obrigatórios?",
  "O que é ato antissindical?"
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Olá! Sou o **SinteBot**, o assistente virtual inteligente do SINTEDORP. Posso tirar suas dúvidas sobre direitos trabalhistas de empregadas domésticas, cuidadores de idosos e demais profissionais atendidos em nossa base convencional para o ano de **2026-2027**. Como posso te ajudar hoje?"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isOpen, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Build conversation history excluding original IDs
      const history = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({
          role: m.role,
          text: m.text
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          history
        })
      });

      if (!res.ok) {
        throw new Error("Falha na comunicação com o assistente.");
      }

      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: data.response
        }
      ]);
    } catch (err: any) {
      console.error(err);
      setErrorMessage("Erro de conexão. Tente enviar novamente.");
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: "Desculpe-me, encontrei uma falha de comunicação temporária ao solicitar resposta no servidor. Por favor, certifique-se de que sua conexão está estável e tente novamente em instantes!"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: "Mensagens limpas! Olá de novo. Sou o **SinteBot**, o assistente inteligente do SINTEDORP. Como posso te auxiliar em suas dúvidas sobre as leis da CLT e do Trabalho Doméstico em 2026?"
      }
    ]);
    setErrorMessage(null);
  };

  // Basic custom formatter helper for displaying simple bold and lists nice inside bubbles
  const formatMessageText = (txt: string) => {
    // Escape standard code characters and split lines
    const lines = txt.split('\n');
    return lines.map((line, idx) => {
      let content: React.ReactNode = line;
      
      // Parse Bold (**txt**)
      if (line.includes('**')) {
        const parts = line.split('**');
        content = parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="font-extrabold text-brand-dark-brown">{part}</strong> : part);
      }

      // Check if it looks like a list item
      if (line.trim().startsWith('*') || line.trim().startsWith('-')) {
        return (
          <div key={idx} className="pl-4 py-0.5 flex items-start gap-1 text-xs sm:text-sm">
            <span className="text-brand-orange">•</span>
            <span className="flex-1">{content}</span>
          </div>
        );
      }

      return (
        <p key={idx} className="text-xs sm:text-sm leading-relaxed mb-1.5 break-words">
          {content}
        </p>
      );
    });
  };

  return (
    <div id="chat-flutuante-widget" className="fixed bottom-6 right-6 z-50 font-sans text-brand-charcoal">
      
      {/* Absolute floating launcher circle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-brand-orange hover:bg-brand-red text-white flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer relative"
        title="Dúvidas Trabalhistas Securizadas - SinteBot AI"
      >
        {isOpen ? (
          <X className="w-6 h-6 animate-spinOnce" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-red rounded-full flex items-center justify-center text-[8px] font-black animate-bounce">
              AI
            </span>
          </>
        )}
      </button>

      {/* Floating Chat Container Window Card */}
      {isOpen && (
        <div 
          className="absolute bottom-16 right-0 w-[92vw] sm:w-[380px] md:w-[420px] h-[520px] bg-white rounded-3xl border border-gray-100 flex flex-col shadow-2xl overflow-hidden animate-fadeIn select-text"
          onClick={(e) => e.stopPropagation()}
        >
          
          {/* Header */}
          <div className="bg-[#fcf8f2] px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-brand-orange flex items-center justify-center relative">
                <Sparkles className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
              </div>
              <div className="text-left">
                <h4 className="font-display font-black text-sm text-gray-800 flex items-center gap-1.5 leading-tight">
                  SinteBot AI
                </h4>
                <p className="text-[10px] text-gray-400 font-medium font-mono">
                  Guia do Trabalhador Doméstico SINTEDORP
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                title="Limpar conversa"
                className="p-1.5 hover:bg-gray-100 text-gray-400 hover:text-brand-orange rounded-lg transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-gray-100 text-gray-400 hover:text-brand-red rounded-lg transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages and Quick Options Container */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-gray-50/50">
            
            {/* Banner info */}
            <div className="bg-brand-orange bg-opacity-5 p-3 rounded-2xl border border-brand-orange/10 flex gap-2.5">
              <AlertCircle className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
              <div className="text-left">
                <span className="text-[10px] font-black uppercase text-brand-orange tracking-wider block leading-none mb-1">
                  Base 2026-2027 Atualizada
                </span>
                <p className="text-[11px] text-[#8c6b4e] leading-snug">
                  Respostas baseadas nas leis vigentes da CLT, Convenções SINTEDORP, Tópico 935 do STF e Orientação nº 13 da MPT/CONALIS.
                </p>
              </div>
            </div>

            {/* Conversation message bubbles list */}
            <div className="flex flex-col gap-3 flex-1 text-left">
              {messages.map((msg) => {
                const isBot = msg.role === 'model';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[85%] ${isBot ? 'self-start' : 'self-end'}`}
                  >
                    <div
                      className={`p-3 rounded-2xl ${
                        isBot 
                          ? 'bg-white border border-gray-200/60 rounded-tl-none shadow-xs text-brand-charcoal' 
                          : 'bg-brand-orange text-white rounded-tr-none text-right'
                      }`}
                    >
                      {formatMessageText(msg.text)}
                    </div>
                    <span className="text-[9px] text-gray-400 font-medium font-mono px-2 py-0.5 mt-1">
                      {isBot ? 'SinteBot' : 'Você'}
                    </span>
                  </div>
                );
              })}

              {/* Loader */}
              {isLoading && (
                <div className="self-start max-w-[85%]">
                  <div className="p-3 bg-white border border-gray-100 rounded-2xl rounded-tl-none shadow-xs flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 text-brand-orange animate-spin" />
                    <span className="text-xs text-gray-400 font-medium italic">SinteBot está formulando resposta...</span>
                  </div>
                </div>
              )}

              {/* End pointer for reference */}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions suggestion pills list */}
            <div className="border-t border-gray-100 pt-4 mt-2 flex flex-col gap-2 shrink-0">
              <div className="text-xxs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <MessageSquareQuote className="w-3" />
                <span>Sugestão de perguntas rápidas</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_QUESTIONS.map((question, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(question)}
                    disabled={isLoading}
                    className="p-2 py-1 bg-white hover:bg-[#fffcf9] hover:border-brand-orange text-gray-600 text-[11px] font-bold rounded-full border border-gray-200/80 hover:text-brand-orange transition-all cursor-pointer whitespace-nowrap active:scale-95 disabled:opacity-50"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Form write input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            className="p-3 border-t border-gray-100 bg-white flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Digite sua dúvida trabalhista..."
              disabled={isLoading}
              className="flex-1 bg-gray-50 border border-gray-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none transition-all disabled:opacity-75 text-brand-charcoal"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="w-9 h-9 rounded-xl bg-brand-orange hover:bg-brand-red text-white flex items-center justify-center transition-all disabled:opacity-40 disabled:hover:bg-brand-orange cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
