import React, { useState, useEffect } from "react";
import { Outlet, useNavigation, Navigate  } from "react-router-dom";
import SearchBar from "../components/searchbar";
import { getCategories } from "../api/http-common";
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";
function DefaultPage() {
  const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');
  const [searchQuery, setSearchQuery] = useState(query || '');


  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      getCategories()
        .then((json) => {
          setCategories(json.data);
          console.log(json.data, "Cate List");
        })
        .catch((err) => {
          console.log(err);
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div>
      {currentUser.fullname}
      <SearchBar searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery} />
        {loading && <p>loading....</p>}
        {!loading && categories.length ? (
          <ul>
            {categories.map((post, i) => (
              <li key={i}>
                {post.attributes.Name}
                <Link
                to={`/${post.id}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Read more
            </Link>
                </li>
            ))}
          </ul>
        ) : (
          !loading && <p>empty</p>
        )}
      </div>
    </>
  );
}

export default DefaultPage;
