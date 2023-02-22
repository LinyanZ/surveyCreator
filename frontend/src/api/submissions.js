import http from "./http";

const getSubmissionsById = (id) => {
  return http.get(`surveys/${id}/submissions`);
};

const postSubmissionById = (id, submission) => {
  return http.post(`surveys/${id}/submissions`, submission);
};

export { getSubmissionsById, postSubmissionById };
