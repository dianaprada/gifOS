const api = {
    trendingData: ((URL, api_key, limit, offset = 0, rating = 'g', random_id = 'dianagif') => {
      return new Promise((resolve, reject) => {
        fetch(`${URL}?api_key=${api_key}&limit=${limit}&offset=${offset}&rating=${rating}&random_id=${random_id}`)
        .then((response) => resolve(response.json()))
        .catch((error) => reject(error))
      });
    }),

    searchData: ((URL, api_key, keyword, limit, offset, rating = 'g') => {
      return new Promise((resolve, reject) => {
        fetch(`${URL}?api_key=${api_key}&q=${keyword}&limit=${limit}&offset=${offset}&rating=${rating}`)
        .then((response) => resolve(response.json()))
        .catch((error) => reject(error))
      });
    }),

    trendingWordsData: ((URL, api_key) => {
      return new Promise((resolve, reject) => {
        fetch(`${URL}?api_key=${api_key}`)
        .then((response) => resolve(response.json()))
        .catch((error) => reject(error))
      });
    }),

    autocompleteData: ((URL, api_key, keyword, offset=5) => {
      return new Promise((resolve, reject) => {
        fetch(`${URL}?api_key=${api_key}&q=${keyword}&offset=${offset}`)
        .then((response) => resolve(response.json()))
        .catch((error) => reject(error))
      });
    }),

    gifByIDData: ((URL, gif_id, api_key) => {
      return new Promise((resolve, reject) => {
        fetch(`${URL}/${gif_id}?api_key=${api_key}`)
        .then((response) => resolve(response.json()))
        .catch((error) => reject(error))
      });
    }),

    gifsByIDData: ((URL, api_key, ids) => {
      return new Promise((resolve, reject) => {
        fetch(`${URL}?api_key=${api_key}&ids=${ids}`)
        .then((response) => resolve(response.json()))
        .catch((error) => reject(error))
      });
    }),

    uploadGifoData: ((URL, api_key, gifoData) => {
      return new Promise((resolve, reject) => {
        fetch(`${URL}?api_key=${api_key}`, { method: 'POST', body: gifoData })
        .then((response) => resolve(response.json()))
        .catch((error) => reject(error))
      });
    }),
    
    
  };
  
  export default api;


