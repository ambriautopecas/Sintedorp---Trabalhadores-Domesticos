import { CityCovered, RightBenefit, FAQItem, DocumentItem, WorkingCategory } from './types';

export const SINDICATO_INFO = {
  nome: "SINTEDORP",
  logoUrl: "https://lh3.googleusercontent.com/d/1XPPLbOQxeSBeeK1iaJ33CjRty1A5aPoa",
  subtitulo: "Sindicato dos Trabalhadores e Trabalhadoras de Ribeirão Preto e Região",
  razaoSocial: "Sindicato dos Trabalhadores e Trabalhadoras em Domicílio na Residência e Para Pessoa",
  fundacao: "20/06/1994",
  registroDOU: "12/02/1996, Seção I, Página 2364",
  cnpj: "00.290.686/0001-00",
  codigoSindical: "000.000.000.86601-6",
  processoMTE: "46.000.000437-95",
  filiacao: "Central do Brasil de Sindicatos de Trabalhadores Domésticos (CBDT)",
  cnpjCBDT: "05.088.659/0001-65",
  contatos: {
    endereco: "Avenida Caramuru, nº 451",
    bairro: "Jardim Sumaré",
    cep: "14025-080",
    cidade: "Ribeirão Preto",
    estado: "SP",
    telefoneFixo: "(16) 3021-1196",
    whatsapp: "(16) 98806-8810",
    email: "sintedorp.org@gmail.com"
  }
};

export const LISTED_CITIES: CityCovered[] = [
  { name: "Ribeirão Preto", region: "Sede" },
  { name: "Altinópolis", region: "Região Metropolitana" },
  { name: "Batatais", region: "Região Metropolitana" },
  { name: "Barrinha", region: "Região Metropolitana" },
  { name: "Brodowski", region: "Região Metropolitana" },
  { name: "Cajuru", region: "Região Metropolitana" },
  { name: "Cássia dos Coqueiros", region: "Região Metropolitana" },
  { name: "Cravinhos", region: "Região Metropolitana" },
  { name: "Dumont", region: "Região Metropolitana" },
  { name: "Guatapará", region: "Região Metropolitana" },
  { name: "Guariba", region: "Região Metropolitana" },
  { name: "Jardinópolis", region: "Região Metropolitana" },
  { name: "Jaboticabal", region: "Região Metropolitana" },
  { name: "Luiz Antônio", region: "Região Metropolitana" },
  { name: "Monte Alto", region: "Região Metropolitana" },
  { name: "Nuporanga", region: "Região Metropolitana" },
  { name: "Orlândia", region: "Região Metropolitana" },
  { name: "Pradópolis", region: "Região Metropolitana" },
  { name: "Pontal", region: "Região Metropolitana" },
  { name: "Pitangueiras", region: "Região Metropolitana" },
  { name: "São Simão", region: "Região Metropolitana" },
  { name: "Sales de Oliveira", region: "Região Metropolitana" },
  { name: "Santo Antônio da Alegria", region: "Região Metropolitana" },
  { name: "Santa Rosa do Viterbo", region: "Região Metropolitana" },
  { name: "Santa Rosa do Passa a Quatro", region: "Região Metropolitana" },
  { name: "Serrana", region: "Região Metropolitana" },
  { name: "Serra Azul", region: "Região Metropolitana" },
  { name: "Sertãozinho", region: "Região Metropolitana" }
];

export const WORKING_CATEGORIES: WorkingCategory[] = [
  { name: "Empregada Doméstica", description: "Profissional que realiza serviços gerais contínuos e regulares na residência" },
  { name: "Diarista", description: "Profissional independente que presta serviços ocasionais (até 2 vezes por semana)" },
  { name: "Cuidador(a) de Idoso", description: "Profissional especializado em prover os cuidados essenciais à pessoa idosa em seu lar" },
  { name: "Babá", description: "Acompanhamento profissional voltado para a assistência de recém-nascidos e crianças" },
  { name: "Cuidador(a) de Pessoa", description: "Apoio a pessoas de qualquer idade com necessidades físicas ou cognitivas especiais" },
  { name: "Cozinheiro(a) e Copeiro(a)", description: "Profissionais responsáveis pelo preparo e organização das refeições cotidianas" },
  { name: "Acompanhante de Saúde", description: "Em clínicas ou residências, prestando auxílio em rotinas médicas e bem-estar" },
  { name: "Caseiro(a) (Chácara/Sítio)", description: "Cuidados de conservação e segurança em propriedades rurais ou de lazer" },
  { name: "Jardineiro(a) e Tratador(a) de Piscina", description: "Manutenção paisagística e higiene de ambientes de lazer doméstico" },
  { name: "Motorista Particular", description: "Condução profissional de veículos familiares ou particulares" },
  { name: "Governança e Mordomaria", description: "Supervisão geral, organização e mordomia de grandes residências" },
  { name: "Lavadeira e Faxineira", description: "Atividades focadas no tratamento de roupas ou asseio de ambientes domésticos" },
  { name: "Vigia Residencial e Segurança", description: "Atividades voltadas para a segurança patrimonial e portaria domiciliar" }
];

