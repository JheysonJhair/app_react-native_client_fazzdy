import axios from 'axios';

//Login
export const loginUser = async (email, password) => {
  try {
    const response = await fetch('https://dizzgob.ccontrolz.com/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email: email,
        Password: password,
      }),
    });

    if (!response.ok) {
      throw new Error('Error al iniciar sesión');
    }

    const user = await response.json();
    return user;
  } catch (error) {
    throw new Error('Error al iniciar sesión');
  }
};

//Recuperar contraseña
export const recoverPassword = async email => {
  try {
    const url = `https://dizzgob.ccontrolz.com/auth-validate/recoverPassword?email=${encodeURIComponent(
      email,
    )}`;
    const response = await axios.get(url);

    return response;
  } catch (error) {
    throw error;
  }
};

//Actualizar contraseña
export const updatePassword = async jsonData => {
  try {
    const response = await fetch(
      `https://dizzgob.ccontrolz.com/user/recoverPassword`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      },
    );

    if (response.ok) {
      const data = await response.json();
      return {success: true, data};
    } else {
      const errorData = await response.json();
      return {success: false, error: errorData};
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      success: false,
      error: 'Error en la solicitud actualizar contraseña',
    };
  }
};
