import http from "./http";

const getAllSurveys = () => {
  return http.get("surveys");
};

const getSurveyByID = (id) => {
  return http.get(`surveys/${id}`);
};

export { getAllSurveys, getSurveyByID };
