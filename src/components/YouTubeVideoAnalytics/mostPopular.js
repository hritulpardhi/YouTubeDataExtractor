import React, { useState } from "react";
import {
  Button,
  Modal,
  Table,
  Card,
  Input,
  message,
  Divider,
  Form,
  Select,
  Spin,
} from "antd";
import {
  PlaySquareFilled,
  CopyOutlined,
  SearchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import countryCodes from "../../constants/country_codes";
import moment from "moment";

const MostPopular = () => {
  const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY
  const countryCodeData = countryCodes;
  const [isLoading, setIsLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [iFrameContent, setiFrameContent] = useState("");
  const [dataSource, setData] = useState(null);
  const [error, setError] = useState(null);
  const [nextPageToken, setNextPageToken] = useState("");
  const [previousPageToken, setPreviousPageToken] = useState("");
  const [ytDescription, setYtDescription] = useState("");
  const [ytTitle, setYtTitle] = useState("");
  const [ytChannel, setYtChannel] = useState("");
  const [ytTags, setYtTags] = useState([]);
  const [copied, setCopied] = useState(false); // Track whether content is copied
  const [messageVisible, setMessageVisible] = useState(false); // Track message visibility
  const [thumbnailData, setThumbnailData] = useState(""); // Track message visibility
  const [selectedCountry, setSelectedCountry] = useState(""); // Track message visibility
  const [selectedCountryName, setSelectedCountryName] = useState(""); // Track message visibility
  const [publishedAt, setPublishedAt] = useState(""); // Track message visibility

  const handleCountryChange = (value) => {
    const selectedCountryData = countryCodeData.find(
      (country) => country.name === value
    );
    setSelectedCountry(selectedCountryData?.alpha2);
    setSelectedCountryName(selectedCountryData?.name);
  };

  const handleViewVideo = (row) => {
    setIsLoading(true);
    setYtDescription(row?.snippet?.description);
    setYtTitle(row?.snippet?.title);
    setYtChannel(row?.snippet?.channelTitle);
    setiFrameContent(row?.player?.embedHtml);
    setThumbnailData(row?.snippet?.thumbnails);
    setPublishedAt(moment(row?.snippet?.publishedAt).format("lll"));
    setYtTags(row?.snippet?.tags);
    setModalVisible(true);
    setIsLoading(false);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const fetchYTData = async (pageToken) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,player,statistics,topicDetails&key=${YOUTUBE_API_KEY}&maxResults=5&chart=mostPopular&pageToken=${pageToken}&regionCode=${selectedCountry}`
      );
      if (!response.ok) {
        const jsonResponse = await response.json();
        message.error(jsonResponse?.error?.message);
        throw new Error(jsonResponse?.error?.message);
      }
      const jsonData = await response.json();
      setData(jsonData?.items);
      setPreviousPageToken(jsonData?.prevPageToken || "");
      setNextPageToken(jsonData?.nextPageToken || "");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const changePage = (value) => {
    if (value === "first") {
      fetchYTData("");
    }
    if (value === "next") {
      fetchYTData(nextPageToken);
    }
    if (value === "previous") {
      fetchYTData(previousPageToken);
    }
  };

  const columns = [
    {
      title: "Video Title",
      dataIndex: "video_title",
      key: "video_title",
      render: (video_title, row) => {
        return <div>{row?.snippet?.title}</div>;
      },
    },
    {
      title: "Channel Name",
      dataIndex: "channel_name",
      key: "channel_name",
      render: (channel_name, row) => {
        return <div>{row?.snippet?.channelTitle}</div>;
      },
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnails",
      key: "thumbnails",
      render: (thumbnails, row) => {
        return (
          <div>
            <img
              alt={row?.snippet?.thumbnails?.default?.url}
              src={row?.snippet?.thumbnails?.default?.url}
            />
          </div>
        );
      },
    },
    {
      title: "View Count",
      dataIndex: "view_count",
      key: "view_count",
      render: (view_count, row) => {
        const viewCount = row?.statistics?.viewCount;
        const formattedViewCount = viewCount
          ? viewCount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : "";
        return <div>{formattedViewCount}</div>;
      },
    },
    {
      title: "Likes Count",
      dataIndex: "likeCount",
      key: "likeCount",
      render: (likeCount, row) => {
        const viewCount = row?.statistics?.likeCount;
        const formattedViewCount = viewCount
          ? viewCount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : "";
        return <div>{formattedViewCount}</div>;
      },
    },
    {
      title: "Video Details",
      dataIndex: "view_count",
      key: "view_count",
      render: (view_count, row) => {
        return (
          <div>
            <Button
              danger
              icon={<PlaySquareFilled />}
              onClick={() => handleViewVideo(row)}
            >
              View Video Details
            </Button>
          </div>
        );
      },
    },
    {
      title: "Published At",
      dataIndex: "publishedAt",
      key: "publishedAt",
      render: (publishedAt, row) => {
        return <div>{moment(row?.snippet?.publishedAt).format("lll")}</div>;
      },
    },
  ];
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    showMessage();
  };

  const showMessage = () => {
    message.success("Copied to clipboard");
    setMessageVisible(true);
    setTimeout(() => {
      setMessageVisible(false);
    }, 2000); // Hide message after 2 seconds
  };

  const downloadThumbnail = (val) => {
    window.open(thumbnailData[val]?.url);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div style={{ width: "100%" }}>
        <Spin
          spinning={isLoading}
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 24,
              }}
              spin
            />
          }
        >
          <h2>
            Get Youtube's Most Popular Videos in{" "}
            {selectedCountryName
              ? selectedCountryName
              : "your favourite country"}{" "}
            today!
          </h2>
          <Form>
            <Form.Item
              name="country_name"
              label="Search by country"
              rules={[
                {
                  required: true,
                  message: "Please select a country!",
                },
              ]}
            >
              <Select
                showSearch
                onChange={(value) => handleCountryChange(value)}
                placeholder="Select a country"
              >
                {countryCodeData.map((country) => (
                  <Select.Option value={country.name} key={country.name}>
                    {country.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
          <h2>
            <Button
              danger
              type="primary"
              onClick={() => changePage("first")}
              icon={<SearchOutlined />}
            >
              Fetch Videos!
            </Button>
          </h2>
          {dataSource?.length > 0 && (
            <>
              <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                style={{ width: "100%" }}
              />
              <div style={{justifyContent: "space-between", marginTop: "10px" }}>
                <Button
                  disabled={!previousPageToken}
                  onClick={() => changePage("previous")}
                >
                  Previous Page
                </Button>
                <Button onClick={() => changePage("next")}>Next Page</Button>
              </div>
            </>
          )}
          <Modal
            title="YouTube Video Details"
            visible={modalVisible}
            onCancel={handleModalClose}
            footer={null}
            destroyOnClose
            width={"50%"}
          >
            {iFrameContent && (
              <div
                style={{ textAlign: "center" }}
                dangerouslySetInnerHTML={{ __html: iFrameContent }}
              />
            )}
            <Card title="Video Details">
              <div style={{ padding: "10px" }}>
                Published At : <Input value={publishedAt}></Input>
                Channel Title : <Input value={ytChannel}></Input>
                Video Title :{" "}
                <Input
                  value={ytTitle}
                  addonAfter={
                    <CopyOutlined onClick={() => handleCopy(ytTitle)} />
                  }
                ></Input>
                Video Description :{" "}
                <CopyOutlined onClick={() => handleCopy(ytDescription)} />
                <TextArea rows={8} value={ytDescription}></TextArea>
                Video Tags :
                <Input
                  value={ytTags}
                  addonAfter={
                    <CopyOutlined onClick={() => handleCopy(ytTags)} />
                  }
                ></Input>
                <Divider></Divider>
                Download Thumbnail :&nbsp;
                <Button onClick={() => downloadThumbnail("default")}>
                  Default(120*90)
                </Button>
                <Button onClick={() => downloadThumbnail("medium")}>
                  Medium(320*180)
                </Button>
                <Button onClick={() => downloadThumbnail("high")}>
                  High(480*360)
                </Button>
                <Button onClick={() => downloadThumbnail("standard")}>
                  Standard(640*480)
                </Button>
                <Button onClick={() => downloadThumbnail("maxres")}>
                  Max Res(1280*720)
                </Button>
                <Divider></Divider>
              </div>
            </Card>
          </Modal>
          {messageVisible && (
            <div style={{ marginTop: 10 }}>Copied to clipboard</div>
          )}
        </Spin>
      </div>
    </div>
  );
};

export default MostPopular;
