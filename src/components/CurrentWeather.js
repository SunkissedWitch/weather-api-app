import { degrees } from '../helpers/helpers';
import { CELSIUS, URL_IMG } from '../constants/Constants';
import { Card, Button, Avatar } from 'antd';
import { StarOutlined } from '@ant-design/icons';


export const CurrentWeather = (props) => {
  if (!props) {
    return;
  }
  
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

      <Avatar 
        src={URL_IMG.replace('[image_id]', item.icon)} 
        alt={item.description}
        size={80} 
      />
        <h3>{item.main}</h3>
        <p>Now {degrees(temp, CELSIUS)}</p>
        <p>Feels like {degrees(feels_like, CELSIUS)}</p>
        <p>Max temperature {degrees(temp_max, CELSIUS)}</p>
        <p>Min temperature {degrees(temp_min, CELSIUS)}</p>
      </Card>)
  });
};