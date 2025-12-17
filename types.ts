
export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  details: string[];
  icon: string;
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
  icon: string;
}
