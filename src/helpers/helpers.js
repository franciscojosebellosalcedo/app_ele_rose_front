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

export const formatDate=(fechaString)=> {
  const fecha = new Date(fechaString);

  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const año = fecha.getFullYear();

  return `${dia}/${mes}/${año}`;
}

export const getAllAmountPoductsOrder=(listProducts)=>{
	let amount=0;
	for (let index = 0; index < listProducts.length; index++) {
		const item = listProducts[index];
		amount+=item.amount;
	}
	return amount;
}
