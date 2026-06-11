import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ReimaginedStats from './components/Stats';
import RightsExplorer from './components/RightsExplorer';
import RightsCalculator from './components/RightsCalculator';
import CitiesSection from './components/CitiesSection';
import DownloadsSection from './components/DownloadsSection';
import MandatoryRegistrations from './components/MandatoryRegistrations';
import FAQSection from './components/FAQSection';
import AssociationForm from './components/AssociationForm';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import { Associado } from './types';
import { Sparkles, ArrowDown, LogIn, CheckCircle } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [associadosTrigger, setAssociadosTrigger] = useState<Associado[]>([]);

  // Simple state trigger to make sure AdminPanel rerenders upon addition
  const handleAddNewMember = (newMember: Associado) => {
    setAssociadosTrigger(prev => [newMember, ...prev]);
  };

  const handleScrollToId = (id: string) => {
    setActiveSection(id);
    setIsAdminOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-brand-beige selection:bg-brand-red selection:text-white flex flex-col justify-between">
      {/* Navigation Header */}
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        isAdminOpen={isAdminOpen}
        setIsAdminOpen={setIsAdminOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {isAdminOpen ? (
          /* Specialized Administration Portal */
          <div className="animate-fadeIn min-h-[70vh]">
            <AdminPanel 
              associadosList={associadosTrigger} 
              onRefresh={() => setAssociadosTrigger([...associadosTrigger])} 
            />
          </div>
        ) : (
          /* Main Consumer Portal */
          <div className="flex flex-col">
            
            {/* Hero Banner Section */}
            <Hero onNavigate={handleScrollToId} />

            {/* Counter stats and categories list */}
            <ReimaginedStats />

            {/* Interactive Rights and benefits guide */}
            <RightsExplorer />

            {/* Labor calculation tool (Simulador Trabalhista) */}
            <RightsCalculator />

            {/* Searchable coverage towns list */}
            <CitiesSection />

            {/* Document center with simulated progressive downloads */}
            <DownloadsSection />

            {/* Mandatory Benefit registrations configuration */}
            <MandatoryRegistrations />

            {/* Interactive FAQs list focused on reducing customer support load */}
            <FAQSection />

            {/* Main Application Association Registration form */}
            <AssociationForm onSuccess={handleAddNewMember} />

          </div>
        )}
      </main>

      {/* Footer Area with legal, coordinates and contacts */}
      <Footer />

      {/* Floating Interactive AI Assistant (SinteBot) */}
      <ChatWidget />
    </div>
  );
}
