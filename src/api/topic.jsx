import axios from "axios";

function getAllTopics() {
  return axios({
    method: "GET",
    url: "https://commu-core.kiattiphoompoon.repl.co/api/topics",
  });
}

function getSingleTopic(props) {
  return axios({
    method: "GET",
    url: `https://commu-core.kiattiphoompoon.repl.co/api/topic`,
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
    url: `https://commu-core.kiattiphoompoon.repl.co/api/create`,
    data: props,
  });
}

export const topics = {
  getAllTopics,
  getSingleTopic,
  createTopic,
};
