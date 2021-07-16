
const getData = (onSuccess, onError, url) => {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      onError();
    })
    .then((pictures) => {
      onSuccess(pictures);
    })

    .catch(() => {
      onError();
    });
};

const sendData = (onSuccess, onError, body, url) => {
  fetch(url,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      }
      onError();
    })
    .catch(() => {
      onError();
    });
};

export {getData, sendData};
