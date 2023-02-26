import { Link } from "react-router-dom";
import survey from "../survey";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAllSurveys } from "../api/surveys";
import LoadingScreen from "../components/loadingScreen";
import ErrorScreen from "../components/errorScreen";

export default function Home() {
  const {
    isLoading,
    isSuccess,
    isError,
    data: response,
    error,
  } = useQuery("surveys", getAllSurveys);

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen message={error.message} />;

  return (
    <div className="max-w-screen-lg p-8 mx-auto mt-[60px] sm:mt-[92px]">
      {response.data.map((s) => (
        <Link
          key={s._id}
          className="block my-8 w-full shadow-[0px_0px_20px_2px_rgba(0,0,0,0.05)] p-8 text-3xl"
          to={`surveys/${s._id}`}
        >
          {s.title}
        </Link>
      ))}
    </div>
  );
}
