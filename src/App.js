import './App.css';
import axios from 'axios';
import { 
  Input,
  Space,
  List
} from 'antd';

import { useState, useEffect } from 'react';
import { getSearchParam, fetchData, degrees, CELSIUS } from './helpers';
import { CurrentWeather } from './components/Current-weather';
import { AvatarComponent } from './components/AvatarComponent';
// import ListWeather from './components/list';
// import SearchInput from './components/search';

const { Search } = Input;

const KEY_API = 'appid=b72669f6c155eab64f7b33e11f954718';
const WEATHER_URL = 'http://api.openweathermap.org/data/2.5/weather?[query_param_1]&q=[query_param_2]&units=[query_param_3]';

const METRIC = 'metric';
const IMPERIAL = 'imperial';

function App() {
  const searchParams = {
    url: WEATHER_URL,
    key: KEY_API,
    units: METRIC 
  }

  const [ searchResult, setSearchResult ] = useState({});
  const [ favorites, setFavorites ] = useState({});
  const [ favData, setFavData ] = useState([]);

  const onSearch = value => {
    fetchData(getSearchParam({
      ...searchParams,
      value: value
    }), setSearchResult);
    console.log('searchResult', searchResult);
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
        // console.log(`Cake with name ${city} is a lie`);
        return;
      }
      arrayCities.push( new Promise (
        (resolve) => {
          axios.get(getSearchParam({
            ...searchParams,
            value: city,
          })).then((result) => {
              resolve(result.data);
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
    <Space direction="vertical">
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      { !!Object.keys(searchResult).length && 
        <CurrentWeather data={searchResult} favorites={favorites} setFavorite={setFavorite} />
      }
     
    </Space>

    <List
      itemLayout="horizontal"
      dataSource={favData}
      renderItem={item => (
        <List.Item 
        
        key={item.id}>
          <List.Item.Meta
            avatar={<AvatarComponent item={item} />}
            title={item.name}
            description={
            <>
              <p>Now {degrees(item.main.temp, CELSIUS)}</p>
              <p>Feels like {degrees(item.main.feels_like, CELSIUS)}</p>
            </>
            }
          />
        </List.Item>
      )}
    />
   </>
  );
}

export default App;
