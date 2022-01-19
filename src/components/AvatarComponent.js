import { Avatar } from 'antd';
import { URL_IMG } from '../constants/Constants';

export const AvatarComponent = (prop) => {
  if (!prop) {
    return;
  }
  
  const { item } = prop;
  return <Avatar 
          style={{ backgroundColor: '#bae7ff' }} 
          size={100} 
          src={
            URL_IMG.replace('[image_id]', item.weather.map((item) => {return item.icon}))
          }
        />
}