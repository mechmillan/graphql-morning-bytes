import React, { Component } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import { DisplayWrapper, Group, Heading, Data, Wrapper } from "./App.css.js";

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Quote />
      </Wrapper>
    );
  }
}

// craft your queries
// more realistically, you would make the symbol a param
// and wait for user form input submission before calling the query
const GET_A_QUOTE = gql`
  {
    getQuote(symbol: "SPOT") {
      close
      high
      low
      open
      week52High
    }
  }
`;

// provided Query component returns information about results
// i.e is it loading, does it have errors, or data obj
const Quote = () => (
  <Query query={GET_A_QUOTE}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error...</p>;

      return (
        <div>
          {!loading && (
            <DisplayWrapper>
              <Group>
                <Heading>Close</Heading>

                <Data>{data.getQuote.close}</Data>
              </Group>

              <Group>
                <Heading>High</Heading>

                <Data>{data.getQuote.high} </Data>
              </Group>

              <Group>
                <Heading>Low</Heading>

                <Data>{data.getQuote.low} </Data>
              </Group>

              <Group>
                <Heading>Open</Heading>

                <Data>{data.getQuote.open} </Data>
              </Group>

              <Group>
                <Heading>Week 52 High</Heading>

                <Data>{data.getQuote.week52High} </Data>
              </Group>
            </DisplayWrapper>
          )}
        </div>
      );
    }}
  </Query>
);

export default App;
