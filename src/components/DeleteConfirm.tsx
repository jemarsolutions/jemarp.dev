"use client";

import { useEffect } from "react";

export default function DeleteConfirm() {
  useEffect(() => {
    const forms = Array.from(document.querySelectorAll('form[data-confirm]')) as HTMLFormElement[];
    const listeners: { f: HTMLFormElement; l: (e: Event) => void }[] = [];

    forms.forEach((f) => {
      const l = (e: Event) => {
        const msg = f.getAttribute('data-confirm-message') || (f.getAttribute('data-confirm') as string) ||
          'Are you sure you want to delete this item? This action cannot be undone.';
        if (!confirm(msg)) {
          e.preventDefault();
        }
      };
      f.addEventListener('submit', l);
      listeners.push({ f, l });
    });

    return () => {
      listeners.forEach(({ f, l }) => f.removeEventListener('submit', l));
    };
  }, []);

  return null;
}
