import axios from "axios";

//Verificar email
export const verifyEmail = async (email) => {
  try {
    const url = `https://dizzgob.ccontrolz.com/auth-validate?email=${encodeURIComponent(
      email
    )}`;
    const response = await axios.get(url);

    return response;
  } catch (error) {
    throw error;
  }
};

//Verificar codigo
export const verifyCode = async (code, gmail) => {
  try {
    const url = "https://dizzgob.ccontrolz.com/user/validate";
    const response = await axios.post(url, {
      Email: gmail,
      Code: code,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
