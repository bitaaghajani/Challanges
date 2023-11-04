import React, { Fragment, useState } from "react";
import {
  Page,
  Block,
  Button,
  Link,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  ListInput,
} from "framework7-react";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useInfiniteQuery, useMutation } from "react-query";
import axios from "axios";
import useStore from "../js/stores";

export default function home() {
  const { items, setItems } = useStore((state) => state);
  const [filterItems, setFilterItems] = useState([]);
  const [filterActive, setFilterActive] = useState(false);
  const [pageParam, setPageParam] = useState(1);
  const fetchApi = () => {
    return axios
      .get(`http://localhost:3001/properties?&_limit=4_page=${pageParam}`)
      .then((res) => res.data);
  };
  const {
    data,
    isError,
    error,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery("infinite", fetchApi, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });
  function addFav(id) {
    const faveOnes = data?.pages[0].filter((item) => item.id === id);
    // const addOnes=data?.pages[0].map(item=> item.id === faveOnes.id)
    setItems(faveOnes);
  }
  const filterLoc = (e) => {
    setFilterActive(true);
    e.preventDefault();
    return axios
      .get(`http://localhost:3001/properties?&q=${e.target[0].value}`)
      .then((res) => res.data);
  };
  const { data: location, mutate } = useMutation(filterLoc, {
    onSuccess: (val) => {
      setFilterItems(val);
    },
  });
  // console.log(filterItems);
  const resultItems = filterActive ? filterItems : data?.pages;
  console.log(resultItems);
  return (
    <Page name="home" className="page">
      <Link href="/favorites/" className="item-link">
        Favorites
      </Link>
      <Block>
        <form onSubmit={mutate}>
          <ListInput
            label="Filter Your City"
            type="text"
            placeholder="city name"
            clearButton
          ></ListInput>
        </form>
      </Block>
      {isLoading && <h2>loading...</h2>}
      {isError && <h2>{error.message}</h2>}
      <Block className="card--container">
        {filterItems.length > 0
          ? filterItems.map((city) => (
              <Card className="card" key={city.id} raised>
                <CardHeader>
                  <img className="card--header" src={city.images} />
                </CardHeader>
                <CardContent>
                  <h1 className="title">{city.title}</h1>
                  <p>{city.description}</p>
                </CardContent>
                <CardFooter>
                  <Button className="likeIcon" onClick={() => addFav(city.id)}>
                    <FavoriteBorderIcon />
                  </Button>
                  <Link href={`/cardDetails/${city.id}`}>Read more</Link>
                </CardFooter>
              </Card>
            ))
          : data?.pages.map((group, i) => {
              // console.log(group);
              return (
                <Fragment key={i}>
                  {group.map((city) => (
                    <Card className="card" key={city.id} raised>
                      <CardHeader>
                        <img className="card--header" src={city.images} />
                      </CardHeader>
                      <CardContent>
                        <h1 className="title">{city.title}</h1>
                        <p>{city.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className="likeIcon"
                          onClick={() => addFav(city.id)}
                        >
                          <FavoriteBorderIcon />
                        </Button>
                        <Link href={`/cardDetails/${city.id}`}>Read more</Link>
                      </CardFooter>
                    </Card>
                  ))}
                </Fragment>
              );
            })}
      </Block>
      <Button disabled={!hasNextPage} onClick={fetchNextPage}>
        <AutorenewIcon />
      </Button>
      <div>{isFetching && isFetchingNextPage ? "fetching..." : null}</div>
    </Page>
  );
}
