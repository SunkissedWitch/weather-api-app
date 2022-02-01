import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { getSearchParam, fetchData } from './helpers/helpers';
import { CurrentWeather } from './components/CurrentWeather';
import { WeatherList } from './components/WeatherList';
import { SearchInput } from './components/Search';
import { WEATHER_URL, KEY_API, METRIC } from './constants/Constants';

function App() {
  const searchParams = {
    url: WEATHER_URL,
    key: KEY_API,
    units: METRIC 
  }

  const [ searchResult, setSearchResult ] = useState({});
  const [ favorites, setFavorites ] = useState({});
  const [ favData, setFavData ] = useState([]);

  const onSearch = async (value) => {
    setSearchResult(
      await fetchData(
        getSearchParam({
          ...searchParams,
          value: value
        })
    ));
    return getSearchParam({
      ...searchParams,
      value: value
    });
  };

  const setFavorite = (cityName) => {
    setFavorites({
      ...favorites,
      [cityName]: !favorites[cityName]
    })
  };

  useEffect(() => {
    if(Object.keys(favorites).length !== 0) {   
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  useEffect(() => {
    const fav = localStorage.getItem('favorites');
    if (fav) {
      setFavorites(JSON.parse(fav));
    }  
  }, []);

  useEffect(() => {
    let arrayCities = []; 
    let allFavList = Object.entries(favorites);

    allFavList.forEach(([city, state]) => {
      if(!state) {
        console.log(`Cake ${city} is a lie`);
        return;
      }
      arrayCities.push( new Promise (
        (resolve) => {
          axios.get(getSearchParam({
            ...searchParams,
            value: city,
          })).then((result) => {
              return resolve(result.data);
          })
        })
      )
    })

    Promise.all(arrayCities).then((data) => {
      setFavData(data);
    });

  }, [favorites]);

  return (
   <>
    <div className='flex-box'>
      <div>
        <SearchInput className="search-component" onSearch={onSearch} />  
      </div>

      <div>
        { !!Object.keys(searchResult).length && 
          <CurrentWeather data={searchResult} favorites={favorites} setFavorite={setFavorite} />
        }
      </div>  

      <div>
        <WeatherList favData={favData}/> 
      </div>
    </div>
   </>
  );
}

export default App;
