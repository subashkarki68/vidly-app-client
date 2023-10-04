const SearchBox = ({ value, onChange }) => {
  return (
    <div className="mb-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default SearchBox;
