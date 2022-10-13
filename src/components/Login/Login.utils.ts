export const requestLogin = async (address, password) => {
  if (address === "12ab34" && password === "12345") {
    return {
      // TODO: actually authenticate
      address: "12ab34", // Wallet address
      name: "John",
      availableSpace: 0,
      usedSpace: 0,
    };
  } else {
    throw new Error("Dirección o contraseña incorrectas");
  }
};
