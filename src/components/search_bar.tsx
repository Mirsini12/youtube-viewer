import React, { useState } from "react";

interface SearchBarProps {
  onSearchTermChange: (term: string) => void;
}



const SearchBar: React.FC<SearchBarProps> = ({ onSearchTermChange }) => {
  const [term, setTerm] = useState<string>("");

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = event.target.value;
    setTerm(newTerm);
    onSearchTermChange(newTerm);
  };

  return (
    <div className="search-bar">
      <input
        value={term}
        onChange={onInputChange}
      />
    </div>
  );
};


export default SearchBar;
