import {
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useNavigate,
  useParams,
  useSubmit,
} from "react-router-dom";

import React, { useEffect, useState } from "react";

import axios from "axios";
function CatePost() {
  let { cateId } = useParams();
  console.log(cateId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState({});
  const [category, setCategory] = useState({});
  useEffect(() => {
    const timer = setTimeout(() => {
      axios
        .get(`https://api.chuotgreen.com/api/categories/${cateId}?populate=*`)
        .then((response) => {
          setCategory(response.data);
          console.log(response.data, "Categoy ID Component");
        })
        .catch((err) => {
          console.log(err);
          setError(err.message);
        })
        .finally(() => {});
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      axios
        .get(`https://api.chuotgreen.com/api/categories/${cateId}?populate=*`)
        .then((response) => {
          setPosts(response.data);
          console.log(response.data, "Posts from Cate Id Component");
        })
        .catch((err) => {
          console.log(err);
          console.log(err.message);
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);



  return JSON.stringify(category) !== "{}" ? (
    <>
      <div className="pg-hd py-8 px-4 mx-auto max-w-screen-xl px-4">
        <h1 className="mb-10 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          {category.data.attributes.Name}
        </h1>
      </div>
      <div className="py-8 px-4 mx-auto max-w-screen-xl px-4">

      <h2>Array of Objects:</h2>
        {/* {posts.data.attributes.posts.map((posts, id) => (
          
            <p
              key={id}
              className="mb-3 font-normal text-gray-700 dark:text-gray-400"
            >
              {posts.id}
            </p>
        
        ))} */}
      </div>
    </>
  ) : (
    <></>



    
  );

  

}

export default CatePost;
