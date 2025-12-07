export interface EducationalTopic {
  id: string;
  title: string;
  icon: string;
  content: string;
  summary: string;
}

export interface SimulationResult {
  month: number;
  invested: number;
  interest: number;
  total: number;
}

export enum Sender {
  USER = 'user',
  AI = 'ai'
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
  isLoading?: boolean;
}