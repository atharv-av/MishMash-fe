import Layout from "../wrappers/Layout";
import SearchBar from "../components/SearchBar";
import NewPost from "../components/NewPost";
import Suggestions from "../components/Suggestions";
import AllPosts from "../components/AllPosts";

const Feed = () => {
  return (
    <Layout>
      <div className="flex flex-row w-full">
        <div className="w-full">
          <SearchBar />
          <NewPost />
          <AllPosts />
        </div>
        <div className="w-1/2 lg:flex hidden">
          <Suggestions />
        </div>
      </div>
    </Layout>
  );
};

export default Feed;
