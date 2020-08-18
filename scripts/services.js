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
    })
    
  };
  
  export default api;


