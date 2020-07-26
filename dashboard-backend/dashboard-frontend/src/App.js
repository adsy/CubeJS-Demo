import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import moment from "moment";
import numeral, { value } from "numeral";
import cubejs from "@cubejs-client/core";
import Chart from "./Chart.js";
import { DateRangePicker } from "rsuite";

import "react-datepicker/dist/react-datepicker.css";
import "rsuite/dist/styles/rsuite-default.css";

console.log(process.env.REACT_APP_CUBEJS_TOKEN);
const cubejsApi = cubejs(process.env.REACT_APP_CUBEJS_TOKEN, {
  apiUrl: process.env.REACT_APP_API_URL
});
const numberFormatter = item => numeral(item).format("0,0");
const dateFormatter = item => moment(item).format("MMM YY");

const renderSingleValue = (resultSet, key) => (
  <h1 height={300}>{numberFormatter(resultSet.chartPivot()[0][key])}</h1>
);

class App extends Component {
  state = {
    value: [new Date("2019/1/1"), new Date("2019/6/31")]
  };

  HandleDateFormat = date => {
    let formatted_date =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    return formatted_date;
  };

  render() {
    return (
      <Container fluid>
        <div className="pb-2">
          <DateRangePicker
            value={this.state.value}
            onChange={value => {
              this.setState({ value });
              console.log(value);
              console.log(this.state.value[0], this.state.value[1]);
            }}
          />
        </div>
        <Row>
          <Col sm="2">
            <Chart
              cubejsApi={cubejsApi}
              title="Settled Listings Count"
              query={{
                measures: ["Listings.count"],
                timeDimensions: [
                  {
                    dimension: "Listings.systemCtime",
                    dateRange: [this.state.value[0], this.state.value[1]]
                  }
                ],
                filters: [
                  {
                    dimension: "Listings.dateActualSettlement",
                    operator: "set"
                  }
                ]
              }}
              render={resultSet =>
                renderSingleValue(resultSet, "Listings.count")
              }
            />
          </Col>
          <Col sm="2">
            <Chart
              cubejsApi={cubejsApi}
              title="Published Listings Count"
              query={{
                measures: ["Listings.count"],
                timeDimensions: [
                  {
                    dimension: "Listings.systemCtime",
                    dateRange: [this.state.value[0], this.state.value[1]]
                  }
                ],
                filters: [
                  {
                    dimension: "Listings.systemPublicationTime",
                    operator: "set"
                  }
                ]
              }}
              render={resultSet =>
                renderSingleValue(resultSet, "Listings.count")
              }
            />
          </Col>
          <Col sm="2">
            <Chart
              cubejsApi={cubejsApi}
              title="Withdrawn Listings Count"
              query={{
                measures: ["Listings.count"],
                timeDimensions: [
                  {
                    dimension: "Listings.systemCtime",
                    dateRange: [this.state.value[0], this.state.value[1]]
                  }
                ],
                dimensions: ["Listings.systemListingState"],
                filters: [
                  {
                    dimension: "Listings.systemListingState",
                    operator: "equals",
                    values: ["withdrawn"]
                  }
                ]
              }}
              render={resultSet =>
                renderSingleValue(resultSet, "Listings.count")
              }
            />
          </Col>
          <Col sm="2">
            <Chart
              cubejsApi={cubejsApi}
              title="Leased Listings Count"
              query={{
                measures: ["Listings.count"],
                timeDimensions: [
                  {
                    dimension: "Listings.systemCtime",
                    dateRange: [this.state.value[0], this.state.value[1]]
                  }
                ],
                dimensions: ["Listings.systemListingState"],
                filters: [
                  {
                    dimension: "Listings.systemListingState",
                    operator: "equals",
                    values: ["leased"]
                  }
                ]
              }}
              render={resultSet =>
                renderSingleValue(resultSet, "Listings.count")
              }
            />
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col sm="6">
            <div>
              <Chart
                className="col-6"
                cubejsApi={cubejsApi}
                title={
                  "Listings settled during " +
                  this.HandleDateFormat(this.state.value[0]) +
                  " - " +
                  this.HandleDateFormat(this.state.value[1])
                }
                query={{
                  measures: ["Listings.count"],
                  timeDimensions: [
                    {
                      dimension: "Listings.systemCtime",
                      granularity: "day",
                      dateRange: [this.state.value[0], this.state.value[1]]
                    }
                  ],
                  order: {},
                  filters: [
                    {
                      dimension: "Listings.dateActualSettlement",
                      operator: "set"
                    }
                  ]
                }}
                render={resultSet => (
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={resultSet.chartPivot()}>
                      <XAxis dataKey="category" tickFormatter={dateFormatter} />
                      <YAxis tickFormatter={numberFormatter} />
                      <Tooltip labelFormatter={dateFormatter} />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Area
                        type="monotone"
                        dataKey="Listings.count"
                        name="Listings"
                        stroke="rgb(106, 110, 229)"
                        fill="rgba(106, 110, 229, .16)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              />
            </div>
          </Col>
          <Col sm="6">
            <Chart
              className="col-6"
              cubejsApi={cubejsApi}
              title={
                "Listings published during " +
                this.HandleDateFormat(this.state.value[0]) +
                " - " +
                this.HandleDateFormat(this.state.value[1])
              }
              query={{
                measures: ["Listings.count"],
                timeDimensions: [
                  {
                    dimension: "Listings.systemCtime",
                    granularity: "day",
                    dateRange: [this.state.value[0], this.state.value[1]]
                  }
                ],
                order: {},
                filters: [
                  {
                    dimension: "Listings.systemPublicationTime",
                    operator: "set"
                  }
                ]
              }}
              render={resultSet => (
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={resultSet.chartPivot()}>
                    <XAxis dataKey="category" tickFormatter={dateFormatter} />
                    <YAxis tickFormatter={numberFormatter} />
                    <Tooltip labelFormatter={dateFormatter} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Area
                      type="monotone"
                      dataKey="Listings.count"
                      name="Listings"
                      stroke="rgb(106, 110, 229)"
                      fill="rgba(106, 110, 229, .16)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
