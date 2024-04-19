import React, { useState } from "react";
import YtData from "../../constants/ytdata";
import { Button, Modal, Table, Form, Tabs } from "antd";
import { AreaChartOutlined, PlaySquareFilled, SearchOutlined, YoutubeFilled } from "@ant-design/icons";
import MostPopular from "./mostPopular";

const YoutubeApp = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: <span><AreaChartOutlined /> Most Popular Videos today</span>,
      children: <MostPopular />,
    },
    {
      key: "2",
      label: <span><SearchOutlined /> Search SEO</span>,
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Tab 3",
      children: "Content of Tab Pane 3",
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default YoutubeApp;
