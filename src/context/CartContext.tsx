import React, { useState, useEffect } from 'react';
import type { CartItem } from '../types';
import { buildCartWhatsAppUrl } from '../services/whatsappService';
import { CartContext } from './cartStore';
const LOCAL_STORAGE_KEY = 'amk_bouquets_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to parse cart from localStorage', e);
    }
    return [];
  });

  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);
  const clearToast = () => setToastMessage(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  const addToCart = (newItem: Omit<CartItem, 'id'>) => {
    const id = `${newItem.bouquetId || newItem.name}-${newItem.rosesCount || ''}-${newItem.colorName || ''}-${(newItem.selectedOptions || []).sort().join(',')}-${newItem.customRibbonText || ''}`;
    
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((it) => it.id === id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      }
      return [...prevItems, { ...newItem, id }];
    });

    showToast(`« ${newItem.name} » ajouté au panier`);
    setIsOpen(true);
  };

  const removeFromCart = (index: number) => {
    setItems((prevItems) => {
      const removed = prevItems[index];
      if (removed) {
        showToast(`Article retiré du panier`);
      }
      return prevItems.filter((_, i) => i !== index);
    });
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setItems((prevItems) => {
      const updated = [...prevItems];
      if (updated[index]) {
        updated[index] = { ...updated[index], quantity };
      }
      return updated;
    });
  };

  const clearCart = () => {
    setItems([]);
    showToast('Panier vidé');
  };

  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const checkoutWhatsApp = () => {
    if (items.length === 0) {
      alert('Votre panier est vide.');
      return;
    }
    const url = buildCartWhatsAppUrl(items);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        totalCount,
        checkoutWhatsApp,
        toastMessage,
        clearToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
