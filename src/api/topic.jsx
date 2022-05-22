import axios from "axios";

function getAllTopics() {
  return axios({
    method: "GET",
    url: "http://localhost:3001/api/topics",
  });
}

function getSingleTopic(props) {
  return axios({
    method: "GET",
    url: `http://localhost:3001/api/topic`,
    params: props,
  });
}

export const topics = {
  getAllTopics,
  getSingleTopic,
};
