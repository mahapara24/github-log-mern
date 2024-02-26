import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Search from "../components/Search";
import SortRepos from "../components/SortRepos";
import ProfileInfo from "../components/ProfileInfo";
import Repos from "../components/Repos";
import Spinner from "../components/Spinner";

const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState("recent");

  const getUserProfileAndRepose = useCallback(
    async (username = "mahapara24") => {
      setLoading(true);
      try {
        const userResponse = await fetch(
          `https://api.github.com/users/${username}`
        );
        const userProfile = await userResponse.json();
        setUserProfile(userProfile);

        const repoRes = await fetch(userProfile.repos_url);
        const repos = await repoRes.json();
        setRepos(repos);
        console.log("Useprofile:", userProfile);
        console.log("repos:", repos);
        return { userProfile, repos };
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    getUserProfileAndRepose();
  }, [getUserProfileAndRepose]);

  const onSearch = async (e, username) => {
    e.preventDefault();

    setLoading(true);
    setRepos([]);
    setUserProfile(null);

    const { userProfile, repos } = await getUserProfileAndRepose(username);
    setUserProfile(userProfile);
    setRepos(repos);
    setLoading(false);
  };
  const onSort = (sortType) => {
    if (sortType === "recent") {
      setRepos(repos.sort((a, b) => b.id - a.id));
    } else if (sortType === "stars") {
      setRepos(repos.sort((a, b) => b.stargazers_count - a.stargazers_count));
    } else if (sortType === "forks") {
      setRepos(repos.sort((a, b) => b.forks_count - a.forks_count));
    }
    setSortType(sortType);
    setRepos([...repos]);
  };

  return (
    <div className="m-4">
      <Search onSearch={onSearch} />
      {repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType} />}
      <div className="flex gap-4 flex-col lg:flex-row justify-center item-start">
        {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}
        {!loading && <Repos repos={repos} />}
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default HomePage;
