import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { UserType } from "@/types";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  article: apiClient.NewsArticle[];
  saveArticle: (article: apiClient.NewsArticle) => void;
  user: UserType ;
  saveUser: (user: UserType) => void;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  const [savedArticle, setSavedArticle] = useState<apiClient.NewsArticle[]>([]);
const [currentUser , setCurrentUser] = useState<UserType>({} as UserType);

  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });

  const saveArticle = (article: apiClient.NewsArticle) => {
    setSavedArticle([...savedArticle, article]);
  };

  const saveUser = (user: UserType) => {
    setCurrentUser(user);
  };
  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn: !isError,
        article: savedArticle,
        saveArticle,
        user: currentUser,
        saveUser,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
