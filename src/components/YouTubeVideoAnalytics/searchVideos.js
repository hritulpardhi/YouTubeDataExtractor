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
  Spin,
} from "antd";
import {
  PlaySquareFilled,
  CopyOutlined,
  SearchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import "../../../src/styles.css";

const SearchVideos = () => {
  const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY
  const [modalVisible, setModalVisible] = useState(false);
  const [iFrameContent, setiFrameContent] = useState("");
  const [dataSource, setData] = useState(null);
  const [currentVideoData, setCurrentVideoData] = useState(null);
  const [error, setError] = useState(null);
  const [nextPageToken, setNextPageToken] = useState("");
  const [previousPageToken, setPreviousPageToken] = useState("");
  const [ytDescription, setYtDescription] = useState("");
  const [ytTitle, setYtTitle] = useState("");
  const [ytChannel, setYtChannel] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [ytTags, setYtTags] = useState([]);
  const [copied, setCopied] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [thumbnailData, setThumbnailData] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [totalResults, setTotalResults] = useState("");
  const [videoId, setVideoId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleViewVideo = async (row) => {
    setVideoId(row?.id?.videoId);
    setIsLoading(true);
    try {
      const response = await fetchYTVideo(row?.id?.videoId);
      handleViewVideoData(response);
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  const handleViewVideoData = (VideoData) => {
    setIsLoading(true);
    setYtDescription(VideoData?.items[0]?.snippet?.description);
    setYtTitle(VideoData?.items[0]?.snippet?.title);
    setYtChannel(VideoData?.items[0]?.snippet?.channelTitle);
    setiFrameContent(VideoData?.items[0]?.player?.embedHtml);
    setThumbnailData(VideoData?.items[0]?.snippet?.thumbnails);
    setYtTags(VideoData?.items[0]?.snippet?.tags);
    setPublishedAt(moment(VideoData?.items[0]?.snippet?.publishedAt).format("lll"));
    setModalVisible(true);
    setIsLoading(false);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const fetchYTVideo = async (videoId) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,player,statistics,topicDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`
      );
      if (!response.ok) {
        const jsonResponse = await response.json();
        message.error(jsonResponse?.error?.message);
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setCurrentVideoData(jsonData);
      return jsonData;
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchYTData = async (pageToken, searchKeyword) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${searchKeyword}&pageToken=${pageToken ? pageToken : ""}&key=${YOUTUBE_API_KEY}`
      );
      if (!response.ok) {
        const jsonResponse = await response.json();
        message.error(jsonResponse?.error?.message);
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setData(jsonData?.items);
      setPreviousPageToken(jsonData?.prevPageToken || "");
      setNextPageToken(jsonData?.nextPageToken || "");
      setTotalResults(jsonData?.pageInfo?.totalResults);
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
      render: (video_title, row) => <div>{row?.snippet?.title}</div>,
    },
    {
      title: "Channel Name",
      dataIndex: "channel_name",
      key: "channel_name",
      render: (channel_name, row) => <div>{row?.snippet?.channelTitle}</div>,
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnails",
      key: "thumbnails",
      render: (thumbnails, row) => (
        <div>
          <img
            alt={row?.snippet?.thumbnails?.default?.url}
            src={row?.snippet?.thumbnails?.default?.url}
          />
        </div>
      ),
    },
    {
      title: "View Video",
      dataIndex: "view_count",
      key: "view_count",
      render: (view_count, row) => (
        <div>
          <Button
            danger
            icon={<PlaySquareFilled />}
            onClick={() => handleViewVideo(row)}
          >
            View Video
          </Button>
        </div>
      ),
    },
    {
      title: "Published At",
      dataIndex: "publishedAt",
      key: "publishedAt",
      render: (publishedAt, row) => (
        <div>{moment(row?.snippet?.publishedAt).format("lll")}</div>
      ),
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
    }, 2000);
  };

  const downloadThumbnail = (val) => {
    window.open(thumbnailData[val]?.url);
  };

  const onFinish = (values) => {
    setSearchKeyword(values?.video_title);
    fetchYTData("", values?.video_title);
  };

  return (
    <div className="container">
      <Spin
        spinning={isLoading}
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      >
        <div className="form-container">
          <h2 className="header">Extract data from YouTube Videos!</h2>
          <Form onFinish={onFinish}>
            <Form.Item
              name="video_title"
              label="Search by title"
              rules={[{ required: true, message: "Please enter a search keyword!" }]}
            >
              <Input placeholder="Input video title" />
            </Form.Item>
            <Button
              danger
              type="primary"
              htmlType="submit"
              icon={<SearchOutlined />}
            >
              Fetch Videos!
            </Button>
          </Form>
          {dataSource?.length > 0 && (
            <div className="table-container">
              <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                style={{ width: "100%" }}
              />
              <div className="pagination-buttons">
                <Button
                  disabled={!previousPageToken}
                  onClick={() => changePage("previous")}
                >
                  Previous Page
                </Button>
                <Button
                  onClick={() => changePage("next")}
                  disabled={!nextPageToken}
                >
                  Next Page
                </Button>
              </div>
            </div>
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
                Published At : <Input value={publishedAt} />
                Channel Title : <Input value={ytChannel} />
                Video Title :{" "}
                <Input
                  value={ytTitle}
                  addonAfter={<CopyOutlined onClick={() => handleCopy(ytTitle)} />}
                />
                Video Description :{" "}
                <CopyOutlined onClick={() => handleCopy(ytDescription)} />
                <TextArea rows={8} value={ytDescription} />
                Video Tags :
                <Input
                  value={ytTags}
                  addonAfter={<CopyOutlined onClick={() => handleCopy(ytTags)} />}
                />
                <Divider />
                Download Thumbnail :<br />
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
                <Divider />
              </div>
            </Card>
          </Modal>
          {messageVisible && <div className="message-container">Copied to clipboard</div>}
        </div>
      </Spin>
    </div>
  );
};

export default SearchVideos;
