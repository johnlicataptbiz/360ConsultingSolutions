
import type { ReactNode } from 'react';

export interface AnalysisResult {
  strategy: string;
  operations: string;
  growth: string;
  summary: string;
}

export enum SectionId {
  Process = 'process',
  Contact = 'contact'
}

export interface NavItem {
  label: string;
  href: string;
  isNew?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  details: string[];
  icon: ReactNode;
  color: string;
}

export interface PartnerLogo {
  name: string;
  url: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  tag: string;
  image: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
  icon: ReactNode;
}
