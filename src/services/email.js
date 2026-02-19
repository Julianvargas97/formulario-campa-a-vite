import { httpsCallable } from "firebase/functions";
import { functions } from "../App";

/**
 * @param {Object} userData - Datos del usuario
 * @param {string} userData.cedula - Cédula del usuario
 * @param {string} userData.celular - Número de celular
 * @param {string} userData.correoDestino - Email del destinatario
 * @param {string} userData.municipio - Municipio
 * @param {string} userData.nombre - Nombre completo
 * @param {string} userData.textoConsecutivo - Texto consecutivo (opcional)
 * @returns {Promise<Object>} Resultado del envío
 */
export const enviarEmailBienvenida = async (userData) => {
  try {
    // Validación básica
    if (!userData.correoDestino || !userData.nombre) {
      throw new Error("Correo y nombre son requeridos");
    }

    // Llamar a la función de Firebase
    const sendEmailFunction = httpsCallable(functions, "sendEmail");
    const result = await sendEmailFunction(userData);

    console.log("Email enviado exitosamente:", result.data);
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error("Error enviando email:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const enviarWhatsappBienvenida = async (userData) => {
  try {
    // Validación básica
    if (!userData.celular || !userData.refer) {
      throw new Error("Número de celular y referido son requeridos");
    }

    // Llamar a la función de Firebase
    const sendWhatsappFunction = httpsCallable(functions, "sendWhatsapp");
    const result = await sendWhatsappFunction(userData);
    console.log("WhatsApp enviado exitosamente:", result.data);
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error("Error enviando WhatsApp:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};
