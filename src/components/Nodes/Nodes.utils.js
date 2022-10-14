export const postNewNode = async (userId, size, alias = "") => {
  if (!userId || !size) {
    throw new Error(
      "Por favor, vuelve a iniciar sesión e indica un tamaño de nodo"
    );
  }

  return {
    wallet: userId,
    alias: alias,
    createdDate: new Date(),
    latestUpdateDate: new Date(),
    contributedSpace: size, // GB
    availableSpaceForUser: size / 4, // GB - not the free space in the node. The space that the node gives the user
    confidence: 100,
    status: "connected",
  };
};
