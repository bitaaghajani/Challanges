import {
  Page,
  Navbar,
  Block,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Chip,
} from "framework7-react";
import React, { useEffect } from "react";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import "framework7-icons";
import axios from "axios";
import { useQuery } from "react-query";

export default function CardDetails(prop) {
  console.log(prop);
  const fetchApi = () => {
    return axios
      .get(`http://localhost:3001/properties/${prop.id}`)
      .then((res) => res.data);
  };
  const { data: item, isLoading, isSuccess } = useQuery("details", fetchApi);
  return (
    <Page className="page">
      <Navbar title="Details" backLink="Back"></Navbar>
      <Block className="card--container">
        {isLoading && <h2>loading...</h2>}
        {!isLoading && isSuccess && (
          <Card className="card--details" key={item?.id} raised>
            <CardHeader>
              <img className="card--header" src={item?.images} />
            </CardHeader>
            <CardContent>
              <h1 className="title">{item?.price}</h1>
              <h4>{item?.title}</h4>
              <br />
              <Chip text={item?.description} />
              <br />
              <Chip text={item?.agent?.name} />
              <br />
              <Chip text={item?.agent?.email} />
              <br />
              <Chip text={item?.agent?.phone} />
              {/* how to give style with tag name??? */}
            </CardContent>
            <CardFooter>
              <Button raised className="btn--call">
                <CallIcon />
              </Button>
              <Button raised className="btn--message">
                {/* <i class="f7-icons">house</i> */}
                <EmailIcon />
              </Button>
            </CardFooter>
          </Card>
        )}
        )
      </Block>
    </Page>
  );
}
