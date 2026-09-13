export type Mode = 'demo' | 'live';
export interface Preset {
  id: string;
  label: string;
  cutoffDate: string;
  timePolicy: string;
  office: string;
  brief: string;
  editorialWarning: string;
}
export interface Source {
  id: string;
  title: string;
  documentDate: string;
  availableFrom: string;
  url: string;
  locator: string;
  kind: 'primary-transcript';
  review: string;
  excerpt: string;
  context: string;
}
export interface Quote {
  id: string;
  sourceId: string;
  original: string;
  koreanDraft: string;
  translationStatus: 'draft';
  isExcerpt: true;
}
export interface ActorOutput {
  paragraphs: string[];
  quoteIds: string[];
  sourceIds: string[];
  uncertainty: string;
}
export interface HistorianOutput {
  timeCheck: string;
  facts: string;
  interpretations: string;
  limitations: string;
  sourceIds: string[];
}
export interface Answer {
  mode: Mode;
  actor: ActorOutput;
  quotes: Array<Quote & { source: Source }>;
  sources: Source[];
  historian: HistorianOutput | null;
  historianStatus: 'available' | 'unavailable';
  model: string;
  promptVersion: string;
  sourceVersion: string;
  usage: { inputTokens: number; outputTokens: number };
}
export interface ChatSession {
  id: string;
  preset: Preset;
  mode: Mode;
  createdAt: string;
  expiresAt: string;
}
export type TurnState = 'pending' | 'complete' | 'failed' | 'blocked';
export interface Turn {
  id: string;
  seq: number;
  text: string;
  state: TurnState;
  answer: Answer | null;
  errorCode: string | null;
  createdAt: string;
}
export interface SessionView { session: ChatSession; turns: Turn[] }
export interface HistoryPair { user: string; model: string }
export interface Limits { globalDaily: number; ownerDaily: number; ownerMinute: number }
