import NewsCard from "@/components/NewsCard";
import Pagination from "@/components/Pagination";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import * as apiClient from "../api-client";
import PulseLoader from "@/components/PulseLoader";

const SavedArticle = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const targetPath = "/saved-article";
  const check = currentPath === targetPath;

  const [paginatedSavedNews, setPaginatedSavedNews] = useState<
    apiClient.NewsArticle[]
  >([]);
  const [page, setPage] = useState<number>(1);

  // Fetch articles
  const fetchArticle = async () => {
    try {
      const response = await apiClient.fetchNewsArticles();
      setPaginatedSavedNews(response);
    } catch (error) {
      console.error("Error fetching articles: ", error);
    }
  };

  const pages = Math.ceil(paginatedSavedNews.length / 8);
  const startIndex = (page - 1) * 8;
  const endIndex = startIndex + 8;
  const paginatedNews = paginatedSavedNews.slice(startIndex, endIndex);

  useEffect(() => {
    if (check) {
      fetchArticle();
    }
  }, [check]);

  useEffect(() => {
    setPage(1);
  }, [paginatedSavedNews]);

  return (
    <div className="flex flex-col gap-6 z-40 ">
      <h2>
        <Link to="/news">
          <button className="bg-[#60269e] text-white px-4 py-2 rounded">
            Back to News
          </button>
        </Link>
      </h2>
      <div className="flex flex-col items-center justify-center mx-auto gap-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-4">
          {paginatedNews.length === 0 ? (
            <div className="w-screen flex items-center justify-center -mt-60 -ml-10  lg:-ml-2">
              <PulseLoader />
            </div>
          ) : (
            paginatedNews.length === 0 &&
            paginatedSavedNews?.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))
          )}
          {paginatedNews.length > 0 &&
            paginatedNews?.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
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

export default SavedArticle;
