export interface Message {
  id: string;
  className?: string;
}

export type Sender = "user" | "bot";

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  createdAt: number;
}
