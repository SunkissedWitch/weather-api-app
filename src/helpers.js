import axios from 'axios';
export const CELSIUS = '℃';
export const URL_IMG = 'http://openweathermap.org/img/wn/[image_id]@2x.png';


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

export const fetchData = async (url, setState) => { 
  const { data } = await axios.get(url);
  setState(data);
};

export const degrees = (t, units) => {
  return `${Math.round(t)} ${units}`
};