import { degrees } from '../helpers/helpers';
import { CELSIUS } from '../constants/Constants';
import { AvatarComponent } from './AvatarComponent';
import { List } from 'antd';

export const WeatherList = (props) => {
  const { favData } = props;

return (
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
  )
}