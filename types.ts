export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  level: string;
  image: string;
  type: 'video' | 'game' | 'live';
  rating: number;
}

export interface Review {
  id: number;
  name: string;
  role: string; // e.g., Student, Parent
  comment: string;
  rating: number;
  avatar: string;
  response?: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}