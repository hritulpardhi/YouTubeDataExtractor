import React, { useEffect, useState } from "react";
import citiesData from "../../constants/cities";
import { Button, Card, Col, Form, Row, Select, Spin } from "antd";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";

const WeatherApp = () => {
  const citiesDataSet = citiesData;
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLng, setSelectedLng] = useState("");
  const [selectedLat, setSelectedLat] = useState("");
  const [weatherDataResponse, setWeatherDataResponse] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showGraph, setShowGraph] = useState(false);

  const handleCityChange = (value) => {
    const selectedCityData = citiesDataSet.find((city) => city.city === value);
    setSelectedCity(selectedCityData?.city);
    setSelectedLng(selectedCityData?.lng);
    setSelectedLat(selectedCityData?.lat);
  };

  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${selectedLat}&longitude=${selectedLng}&hourly=temperature_2m&forecast_days=10&timezone=auto`
    );
    const jsonResponse = await response.json();
    setWeatherDataResponse(jsonResponse);
    setShowGraph(true);
    setIsLoading(false);
  };

  const weatherDataGraph = () => {
    if (!weatherDataResponse.hourly) {
      return null;
    }
    const labels = weatherDataResponse?.hourly?.time.map((time) =>
      moment(time).format("MMMM Do YYYY, h:mm:ss a")
    );

    const temperatureData = {
      labels: labels,
      datasets: [
        {
          label: "Temperature",
          data: weatherDataResponse?.hourly?.temperature_2m,
          fill: true,
          backgroundColor: "rgba(72,192,192,0.2)",
          borderColor: "rgba(35,192,192,1)",
        },
      ],
    };

    const options = {
      plugins: {
        title: {
          display: true,
          text: "Temperature forecast for next 10 days",
        },
      },
    };

    return (
      <Row>
        {showGraph && labels.length > 0 ? (
          <>
            <Line data={temperatureData} options={options} />{" "}
          </>
        ) : null}
      </Row>
    );
  };

  return (
    <div>
      <Spin spinning={isLoading}>
        Welcome to Weather app! Please select a city from the following list.
        <Form>
          <Form.Item name="city" label="Select City">
            <Select
              showSearch
              onChange={(value) => handleCityChange(value)}
              placeholder="Select a city"
            >
              {citiesDataSet.map((city) => (
                <Select.Option value={city.city} key={city.city}>
                  {city.city}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          {selectedCity ? (
            <div>
              <Row>
                <Col>
                  {selectedCity}'s Latitude is {selectedLat} and Longitude is{" "}
                  {selectedLng}
                </Col>
              </Row>
            </div>
          ) : null}
        </Form>
        <div
          style={{ display: "flex", justifyContent: "center", padding: "10px" }}
        >
          <Button onClick={fetchData} disabled={!selectedCity} icon={<SearchOutlined />}>
            Fetch
          </Button>
        </div>
        {weatherDataResponse?.latitude ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card style={{ width: "80%" }}>{weatherDataGraph()}</Card>
          </div>
        ) : null}
      </Spin>
    </div>
  );
};

export default WeatherApp;
