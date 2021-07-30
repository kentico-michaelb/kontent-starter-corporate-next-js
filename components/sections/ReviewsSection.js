import React from "react";
import get from "lodash.get";
import { Card, CardContent, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import { RichText } from "..";

const useStyles = makeStyles((theme) => ({
  section: {
    padding: theme.spacing(2)
  },
  intro: {
    textAlign: "center"
  },
  reviewCard: {
    height: "100%"
  }
}));

function ReviewsSection(props) {
  const section = get(props, "section", null);
  const classes = useStyles();


  return (
    <section id={get(section, "system.codename", null)} className={classes.section}>
      <Container>
        <div className={classes.intro}>
          {get(section, "title.value", null) && (
            <Typography variant="h2">{get(section, "title.value", null)}</Typography>
          )}
          {get(section, "subtitle.value", null) && (
            <Typography variant="subtitle1" >
              <RichText
                {...props}
                richTextElement={get(section, "subtitle", null)}
              />
            </Typography>
          )}
        </div>


        {get(section, "reviews.value[0]", null) && (
          <Grid container spacing={2} alignItems="stretch">
            {get(section, "reviews.value", []).map((review, index) => {
              const author = get(review, "author.value[0]");
              return (
                <Grid item md={4} sm={12} className={classes.review} key={index}>
                  <Card className={classes.reviewCard} >
                    <CardContent>
                      <Typography component="blockquote">
                        <RichText
                          {...props}
                          richTextElement={get(review, "content", null)}
                        />
                      </Typography>
                      <Typography component="cite">{get(author, "first_name.value")} {get(author, "last_name.value")}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </section>
  );
}

export default ReviewsSection;
