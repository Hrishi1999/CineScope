import Movie from "@/common/Movie";
import { ReviewsManagementState } from "./ReviewsManagementEnum";

export default class ReviewsMagementService {
  static API_URL = import.meta.env.VITE_API_URL;

  static async getRating(movie: any) {
    const response = await fetch(
      `${ReviewsMagementService.API_URL}/reviews/ratings/${movie}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      const body = await response.json();
      return body;
    } else {
      return ReviewsManagementState.RatingNotPresent;
    }
  }

  static async getReview(movie: any) {
    const response = await fetch(
      `${ReviewsMagementService.API_URL}/reviews/${movie}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      const body = await response.json();
      return body;
    } else {
      return ReviewsManagementState.ReviewNotPresent;
    }
  }

  static async getReviewsByUserName(userName: any) {
    const response = await fetch(
      `${ReviewsMagementService.API_URL}/reviews/user/` + userName,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      const body = await response.json();
      return body;
    } else {
      return ReviewsManagementState.ReviewNotPresent;
    }
  }

  static async addRating(movie: any, userName: any, rating: any, movieId: any) {
    const response = await fetch(
      `${ReviewsMagementService.API_URL}/reviews/ratings/${movie}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          rating: rating,
          movieId: movieId,
        }),
      }
    );
    if (response.status === 200) {
      const body = await response.json();
      return body;
    } else {
      return ReviewsManagementState.RatingAddFailure;
    }
  }

  static async addReview(movie: any, userName: any, review: any, movieId: any) {
    console.log("movie+email", movie, userName, review, movieId);
    const response = await fetch(
      `${ReviewsMagementService.API_URL}/reviews/${movie}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          review: review,
          movieId: movieId,
        }),
      }
    );
    if (response.status === 200) {
      const body = await response.json();
      return body;
    } else {
      return ReviewsManagementState.ReviewsAddFailure;
    }
  }

  static async getRatingCountForMovie(movieId: any){
    const response = await fetch(`${ReviewsMagementService.API_URL}/reviews/count/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieId: movieId
      }),
    });
    if (response.status === 200) {
      const body = await response.json();
      return body;
    } else {
      return ReviewsManagementState.ReviewsFetchFailure;
    }
  }

  static async getCountForRate(movieId: any){
    const response = await fetch(`${ReviewsMagementService.API_URL}/reviews/rate-count/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieId: movieId
      }),
    });
    if (response.status === 200) {
      const body = await response.json();
      return body;
    } else {
      return ReviewsManagementState.ReviewsFetchFailure;
    }
  }

}
