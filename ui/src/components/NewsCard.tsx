import { NewsArticle } from "@/api-client";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";
import { useMutation } from "react-query";

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard = ({ article }: NewsCardProps) => {
  const { showToast, saveArticle } = useAppContext();

  const handleSaved = () => {
    mutation.mutate(article);
    saveArticle(article);
    showToast({ message: "Article Saved", type: "SUCCESS" });
  };

  const mutation = useMutation(apiClient.addNewsArticle, {
    onSuccess: async () => {
     
    },
    onError: () => {
      
    },
  });

  return (
    <div className="w-full max-w-xs sm:max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
      {article.urlToImage ? (
        <img
          className="w-full h-32 sm:h-48 object-cover"
          src={article.urlToImage}
          alt={article.title}
        />
      ) : (
        <img
          className="w-full h-32 sm:h-48 object-cover"
          src={
            "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt={article.title}
        />
      )}
      <div className="p-2 sm:p-4">
        <h2 className="text-sm sm:text-lg font-bold mb-2 truncate">
          {article.title}
        </h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-gray-500 text-xs sm:text-sm">
          <span className="truncate">Source: {article.source.name}</span>
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
        </div>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-2 text-[#60269e] text-xs sm:text-sm hover:underline truncate"
        >
          Read more
        </a>
      </div>
      <button
        className="w-full bg-[#60269e] text-white px-3 py-2 rounded text-xs sm:text-base"
        onClick={handleSaved}
      >
        Save Article
      </button>
    </div>
  );
};

export default NewsCard;
