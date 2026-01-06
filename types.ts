
export interface Prompt {
  text: string;
  desc: string;
}

export interface Genre {
  id: number;
  name: string;
  category: 'Standard' | 'K-POP';
  desc: string;
  attr: number[];
  tags: string[];
  prompts: Prompt[];
}
