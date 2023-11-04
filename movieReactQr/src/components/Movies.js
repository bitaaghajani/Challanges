import { useState } from "react";
import MovieCard from "./MovieCard";
import { Container, Flex, Header, Text } from "@mantine/core";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
export default function Movies() {
  const [pageNumber, setPageNumber] = useState(1);
  const movieUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=${pageNumber}&api_key=5c82100499f1342644a408064bf5cecf`;
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=5c82100499f1342644a408064bf5cecf&query`;
  const fetchApi = (pageNumber) => {
    return axios.get(movieUrl).then((res) => res.data.results);
  };
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    isSuccess: isQuerySuccess,
  } = useQuery(["page", pageNumber], () => fetchApi(pageNumber), {
    refetchOnWindowFocus: true,
    cacheTime: 10000,
  });
  console.log(isLoading, isFetching);
  console.log(data);

  const search = (e) => {
    e.preventDefault();
    console.log(e);
    return axios
      .get(`${searchUrl}=${e.target[0].value}`)
      .then((res) => res.data.results);
  };
  const { data: movieList, mutate, isSuccess } = useMutation(search);
  return (
    <>
      <Header h={60} justify="center" bg="#282828">
        <Flex justify="space-between" px={30}>
          <Text size={30}>Movie App</Text>
          <form className="inputContainer" onSubmit={mutate}>
            <input
              type="text"
              name="query"
              className="search"
              placeholder="Search movies"
            />
          </form>
        </Flex>
      </Header>
      {isLoading && <h2>Loading...</h2>}
      {isError && <h2>Error: {error.message}</h2>}
      {(isSuccess || isQuerySuccess) && (
        <Container fluid py={30} bg="#282828">
          <MovieCard movie={movieList?.length > 0 ? movieList : data} />
          <div className="btn">
            <button
              onClick={() => setPageNumber((page) => page - 1)}
              disabled={pageNumber === 1}
            >
              prev page
            </button>
            <button
              onClick={() => setPageNumber((page) => page + 1)}
              disabled={pageNumber === 3}
            >
              next page
            </button>
          </div>
        </Container>
      )}
    </>
  );
}
