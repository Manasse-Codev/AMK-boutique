import React, { useState } from 'react';
import type { CustomOrderRequest } from '../../types';
import { buildCustomRequestWhatsAppUrl } from '../../services/whatsappService';

export const CustomOrderSection: React.FC = () => {
  const [formData, setFormData] = useState<CustomOrderRequest>({
    name: '',
    phone: '',
    occasion: 'Anniversaire',
    budget: '10 000 - 20 000 FCFA',
    location: '',
    details: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildCustomRequestWhatsAppUrl(formData);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="sur-mesure" className="py-24 border-b border-brand-border/70 bg-brand-sand/20">
      <div className="max-w-[1580px] mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5">
            <span className="badge-pill text-brand-caramel font-bold block mb-3">Service Haute Façon</span>
            <h2 className="font-serif text-huge text-brand-espresso leading-[0.88]">
              VOTRE<br />
              BOUQUET.<br />
              <span className="font-serif-italic font-light text-brand-caramel">VOTRE</span><br />
              HISTOIRE.
            </h2>
            <p className="text-sm md:text-base text-brand-charcoal mt-6 leading-relaxed font-light max-w-md">
              Chaque relation a ses nuances, ses souvenirs et ses couleurs. Chez AMK Bouquets, nous donnons vie à vos idées les plus précises : du choix du satin à l'assemblage de perles et de broderies délicates.
            </p>

            <div className="mt-8 space-y-4 text-xs tracking-wider">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-brand-caramel/20 text-brand-caramel flex items-center justify-center font-bold">✓</span>
                <span>Choix illimité des couleurs de satin</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-brand-caramel/20 text-brand-caramel flex items-center justify-center font-bold">✓</span>
                <span>Inclusion de peluches, couronnes, papillons & diamants synthétiques</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-brand-caramel/20 text-brand-caramel flex items-center justify-center font-bold">✓</span>
                <span>Adapté à tous les budgets (à partir de 5 000 FCFA)</span>
              </div>
            </div>
          </div>

          {/* Custom Request Form */}
          <div className="lg:col-span-7 bg-brand-cream border border-brand-border p-8 md:p-12 shadow-sm">
            <h3 className="font-serif text-2xl text-brand-espresso mb-6">Demande de Création Personnalisée</h3>
            
            <form id="customForm" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-brand-espresso mb-2">
                    Votre Nom & Prénoms
                  </label>
                  <input
                    type="text"
                    id="custName"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Awa Koné"
                    className="w-full bg-brand-sand/30 border border-brand-border text-xs px-4 py-3 text-brand-espresso focus:border-brand-caramel focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-brand-espresso mb-2">
                    Téléphone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="custPhone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+225 07..."
                    className="w-full bg-brand-sand/30 border border-brand-border text-xs px-4 py-3 text-brand-espresso focus:border-brand-caramel focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-brand-espresso mb-2">
                    Occasion
                  </label>
                  <select
                    id="custOccasion"
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full bg-brand-sand/30 border border-brand-border text-xs px-3 py-3 text-brand-espresso focus:border-brand-caramel focus:outline-none"
                  >
                    <option>Anniversaire</option>
                    <option>Déclaration d'Amour</option>
                    <option>Fiançailles / Mariage</option>
                    <option>Remerciement</option>
                    <option>Autre événement</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-brand-espresso mb-2">
                    Budget souhaité (FCFA)
                  </label>
                  <select
                    id="custBudget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-brand-sand/30 border border-brand-border text-xs px-3 py-3 text-brand-espresso focus:border-brand-caramel focus:outline-none"
                  >
                    <option>5 000 - 10 000 FCFA</option>
                    <option>10 000 - 20 000 FCFA</option>
                    <option>20 000 - 35 000 FCFA</option>
                    <option>+ 40 000 FCFA (Luxe)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-brand-espresso mb-2">
                    Lieu de livraison
                  </label>
                  <input
                    type="text"
                    id="custLocation"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Daloa (Quartier) / Autre ville"
                    className="w-full bg-brand-sand/30 border border-brand-border text-xs px-4 py-3 text-brand-espresso focus:border-brand-caramel focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-brand-espresso mb-2">
                  Couleurs préférées & détails spécifiques
                </label>
                <textarea
                  id="custDetails"
                  rows={3}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Précisez les couleurs souhaitées (ex: bleu ciel et blanc nacré), présence de papillons dorés, date de livraison souhaitée..."
                  className="w-full bg-brand-sand/30 border border-brand-border text-xs p-4 text-brand-espresso focus:border-brand-caramel focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-espresso hover:bg-brand-caramel text-brand-cream py-4 px-8 text-xs font-semibold tracking-[0.22em] uppercase transition duration-300 flex items-center justify-center gap-3 shadow-sm"
              >
                <span>Demander une création sur WhatsApp</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
};
