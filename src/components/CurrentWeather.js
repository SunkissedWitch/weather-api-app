import React from 'react'
import { degrees } from '../helpers/helpers';
import { CELSIUS } from '../constants/Constants';
import { Card, Button, Divider, Typography } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { AvatarComponent } from './AvatarComponent';

const { Title } = Typography;

export const CurrentWeather = (props) => {
  if (!props) {
    return;
  }
  
  const { favorites, setFavorite, data } = props;
  
  const { weather, main: temperature, name } = data;
  const { temp, feels_like, temp_max, temp_min } = temperature;
  const iconFav = favorites[name]
                      ? <StarFilled style={{color: '#fff'}} /> 
                      : <StarOutlined style={{color: '#fff'}} />

  const descriptionWeather = (array) => ( 
    array.map((item, index, array) => {
      const comma = index < array.length-1 ? ", " : "";
      return <span key={item.id}>{item.main}{comma}</span>
    }
  ))

  return (
    <Card 
    className="central-card-style"
    headStyle={{border: 'none'}}
    bordered={false}
    title={<Title 
      level={2} 
      style={{color: "#fff"}}
      >
        {name}
      </Title>}

    extra={
      <Button 
        onClick={() => setFavorite(name)} 
        type="link"
        icon={iconFav}
      />}
    >

      <div className='white-circle'>
        <AvatarComponent item={weather} size={80} />
        
        <Title level={5} style={{color: "black"}}>
          {descriptionWeather(weather)}
          </Title>
        <Title level={4}>Now {degrees(temp, CELSIUS)}</Title>
      </div>
      
      <div className='description-current-weather'>
        <span>Feels {degrees(feels_like, CELSIUS)}</span>
        <Divider type='vertical' style={{backgroundColor: '#cacaca'}}/>
        <span>Max {degrees(temp_max, CELSIUS)}</span>
        <Divider type='vertical' style={{backgroundColor: '#cacaca'}}/>
        <span>Min {degrees(temp_min, CELSIUS)}</span>       
      </div>

    </Card>)
};