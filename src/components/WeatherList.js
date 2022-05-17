import { degrees } from '../helpers/helpers';
import { CELSIUS } from '../constants/Constants';
import { AvatarComponent } from './AvatarComponent';
import { Card, List, Typography } from 'antd';
import React from 'react'


const { Title } = Typography;

export const WeatherList = (props) => {
  const { favData } = props;


return (
  <Card style={{
    width: '100%',
    borderRadius: '50px 50px 0 0',
    marginTop: 'auto'
  }}
  >

    <List 
      itemLayout='horizontal'
      grid={{ gutter: 16, column: 3 }}
      pagination={{
        pageSize: 3,
        hideOnSinglePage: "true",
        responsive: true,
        size: "small",
        className: "custom-pagination-buttons"
      }}
      dataSource={favData}
      renderItem={item => (
        <List.Item 
          key={item.id}>
            <Card 
            size='small'
            className='card-style'
            bodyStyle={{
              padding: "1vh"
            }}>
              <Title level={5} ellipsis={true}>{item.name}</Title>

              <AvatarComponent item={item.weather} size={40} />

              <Title level={4}>{degrees(item.main.temp, CELSIUS)}</Title>

            </Card>
            
        </List.Item>
      )}
    />

  </Card>

  )
}