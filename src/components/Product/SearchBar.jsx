import React from "react";

const SearchBar = ({ setSearchQuery }) => {
  return (
    <React.Fragment>
      <div className="input-group">
        <input
          type="text"
          placeholder="Search for a product..."
          className="form-control"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </React.Fragment>
  );
};

export default SearchBar;
