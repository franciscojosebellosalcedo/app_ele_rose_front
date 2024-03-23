export const getAllImages = async (publicKey, secretKey) => {
  const response = await fetch(`https://api.uploadcare.com/files/?limit=100`, {
    method: "GET",
    headers: {
      Authorization: `Uploadcare.Simple ${publicKey}:${secretKey}`,
      Accept: "application/vnd.uploadcare-v0.6+json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  return await response.json();
};

export const removeImagen = async (publicKey, secretKey,uuid) => {
  const response = await fetch(`https://api.uploadcare.com/files/${uuid}/storage/`, {
    method: "DELETE",
    headers: {
      Authorization: `Uploadcare.Simple ${publicKey}:${secretKey}`,
      Accept: "application/vnd.uploadcare-v0.6+json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  return await response.json();
};
