import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoPage } from "@/components/demo/demo-page";
import { demos, getDemo } from "@/config/demos";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(demos).map((company) => ({ company }));
}

export async function generateMetadata({ params }: PageProps<"/[company]">): Promise<Metadata> {
  const { company } = await params;
  const demo = getDemo(company);
  if (!demo) return {};
  return { title: `${demo.companyName} — Concept de démonstration`, description: `Concept numérique non officiel réalisé pour ${demo.companyName}.`, robots: { index: false, follow: false, nocache: true } };
}

export default async function CompanyPage({ params }: PageProps<"/[company]">) {
  const { company } = await params;
  const demo = getDemo(company);
  if (!demo || demo.status === "disabled" || demo.status === "expired") notFound();
  return <DemoPage demo={demo} />;
}
