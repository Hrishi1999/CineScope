import News from "@/common/News";
import { NewsManagementState } from "./NewsManagementEnum";

export default class MovieMagementService {
  API_URL = import.meta.env.VITE_API_URL;

  async addNews(news: News) {
    const response = await fetch(`${this.API_URL}/news/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(news)
    });
    if (response.status === 200) {
      return NewsManagementState.NewsAddSuccess;
    } else {
      return NewsManagementState.NewsAddFailure;
    }
  }

  async deleteNewsByID(newsId: any) {
    const response = await fetch(`${this.API_URL}/news/${newsId}`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      return NewsManagementState.NewsDeleteSuccess;

    } else {
      return NewsManagementState.NewsDeleteFailure;
    }
  }

  async updateNewsByID(newsId: any, news: News) {
    const response = await fetch(`${this.API_URL}/news/${newsId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(news),
    });
    if (response.status === 200) {
      return NewsManagementState.NewsUpdateSuccess;
    } else {
      return NewsManagementState.NewsUpdateFailure;
    }
  }

  async fetchAllNews() {
    const response = await fetch(`${this.API_URL}/news/latestNews/`, {
      method: "GET",
    });
    if (response.status === 200) {
      const body = await response.json();
      return body;
    } else { 
      return null;
    }
  }
  
  async fetchNewsByID(newsId: any) {
    const response = await fetch(`${this.API_URL}/news/${newsId}`, {
      method: "GET",
    });
    if (response.status === 200) {
      const body = await response.json();
      return body;
    } else {
      return null;
    }
  }
}
