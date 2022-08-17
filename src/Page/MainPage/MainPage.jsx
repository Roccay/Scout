import React, { useState, useEffect } from "react";
import Nav from "../../Components/Nav/Nav.jsx";
import Map from "../../Components/Map/Map.jsx";
import Filter from "../../Components/Filter/Filter.jsx";
import Explore from "../../Components/Explore/Explore.jsx";
import About from "../../Components/About/About";

function MainPage() {
  const [posts, setPosts] = useState([]);

  const [user, setUser] = useState([]);
  useEffect(() => {
    getFilteredPosts();

    let token = localStorage.getItem("token");
    if (token) {
      // YOU DO: check expiry!
      let userDoc = JSON.parse(atob(token.split(".")[1])).user; // decode jwt token
      setUser({ user: userDoc });
    }
  }, []);

  const setUserInState = (incomingUserData) => {
    setUser(incomingUserData);
  };

  const getFilteredPosts = async () => {
    try {
      const response = await fetch("/api/posts");

      const postsArr = await response.json();

      if (!postsArr.success) return;
      setPosts(postsArr.response);
    } catch (err) {
      console.log(err);
    }
  };

  const filterPosts = (posts, query) => {
    if (!query) {
      return posts;
    }

    return posts.filter((post) => {
      const postName = post.LocationName.toLowerCase();
      return postName.includes(query);
    });
  };
  const { search } = window.location;
  const query = new URLSearchParams(search).get("s");
  const [searchQuery, setSearchQuery] = useState(query || "");
  const filteredPosts = filterPosts(posts, searchQuery);

  return (
    <div className="MainPage">
      <Nav
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setUserInState={setUserInState}
        user={user}
      />
      <Filter />
      <Map />
      <Explore posts={filteredPosts} />
      {user && "1111"}
      <About />
    </div>
  );
}
export default MainPage;
