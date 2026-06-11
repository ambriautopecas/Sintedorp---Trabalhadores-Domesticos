import React, { useState } from 'react';
import { DOWNLOAD_DOCUMENTS } from '../data';
import { FileText, Download, Check, AlertCircle, Search, Eye, X, Printer, Sparkles, Building2 } from 'lucide-react';
import { DocumentItem } from '../types';

export default function DownloadsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [searchDoc, setSearchDoc] = useState('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);
  
  // State for document modal viewer
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);

  const filteredDocs = DOWNLOAD_DOCUMENTS.filter(doc => {
    const matchesCategory = activeCategory === 'todos' || doc.category === activeCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchDoc.toLowerCase()) || 
                          doc.description.toLowerCase().includes(searchDoc.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const downloadDocumentAsText = (doc: DocumentItem) => {
    if (!doc.officialText) return;
    
    // Format the text representation wonderfully to look like a physical printout
    const headerLine = "========================================================================\n";
    const titleLine = `          ${doc.fullTitle || doc.title}\n`;
    const metaLine = `          Publicado em: ${doc.date} | Autor: ${doc.author || 'SINTEDORP'}\n`;
    const subLine = `          SINTEDORP - CNPJ: 00.290.686/0001-00\n`;
    const bodyFormatted = doc.officialText.replace(/###/g, '').replace(/####/g, '').replace(/[\*|`]/g, '');
    
    const finalFileContent = `${headerLine}${titleLine}${subLine}${metaLine}${headerLine}\n\n${bodyFormatted}\n\n${headerLine}Documento disponibilizado digitalmente via Sintedorp.org.br\nTelefone: (16) 3021-1196 | WhatsApp: (16) 98806-8810\nAv. Caramuru, nº 451, Jardim Sumaré, Ribeirão Preto/SP`;

    const blob = new Blob([finalFileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    const safeFilename = doc.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "_") + ".txt";
    link.download = safeFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    if (!downloadedIds.includes(doc.id)) {
      setDownloadedIds([...downloadedIds, doc.id]);
    }
  };

  const triggerDownloadSimulation = (doc: DocumentItem) => {
    if (downloadingId) return;
    setDownloadingId(doc.id);
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadingId(null);
          // Trigger actual text file compilation and download
          downloadDocumentAsText(doc);
          return 100;
        }
        return prev + 25;
      });
    }, 150);
  };

  // Helper parser to render document markdown into highly styled HTML elements
  const renderOfficialText = (text: string | undefined) => {
    if (!text) return null;
    const lines = text.split('\n');
    const renderedElements: React.ReactNode[] = [];
    let inList = false;
    let listItems: string[] = [];
    let inTable = false;
    let tableRows: string[][] = [];

    const flushList = (key: number) => {
      if (listItems.length > 0) {
        renderedElements.push(
          <ul key={`list-${key}`} className="list-disc pl-6 mb-4 space-y-1.5 text-sm sm:text-base text-gray-700">
            {listItems.map((item, idx) => (
              <li key={idx}>{parseBoldText(item)}</li>
            ))}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    const flushTable = (key: number) => {
      if (tableRows.length > 0) {
        const validRows = tableRows.filter(row => {
          const joined = row.join('');
          return !joined.includes('---') && !joined.includes(':::') && joined.trim().length > 0;
        });

        if (validRows.length > 0) {
          renderedElements.push(
            <div key={`table-${key}`} className="overflow-x-auto my-6 border border-gray-200 rounded-xl shadow-xs">
              <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
                <thead className="bg-[#fcf8f2]">
                  <tr>
                    {validRows[0].map((col, idx) => (
                      <th key={idx} className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                        {col.trim()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {validRows.slice(1).map((row, rowIdx) => (
                    <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-[#fffcf9]/70'}>
                      {row.map((col, colIdx) => (
                        <td key={colIdx} className="px-4 py-3 text-xs sm:text-sm text-gray-800 font-medium">
                          {parseBoldText(col.trim())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        tableRows = [];
        inTable = false;
      }
    };

    const parseBoldText = (txt: string): React.ReactNode => {
      const parts = txt.split('**');
      return parts.map((part, i) => (i % 2 === 1 ? <strong key={i} className="font-extrabold text-brand-dark-brown">{part}</strong> : part));
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('*') || trimmed.startsWith('-')) {
        if (inTable) flushTable(index);
        inList = true;
        const content = trimmed.substring(1).trim();
        listItems.push(content);
        return;
      }

      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        if (inList) flushList(index);
        inTable = true;
        const columns = trimmed.substring(1, trimmed.length - 1).split('|');
        tableRows.push(columns);
        return;
      }

      if (!trimmed.startsWith('*') && !trimmed.startsWith('-') && !trimmed.startsWith('|')) {
        if (inList) flushList(index);
        if (inTable) flushTable(index);
      }

      if (trimmed === '') {
        renderedElements.push(<div key={`space-${index}`} className="h-3"></div>);
        return;
      }

      if (trimmed.startsWith('### ')) {
        renderedElements.push(
          <h3 key={index} className="font-display text-lg sm:text-xl font-black text-brand-charcoal mt-7 mb-3 border-b border-gray-100 pb-2 flex items-center gap-2">
            {parseBoldText(trimmed.substring(4))}
          </h3>
        );
      } else if (trimmed.startsWith('#### ')) {
        renderedElements.push(
          <h4 key={index} className="font-sans text-xs sm:text-sm font-bold text-brand-red mt-5 mb-2 uppercase tracking-wide">
            {parseBoldText(trimmed.substring(5))}
          </h4>
        );
      } else if (trimmed === '---') {
        renderedElements.push(<hr key={index} className="my-6 border-gray-200" />);
      } else if (trimmed.startsWith('`') && trimmed.endsWith('`')) {
        renderedElements.push(
          <div key={index} className="my-4 p-4 bg-orange-50/50 border-l-4 border-brand-orange rounded-r-xl text-xs sm:text-sm text-brand-orange font-medium italic leading-relaxed">
            {parseBoldText(trimmed.replace(/`/g, ''))}
          </div>
        );
      } else {
        renderedElements.push(
          <p key={index} className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 text-justify">
            {parseBoldText(line)}
          </p>
        );
      }
    });

    if (inList) flushList(lines.length);
    if (inTable) flushTable(lines.length);

    return renderedElements;
  };

  const handlePrint = (doc: DocumentItem) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const formattedContent = doc.officialText 
        ? doc.officialText.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        : doc.description;
      
      printWindow.document.write(`
        <html>
          <head>
            <title>${doc.fullTitle || doc.title}</title>
            <style>
              body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; color: #333; line-height: 1.6; }
              .header { text-align: center; border-bottom: 2px solid #33平; padding-bottom: 20px; margin-bottom: 30px; }
              .header h1 { margin: 5px 0; font-size: 24px; color: #0b0b0b; }
              .header h2 { font-size: 14px; color: #666; margin: 5px 0; font-weight: normal; }
              .stamp { border: 2px dashed #e67e22; color: #e67e22; display: inline-block; padding: 10px 20px; font-weight: bold; margin-top: 15px; border-radius: 5px; transform: rotate(-2sdeg); }
              .content { font-size: 15px; text-align: justify; }
              hr { border: 0; border-top: 1px solid #ddd; margin: 30px 0; }
              .footer { text-align: center; margin-top: 50px; font-size: 12px; color: #777; border-top: 1px solid #ccc; padding-top: 20px; }
              table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              table, th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f5f5f5; font-size: 12px; }
              td { font-size: 13px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>${doc.fullTitle || doc.title}</h1>
              <h2>Sindicato dos Trabalhadores Domésticos de Ribeirão Preto e Região</h2>
              <div class="stamp">DOCUMENTO DIGITALIZADO OFICIAL</div>
            </div>
            <div class="content">
              ${formattedContent}
            </div>
            <div class="footer">
              SINTEDORP - CNPJ 00.290.686/0001-00<br />
              Avenida Caramuru, nº 451, Jardim Sumaré, Ribeirão Preto/SP<br />
              Este documento possui validade sindical e representação jurídica plena.
            </div>
            <script>
              window.onload = function() { window.print(); }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <section id="documentos" className="py-16 px-4 sm:px-6 bg-brand-beige font-sans text-brand-charcoal text-left">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Banner Headers */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-3">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block">
            Central de Documentos e Editais
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-gray-800">
            Informativos &amp; Editais de Convocação
          </h2>
          <p className="text-sm text-gray-500">
            Acompanhe com transparência nossos editais de chamadas para assembleia, reajustes salariais, convenções e recomendações administrativas. **Clique nos documentos para abrir o visualizador online e baixar o arquivo oficial**.
          </p>
        </div>

        {/* Filter and Searching Row */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 border-b border-gray-200 pb-6">
          {/* Category Tabs */}
          <div className="flex bg-white border border-gray-200 p-1.5 rounded-xl self-start overflow-x-auto max-w-full">
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'informativo', label: 'Informativos' },
              { id: 'edital', label: 'Editais' },
              { id: 'orientacao', label: 'M.P. Trabalho' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`py-1.5 px-4 text-xs font-bold rounded-lg transition-all cursor-pointer shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-brand-red text-white shadow-sm'
                    : 'text-gray-500 hover:text-brand-charcoal'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search bar inside documents */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
            <input
              type="text"
              value={searchDoc}
              onChange={(e) => setSearchDoc(e.target.value)}
              placeholder="Filtre editais e arquivos..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red font-medium"
            />
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDocs.length > 0 ? (
            filteredDocs.map((doc) => {
              const isDownloading = downloadingId === doc.id;
              const isDownloaded = downloadedIds.includes(doc.id);

              return (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col justify-between gap-5 shadow-sm hover:shadow-md hover:border-brand-orange-light/30 transition-all cursor-pointer group"
                  onClick={() => setSelectedDoc(doc)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-orange-50/50 text-brand-orange flex items-center justify-center shrink-0 group-hover:bg-brand-orange-light/20 transition-all">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] uppercase font-bold px-2 py-0.5 bg-gray-100 rounded text-gray-500 font-mono">
                          {doc.category === 'informativo' ? 'Informativo' : doc.category === 'edital' ? 'Edital' : 'M.P.T.'}
                        </span>
                        <span className="text-xxs text-gray-400 font-medium">Publicado {doc.date}</span>
                      </div>
                      <h4 className="font-display font-bold text-base text-gray-800 leading-snug mt-1.5 group-hover:text-brand-orange transition-all">
                        {doc.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed line-clamp-2">
                        {doc.description}
                      </p>
                    </div>
                  </div>

                  <div 
                    className="flex items-center justify-between border-t border-gray-50 pt-4 mt-1"
                    onClick={(e) => e.stopPropagation()} // Stop propagation so buttons don't double trigger selectedDoc modal
                  >
                    <span className="text-xxs text-gray-400 font-bold uppercase tracking-wider">
                      Tamanho: <span className="font-mono text-gray-600">{doc.fileSize}</span>
                    </span>

                    <div className="flex gap-2">
                      {/* Visualizar Button */}
                      <button
                        onClick={() => setSelectedDoc(doc)}
                        className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-xl border border-gray-200 transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Visualizar</span>
                      </button>

                      {/* Download Button */}
                      {isDownloaded ? (
                        <button
                          onClick={() => downloadDocumentAsText(doc)}
                          className="px-3.5 py-1.5 rounded-xl bg-orange-50 border border-brand-orange text-brand-orange text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Baixar Arquivo</span>
                        </button>
                      ) : isDownloading ? (
                        <div className="flex items-center gap-2 pl-2">
                          <span className="text-xs font-mono text-brand-orange font-bold">
                            {downloadProgress}%
                          </span>
                          <div className="w-14 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className="bg-brand-orange h-1.5 rounded-full transition-all" 
                              style={{ width: `${downloadProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => triggerDownloadSimulation(doc)}
                          className="px-3.5 py-1.5 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Baixar</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12 text-gray-400 text-sm">
              <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              Nenhum edital ou arquivo disponível para os filtros atuais.
            </div>
          )}
        </div>

        {/* Dynamic Interactive Document Viewer Overlay Modal */}
        {selectedDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-10 bg-brand-charcoal/80 overflow-y-auto animate-fadeIn select-none">
            <div 
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden text-brand-charcoal animate-scaleIn select-text"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Header inside Modal */}
              <div className="bg-[#fdf9f3] px-6 py-5 border-b border-gray-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-brand-orange flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-display font-black text-xs sm:text-sm uppercase tracking-tight text-gray-500">
                      Visualizador de Documentos Oficial
                    </h5>
                    <p className="text-xxs sm:text-xs text-gray-400 font-mono">
                      Código ID: {selectedDoc.id} | SINTEDORP
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePrint(selectedDoc)}
                    title="Imprimir documento"
                    className="p-2 hover:bg-gray-100 text-gray-500 hover:text-brand-charcoal rounded-xl transition-all cursor-pointer"
                  >
                    <Printer className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedDoc(null)}
                    className="p-2 hover:bg-gray-100 text-gray-400 hover:text-brand-red rounded-xl transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Physical Sheet Paper Content Area */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-gray-50/50">
                <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-gray-200/60 max-w-3xl mx-auto flex flex-col gap-4 relative">
                  
                  {/* Decorative stamp on document */}
                  <div className="absolute top-4 right-4 sm:top-10 sm:right-10 border-2 border-brand-orange/30 text-brand-orange/40 text-[10px] sm:text-xs font-black uppercase inline-block py-1 px-3 rounded-lg tracking-widest pointer-events-none select-none select-none rotate-12">
                    Oficial Digital
                  </div>

                  {/* Sindicato Header Banner */}
                  <div className="text-center border-b border-gray-150 pb-5 mb-2">
                    <div className="text-xs sm:text-sm font-bold tracking-widest text-[#937b62] uppercase mb-1">
                      Sindicato dos Trabalhadores Domésticos
                    </div>
                    <h3 className="font-display font-black text-lg sm:text-xl md:text-2xl text-brand-charcoal leading-tight">
                      {selectedDoc.fullTitle || selectedDoc.title}
                    </h3>
                    <div className="flex items-center justify-center gap-3 mt-3 text-xxs sm:text-xs text-gray-400 font-semibold font-mono">
                      <span>Publicado em: {selectedDoc.date}</span>
                      <span>•</span>
                      <span>Autor: {selectedDoc.author || 'SINTEDORP'}</span>
                    </div>
                  </div>

                  {/* Complete Transcript Text Render */}
                  <div className="prose max-w-full text-justify text-xs sm:text-sm md:text-base">
                    {renderOfficialText(selectedDoc.officialText)}
                  </div>

                  {/* Document Signature block */}
                  <div className="mt-12 border-t border-gray-100 pt-8 flex flex-col items-center text-center">
                    <div className="w-48 h-12 border-b border-gray-300 relative flex items-center justify-center">
                      <span className="font-serif italic text-gray-300 text-lg sm:text-xl select-none select-none">Antonio Mauro S.</span>
                    </div>
                    <span className="text-xs font-bold text-gray-700 mt-2">Antonio Mauro de Souza Sebastião</span>
                    <span className="text-xxs text-gray-400">Presidente do SINTEDORP</span>
                  </div>

                </div>
              </div>

              {/* Bottom Quick Bar */}
              <div className="bg-[#fdf9f3] px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-3 shrink-0">
                <span className="text-xxs text-gray-400 flex items-center gap-1.5">
                  <Sparkles className="w-3 text-brand-orange" />
                  Visualização completa do arquivo ativo de {selectedDoc.fileSize}
                </span>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setSelectedDoc(null);
                    }}
                    className="flex-1 sm:flex-initial px-5 py-2 bg-gray-100 hover:bg-gray-200 text-brand-charcoal text-xs font-bold rounded-xl transition-all cursor-pointer text-center"
                  >
                    Fechar
                  </button>
                  <button
                    onClick={() => {
                      downloadDocumentAsText(selectedDoc);
                      setSelectedDoc(null);
                    }}
                    className="flex-1 sm:flex-initial px-5 py-2 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer text-center"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Baixar TXT Oficial</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}

