import mongoose from "mongoose";

const Schema = mongoose.Schema;

const news = new Schema({
  newsTitle: String,
  posterLink: String,
  fullArticle: String,
  year: String,
  movieName: String,
  genre: String
});

const News = mongoose.model("news", news);

export async function getNews() {
  try {
    const news = await News.find();
    return news;
  } catch (err) {
    throw err;
  }
}

export async function getNewsById(id: string) {
  try {
    const news = await News.findById(id);
    return news;
  } catch (err) {
    throw err;
  }
}

export async function createNews(
  newsTitle: String,
  posterLink: String,
  fullArticle: String,
  year: String,
  movieName: String,
  genre: [String]
) {
  if (
    newsTitle === undefined ||
    posterLink === undefined ||
    fullArticle === undefined ||
    genre === undefined ||
    year === "" ||
    movieName === ""
  ) {
    throw "Missing parameters";
  }

  const news = await getNews();
  if (news.some((article) => article.newsTitle === newsTitle)) {
    throw "News already exists";
  }

  const newNews = new News({
    newsTitle: newsTitle,
    posterLink: posterLink,
    fullArticle: fullArticle,
    year: year,
    movieName: movieName,
    genre: genre
  });
  try {
    await newNews.save();
  } catch (err) {
    throw err;
  }
}

export async function updateNews(newsID: String) {
  if (newsID === undefined) {
    throw "Oi! You forgot to pass an NewsID!";
  }

  const usr = await News.find({ email: newsID }).updateOne(news);
  return usr;
}

export async function deleteNews(newsID: String) {
  if (newsID === undefined) {
    throw "Oi! You forgot to pass the NewsID!";
  }

  const response = await News.deleteOne({ email: newsID });

  console.log(response);
  if (response.deletedCount === 0) {
    throw "News not found";
  }
}

export default mongoose.model("news", news);
