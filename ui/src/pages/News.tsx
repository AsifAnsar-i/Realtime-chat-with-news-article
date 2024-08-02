import * as apiClient from "../api-client";
import NewsCard from "@/components/NewsCard";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import { Link } from "react-router-dom";
import PulseLoader from "@/components/PulseLoader";

interface NewsApiResponse {
  articles: apiClient.NewsArticle[];
}

const API_KEY = "4d2ab94760354bb39521841bc926e837#";
const BASE_URL = "https://newsapi.org/v2";

const News = () => {
  const [page, setPage] = useState<number>(1);
  const [news, setNews] = useState<NewsApiResponse | null>(null);
  const [flag, setFlag] = useState<boolean>(false);

  const fetchTopHeadlines = async (
    country: string = "us"
  ): Promise<NewsApiResponse> => {
    try {
      const response = await fetch(
        `${BASE_URL}/top-headlines?country=${country}&apiKey=${API_KEY}`
      );
      const data = await response.json();
      setNews(data);
      return data;
    } catch (error) {
      console.error("Error fetching top headlines:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchTopHeadlines();
  }, [flag]);

  const allNews = news?.articles || [];

  const pages = Math.ceil(allNews.length / 8);

  const startIndex = (page - 1) * 8;
  const endIndex = startIndex + 8;

  const paginatedNews = allNews.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col gap-6 z-40 ">
      <Link to="/saved-article">
        <button
          onClick={() => setFlag(!flag)}
          className="bg-[#60269e] text-white px-4 py-2 rounded"
        >
         Saved Article
        </button>
      </Link>
      <div className="flex flex-col items-center justify-center mx-auto gap-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-4">
          {paginatedNews.length === 0 ? (
            <div className="w-screen flex items-center justify-center -mt-60 -ml-10  lg:-ml-2">
              <PulseLoader />
            </div>
          ) : (
            paginatedNews?.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))
          )}
        </div>
        <div className="">
          <Pagination
            page={page}
            pages={pages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      </div>
    </div>
  );
};

export default News;
