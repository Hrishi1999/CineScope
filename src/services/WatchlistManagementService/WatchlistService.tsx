/**
 * @author Harsh Kamleshbhai Shah <shah.harsh@dal.ca>
 */
import { WatchlistState } from "./WatchlistEnum";

export default class WatchlistService {
  API_URL = import.meta.env.VITE_API_URL;

  async addToWatchlist(userId: string, movieId: string, status: string) {
    const response = await fetch(`${this.API_URL}/watchlist/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, movieId, status }),
    });
    // const body = await response.json();

    if (response.status === 200) {
      return WatchlistState.AddMovieSuccess;
    } else {
      if (response.status === 500) {
        return WatchlistState.MovieAlreadyExistsInWatchlist;
      }
      return WatchlistState.AddMovieFailed;
    }
  }

  async removeFromWatchlist(userId: string, movieId: string) {
    const response = await fetch(`${this.API_URL}/watchlist/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, movieId }),
    });
    if (response.status === 200) {
      return WatchlistState.RemoveMovieSuccess;
    } else {
      if (response.status === 500) {
        return WatchlistState.RemoveMovieFailure;
      }
      return WatchlistState.SystemError;
    }
  }

  async updateWatchlist(userId: string, movieId: string, status: string) {
    const response = await fetch(`${this.API_URL}/watchlist/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, movieId, status }),
    });
    const body = await response.json();
    let m = body.message;

    if (response.status === 200) {
      return WatchlistState.UpdateMovieSuccess;
    } else {
      if (response.status === 500) {
        return WatchlistState.UpdateMovieFailure;
      }
      return WatchlistState.SystemError;
    }
  }

  async getWatchlist(userId: string) {
    const response = await fetch(`${this.API_URL}/watchlist/${userId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const body = await response.json();
      return body;
    } else {
      return WatchlistState.SystemError;
    }
  }

  async clearWatchlist(userId: string) {
    const response = await fetch(`${this.API_URL}/watchlist/${userId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return WatchlistState.ClearWatchlistSuccess;
    } else {
      return WatchlistState.SystemError;
    }
  }
}
