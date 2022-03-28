import axios from "axios";
import Domain from "../lib/Config";

export const getAllContacts = async () => {
  console.log("GET CONTACTS CALLED");
  try {
    const { data: resp } = await axios.get(`${Domain}/api/contacts`);
    return resp?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
