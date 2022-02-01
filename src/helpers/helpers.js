import axios from 'axios';

export const getSearchParam = (params) => {
  const { 
          url,
          key,
          value,
          units,
          } = params;

  let searchUrl = url.replace('[query_param_1]', key)
                     .replace('[query_param_2]', value)
                     .replace('[query_param_3]', units);
  return searchUrl;
}

export const fetchData = async (url) => { 
  const { data } = await axios.get(url);
  return data;
};

export const degrees = (t, units) => {
  return `${Math.round(t)} ${units}`
};