import { 
  Box, 
  HeartHandshake, 
  MessageCircle, 
  Mic, 
  Send, 
  Smile, 
  Tags, 
  TrendingUp 
} from 'lucide-react';

// Centralized icon mapping for the entire application
export const ICONS = {
  Box,
  HeartHandshake,
  MessageCircle,
  Mic,
  Send,
  Smile,
  Tags,
  TrendingUp
};

export const MOCK_APPS = [
    {
    id: '1',
    path: 'voice-to-insights',
    name: 'Voice 2 Insights',
    description: 'Trasforma le tue conversazioni in insight strategici per decisioni rapide!',
    version: 'v2.0',
    status: 'active',
    iconName: 'Mic',
    imageName: 'voice-to-insights.jpg',
    category: 'Analytics'
  },
  {
    id: '2',
    path: 'waq',
    name: 'WAQ',
    description: 'Offri assistenza clienti immediata 24/7 via WhatsApp, riducendo il carico del tuo team!',
    version: 'v1.5',
    status: 'active',
    iconName: 'MessageCircle',
    imageName: 'waq.jpg',
    category: 'Customer Service'
  },
  {
    id: '3',
    path: 'smart-pricing',
    name: 'Smart Pricing',
    description: "Ottimizza i prezzi in tempo reale con l'AI, massimizzando margini e competitività!",
    version: 'v3.0',
    status: 'beta',
    iconName: 'Tags',
    imageName: 'smart-pricing.avif',
    category: 'Sales'
  },
  {
    id: '4',
    path: 'stay-on',
    name: 'Stay On',
    description: 'Prevedi l\'abbandono dei clienti e attiva strategie di fidelizzazione mirate per aumentare la retention!',
    version: 'v2.2',
    status: 'active',
    iconName: 'HeartHandshake',
    imageName: 'stay-on.avif',
    category: 'Retention'
  },
  {
    id: '5',
    path: 'sentiment',
    name: 'Sentiment',
    description: 'Monitora la reputazione del tuo brand analizzando il sentiment di clienti e utenti su recensioni e social!',
    version: 'v4.0',
    status: 'active',
    iconName: 'Smile',
    imageName: 'sentiment.jpg',
    category: 'Marketing'
  },
  {
    id: '6',
    path: 'sales-predict',
    name: 'Sales Predict',
    description: 'Anticipa i trend di vendita con previsioni accurate, ottimizza e pianifica strategie commerciali!',
    version: 'v1.8',
    status: 'active',
    iconName: 'TrendingUp',
    imageName: 'img-placeholder.webp',
    category: 'Forecast'
  },
  {
    id: '7',
    path: 'wap',
    name: 'WAP',
    description: "Automatizza l\'invio di report e documenti via WhatsApp, comunica dati e informazioni in tempo reale!",
    version: 'v1.2',
    status: 'active',
    iconName: 'Send',
    imageName: 'wap.jpg',
    category: 'Automation'
  }
];
