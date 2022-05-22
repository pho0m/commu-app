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

function createTopic(props, token) {
  const headers = {
    authorization: `${token}`,
  };

  return axios({
    method: "POST",
    headers,
    url: `http://localhost:3001/api/topic/create`,
    data: props,
  });
}

export const topics = {
  getAllTopics,
  getSingleTopic,
  createTopic,
};
