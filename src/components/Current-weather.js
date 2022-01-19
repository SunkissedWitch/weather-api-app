import { degrees, CELSIUS, URL_IMG } from '../helpers';
import {
  Card,
  Button,
} from 'antd';

import { StarOutlined } from '@ant-design/icons';



export const CurrentWeather = (props) => {
  if (!props) {
    return;
  }
  console.log(props);
 
  const { favorites, setFavorite, data } = props;
  
  const { weather, main: temperature, name } = data;
  const { temp, feels_like, temp_max, temp_min } = temperature;
  let buttonTitle = favorites[name] ? "Remove from favorite" : "Add to favorite";
  
  return weather.map((item) => {
    return (
      <Card 
      key={item.id} 
      style={{ width: 400 }}
      title={name} 
      extra={
      <Button 
        onClick={() => setFavorite(name)} 
        type="primary" 
        shape="round" 
        icon={<StarOutlined />}>
        {buttonTitle}  
      </Button>}
      >

      <img src={URL_IMG.replace('[image_id]', item.icon)} alt={item.description}></img>
        <h3>{item.main}</h3>
        <p>Now {degrees(temp, CELSIUS)}</p>
        <p>Feels like {degrees(feels_like, CELSIUS)}</p>
        <p>Max temperature {degrees(temp_max, CELSIUS)}</p>
        <p>Min temperature {degrees(temp_min, CELSIUS)}</p>
      </Card>)
  });
};