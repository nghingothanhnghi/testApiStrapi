import axios from "axios";

const API_URL = "https://hfwupqrtna.execute-api.us-west-1.amazonaws.com/sandbox/authenticate";

const register = (username, fullname,phone_number, password) => {
  return axios.post(API_URL + "/sign-up", {
    fullname,
    username,
    phone_number,
    password,
  });
};

const login = async (username, password) => {
  const response = await axios
    .post(API_URL + "/login", {
      username,
      password,
    });
    if (response.data.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    console.log(JSON.stringify(response), "Response Login")
    return response.data;
    
};

const logout = async () => {
  localStorage.removeItem("user");
  const response = await axios.post(API_URL + "signout");
  return response.data;
};

const getCurrentUser = () => {
  console.log(JSON.parse(localStorage.getItem("user")), "Current User")
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService;
