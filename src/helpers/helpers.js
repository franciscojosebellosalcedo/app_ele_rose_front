export const headersWithAccessToken = (headers, accessToken) => {
  headers["access-x"] = `bearer ${accessToken}`;
  return headers;
};

export const convertToBase64 =async (files) => {
  const filesList = files;

  if (filesList.length > 0) {
    const files = Array.from(filesList);

    const data=await Promise.all(
      files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = function (e) {
            const base64String = e.target.result;
            resolve(base64String);
          };
          reader.readAsDataURL(file);
        });
      })
    );
    return data[0];
  }
};
