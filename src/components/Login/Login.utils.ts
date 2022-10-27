export const requestLogin = async (address, password) => {
  if (address === "Jazmin" && password === "12345") {
    return {
      // TODO: actually authenticate
      address: "asd123", // Wallet address
      name: "John",
      availableSpace: 0,
      usedSpace: 0,
    };
  } else {
    throw new Error("Dirección o contraseña incorrectas");
  }
};
