import React, { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SearchForm } from "./SearchForm";
import axios from "../axiosConfig";
import { ThumbDown, ThumbUp } from "@mui/icons-material";
import { toast } from "react-toastify";
import { getRandomResult, getSearchResult } from "../redux/jokes.action";
import { connect } from "react-redux";

const theme = createTheme();

function Template({ getSearch, getRandom, queryResult }) {
  const [inputForm, setInputForm] = useState({
    keywords: "",
    noOfResults: 1,
    type: "jokes",
  });

  const handleChange = (event) => {
    setInputForm({ ...inputForm, [event.target.name]: event.target.value });
  };

  const vote = (id, type, voteType) => {
    try {
      axios
        .post(type + "/" + id + "/" + voteType, null, { params: {} })
        .then((response) => {
          toast.success(response.data.message);
        });
    } catch (err) {
      console.error(err);
      toast.error(err);
    }
  };

  const handleRandom = (event) => {
    event.preventDefault();
    const options = {
      type: inputForm.type,
      params:
        inputForm.type === "memes"
          ? {
              keywords: inputForm.keywords,
            }
          : {},
    };

    getRandom(options);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const options = {
      type: inputForm.type,
      params:
        inputForm.type !== "gif"
          ? {
              number: inputForm.noOfResults,
              keywords: inputForm.keywords,
            }
          : {
              number: inputForm.noOfResults,
              query: inputForm.keywords,
            },
    };

    getSearch(options);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Jokes Search
        </Typography>
        <SearchForm
          onInputChange={handleChange}
          onSubmitClick={handleSubmit}
          onRandomClick={handleRandom}
        />
      </Container>
      <main>
        <Container sx={{ py: 8 }}>
          <Grid container spacing={4}>
            {queryResult.map((card) => {
              const mediaElement = card.hasOwnProperty("url") ? (
                <CardMedia
                  component="img"
                  image={card.url}
                  height="100%"
                  width="100%"
                  alt="Image"
                />
              ) : (
                <></>
              );
              const contentElement = card.hasOwnProperty("joke") ? (
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {card.joke}
                  </Typography>
                </CardContent>
              ) : (
                <></>
              );
              const votingElement =
                inputForm.type === "jokes" || inputForm.type === "memes" ? (
                  <CardActions>
                    <Button
                      size="small"
                      title="Up Vote"
                      onClick={() => vote(card.id, inputForm.type, "upvote")}
                    >
                      <ThumbUp />
                    </Button>
                    <Button
                      size="small"
                      title="Down Vote"
                      onClick={() => vote(card.id, inputForm.type, "downvote")}
                    >
                      <ThumbDown />
                    </Button>
                  </CardActions>
                ) : (
                  <></>
                );
              return (
                <Grid item key={card.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {mediaElement}
                    {contentElement}
                    {votingElement}
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    queryResult: state.queryResult,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSearch: (options) => {
      const callback = getSearchResult(options);
      dispatch((callbackDispatch) => callback(callbackDispatch));
    },
    getRandom: (options) => dispatch(getRandomResult(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Template);
