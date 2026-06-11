export interface Associado {
  id: string;
  nome: string;
  email: string;
  whatsapp: string;
  cidade: string;
  dataCadastro: string;
  categoria?: string;
  status: 'Pendente' | 'Aprovado';
}

export interface CityCovered {
  name: string;
  region: string;
}

export interface RightBenefit {
  id: string;
  title: string;
  description: string;
  lawReference?: string;
  fullDetail: string;
  iconName: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'direitos' | 'sindicato' | 'contribuicao' | 'outros';
}

export interface DocumentItem {
  id: string;
  title: string;
  description: string;
  date: string;
  fileSize: string;
  category: 'informativo' | 'edital' | 'orientacao';
  url?: string;
  fullTitle?: string;
  officialText?: string; // Markdown or raw text for viewer
  author?: string;
}

export interface WorkingCategory {
  name: string;
  description: string;
}
