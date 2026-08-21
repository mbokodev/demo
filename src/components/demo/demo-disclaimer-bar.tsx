"use client";

import { useEffect, useRef } from "react";
import styles from "./demo-disclaimer-bar.module.css";

export function DemoDisclaimerBar({ companyName, detailText }: { companyName: string; detailText?: string }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function closeOnOutsideClick(event: PointerEvent) {
      const details = detailsRef.current;
      if (details?.open && !details.contains(event.target as Node)) details.open = false;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && detailsRef.current?.open) {
        detailsRef.current.open = false;
        detailsRef.current.querySelector("summary")?.focus();
      }
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <aside className={styles.bar} aria-label="Avertissement de démonstration">
      <div className={styles.inner}>
        <div className={styles.copy}><strong>Concept de démonstration — non officiel</strong></div>
        <div className={styles.links}>
          <details ref={detailsRef}><summary>À propos de cette démo</summary><div className={styles.popover}>{detailText ?? <>Cette page est un concept indépendant réalisé à des fins de démonstration et de prospection. Elle ne représente pas le site officiel de {companyName} et n’implique aucune collaboration ou approbation de l’entreprise.</>}</div></details>
          <a href="https://www.cedricnampa.com/">cedricnampa.com</a>
        </div>
      </div>
    </aside>
  );
}