export const RIGHTS_BENEFITS: RightBenefit[] = [
  {
    id: "ferias",
    title: "Férias Remuneradas",
    description: "30 dias de descanso anuais, com bônus de 1/3 do salário.",
    lawReference: "Art. 7º, XVII da Constituição & LCP 150",
    fullDetail: "Após completado cada período de 12 meses de trabalho (período aquisitivo), a trabalhadora adquire o direito a 30 dias corridos de férias remuneradas com o acréscimo de um terço do seu salário normal. O agendamento deve ser comunicado por escrito com 30 dias de antecedência pelo empregador.",
    iconName: "Sun"
  },
  {
    id: "decimo-terceiro",
    title: "13º Salário Integral",
    description: "Gratificação natalina correspondente a 1/12 por mês trabalhado.",
    lawReference: "Lei 4.090/1962 & LCP 150",
    fullDetail: "Consiste no pagamento de um salário completo de bônus no final de cada ano civil (ou proporcional caso tenha menos de 12 meses trabalhados). Costuma ser pago em duas metades: a primeira obrigatoriamente entre 1º de fevereiro e 30 de novembro, e a segunda até o dia 20 de dezembro.",
    iconName: "Award"
  },
  {
    id: "carteira",
    title: "Carteira de Trabalho Assinada",
    description: "Anotação obrigatória da admissão desde o primeiro dia útil.",
    lawReference: "Art. 9º da Lei Complementar nº 150",
    fullDetail: "A anotação do contrato de trabalho na CTPS (física ou digital) é requisito legal inescapável já no início do vínculo laboral. Protege a categoria com os recolhimentos da Previdência Social, tempo de serviço para aposentadoria e auxílios de saúde.",
    iconName: "FileCheck"
  },
  {
    id: "jornada-horas",
    title: "Jornada Legal e Horas Extras",
    description: "Limite de 8h diárias e 44h semanais, horas extras com +50%.",
    lawReference: "LCP 150, Art. 2º",
    fullDetail: "A jornada máxima padronizada é de 44 horas semanais e 8 horas diárias. Qualquer período acima do estabelecido deve ser indenizado com pagamento de hora extraordinária (mínimo de 50% de adicional, ou 100% aos domingos e feriados), ou compensado formalmente por banco de horas.",
    iconName: "Clock"
  },
  {
    id: "fgts",
    title: "FGTS e Multa de Rescisão",
    description: "Depósito mensal de 8% de FGTS e 3,2% para fundo rescisório.",
    lawReference: "LCP 150, Art. 21 e Art. 22",
    fullDetail: "O empregador recolhe mensalmente o DAE (Documento de Arrecadação do eSocial), que constitui: 8% do salário em nome do trabalhador no FGTS, mais 3,2% de reserva compulsória que substitui a tradicional multa rescisória de 40% em caso de demissão sem justa causa.",
    iconName: "TrendingUp"
  },
  {
    id: "vale-transporte",
    title: "Vale Transporte Garantido",
    description: "Fornecimento de passes para trajetos, com desconto máximo de 6%.",
    lawReference: "Lei 7.418/1985 & LCP 150",
    fullDetail: "Direito líquido do empregado receber os fundos necessários para ida e retorno ao posto de trabalho por transporte coletivo público. O empregador arca com o excedente após descontar o limite legal de 6% do salário-base nominal do trabalhador.",
    iconName: "Bus"
  },
  {
    id: "licencas",
    title: "Licença Maternidade e Paternidade",
    description: "Salário-maternidade de 120 dias, paternidade de 5 dias.",
    lawReference: "Art. 7º, XVIII, XIX da CF/88",
    fullDetail: "Trabalhadoras gestantes têm o direito constitucional a 120 dias de licença remunerada pelo INSS, além de estabilidade provisória do emprego desde a confirmação da gravidez até 5 meses após o parto. Pais têm direito a 5 dias de licença remunerados.",
    iconName: "HeartPulse"
  },
  {
    id: "noturno",
    title: "Adicional Noturno",
    description: "Acréscimo salarial de 20% para jornadas das 22h às 5h.",
    lawReference: "Art. 14 da Lei Complementar nº 150",
    fullDetail: "As tarefas exercidas no intervalo entre 22:00 e 05:00 do dia seguinte computam hora noturna reduzida (de 52,5 minutos) e obrigam o adicional de 20% sobre a remuneração normal diurna correspondente para proteção física e compensação social.",
    iconName: "Moon"
  }
];

