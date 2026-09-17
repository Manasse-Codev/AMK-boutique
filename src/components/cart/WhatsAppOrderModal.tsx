import React, { useEffect } from 'react';
import type { CartItem } from '../../types';
import { WhatsAppOrderCard } from './WhatsAppOrderCard';

interface WhatsAppOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
}

export const WhatsAppOrderModal: React.FC<WhatsAppOrderModalProps> = ({
  isOpen,
  onClose,
  items,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 md:p-6 animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-brand-espresso/70 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog Content */}
      <div className="relative z-10 w-full max-w-2xl my-8">
        <WhatsAppOrderCard items={items} onClose={onClose} showControls={true} />
      </div>
    </div>
  );
};
