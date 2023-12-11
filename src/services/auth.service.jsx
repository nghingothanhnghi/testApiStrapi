import axios from "axios";

const API_URL = "https://hfwupqrtna.execute-api.us-west-1.amazonaws.com/sandbox/authenticate";

const register = (username, email, password) => {
  return axios.post(API_URL + "/sign-up", {
    username,
    email,
    password,
  });
};

const login = async (username, password) => {
  const response = await axios
    .post(API_URL + "/login", {
      username,
      password,
    });
    if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    // return response.data;
    console.log(response.data, "Response Login")
};

const logout = async () => {
  localStorage.removeItem("user");
  const response = await axios.post(API_URL + "signout");
  return response.data;
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService;
