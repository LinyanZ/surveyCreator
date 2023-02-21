import http from "./http";

const getAllSurveys = () => {
  return http.get("surveys");
};

const getSurveyByID = (id) => {
  return http.get(`surveys/${id}`);
};

const addSurvey = (survey) => {
  return http.post("surveys", survey);
};

export { getAllSurveys, getSurveyByID, addSurvey };
