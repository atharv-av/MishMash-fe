import Layout from "../wrappers/Layout";
import SearchBar from "../components/SearchBar";
import NewPost from "../components/NewPost";
import Suggestions from "../components/Suggestions";
import Post from "../components/Post";

const Feed = () => {
  return (
    <Layout>
      <div className="flex flex-row w-full">
        <div className="w-full">
          <SearchBar />
          <NewPost />
          <Post />
        </div>
        <div className="w-1/2 lg:flex hidden">
          <Suggestions />
        </div>
      </div>
    </Layout>
  );
};

export default Feed;
