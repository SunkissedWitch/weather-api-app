import { Avatar } from 'antd'
import { URL_IMG } from '../helpers';

export const AvatarComponent = (prop) => {
  if (!prop) {
    console.log('no prop');
    return
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