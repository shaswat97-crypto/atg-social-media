import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";

function Home() {
  const [postContent, setPostContent] = useState("");
  const [clicked, setClicked] = useState(false);
  const [comment, setComment] = useState(false);
  const [posts, setPosts] = useState();
  const [currid, setCurrid] = useState(-1);
  const [updateText, setUpdateText] = useState("");
  useEffect(() => {
    console.log("chala");
    async function fetchPosts() {
      let obj = await axios.get("/api/v1/posts");
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
    const res = await axios.post("/api/v1/posts", obj);
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
          setComment(false);
          break;
        case "Update post":
          let obj = {
            content: updateText,
          };
          let res = await axios.put(
            `/api/v1/posts/${id}`,
            obj
          );
          console.log(res.data);
          setCurrid(-1);
          setUpdateText("");
          setClicked((prev) => !prev);
          setComment(false);
          break;
        case "Delete":
          let dres = await axios.delete(
            `/api/v1/posts/${id}`
          );
          console.log(dres);
          setCurrid(-1);
          setUpdateText("");
          setClicked((prev) => !prev);
          break;
        case "Like":
          let lres = await axios.put(
            `/api/v1/${id}/like`
          );
          console.log(lres);
          setClicked((prev) => !prev);
          break;
        case "Dislike":
          let dlres = await axios.put(
            `/api/v1/${id}/like`
          );
          console.log(dlres);
          setClicked((prev) => !prev);
          break;
        case "Cancel":
          setCurrid(-1);
          setUpdateText("");
          setClicked((prev) => !prev);
          break;
        case "Comment":
          setCurrid(id);
          setComment(true);
          break;
        case "Add comment":
          let objC = {
            comment: updateText,
          };
          let resC = await axios.post(
            `/api/v1/${id}/comment`,
            objC
          );
          console.log(resC.data);
          setCurrid(-1);
          setUpdateText("");
          setClicked((prev) => !prev);
          setComment(false);
          break;
      }
    }
  };
  console.log(posts)
  return (
    <div className="homecont">
      <h2>My Social Media</h2>
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
          {posts && posts.length == 0 && <h3 style={{textAlign:'center'}}>No posts to show</h3>}
          {posts && (
            <>
              {posts.map((post) => (
                <div
                  key={post._id}
                  onClick={(e) => handleClick(e, post._id)}
                  className="singlepostcont"
                >
                  {post._id === currid && !comment && (
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

                  {post._id === currid && comment && (
                    <div className="updatewindow">
                      <textarea
                        placeholder={post.content}
                        value={updateText}
                        onChange={(e) => setUpdateText(e.target.value)}
                        cols="30"
                        rows="10"
                      ></textarea>
                      <div className="bcont">
                        <button className="updatepost">Add comment</button>
                        <button className="updatepost">Cancel</button>
                      </div>
                    </div>
                  )}

                  {post._id !== currid && (
                    <div className="posttext">{post.content}</div>
                  )}
                   {post.comments && post.comments.length>0 && (
                    <div className="commentcont">
                      <h3>Comments</h3>
                      {
                        post.comments.map(com => (
                          <div key={com}>{com}</div>
                        ))
                      }
                    </div>
                  )}
                 <div className="buttoncont">
                 <button className="button-18" disabled={currid != -1}>
                    Update
                  </button>
                  <button className="button-18">Delete</button>
                  <button className="button-18" disabled={currid != -1}>
                    Comment
                  </button>
                  <button className="button-1">
                    {post.likes ? "Dislike" : "Like"}
                  </button>
                 </div>
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
