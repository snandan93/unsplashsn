import React from "react";

const Suggestions = ({ suggestions, onClick }) => {
  const handleChange = (selectedValue) => {
    onClick(selectedValue);
  };

  let suggestionsArray = suggestions.suggestions;
  const autocomplete =
    suggestionsArray &&
    !!suggestionsArray.length &&
    suggestionsArray.map((suggestion, index) => {
      return (
        <li
          className="suggestion"
          key={index}
          onClick={() => handleChange(suggestion.word)}
        >
          <a className="suggestion__link" href="#top">
            {suggestion.word}
          </a>
        </li>
      );
    });

  return (
    <>
      <ul className="search__suggestions">
        {autocomplete}
        {suggestionsArray ? (
          <li
            className="suggestion"
            style={{ fontStyle: "italic", fontWeight: "bold" }}
          >
            Suggestions: {Object.keys(suggestionsArray).length}
          </li>
        ) : (
          <li
            className="suggestion"
            style={{ fontStyle: "italic", fontWeight: "bold" }}
          >
            No suggestions
          </li>
        )}
      </ul>
    </>
  );
};

export default Suggestions;
