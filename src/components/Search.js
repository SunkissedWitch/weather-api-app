import { Input } from 'antd';

const { Search } = Input;

export const SearchInput = (props) => {
  const { onSearch } = props;

  return (
   <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
  )
}
