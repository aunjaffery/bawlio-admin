import axios from "axios";

export const getAllContacts = async () => {
  console.log("GET CONTACTS CALLED");
  try {
    const { data: resp } = await axios.get(
      "http://159.223.69.23:8000/api/contacts"
    );
    console.log(resp?.data);
    return resp?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
