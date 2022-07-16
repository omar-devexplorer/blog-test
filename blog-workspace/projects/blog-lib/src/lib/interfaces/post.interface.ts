export interface Post {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  timestamp?: string;
  author?: Author;
  comments?: PostComment[];
}

export interface Author {
  id: number;
  username: string;
}

export interface PostComment {
  id: number;
  respondsTo: RespondsTo | null;
  author: {
    id: number;
    username: string;
  };
  timestamp: string;
  content: string;
  children?: any[];
}

export interface RespondsTo {
  id: number;
}
