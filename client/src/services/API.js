import axios from "axios";
export default () => {
  return axios.create({
    baseURL: `https://bartech-todo.herokuapp.com/` // the url of our server
  });
};
