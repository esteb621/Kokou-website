export type Article = {
  id?: string;
  slug: string;
  title: string;
  content: string;
  cover: string | null;
  posted?: boolean;
  created_at: string;
  updated_at?: string;
};

export type Config = {
  hero: {
    section: string;
    title: string;
    description: string;
  };
  socials: Record<string, {
    label: string;
    url: string;
    icon: string;
    _deleted?: boolean;
  }>;
  skills: {
    label: string;
    icon: string;
    detail: string;
    _deleted?: boolean;
  }[];
  products: {
    avatars: {
      priority: number;
      title: string;
      description: string;
      image: string;
      link: string;
      review: string;
      price: string;
      _deleted?: boolean;
    }[];
    assets: {
      priority: number;
      title: string;
      description: string;
      image: string;
      link: string;
      review: string;
      price: string;
      _deleted?: boolean;
    }[];
  };
};

export type Colors = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text_primary: string;
  text_secondary: string;
  "bg-gradient-1": string;
  "bg-gradient-2": string;
  "bg-gradient-3": string;
};