export const DOWNLOAD_DOCUMENTS: DocumentItem[] = [
  {
    id: "inf-2026",
    title: "Informativo SINTEDORP Ano 2026/2027",
    description: "Guia completo de reajustes salariais, convenções coletivas homologadas e principais direitos atualizados para o corrente ano.",
    date: "10/01/2026",
    fileSize: "2.4 MB",
    category: "informativo",
    fullTitle: "INFORMATIVO OFICIAL - ACORDO COLETIVO DE TRABALHO 2026-2027",
    author: "Diretoria Colegiada SINTEDORP",
    officialText: `### SINTEDORP - Sindicato dos Trabalhadores e Trabalhadoras em Domicílio, na Residência e para Pessoa
**CNPJ 00.290.686/0001-00** | Sede: Avenida Caramuru, nº 451, Jardim Sumaré, Ribeirão Preto/SP
Filiado à CBDT Nacional (CNPJ 05.088.659/0001-65)

---

### AOS TRABALHADORES, EMPREGADORES, PREPOSTOS E CONTADORES
**ASSUNTO: ACORDO TRABALHISTA E TABELA SALARIAL DE REAJUSTES 2026-2027**

O Sindicato dos Trabalhadores e Trabalhadoras em Domicílio, na Residência e para Pessoa (SINTEDORP) torna público o **Acordo Coletivo de Trabalho** estabelecendo as seguintes cláusulas obrigatórias para toda a categoria profissional no ano de 2026 e 2027:

#### CLÁUSULA PRIMEIRA – VIGÊNCIA E DATA-BASE
O presente Acordo Trabalhista vigerá no período de **01/05/2026 a 30/04/2027**. Ficando estabelecida a Data-Base da categoria profissional em **1º de maio de 2026**, conforme deliberação e aprovação da Assembleia Geral Extraordinária (AGE) realizada de forma híbrida em 31/03/2026 e 24/04/2026.

#### CLÁUSULA TERCEIRA – DO REAJUSTE SALARIAL
Aos salários dos empregados abrangidos pelo presente acordo, vigentes in 30 de abril de 2026, será aplicado o reajuste salarial de **6,18% (seis vírgula dezoito por cento)**, correspondendo à reposição integral do IPCA acumulado de 4,26% em 2025 acrescido do ganho real negociado de 1,92%.

#### CLÁUSULA QUARTA – SALÁRIOS NORMATIVOS E CADASTRO OBRIGATÓRIO EM SINDICATO
A partir de 1º de maio de 2026, o piso salarial mínimo para a jornada padrão de 44 horas semanais e 8 horas diárias será de **R$ 1.915,48 (um mil, novecentos e quinze reais e quarenta e oito centavos)**.
*   **Parágrafo Terceiro:** Com objetivos estatísticos e de desenvolvimento de políticas da categoria, fica instituído o **cadastramento obrigatório dos empregados domésticos** junto ao SINTEDORP por iniciativa do Empregador (independente de filiação sindical). O cadastramento é inteiramente GRATUITO e deve ser realizado em até 30 dias após a assinatura deste acordo (ou 10 dias após a admissão do empregado).
*   **Multa por descumprimento:** O empregador que descumprir o cadastro obrigatório estará sujeito a multa de **3 vezes o salário-mínimo normativo** (dividido em 50% para o trabalhador e 50% para o Sindicato).

---

### CLÁUSULA QUINTA – TABELA OFICIAL DE SALÁRIOS NORMATIVOS (2026-2027)

Abaixo, a especificação detalhada de pisos por categoria para profissionais **Residentes** (moram no local de trabalho) e **Não Residentes** (jornada padrão de folga em casa):

| Indicação | Função | Não Residente (44h/40h/36h) | Residente no Local de Trabalho |
| :---: | :--- | :---: | :---: |
| **A** | Doméstica / Arrumador | R$ 1.915,48 | R$ 2.809,20 |
| **B** | Cuidador de Idoso/Pessoa (Básico) | R$ 2.310,83 | R$ 3.081,13 |
| **C** | Babá / Acompanhante / Ouvinte | R$ 2.115,99 | R$ 2.821,41 |
| **D** | Cozinheira | R$ 2.192,54 | R$ 2.922,81 |
| **E** | Copeira | R$ 1.915,48 | R$ 2.809,20 |
| **F** | Motorista Particular | R$ 2.214,22 | R$ 3.126,05 |
| **G** | Governanta | R$ 3.703,50 | R$ 2.781,72 |
| **H** | Vigia Residencial / Segurança | R$ 2.214,22 | R$ 3.126,05 |
| **I** | Caseiro / Jardineiro / Piscineiro | R$ 2.085,74 | R$ 2.781,72 |
| **J** | Aux. de Enfermagem / Técnico | R$ 2.214,22 | R$ 3.126,05 |
| **K** | Enfermeiro Padrão (Superior) | R$ 3.635,15 | R$ 4.937,39 |
| **L** | Demais Profissionais (Superior) | R$ 3.715,62 | R$ 5.001,54 |
| **M** | Demais Funções | R$ 4.473,17 | *(Não Aplicável - Residente)* |

#### BENEFÍCIOS ADICIONAIS OBRIGATÓRIOS:
*   **Cartão Alimentação / Vale Refeição (VR / VA):** Valor mínimo diário ou mensal fixo de **R$ 230,00** sem qualquer tipo de desconto na folha do trabalhador.
*   **Seguro de Vida Coletivo:** Cobertura securitária obrigatória custeada pelo empregador no valor de **R$ 40,00** mensais.
*   **Salário Mínimo Paulista de Referência:** R$ 1.874,00.
*   **Salário Mínimo Nacional de Referência:** R$ 1.821,00.

*Observação:* Para qualquer modalidade de portador de necessidades especiais ou cuidados a 2 ou mais pessoas sob tutela, as tabelas de cuidadores e babás sofrem acréscimo obrigatório de 50%.

Ribeirão Preto, 04 de maio de 2026.
**ANTONIO MAURO DE SOUZA SEBASTIÃO** – Presidente`
  },
  {
    id: "edit-conv-1",
    title: "Edital de Convocação Assembleia Geral 2026",
    description: "Chamada pública para discussões das pautas do sindicato, prestação de contas fiscais anual e definições de piso municipal.",
    date: "14/03/2026",
    fileSize: "820 KB",
    category: "edital",
    fullTitle: "EDITAL DE CONVOCAÇÃO - ASSEMBLEIA GERAL EXTRAORDINÁRIA E TEMA 935 STF",
    author: "Presidência SINTEDORP",
    officialText: `### Sindicato dos Trabalhadores e Trabalhadoras em Domicílio, na Residência e para Pessoa
**CNPJ 00.290.686/0001-00** | Registro MTE nº 46.000.000437-95
Sede: Avenida Caramuru, nº 451, Jardim Sumaré, Ribeirão Preto - SP - CEP 14025-080

Representando a categoria dos Trabalhadores Domésticos e Cuidadores nos municípios de Ribeirão Preto e Região (totalizando mais de 500 cidades cobertas em conformidade com o acórdão TRT15 nº 0011926-38.2022.5.15.00042).

---

### EDITAL DE CONVOCAÇÃO DE ASSEMBLEIA E DIREITO DE OPOSIÇÃO ASSISTENCIAL

O Presidente do SINTEDORP, Sr. Antonio Mauro de Souza Sebastião, convoca todos os trabalhadores integrantes das categorias de Trabalhadores Domésticos, Cuidadores de Idosos ou de Pessoas na base territorial deste sindicato para as Assembleias de debates sobre a pauta de reivindicações do Acordo Trabalhista 2026-2027:

1.  **Do Calendário de Reuniões:**
    *   **AGE Empregadores e Setor Patronal:** Realizada dia 31 de março de 2026, com primeira chamada às 08:30 hs e início oficial às 09:00 hs na sede do sindicato.
    *   **AGE Categoria Laboral (Trabalhadores):** Realizada dia 24 de abril de 2026, com primeira chamada às 13:30 hs e início às 14:00 hs.
2.  **Da Legitimidade e do Desconto Assistencial (Tema 935 do STF):**
    *   Fica estabelecido e aprovado, nos termos do julgamento do Supremo Tribunal Federal (STF - Tema 935), a obrigatoriedade do recolhimento da **Contribuição Assistencial Coletiva** diretamente via folha de pagamento do e-Social, de caráter mensal, englobando também a parcela do 13º salário, para subsidiar as atividades de negociação coletiva vigentes e fiscalização do trabalho.

#### DO PROCEDIMENTO E PRAZO PARA ENTREGA DA CARTA DE OPOSIÇÃO
Aos trabalhadores que optarem por não contribuir, é resguardado o **Direito Constitucional à Oposição**, conforme ritos e prazos a seguir definidos:

*   **Prazos da Oposição:** Dias **29 e 30 de abril, e 01, 02, 03, 04, 05, 06, 07, 08 e 09 de maio de 2026**.
*   **Horários de Atendimento:** Das 08h30 às 11h00 e das 13h30 às 16h30. Nos dias de feriado e sábados, o atendimento é restrito das 08h30 às 11h00.
*   **Locais e Modos de Envio:**
    *   *Trabalhadores de Ribeirão Preto:* Obrigatoriamente de forma **PRESENCIAL**, na sede do SINTEDORP (Av. Caramuru, 451).
    *   *Trabalhadores das demais Cidades Cobertas:* Poderão solicitar e realizar o envio da carta de oposição de forma online pelo e-mail **sintedorp.org@gmail.com** ou pelo WhatsApp **(16) 98806-8810**.
*   **Documentação Obrigatória Exigida:**
    1.  Cópia legível do Registro de Vínculo ativo no **e-Social**;
    2.  Documento Oficial com foto e CPF (RG ou CNH);
    3.  Comprovante de Endereço residencial atualizado.

*Nota Importante: Somente o próprio trabalhador ativo munido de documentação física ou digital completa poderá solicitar o procedimento de isenção.*

Ribeirão Preto, 27 de abril de 2026.
**ANTONIO MAURO DE SOUZA SEBASTIÃO** – Presidente SINTEDORP`
  },
  {
    id: "edit-conv-2",
    title: "Edital Extraordinário - Negociação Salarial",
    description: "Convocatório das trabalhadoras domésticas para audiência e conciliações de piso salarial e assistência jurídica coletiva.",
    date: "25/05/2026",
    fileSize: "680 KB",
    category: "edital",
    fullTitle: "EDITAL EXTRAORDINÁRIO - HOMOLOGAÇÃO COLETIVA E CONCILIAÇÃO TRT-15",
    author: "Assessoria Jurídica SINTEDORP",
    officialText: `### SINTEDORP - Sindicato dos Trabalhadores e Trabalhadoras em Domicílio, na Residência e para Pessoa
**Entidade Registrada sob Processo MTE nº 46.000.000437-95**
Sede Legal: Avenida Caramuru, nº 451, Jardim Sumaré, Ribeirão Preto - SP

---

### EDITAL EXTRAORDINÁRIO DE CUMPRIMENTO DE CONVENÇÃO COLETIVA

A Assessoria Jurídica do SINTEDORP torna pública a certidão extraordinária de homologação judicial das negociações coletivas de reajuste salarial no âmbito do **Tribunal Regional do Trabalho da 15ª Região (TRT-15)**:

1.  **Da Abrangência Metropolitana:**
    *   Fica ratificado o acórdão de extensão territorial de representatividade exclusiva do SINTEDORP a 520 municípios do estado de São Paulo, exceto pela capital regida por sindicato próprio.
2.  **Das Atas de Deliberação:**
    *   As decisões das atas de acordos coletivos serão aceitas de forma presencial e digital, sendo registradas nos sistemas colegiados de fiscalização do trabalho.
3.  **Dos Direitos Resguardados:**
    *   Fica estabelecido que as empresas de cuidadores de idosos e home care atuando na região do interior do estado de SP deverão adequar imediatamente suas folhas ao reajuste retroativo ao piso determinado pelo SINTEDORP, sob pena de incorrer em dissídio coletivo de greve e multa inflacionária de mora diária de 2%.

#### CANAL DE APOIO E DENÚNCIAS
Trabalhadoras que constatarem divergências em seus contracheques de e-Social ou recusa de pagamento de gratificações natalinas, horas extraordinárias e seguro coletivo de vida por parte de prepostos ou patrões devem acionar o canal direto da nossa Assessoria Jurídica.

*   **WhatsApp Jurídico:** (16) 98806-8810
*   **Atendimento:** Segunda a sexta, das 08h30 às 17h00.

Ribeirão Preto, 25 de maio de 2026.
**DEPARTAMENTO JURÍDICO - SINTEDORP**`
  },
  {
    id: "orient-mpt-13",
    title: "Orientação Importante - MPT Nº13",
    description: "Parecer jurídico emitido pelo Ministério Público do Trabalho determinando diretrizes sobre vigilância, assédio e direitos fundamentais.",
    date: "04/02/2025",
    fileSize: "1.2 MB",
    category: "orientacao",
    fullTitle: "ORIENTAÇÃO Nº 13 DA CONALIS - MINISTÉRIO PÚBLICO DO TRABALHO (MPT)",
    author: "Procuradoria Regional do Trabalho da 15ª Região",
    officialText: `### MINISTÉRIO PÚBLICO DO TRABALHO (MPT)
**PROCURADORIA REGIONAL DO TRABALHO - 15ª REGIÃO**
Recomendação Normativa e de Conduta nº 213502-2024

---

### NOTA EXPLICATIVA SOBRE ATOS ANTISSINDICAIS E INTERFERÊNCIA PATRONAL NA CONTRIBUIÇÃO ASSISTENCIAL

O Ministério Público do Trabalho, por meio da Coordenadoria Nacional de Promoção da Liberdade Sindical (CONALIS), editou a **Orientação nº 13**, indicando ser ato atentatório contra a liberdade de associação e conduta ilegal de interferência sindical qualquer auxílio ou pressão que empresas e escritórios de contabilidade forneçam aos empregados para a facilitação da entrega de cartas de oposição.

#### RECOMENDAÇÕES LEGAIS IMPORTANTES:

1.  **Proibição Geral aos Empregadores e Contadores:**
    *   Empregadores e assessores de contabilidade **NÃO PODEM** coagir, estimular, auxiliar de qualquer forma ou induzir o trabalhador a apresentar oposição ao desconto de contribuição sindical ou assistencial coletiva autorizada em Assembleia.
2.  **Atividades Vedadas Explicadas (Constituem Conduta Antissindical Grave):**
    *   É estritamente **proibida** a elaboração de cartas-padrão (modelos pré-impressos fornecidos pelo departamento financeiro ou RH para o trabalhador apenas assinar).
    *   É **proibido** organizar mutirões de transporte ou pagar qualquer meio de locomoção de empregados em grupo para a sede do sindicato com o propósito de entregar a respectiva oposição.
    *   É **proibida** a divulgação induzida de formas de oposição com o objetivo evidente de desmobilizar arrecadações que sustentam defesas coletivas.
3.  **Sanções Cabíveis e Penalidades Judiciais:**
    *   A prática dessas ações ilegalmente induzidas e verificadas resultará em abertura imediata de Inquérito Civil Público pelo Ministério Público do Trabalho, propositura de **Ação Civil Pública por dano moral coletivo** contra a empresa/contabilidade e aplicação de pesadas multas diárias judiciais.
    *   A orientação segue rigorosamente alinhada à jurisprudência do Supremo Tribunal Federal (STF - Tema 935) e de pareceres da Organização Internacional do Trabalho (OIT).

#### SE VOCÊ ESTÁ SOFRENDO COAÇÃO OU PRESSÃO DO SEU PATRÃO:
Denuncie de forma anônima e segura. A fiscalização e defesa dos trabalhadores domésticos é resguardada por sigilo absoluto de dados das denunciantes perante a promotoria. Basta informar que a empresa ou seu contador forneceu texto, incentivou ou obrigou a assinar oposição para que o processo seja aberto.

Ribeirão Preto e Região Metropolitana, 04 de fevereiro de 2025.
**MINISTÉRIO PÚBLICO DO TRABALHO - MPT 15ª REGIÃO**`
  },
  {
    id: "certidao-trt15-2024",
    title: "Certidão TRT-15 (Trânsito em Julgado)",
    description: "Cópia oficial da certidão transitada em julgado pelo Tribunal Regional do Trabalho da 15ª Região garantindo a vitória jurídica e exclusividade de base do SINTEDORP.",
    date: "26/06/2024",
    fileSize: "1.1 MB",
    category: "orientacao",
    fullTitle: "CERTIDÃO DE TRÂNSITO EM JULGADO - PROCESSO 0011926-38.2022.5.15.0042",
    author: "2ª Vara do Trabalho de Ribeirão Preto / TRT-15",
    officialText: `### PODER JUDICIÁRIO - JUSTIÇA DO TRABALHO
**TRIBUNAL REGIONAL DO TRABALHO DA 15ª REGIÃO**
**PROCESSO Judicial Eletrônico (PJe) nº 0011926-38.2022.5.15.0042 - SDC**
Classe: Tutela Antecipada Antecedente

---

### CERTIDÃO DE TRÂNSITO EM JULGADO

Certifico que, em **05/06/2024**, os presentes autos transitarem em julgado, com decisão colegiada definitiva da Seção Especializada em Dissídios Coletivos da 15ª Região, não cabendo mais nenhum recurso ordinário ou extraordinário.

#### EFEITOS PRÁTICOS E JURÍDICOS DA DECISÃO SINDICAL:

1.  **Validade da Extensão de Base:**
    *   Fica declarada a total validade e legalidade da Assembleia Geral Extraordinária realizada pelo SINTEDORP, que aprovou a extensão da base territorial e sua respectiva representatividade da categoria de **Trabalhadores Domésticos e Cuidadores de Idosos/Pessoas** para as bases inorganizadas do Estado de São Paulo.
2.  **Inexistência de Conflito de Unicidade:**
    *   O Tribunal determinou que os sindicatos autores representam trabalhadores de bases urbanas ou comerciais distintas, inexistindo qualquer usurpação por parte do SINTEDORP na defesa desses profissionais em âmbito do domicílio (lar).
3.  **Representação Exclusiva dos Cuidadores em Domicílio:**
    *   Fica estabelecido que os cuidadores que se ativam em âmbito estritamente residencial estão legitimamente representados pelo SINTEDORP sob a égide do ACORDO COLETIVO DE TRABALHO DE REAJUSTE DA CATEGORIA.

A referida decisão tem força normativa e vinculante erga omnes nos municípios designados na ata de assembleia, tornando sem efeito qualquer oposição patronal externa sem respaldo do órgão ministerial.

Ribeirão Preto/SP, 26 de junho de 2024.
**RODOLFO TIMBO MESQUITA** – Servidor Judiciário`
  },
  {
    id: "nota-conalis-09-mpt",
    title: "Nota Técnica CONALIS nº 09 MPT",
    description: "Revisão e diretriz normatizada da Procuradoria do Trabalho que valida a instituição da contribuição assistencial no e-Social nos moldes do Tema 935 do STF.",
    date: "22/05/2024",
    fileSize: "1.9 MB",
    category: "orientacao",
    fullTitle: "NOTA TÉCNICA CONALIS Nº 09/2024 - MINISTÉRIO PÚBLICO DO TRABALHO",
    author: "Procuradoria Geral do Trabalho / CONALIS",
    officialText: `### MINISTÉRIO PÚBLICO DO TRABALHO (MPT)
**PROCURADORIA-GERAL O TRABALHO - COORDENADORIA NACIONAL DA CONALIS**
**DIRETRIZ DE CONTRIBUIÇÃO ASSISTENCIAL E EXERCÍCIO DA OPOSIÇÃO**

---

### NOTA TÉCNICA CONALIS Nº 09, DE 22 DE MAIO DE 2024

A Coordenadoria Nacional de Promoção da Liberdade Sindical (CONALIS) edita o respectivo ato para fins de esclarecer a legitimidade das normas coletivas e o correto exercício do direito de oposição após o Supremo Tribunal Federal firmar tese de repercussão geral no **Tema 935**:

1.  **Legitimidade Legitimada do Desconto Assistencial:**
    *   É constitucional a instituição de contribuição assistencial, por acordo ou convenção coletiva, imposta a todos os empregados da categoria (associados ou não), desde que garantido constitucionalmente o direito de livre oposição de cada trabalhador.
2.  **Do Custeio Coletivo:**
    *   As negociações geram benefícios que contemplam indistintamente toda a base (ganho real, seguro de vida, cartão alimentação), sendo equânime e perfeitamente justificável a participação financeira solidária de todos os assistidos para evitar a conduta de enriquecimento sem causa.
3.  **Das Diretrizes do Exercício do Direito de Oposição:**
    *   O prazo deve ser razoável para permitir a manifestação do empregado sem cerceamentos.
    *   **Proibição de Práticas Patronais Obstrutivas:** Estações e escritórios de contabilidade NÃO PODEM elaborar termos padronizados de desistência, divulgar cartilhas de contestação induzida ou realizar desmobilização sindical sob pena de multa por comportamento ilícito antissindical e dano moral coletivo.

Brasília/DF, 22 de maio de 2024.
**VIVIANN BRITO MATTOS** – Procuradora Regional do Trabalho
**PRISCILA MORETO DE PAULA** – Procuradora do Trabalho`
  },
  {
    id: "esclarecimento-acordo-2026",
    title: "Esclarecimentos Jurídicos - Acordo 2026/2027",
    description: "Orientação e esclarecimento de segurança patronal sobre obrigatoriedades do e-Social, proteção securitária para diaristas e empregados acima de 70 anos.",
    date: "01/05/2026",
    fileSize: "1.4 MB",
    category: "informativo",
    fullTitle: "COMUNICADO DE ESCLARECIMENTO SINDICAL INTEGRAL - CONVENÇÃO 2026-2027",
    author: "Secretaria de Relações de Trabalho SINTEDORP",
    officialText: `### SINTEDORP - CNPJ 00.290.686/0001-00
**Aos Trabalhadores, Empregadores, Prepostos e Prestadores de Serviços**

---

### ESCLARECIMENTOS RELATIVOS AO ACORDO TRABALHISTA 2026-2027

Diante do início de vigência de novos direitos, o Sindicato de Ribeirão Preto e Região destaca pontos obrigatórios cruciais para conhecimento de contadores e empregadores residenciais em e-Social:

1.  **Unicidade Representativa Inabalável:**
    *   O SINTEDORP esclarece que cobranças de outras entidades denominadas "Federação dos Trabalhadores Domésticos da Grande São Paulo" ou similares são ilegais e inexistem registros ativos dessas federações cooperativas no MTE para Ribeirão Preto e nossas mais de 500 cidades aliadas. O SINTEDORP é a única entidade legítima homologada com validade de norma.
2.  **Proteção Obrigatória ao Trabalhador Idoso (Mais de 70 anos):**
    *   O empregador que tenha trabalhador doméstico (a) ativo de **idade superior a 70 anos** possui prazo máximo de **30 dias** após a contratação ou recebimento do acordo para contratar apólice de seguro de vida individual com coberturas análogas em nome do respectivo empregado.
3.  **Garantia e Isenção para Diaristas e Empregados de Tempo Parcial:**
    *   Para o empregador que contrata trabalhador que presta serviços até **2 vezes por semana** (diarista/autônomo), disponibilizamos e recomendamos a adesão voluntária à apólice coletiva do Seguro de Vida Coletivo de R$ 40,00 mensais para este grupo, visando resguardar a integridade em caso de acidente de trabalho ou funeral e mitigar eventuais passivos de responsabilidade civil do tutor residencial.
4.  **Cumprimento de Piso e Adequação Contratual:**
    *   Aos empregadores que porventura estejam aplicando convenções alheias, orientamos a correção imediata de e-Social para o piso corporativo de **R$ 1.915,48** ou o piso de cuidadores para afastar problemas de fiscalização.

Ribeirão Preto, 01 de maio de 2026.
**ANTONIO MAURO DE SOUZA SEBASTIÃO** – Presidente`
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Qual a diferença entre Diarista e Empregada Doméstica Mensalista?",
    answer: "A diarista atua de forma autônoma sem vínculo empregatício formal, desde que preste serviço na mesma residência por até 2 dias por semana. A partir de 3 dias semanais nas mesmas dependências, configura-se obrigatoriamente pelas leis brasileiras o vínculo de emprego doméstico contínuo (mensalista/semanalista), exigindo registro em carteira e eSocial.",
    category: "direitos"
  },
  {
    id: "faq-2",
    question: "Qual é o piso salarial correto em 2026 para Ribeirão Preto e Região?",
    answer: "O piso salarial do SINTEDORP para a jornada padrão (44 horas semanais) é de R$ 1.915,48 mensais. O eSocial e os holerites devem seguir estritamente este valor mínimo estabelecido no Acordo Coletivo 2026-2027. Para regimes de tempo parcial, os valores podem ser calculados proporcionalmente.",
    category: "direitos"
  },
  {
    id: "faq-3",
    question: "Como funciona o Seguro de Vida Coletivo obrigatório?",
    answer: "O Seguro de Vida Coletivo é de custeio obrigatório por parte do empregador no valor fixado de R$ 40,00 mensais, sendo expressamente proibido efetuar qualquer desconto deste valor no salário do trabalhador doméstico. O cadastro e envio da apólice/dados contratuais devem ser direcionados para o e-mail: julianasanches.segurosx8@gmail.com.",
    category: "contribuicao"
  },
  {
    id: "faq-4",
    question: "Como solicitar o Cartão Alimentação das domésticas e qual o benefício?",
    answer: "Todas as trabalhadoras domésticas mensalistas abrangidas pelo acordo têm direito ao cartão alimentação ou vale refeição no valor de, no mínimo, R$ 230,00 mensais sem desconto. Para efetuar o cadastro obrigatório do cartão dos seus colaboradores, contate ou envie os dados para: cartaodosdomesticos.org@gmail.com e emilsonrocha.x8seguros@gmail.com.",
    category: "contribuicao"
  },
  {
    id: "faq-5",
    question: "O que é a Contribuição Assistencial e como ela é recolhida?",
    answer: "A contribuição assistencial é um desconto em folha autorizado em Assembleia Geral para fomento das atividades sindicais de representação coletiva e jurídica de toda a categoria profissional. O cadastro das profissionais com direito aos benefícios deve ser feito no canal: trabalhadoresdomesticos.org@gmail.com. Empregados que queiram se opor devem apresentar oposição pessoalmente na forma da lei.",
    category: "contribuicao"
  },
  {
    id: "faq-6",
    question: "O empregador doméstico é obrigado a fornecer alimentação e moradia?",
    answer: "A alimentação e a moradia fornecidas no local de trabalho não podem ter seus custos descontados da remuneração da trabalhadora, possuindo natureza estritamente indenizatória e não salarial. O trabalhador doméstico que mora no trabalho tem todos os demais direitos de jornada (carga horária controlada e descanso) perfeitamente vigentes.",
    category: "direitos"
  },
  {
    id: "faq-7",
    question: "Como funciona a contribuição ou mensalidade de associação?",
    answer: "A mensalidade de associação (atualmente R$ 30,00) é facultativa para quem opta por se filiar e virar associado efetivo. O valor é revertido para os cofres do SINTEDORP e garante acesso livre a convênios de saúde UNIMED, atendimento odontológico gratuito, assessoria contábil para imposto de renda, e apoio jurídico integral na justiça do trabalho.",
    category: "sindicato"
  },
  {
    id: "faq-8",
    question: "Por que se associar ao SINTEDORP Ribeirão Preto?",
    answer: "Ao se associar, você fortalece a união coletiva da categoria, que já conquistou a aprovação da PEC das Domésticas e garante reajustes anuais de pisos salariais dignos. Além disso, você passa a contar com suporte gratuito para homologações de rescisões, assessores de defesa em processos na justiça e acesso a todos os convênios parceiros da entidade.",
    category: "sindicato"
  },
  {
    id: "faq-9",
    question: "Diaristas que atuam 1 ou 2 dias por semana têm direito a Seguro de Vida?",
    answer: "Sim! Embora ela não seja mensalista obrigatória pela CLT, o Sindicato disponibiliza e recomenda que contratantes assinem a cobertura individual de R$ 40,00 mensais para diaristas. Isso assegura a profissional em caso de acidente doméstico e blinda judicialmente o proprietário do imóvel contra ações de responsabilidade civil em caso de infortúnio no lar.",
    category: "outros"
  },
  {
    id: "faq-10",
    question: "O que fazer se o patrão ou contador pressionar para assinar a carta de oposição?",
    answer: "A coação patronal para entrega de oposição é prática antissindical ilícita gravíssima capitulada na Nota Técnica CONALIS nº 09 do Ministério Público do Trabalho. Se houver panfletagem ou preenchimento forçado fornecido pela contabilidade, denuncie anonimamente informando os fatos na nossa sede ou pelo WhatsApp (16) 98806-8810 para providências jurídicas imediatas do MPT.",
    category: "sindicato"
  }
];
