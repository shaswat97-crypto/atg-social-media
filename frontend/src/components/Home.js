import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";

function Home() {
  const [postContent, setPostContent] = useState("");
  const [clicked, setClicked] = useState(false);
  const [posts, setPosts] = useState();
  const [currid, setCurrid] = useState(-1);
  const [updateText, setUpdateText] = useState("");
  useEffect(() => {
    console.log("chala");
    async function fetchPosts() {
      let obj = await axios.get("http://localhost:5000/api/v1/posts");
      let data = await obj.data;
      console.log(data);
      setPosts(data);
    }
    fetchPosts();
  }, [clicked]);

  const handleAdd = async () => {
    const obj = {
      content: postContent,
    };
    const res = await axios.post("http://localhost:5000/api/v1/posts", obj);
    setClicked((prev) => !prev);
    setPostContent("");
    console.log(res.data);
  };

  const handleClick = async (e, id) => {
    console.log(e.target.nodeName, e.target.innerText);
    if (e.target.nodeName === "BUTTON") {
      switch (e.target.innerText) {
        case "Update":
          setCurrid(id);
          break;
        case "Update post":
          let obj = {
            content: updateText,
          };
          let res = await axios.put(
            `http://localhost:5000/api/v1/posts/${id}`,
            obj
          );
          console.log(res.data);
          setCurrid(-1);
          setUpdateText("");
          setClicked((prev) => !prev);
          break;
        case "Delete":
          let dres = await axios.delete(
            `http://localhost:5000/api/v1/posts/${id}`
          );
          console.log(dres);
          setCurrid(-1);
          setUpdateText("");
          setClicked((prev) => !prev);
          break;
        case "Like":
          let lres = await axios.put(
            `http://localhost:5000/api/v1/posts/${id}/like`
          );
          console.log(lres);
          setClicked((prev) => !prev);
          break;
        case "Dislike":
          let dlres = await axios.put(
            `http://localhost:5000/api/v1/posts/${id}/like`
          );
          console.log(dlres);
          setClicked((prev) => !prev);
          break;
        case "Cancel":
          setCurrid(-1);
          setUpdateText("");
          setClicked((prev) => !prev);
          break;
      }
    }
  };
  return (
    <div className="homecont">
      <div className="home">
        <textarea
          placeholder="What's on your mind..."
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          className="postContent"
          cols="30"
          rows="10"
        ></textarea>
        <button className="addnew" onClick={handleAdd}>
          Add new post
        </button>
        <div className="posts">
          <h2>All posts</h2>
          {posts && (
            <>
              {posts.map((post) => (
                <div
                  key={post._id}
                  onClick={(e) => handleClick(e, post._id)}
                  className="singlepostcont"
                >
                  {post._id === currid && (
                    <div className="updatewindow">
                      <textarea
                        placeholder={post.content}
                        value={updateText}
                        onChange={(e) => setUpdateText(e.target.value)}
                        cols="30"
                        rows="10"
                      ></textarea>
                      <div className="bcont">
                        <button className="updatepost">Update post</button>
                        <button className="updatepost">Cancel</button>
                      </div>
                    </div>
                  )}
                  {post._id !== currid && (
                    <div className="posttext">{post.content}</div>
                  )}
                  <button className="button-18" disabled={currid != -1}>
                    Update
                  </button>
                  <button className="button-18">Delete</button>
                  <button className="button-1">
                    {post.likes ? "Dislike" : "Like"}
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
