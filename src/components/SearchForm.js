import React, { useState, useRef, useEffect } from "react";
import Suggestions from "./Suggestions";

const SearchForm = ({ onSearchPhoto }) => {
  const mostSearched = [
    "Wallpapers",
    "Nature",
    "Architecture",
    "Fashion",
    "Film",
    "Animals"
  ];

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const ref = useRef();

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      onSearchPhoto(search);
      setSearch("");
      setSuggestions("");
      setShowSuggestions(false);
    }
  };

  const fetchSuggestions = () => {
    fetch(`https://api.datamuse.com/sug?s=${search}`)
      .then((response) => response.json())
      .then((data) => {
        const suggestionsArray = data;
        // console.log(data);
        setSuggestions({
          suggestions: suggestionsArray
        });
      });
  };

  const onInputChange = (e) => {
    let search = e.target.value;
    setSearch(search);
    if (search.length > 2) {
      fetchSuggestions(search);
    }
  };

  const onInputClick = () => {
    setShowSuggestions(true);
  };

  const onSuggestionClick = (e) => {
    onSearchPhoto(e);
    setSearch("");
    setSuggestions("");
    setShowSuggestions(false);
  };

  const handleOutsideClick = (e) => {
    if (ref.current.contains(e.target)) {
      return;
    }
    setShowSuggestions(false);
  };

  useEffect(() => {
    if (showSuggestions) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showSuggestions]);

  return (
    <form ref={ref} onSubmit={onSubmitForm} className="form__search">
      <span className="search__icon">
        <svg
          width="20"
          height="20"
          version="1.1"
          viewBox="0 0 25 25"
          aria-hidden="false"
        >
          <path d="M22 20c1.2-1.6 2-3.7 2-6 0-5.5-4.5-10-10-10S4 8.5 4 14s4.5 10 10 10c2.3 0 4.3-.7 6-2l6.1 6 1.9-2-6-6zm-8 1.3c-4 0-7.3-3.3-7.3-7.3S10 6.7 14 6.7s7.3 3.3 7.3 7.3-3.3 7.3-7.3 7.3z"></path>
        </svg>
      </span>
      <input
        id="query"
        className="search__input"
        type="text"
        placeholder="Search free high-resolution photos"
        onChange={onInputChange}
        onClick={(e) => onInputClick(!showSuggestions)}
        value={search}
      />
      {showSuggestions ? (
        <Suggestions
          suggestions={suggestions}
          onClick={(e) => onSuggestionClick(e)}
        />
      ) : (
        <div className="search__tags">
          {mostSearched.map((suggestion, index) => {
            return (
              <span
                key={index}
                className="tag"
                onClick={() => onSuggestionClick(suggestion)}
              >
                {suggestion}
              </span>
            );
          })}
        </div>
      )}
    </form>
  );
};

export default SearchForm;
