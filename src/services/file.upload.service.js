const baseUrl = "${process.env.REACT_APP_SERVER_URL}/auth";

const errorHandler = (err) => {
  throw err;
};

const uploadImage = (file) => {
  const formData = new FormData();
  formData.append("image_url", file);

  return fetch(`${baseUrl}/upload`, {
    method: "POST",
    body: formData,
    // Add any headers you need here, such as 'Authorization' or others
  })
    .then((response) => {
      console.log(formData)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch(errorHandler);
};

export default uploadImage;





