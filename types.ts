export interface MemoryPhoto {
  id: string;
  title: string;
  date: string;
  location: string;
  imageUrl: string;
  caption: string;
  backNote: string;
  category: 'dates' | 'cozy' | 'trips' | 'milestones' | 'favorites';
  isFavorite?: boolean;
  stickers?: string[];
}

export interface FlowerItem {
  id: string;
  name: string;
  koreanName?: string;
  meaning: string;
  color: string;
  svgType: 'tulip' | 'rose' | 'cherry' | 'peony' | 'daisy' | 'sunflower' | 'babysbreath' | 'strawberry' | 'kittybow';
  priceDesc?: string;
}

export interface BouquetGift {
  id: string;
  title: string;
  recipientName: string;
  senderName: string;
  date: string;
  wrappingStyle: 'pink-gingham' | 'lavender-dots' | 'cream-silk' | 'strawberry-delight' | 'classic-kraft';
  ribbonColor: string;
  flowers: { flowerId: string; count: number; name: string; color: string; meaning: string }[];
  note: string;
  greetingCardTheme: 'kitty-classic' | 'pink-cloud' | 'sweet-strawberry' | 'golden-stars';
}

export interface DailyNote {
  id: string;
  date: string;
  title: string;
  content: string;
  author: string;
  stationery: 'pink-gingham' | 'strawberry' | 'pastel-yellow' | 'lavender' | 'mint';
  mood: 'loved' | 'grateful' | 'excited' | 'sweet' | 'forever';
  isPinned?: boolean;
  isDailyPrompt?: boolean;
}

export interface OpenWhenLetter {
  id: string;
  openWhen: string;
  teaser: string;
  content: string;
  sealedColor: string;
  icon: string;
  openedDate?: string;
}

export interface LoveReason {
  id: number;
  title: string;
  description: string;
  tag: string;
  icon: string;
}

export interface CoupleProfile {
  herName: string;
  hisName: string;
  relationshipStartDate: string; // YYYY-MM-DD
  herNickname: string;
  soundEnabled: boolean;
  ambientMusicPlaying: boolean;
}
