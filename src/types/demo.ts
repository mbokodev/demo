export type DemoTheme = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
};

export type DemoSection = {
  id: string;
  eyebrow?: string;
  title: string;
  body?: string;
  items?: Array<{ title: string; text: string; image?: string }>;
};

export type DemoConfig = {
  slug: string;
  companyName: string;
  industry: string;
  location: string;
  logo?: string;
  images?: Record<string, string>;
  contact?: { phone?: string; email?: string; address?: string };
  theme: DemoTheme;
  hero: { eyebrow?: string; title: string; text: string; primaryCta: { label: string; href: string }; secondaryCta?: { label: string; href: string } };
  sections: DemoSection[];
  disclaimer?: { enabled: boolean; message?: string };
  status?: "active" | "disabled" | "expired";
  expiresAt?: string;
};
