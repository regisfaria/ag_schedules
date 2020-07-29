import React from 'react';
import { FiSearch } from 'react-icons/fi';

import { SearchDiv } from './styles';

/*
 * I must set the search bar to search diferent things based on which
 * page we're at
 * Placeholder must change and so the search content
 * Learn how to add parameters on components
 */

const SearchBar: React.FC = () => {
  return (
    <SearchDiv>
      <input type="text" placeholder="Global search" />
      <button type="submit">
        <FiSearch size={20} />
      </button>
    </SearchDiv>
  );
};

export default SearchBar;
