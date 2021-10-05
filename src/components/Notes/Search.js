import React from "react";

export const SearchBar = ({ handleSearchNote }) => {
  return (
    <div className="search-bar">
      <i className="fas fa-search search-icon" />
      <input 
      
      onChange={(event) => handleSearchNote(event.target.value)} 
      className="search" 
      type="text" 
      placeholder="Search the notes..." 
      
      />
    </div>
  );
};
