import React, { useState } from "react";
import { Button, Modal, Table, Card, Input, message } from "antd";
import { PlaySquareFilled, CopyOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const MostPopular = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [iFrameContent, setiFrameContent] = useState("");
  const [dataSource, setData] = useState(null);
  const [error, setError] = useState(null);
  const [nextPageToken, setNextPageToken] = useState("");
  const [previousPageToken, setPreviousPageToken] = useState("");
  const [ytDescription, setYtDescription] = useState("");
  const [ytTitle, setYtTitle] = useState("");
  const [ytChannel, setYtChannel] = useState("");
  const [copied, setCopied] = useState(false); // Track whether content is copied
  const [messageVisible, setMessageVisible] = useState(false); // Track message visibility

  const handleViewVideo = (row) => {
    setYtDescription(row?.snippet?.description);
    setYtTitle(row?.snippet?.title);
    setYtChannel(row?.snippet?.channelTitle);
    setiFrameContent(row?.player?.embedHtml);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const fetchYTData = async (pageToken) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,player,statistics,topicDetails&key=AIzaSyCDyIisTfvj9I5zq08Sa23DW74kNjl6uYA&maxResults=5&chart=mostPopular&pageToken=${pageToken}&regionCode=IN`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setData(jsonData?.items);
      setPreviousPageToken(jsonData?.prevPageToken || "");
      setNextPageToken(jsonData?.nextPageToken || "");
    } catch (error) {
      setError(error.message);
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
      title: "View Video",
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
              View Video
            </Button>
          </div>
        );
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

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div>
        <h2>Youtube's Most Popular Videos in India today!</h2>
        <h2>
          <Button onClick={() => changePage("first")}>Fetch Videos!</Button>
        </h2>
        {dataSource?.length > 0 && (
          <>
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              style={{ width: "100%" }}
            />
            <Button
              disabled={!previousPageToken}
              onClick={() => changePage("previous")}
            >
              Previous Page
            </Button>
            <Button onClick={() => changePage("next")}>Next Page</Button>
          </>
        )}
        <Modal
          title="YouTube Video"
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
            </div>
          </Card>
        </Modal>
        {messageVisible && (
          <div style={{ marginTop: 10 }}>Copied to clipboard</div>
        )}
      </div>
    </div>
  );
};

export default MostPopular;
