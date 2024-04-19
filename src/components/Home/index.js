import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Typography } from "antd";

const { Header, Content } = Layout;
const { Title } = Typography;

const HomePage = () => {
  return (
    <Layout>
      <Header>
        <Title level={2} style={{ color: "white" }}>
          Welcome to My App
        </Title>
      </Header>
    </Layout>
  );
};

export default HomePage;
