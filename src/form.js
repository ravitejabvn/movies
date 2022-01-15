import React, { useState } from "react";
import styled from "styled-components";

export const Form = () => {
  const [movieData, setMovieData] = useState({ orgData: [], filteredData: [] });
  const [isEmpty, setIsEmpty] = useState(false);
  const [isDataAvailable, setIsDataAvailable] = useState(false);

  const submitForm = () => {
    const movieName = document.getElementById("movie-name").value;
    const ratings = document.getElementById("ratings").value;
    const duration = document.getElementById("duration").value;
    const searchText = document.getElementById("search-text").value;
    if (movieName && ratings && duration) {
      setIsEmpty(false);
      let durationValue = duration;

      const durationLastLetter = duration[duration.length - 1];
      const durVal = duration.slice(0, -1);
      if (durationLastLetter.toLowerCase() === "m")
        durationValue = `${(durVal / 60).toFixed(1)}h`;

      const findMovie =
        movieData.orgData.length &&
        movieData.orgData.find(
          (x) => x.name.toLowerCase() === movieName.toLowerCase()
        );
      if (findMovie) {
        setIsDataAvailable(true);
      } else {
        setIsDataAvailable(false);
        const orgData = [
          ...movieData.orgData,
          {
            name: movieName,
            ratings,
            duration: durationValue,
            id: movieData.length + 1,
          },
        ];
        const filteredData = orgData.filter(
          (x) => x.name.toLowerCase() === searchText.trim().toLowerCase()
        );
        setMovieData({
          ...movieData,
          orgData,
          filteredData: filteredData.length ? filteredData : orgData,
        });
      }
    } else {
      setIsEmpty(true);
    }
  };

  const onSearch = () => {
    const searchText = document.getElementById("search-text").value;
    if (searchText.length > 2) {
      const filteredData = movieData.orgData.filter(
        (x) => x.name.toLowerCase() === searchText.trim().toLowerCase()
      );
      setMovieData({
        ...movieData,
        filteredData,
      });
    } else {
      setMovieData({
        ...movieData,
        filteredData: movieData.orgData,
      });
    }
  };

  return (
    <div>
      <div>
        <input type="text" placeholder="Movie Name" id="movie-name" />
        <input type="text" placeholder="Ratings" id="ratings" />
        <input type="text" placeholder="Duration" id="duration" />
        <input
          type="text"
          placeholder="Search"
          id="search-text"
          onKeyUp={onSearch}
        />
        <input type="button" value="Submit" onClick={submitForm} />
      </div>
      <div>{isEmpty && <div>Enter movie details</div>}</div>
      <div>{isDataAvailable && <div>Movie already available</div>}</div>
      <div>{!movieData.filteredData.length && <div>No Results Found</div>}</div>
      <div>
        {movieData.filteredData && movieData.filteredData.length > 0 && (
          <TableContainer>
            <div>Movie Name</div>
            <div>Ratings</div>
            <div>Duration</div>
          </TableContainer>
        )}
        {movieData.filteredData &&
          movieData.filteredData.length > 0 &&
          movieData.filteredData.map((movie) => {
            return (
              <TableContainer key={movie.id}>
                <div>{movie.name}</div>
                <div>{movie.ratings}</div>
                <div>{movie.duration}</div>
              </TableContainer>
            );
          })}
      </div>
    </div>
  );
};

const TableContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    width: 150px;
    padding: 0 10px;
    text-align: left;
  }
`;
