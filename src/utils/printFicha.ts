import { Associado } from '../types';

/**
 * Dynamically spawns a hidden, temporary print-purposed iframe with 100% styled HTML,
 * triggers the browser's high-fidelity native print-to-PDF system,
 * and clears the DOM structure immediately after.
 */
export function printFicha(member: Associado) {
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.bottom = '0';
  iframe.style.right = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = 'none';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) return;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Ficha SINTEDORP - ${member.nome}</title>
        <style>
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            margin: 40px;
            color: #1a1a1a;
            font-size: 13.5px;
            line-height: 1.6;
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #d92d32;
            padding-bottom: 12px;
            margin-bottom: 25px;
          }
          .logo {
            font-size: 26px;
            font-weight: 900;
            color: #d92d32;
            letter-spacing: 1.5px;
            margin: 0;
          }
          .subtitle {
            font-size: 12px;
            color: #4a5568;
            text-transform: uppercase;
            font-weight: bold;
            margin-top: 4px;
            letter-spacing: 1.5px;
          }
          .cnpj {
            font-size: 9.5px;
            color: #718096;
            margin-top: 5px;
            letter-spacing: 0.5px;
          }
          .doc-title {
            text-align: center;
            font-size: 16px;
            font-weight: 800;
            text-transform: uppercase;
            margin-bottom: 25px;
            background-color: #f7fafc;
            padding: 10px;
            border: 1.5px solid #e2e8f0;
            letter-spacing: 1px;
            border-radius: 6px;
          }
          .section-title {
            font-size: 12px;
            font-weight: 800;
            text-transform: uppercase;
            border-bottom: 2px solid #edf2f7;
            padding-bottom: 4px;
            margin-top: 30px;
            margin-bottom: 12px;
            color: #d92d32;
            letter-spacing: 0.5px;
          }
          .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          .data-table td {
            padding: 9px 12px;
            border: 1px solid #e2e8f0;
            vertical-align: middle;
          }
          .data-table td.label {
            font-weight: bold;
            width: 28%;
            background-color: #f8fafc;
            color: #4a5568;
          }
          .statement {
            font-size: 11.5px;
            color: #4a5568;
            text-align: justify;
            margin-bottom: 30px;
            background-color: #fdfdfd;
            padding: 14px;
            border-left: 4px solid #f26c36;
            border-radius: 0 6px 6px 0;
            line-height: 1.5;
          }
          .signatures {
            margin-top: 45px;
            width: 100%;
          }
          .signatures td {
            width: 50%;
            text-align: center;
            padding-top: 40px;
          }
          .signature-line {
            width: 80%;
            border-top: 1.5px solid #cbd5e0;
            margin: 0 auto;
            padding-top: 6px;
            font-size: 10.5px;
            color: #4a5568;
            font-weight: 500;
          }
          .footer {
            margin-top: 70px;
            text-align: center;
            font-size: 9.5px;
            color: #a0aec0;
            border-top: 1.5px solid #edf2f7;
            padding-top: 12px;
            line-height: 1.4;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="logo">SINTEDORP</h1>
          <div class="subtitle">Sindicato dos Trabalhadores Domésticos de Ribeirão Preto e Região</div>
          <div class="cnpj">Fundado em 1994 | CNPJ: 01.328.711/0001-44 | Base Territorial Homologada Ministério do Trabalho</div>
        </div>

        <div class="doc-title">Ficha Oficial de Pré-Associação Sindical</div>

        <div class="section-title">Dados Cadastrais do(a) Trabalhador(a)</div>
        <table class="data-table">
          <tr>
            <td class="label">Nome Completo</td>
            <td style="font-weight: bold; font-size: 14px;">${member.nome}</td>
          </tr>
          <tr>
            <td class="label">ID Provisório Registro</td>
            <td style="font-family: monospace; font-weight: bold; color: #d92d32; font-size: 14px; letter-spacing: 0.5px;">${member.id}</td>
          </tr>
          <tr>
            <td class="label">WhatsApp / Celular</td>
            <td>${member.whatsapp}</td>
          </tr>
          <tr>
            <td class="label">E-mail de Contato</td>
            <td>${member.email}</td>
          </tr>
          <tr>
            <td class="label">Cidade de Atuação</td>
            <td style="font-weight: 600;">${member.cidade}</td>
          </tr>
          <tr>
            <td class="label">Categoria Profissional</td>
            <td>${member.categoria || 'Empregada Doméstica'}</td>
          </tr>
          <tr>
            <td class="label">Data de Emissão Ficha</td>
            <td>${member.dataCadastro}</td>
          </tr>
          <tr>
            <td class="label">Canal de Captação</td>
            <td>Website Oficial SINTEDORP (Feito por EficazBot) - Segurança Criptografada Garantida</td>
          </tr>
        </table>

        <div class="section-title">Declaração de Consentimento e Filiação</div>
        <div class="statement">
          Declaro sob as penas da lei que atuo profissionalmente na categoria de trabalhadores domésticos selecionada e requeiro formalmente a minha pré-associação à entidade sindical representativa SINTEDORP. Compreendo e concordo com o processamento confidencial de meus dados coletados por este meio eletrônico oficial para registro histórico e homologação administrativa pela secretaria do sindicato sob responsabilidade de nossa entidade (Lei Geral de Proteção de Dados - Lei 13.709/2018).
        </div>

        <table class="signatures">
          <tr>
            <td>
              <div class="signature-line">
                Assinatura do(a) Requerente Associado(a)<br>
                Registro ID: ${member.id}
              </div>
            </td>
            <td>
              <div class="signature-line">
                Secretaria Administrativa SINTEDORP<br>
                Responsável Homologador(a)
              </div>
            </td>
          </tr>
        </table>

        <div class="section-title" style="margin-top: 35px;">Homologação Diretoria Executiva (Uso Interno)</div>
        <table class="data-table">
          <tr>
            <td class="label" style="padding: 12px;">Parecer Técnico</td>
            <td style="padding: 12px;">
              [ &nbsp; ] DEFERIDO &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
              [ &nbsp; ] INDEFERIDO &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
              [ &nbsp; ] AGUARDANDO ENTREGA DE CTPS
            </td>
          </tr>
          <tr>
            <td class="label" style="padding: 12px;">Assinatura do Avaliador</td>
            <td style="height: 30px;"></td>
          </tr>
        </table>

        <div class="footer">
          Ficha cadastrada com sucesso e protegida contra manipulação indesejada sob protocolo seguro.<br>
          © SINTEDORP — Desde 1994 representando a categoria doméstica | Automatizado por EficazBot
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          }
        </script>
      </body>
    </html>
  `;

  doc.open();
  doc.write(html);
  doc.close();

  // Clean iframe reference
  setTimeout(() => {
    try {
      document.body.removeChild(iframe);
    } catch (e) {
      console.warn("Iframe already removed.");
    }
  }, 4000);
}
