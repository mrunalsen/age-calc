export interface BubbleBackgroundOption {
  id: string;
  label: string;
  from: string;
  to: string;
}

export const BUBBLE_BACKGROUNDS: BubbleBackgroundOption[] = [
  { id: 'violet', label: 'Violet', from: '#8f94fb', to: '#4e54c8' },
  { id: 'sunset', label: 'Sunset', from: '#f83600', to: '#f9d423' },
  { id: 'ocean', label: 'Ocean', from: '#2193b0', to: '#6dd5ed' },
  { id: 'rose', label: 'Rose', from: '#f43f5e', to: '#be123c' },
  { id: 'forest', label: 'Forest', from: '#11998e', to: '#38ef7d' },
  { id: 'midnight', label: 'Midnight', from: '#0f2027', to: '#2c5364' },
];
