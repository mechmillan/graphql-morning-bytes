import React, { Component } from "react";

import {
  Data,
  DisplayWrapper,
  Heading,
  Group,
  Input,
  Wrapper
} from "./App.css";

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Company />

        {/* similar for <Quote /> component */}
      </Wrapper>
    );
  }
}

// stateful component
class Company extends Component {
  state = {
    symbol: "",
    data: {
      Company: {}
    }
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { symbol } = this.state;

    const BASIC_GRAPHQL_ENDPOINT = "http://localhost:4775/graphql";

    // perform basic fetch/query on Company
    fetch(BASIC_GRAPHQL_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        query: `{
          Company(symbol: "${symbol}") {
            CEO
            companyName
            description
            exchange
          }
        }`
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(res => res.data)
      .then(data => {
        this.setState({ data: { Company: data.Company } });
      })
      .catch(error => console.error(error));
  };

  handleInputChange = event => {
    const { value } = event.currentTarget;

    this.setState({ symbol: value });
  };

  render() {
    const { data } = this.state;

    return (
      <>
        <form onSubmit={this.handleFormSubmit}>
          <label>
            <Input
              name="symbol"
              onChange={this.handleInputChange}
              placeholder="Search by symbol..."
              type="text"
            />
          </label>
        </form>

        {/* responsible for catching errors */}
        {data.Company !== null ? (
          <Display data={data.Company} />
        ) : (
          <p>error!</p>
        )}
      </>
    );
  }
}

// view-only functional component
const Display = ({ data }) => {
  return (
    <DisplayWrapper>
      <Group>
        <Heading>Company Name</Heading>

        <Data>{data.companyName}</Data>
      </Group>

      <Group>
        <Heading>CEO</Heading>

        <Data>{data.CEO} </Data>
      </Group>

      <Group>
        <Heading>Description</Heading>

        <Data>{data.description} </Data>
      </Group>

      <Group>
        <Heading>Exchange</Heading>

        <Data>{data.exchange} </Data>
      </Group>
    </DisplayWrapper>
  );
};

export default App;
