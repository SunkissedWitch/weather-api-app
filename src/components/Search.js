import { Card, Input } from 'antd';

const { Search } = Input;

export const SearchInput = (props) => {
  const { onSearch } = props;

  return (
    <Card
    className='fixed-top'>
      <Search
        style={{
          border: '1px solid #cacaca',
          borderRadius: 20
        }}
        bordered={false}
        placeholder="Search"
        allowClear
        size="large"
        onSearch={onSearch}
      />      
    </Card>
  )
}
