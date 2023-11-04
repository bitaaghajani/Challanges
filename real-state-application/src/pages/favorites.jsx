import {
  Block,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Link,
  Navbar,
  Page,
} from "framework7-react";
import React from "react";
import useStore from "../js/stores";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function Favorites() {
  const { items, setItems } = useStore((state) => state);
  return (
    <Page className="page">
      <Navbar title="Favorites" backLink="Back"></Navbar>
      <Block className="card--container">
        {items.map((items) => (
          <Card className="card" key={items.id} raised>
            <CardHeader>
              <img className="card--header" src={items.images} />
            </CardHeader>
            <CardContent>
              <h1 className="title">{items.title}</h1>
              <p>{items.description}</p>
            </CardContent>
            <CardFooter>
              <Button className="likeIcon">
                <FavoriteIcon />
              </Button>
              <Link href={`/cardDetails/${items.id}`}>Read more</Link>
            </CardFooter>
          </Card>
        ))}
      </Block>
    </Page>
  );
}
