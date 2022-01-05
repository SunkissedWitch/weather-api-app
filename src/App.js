import './App.css';
import axios from 'axios';
import { 
  Input,
  Space,
  List,
  Card,
  Button,
  Avatar
} from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

const { Search } = Input;

const KEY_API = 'appid=b72669f6c155eab64f7b33e11f954718';
const WEATHER_URL = 'http://api.openweathermap.org/data/2.5/weather?[query_param_1]&q=[query_param_2]&units=[query_param_3]';
const URL_IMG = 'http://openweathermap.org/img/wn/[image_id]@2x.png';

const METRIC = 'metric';
const IMPERIAL = 'imperial';

const CELSIUS = '℃';

function App() {

  const [ searchResult, setSearchResult ] = useState();
  const [ favorites, setFavorites ] = useState({});
  const [ favData, setFavData ] = useState([]);

  const onSearch = value => {
    fetchData(getSearchParam(value));
    return getSearchParam(value);
  };

  const getSearchParam = value => {
    let searchUrl = WEATHER_URL.replace('[query_param_1]', KEY_API)
                               .replace('[query_param_2]', value)
                               .replace('[query_param_3]', METRIC);
    return searchUrl;
  }

  const fetchData = async (url) => { 
    const { data } = await axios.get(url);
    setSearchResult(data);
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
          axios.get(getSearchParam(city)).then((result) => {
              resolve(result.data);
          })
        })
      )
    })

    Promise.all(arrayCities).then((data) => {
      setFavData(data);
    });

  }, [favorites]);

  const degrees = (t) => {
    return `${Math.round(t)} ${CELSIUS}`
  };

  const renderCurrentWeather = () => {
    if (!searchResult) {
      return;
    }
    const { weather, main: temperature, name } = searchResult;
    const { temp, feels_like, temp_max, temp_min } = temperature;
    let buttonTitle = favorites[name] ? "Remove from favorite" : "Add to favorite";
    
    return weather.map((item) => {
      return (
        <Card key={item.id} title={name} extra={<Button onClick={() => setFavorite(name)} type="primary" shape="round" icon={<StarOutlined />}>
        {buttonTitle}  
        </Button>} style={{ width: 300 }}>
        <img src={URL_IMG.replace('[image_id]', item.icon)} alt={item.description}></img>
          <h3>{item.main}</h3>
          <p>Now {degrees(temp)}</p>
          <p>Feels like {degrees(feels_like)}</p>
          <p>Max temperature {degrees(temp_max)}</p>
          <p>Min temperature {degrees(temp_min)}</p>
        </Card>)
    });
  };

  const avatar = (item) => {
    return <Avatar 
            style={{ backgroundColor: '#bae7ff' }} 
            size={100} 
            src={
              URL_IMG.replace('[image_id]', item.weather.map((item) => {return item.icon}))
            }
          />
  }

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

      <div>{renderCurrentWeather()}</div>
    </Space>

    <List
      itemLayout="horizontal"
      dataSource={favData}
      renderItem={item => (
        <List.Item 
        
        key={item.id}>
          <List.Item.Meta
            avatar={avatar(item)}
            title={item.name}
            description={
            <>
              <p>Now {degrees(item.main.temp)}</p>
              <p>Feels like {degrees(item.main.feels_like)}</p>
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
