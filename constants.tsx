import React from "react";
import { NavItem, ServiceItem, PartnerLogo, BlogPost, Step } from "./types";

export const NAV_ITEMS: NavItem[] = [
  { label: "What We Do", href: "#what-we-do" },
  { label: "Partnerships", href: "#partnerships" },
  { label: "About 360", href: "#about" },
  { label: "Blog", href: "#blog" },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "business",
    title: "Business Coaching",
    description:
      "Strategic planning and operational optimization for sustainable growth.",
    details: [
      "Operational Systems",
      "Revenue Growth Strategies",
      "Leadership Alignment",
    ],
    icon: "📊",
    color: "from-blue-500/20 to-blue-600/20",
  },
  {
    id: "career",
    title: "Career Coaching",
    description:
      "Level up your professional journey with actionable pathfinding.",
    details: [
      "Executive Presence",
      "Career Trajectory Analysis",
      "Hiring Skills",
    ],
    icon: "🚀",
    color: "from-orange-500/20 to-orange-600/20",
  },
  {
    id: "life",
    title: "Life Coaching",
    description:
      "Personal development focused on balance, purpose, and legacy.",
    details: [
      "Work-Life Integration",
      "Personal Fulfillment",
      "Decision Making",
    ],
    icon: "🌱",
    color: "from-teal-500/20 to-teal-600/20",
  },
];

export const STEPS: Step[] = [
  {
    number: 1,
    title: "Consult",
    description: "Schedule your complimentary 30 minute consult.",
    icon: "📅",
  },
  {
    number: 2,
    title: "Assess",
    description: "We identify core bottlenecks and performance gaps.",
    icon: "🔍",
  },
  {
    number: 3,
    title: "Execute",
    description: "A custom action plan is formulated and deployed.",
    icon: "⚡",
  },
];

export const PARTNERS: PartnerLogo[] = [
  {
    name: "PT Biz",
    url: "https://360-consulting-solutions-johnlicata.surge.sh/images/logo-ptbiz-color.jpg",
  },
  {
    name: "Holo Footwear",
    url: "https://360-consulting-solutions-johnlicata.surge.sh/images/logo-holo-new.png",
  },
  {
    name: "Sneaker Impact",
    url: "https://360-consulting-solutions-johnlicata.surge.sh/images/logo-sneaker-impact-new.png",
  },
  {
    name: "Walmart",
    url: "https://360-consulting-solutions-johnlicata.surge.sh/images/logo-walmart-new.png",
  },
  {
    name: "Target",
    url: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Target_logo.svg",
  },
  {
    name: "NBA",
    url: "https://360-consulting-solutions-johnlicata.surge.sh/images/logo-nba-color.png",
  },
  {
    name: "WNBA",
    url: "https://360-consulting-solutions-johnlicata.surge.sh/images/logo-wnba-color.png",
  },
  {
    name: "Nordstrom",
    url: "https://360-consulting-solutions-johnlicata.surge.sh/images/logo-nordstrom.png",
  },
  {
    name: "Finish Line",
    url: "https://360-consulting-solutions-johnlicata.surge.sh/images/logo-finishline-new.png",
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "THE ART OF EXECUTIVE FOCUS",
    excerpt: "How to manage 50+ hours while building a legacy.",
    date: "Dec 12, 2025",
    tag: "Leadership",
    image: "https://picsum.photos/seed/blog1/400/250",
  },
  {
    id: 2,
    title: "STRATEGIC PARTNERSHIPS 101",
    excerpt: "Why alignment matters more than exposure.",
    date: "Dec 05, 2025",
    tag: "Business",
    image: "https://picsum.photos/seed/blog2/400/250",
  },
  {
    id: 3,
    title: "BEYOND THE FOOTWEAR INDUSTRY",
    excerpt: "Applying 30 years of retail logic to life coaching.",
    date: "Nov 28, 2025",
    tag: "Personal",
    image: "https://picsum.photos/seed/blog3/400/250",
  },
];
