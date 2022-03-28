import axios from "axios";

export const loginRequest = async (data) => {
  console.log("GET LOGIN CALLED");
  const { data: resp } = await axios.post(
    // "https://bawlio.neben.dev/api/login",
    "http://localhost:8000/api/login",
    data
  );
  return resp;
};
