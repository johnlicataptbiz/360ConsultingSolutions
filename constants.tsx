
import React from 'react';
import { NavItem, ServiceItem, PartnerLogo, BlogPost, Step } from './types';
import { BarChart3, Briefcase, Compass, Calendar, Search, Zap } from 'lucide-react';

export const NAV_ITEMS: NavItem[] = [
  { label: 'What We Do', href: '#what-we-do' },
  { label: 'AI Strategist', href: '#ai-strategist', isNew: true },
  { label: 'Partnerships', href: '#partnerships' },
  { label: 'About 360', href: '#about' },
  { label: 'Resources', href: '#resources' },
  { label: 'Blog', href: '#blog' }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'business',
    title: 'Business Coaching',
    description: 'Strategic planning and operational optimization for sustainable growth.',
    details: ['Operational Systems', 'Revenue Growth Strategies', 'Leadership Alignment'],
    icon: <BarChart3 size={32} />,
    color: 'from-blue-500/20 to-blue-600/20'
  },
  {
    id: 'career',
    title: 'Career Coaching',
    description: 'Level up your professional journey with actionable pathfinding.',
    details: ['Executive Presence', 'Career Trajectory Analysis', 'Hiring Skills'],
    icon: <Briefcase size={32} />,
    color: 'from-#FF7A3D/20 to-#FF5C00/20'
  },
  {
    id: 'life',
    title: 'Life Coaching',
    description: 'Personal development focused on balance, purpose, and legacy.',
    details: ['Work-Life Integration', 'Personal Fulfillment', 'Decision Making'],
    icon: <Compass size={32} />,
    color: 'from-teal-500/20 to-teal-600/20'
  }
];

export const STEPS: Step[] = [
  {
    number: 1,
    title: 'Consult',
    description: 'Schedule your complimentary 45 minute consult.',
    icon: <Calendar size={24} />
  },
  {
    number: 2,
    title: 'Assess',
    description: 'We identify core bottlenecks and performance gaps.',
    icon: <Search size={24} />
  },
  {
    number: 3,
    title: 'Execute',
    description: 'A custom action plan is formulated and deployed.',
    icon: <Zap size={24} />
  }
];

export const PARTNERS: PartnerLogo[] = [
  {
    name: 'PT Biz',
    url: '/images/logo-ptbiz-color.jpg'
  },
  {
    name: 'Holo Footwear',
    url: '/images/logo-holo-new.png'
  },
  {
    name: 'Sneaker Impact',
    url: '/images/logo-sneaker-impact-new.png'
  },
  {
    name: 'Walmart',
    url: '/images/logo-walmart-new.png'
  },
  {
    name: 'Target',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Target_logo.svg'
  },
  {
    name: 'NBA',
    url: '/images/logo-nba-color.png'
  },
  {
    name: 'WNBA',
    url: '/images/logo-wnba-color.png'
  },
  {
    name: 'Nordstrom',
    url: '/images/logo-nordstrom.png'
  },
  {
    name: 'Finish Line',
    url: '/images/logo-finishline-new.png'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'The Art of Executive Focus',
    excerpt: 'How to manage 50+ hours while building a legacy.',
    date: 'Dec 12, 2025',
    tag: 'Leadership',
    image: 'https://picsum.photos/seed/blog1/400/250'
  },
  {
    id: 2,
    title: 'Strategic Partnerships 101',
    excerpt: 'Why alignment matters more than exposure.',
    date: 'Dec 05, 2025',
    tag: 'Business',
    image: 'https://picsum.photos/seed/blog2/400/250'
  },
  {
    id: 3,
    title: 'Beyond the Footwear Industry',
    excerpt: 'Applying 30 years of retail logic to life coaching.',
    date: 'Nov 28, 2025',
    tag: 'Personal',
    image: 'https://picsum.photos/seed/blog3/400/250'
  }
];
