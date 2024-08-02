import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { UserType } from "./types";

const API_BASE_URL = "https://realtime-chat-with-news-article.onrender.com";

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  return response.json();
};

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};

export interface NewsApiResponse {
  status: string; // "ok" if request was successful
  totalResults: number; // Total number of results
  articles: NewsArticle[]; // Array of articles
}

export interface NewsSource {
  id: string | null; // `null` if no ID is provided
  name: string; // Source name
}

export interface NewsArticle {
  source: NewsSource; // Source of the news
  author: string | null; // Author of the article
  title: string; // Title of the article
  description: string | null; // Description of the article
  url: string; // URL of the article
  urlToImage: string | null; // URL to an image related to the article
  publishedAt: string; // Publication date in ISO 8601 format
  content: string | null; // Content of the article
}

// const queryParams = new URLSearchParams();
// queryParams.append("country", "us");
// queryParams.append("apiKey", API_KEY);
// export const fetchTopHeadlines = async (country: string = "us"):Promise<NewsApiResponse> => {
//   try {
//     const response = await fetch(`${BASE_URL}/top-headlines?${queryParams}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching top headlines:", error);
//     throw error;
//   }
// };

export type messageDataProps = {
  username: string;
  content: string;
};

export const addMessageData = async (messageData: messageDataProps) => {
  const response = await fetch(`${API_BASE_URL}/api/message`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageData),
  });
  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const fetchMessageData = async (): Promise<messageDataProps[]> => {
  const response = await fetch(`${API_BASE_URL}/api/message`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching message");
  }
  return response.json();
};

export const addNewsArticle = async (article: NewsArticle) => {
  const response = await fetch(`${API_BASE_URL}/api/news`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  });

  if (!response.ok) {
    throw new Error("Failed to save article");
  }
};

export const fetchNewsArticles = async (): Promise<NewsArticle[]> => {
  const response = await fetch(`${API_BASE_URL}/api/news`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching news articles");
  }
  return response.json();
};
