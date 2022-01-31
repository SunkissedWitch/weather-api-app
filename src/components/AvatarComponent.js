import { Avatar } from 'antd';
import { URL_IMG } from '../constants/Constants';

export const AvatarComponent = (prop) => {
  if (!prop) {
    return;
  }
  
  const { item, size } = prop;

  console.log("prop avatar", item)

  return item.map(
    item => {
      return (
        <Avatar key={item.icon}
            size={size} 
            alt={item.description}
            src={URL_IMG.replace('[image_id]', item.icon)}
        />
      )
    })
}