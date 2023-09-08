import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

import "./index.css";

function HomePage() {
  const [friend, setFriend] = useState([]);
  const navigete = useNavigate();
  const fetchFriend = async () => {
    try {
      const response = await axios.get("/users");
      console.log(response.data);
      setFriend(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleNavigate = (userId) => {
    if (userId == 1) navigete("/profile");
    else navigete(`/profile/${userId}`);
  };

  useEffect(() => {
    fetchFriend();
  }, []);

  return (
    <div className="App">
      <h1>Home Page</h1>
      {friend.map((f) => (
        <div
          className="friend"
          key={f.id}
          onClick={() => {
            handleNavigate(f.id);
          }}
        >
          <h3>{f.name}</h3>
          <h5>
            {f.email}, {f.phone}
          </h5>
        </div>
      ))}
    </div>
  );
}
function ProfilePage() {
  return <div className="App">Profile Page</div>;
}

function FriendPage() {
  const { userId } = useParams();
  const [friend, setFriend] = useState(null);

  const fetchFriendDetail = async () => {
    try {
      const { data } = await axios.get(`/users/${userId}`);
      setFriend(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFriendDetail();
  }, []);
  return (
    <div className="App">
      {friend && (
        <div className="friend">
          <h3>{friend.name}</h3>
        </div>
      )}
    </div>
  );
}

function FeedPage() {
  return <div className="App">Feed Page</div>;
}

function NotFoundPage() {
  return <div className="App">404 : Not Found</div>;
}

function AppLayout() {
  return (
    <>
      <div>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/profile/5">Friend</Link>
        <Link to="/feed">Feed</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="" element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="profile/:userId" element={<FriendPage />} />
        <Route path="feed" element={<FeedPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

/* 
<BrowserRouter>
<div>
<Link to="/">Home</Link>
<Link to="/profile">Profile</Link>
<Link to="/profile/5">Friend</Link>
<Link to="/feed">Feed</Link>
</div>
<Routes>
<Route path="/" element={<HomePage />} />
<Route path="/profile" element={<Profilepage />} />
<Route path="/profile/:userId" element={<FriendPage />} />
<Route path="/feed" element={<Feedpage />} />
<Route path="*" element={<NotFoundPage />} /> 
<Route path="*" element={<Navigate to="/" />} />
</Routes>
</BrowserRouter>
*/
