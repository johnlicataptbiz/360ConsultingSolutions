
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
    color: 'from-[#FF7A3D]/20 to-[#FF5C00]/20'
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
  },
  {
    name: 'Shopify',
    url: '/images/logo-shopify.png'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'How to Scale to $100M+',
    excerpt: 'The jump to nine figures isn\'t about working harder. It\'s about removing yourself as the constraint.',
    date: 'Dec 15, 2025',
    tag: 'Business',
    image: '/images/john-conference-room.jpg'
  },
  {
    id: 2,
    title: 'The Role of Executive Presence',
    excerpt: 'Talent opens doors. Executive presence decides how far you walk through them.',
    date: 'Dec 08, 2025',
    tag: 'Leadership',
    image: '/images/john-suit.jpg'
  },
  {
    id: 3,
    title: 'Winning Without Losing',
    excerpt: 'Success that costs you your family is deferred regret. Learn the integration framework.',
    date: 'Dec 01, 2025',
    tag: 'Personal',
    image: '/images/john-beach.jpg'
  },
  {
    id: 4,
    title: 'Revenue Growth Fundamentals',
    excerpt: 'Growth hides in fundamentals: pricing clarity, positioning, and retention.',
    date: 'Nov 24, 2025',
    tag: 'Business',
    image: '/images/john-final.png'
  },
  {
    id: 5,
    title: 'The Art of Executive Focus',
    excerpt: 'Manage 50+ hour weeks effectively through strategic elimination and impact mapping.',
    date: 'Nov 17, 2025',
    tag: 'Leadership',
    image: '/images/john-office-premium.jpg'
  },
  {
    id: 6,
    title: 'Legacy Building Logic',
    excerpt: 'Building a lasting impact through the integration of family and career values.',
    date: 'Nov 10, 2025',
    tag: 'Personal',
    image: '/images/john-family-final.jpg'
  }
];
