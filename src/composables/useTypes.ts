
export interface BlogCardInfo {
  id: number;
  topicName: string;
  authorName: string;
  createdAt: string;
  url: string;
  title: string;
  metaText: string;
}

export interface Comment {
  id: number;
  createdAt: string;
  name: string;
  content: string;
}

export interface Blog {
  id: number;
  topic: Topic;
  authorName: string;
  createdAt: string;
  lastModified: string;
  url: string;
  title: string;
  content: string;
  metaText: string;
  comments: Comment[];
}

export interface BlogDraft {
  id: number;
  topicName: string;
  title: string;
}

export interface Topic {
  id: number;
  name: string;
}

export interface InterviewQ {
  id: number;
  topicName: string;
  createdAt: string;
  question: string;
  answer: string;
}

export interface InterviewQDraft {
  id: number;
  topicName: string;
  question: string;
}

export interface AllContent {
  newsInterests: BlogCardInfo[];
  latest4Blogs: BlogCardInfo[];
  latest3InterviewQuestion: InterviewQ[]
}


