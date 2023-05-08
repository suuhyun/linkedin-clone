import React, { useState, useEffect } from "react";
import "./Feed.css";
import Post from "./Post";
import InputOption from "./InputOption";
import CreateIcon from "@mui/icons-material/Create";
import ImageIcon from "@mui/icons-material/Image";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import { db } from "./firebase";
import {
  serverTimestamp,
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

function Feed() {
  const user = useSelector(selectUser);
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const postsCol = collection(db, "posts");
    const q = query(postsCol, orderBy("timestamp", "desc"))
    onSnapshot(q, (docsSnap) => {
      let postsList = [];
      docsSnap.forEach((doc) => {
        postsList.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setPosts(postsList);
    });
  }, []);

  const sendPost = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "posts"), {
      name: user.displayName,
      description: user.email,
      message: input,
      photoURL: user.photoURL || "",
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
            />
            <button onClick={sendPost} type="submit">
              Send
            </button>
          </form>
        </div>
        <div className="feed__inputOptions">
          <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
          <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
          <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
          <InputOption
            Icon={CalendarViewDayIcon}
            title="Write article"
            color="#7FC15E"
          />
        </div>
      </div>
      {posts.map(({ id, data: { name, description, message } }) => (
        <Post
          key={id}
          name={name}
          description={description}
          message={message}
        />
      ))}
    </div>
  );
}

export default Feed;
