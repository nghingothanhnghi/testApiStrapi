import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getPosts } from "../../api/http-common";
import {createRoot} from 'react-dom/client'
import Markdown from 'react-markdown'


const SearchBar = ({ searchQuery, setSearchQuery }) => {
    const [stateName, setStateName] = useState("AK");
const [data,setData] = useState([]);
const [stateData, setStateData] = useState();

useEffect(() => {      
    getPosts()
        .then(response => response.data)
        .then(responseData => {
            setData(responseData)
          })
        .catch(err => {
          console.log(err);
        });
      }, []);

useEffect(() => {
  setStateData(data.filter(i => i.state === stateName)[0]) 
  
},[data, stateName]);

console.log(data, 'filter from axios')
//     const [searchText, setSearchText] = useState("");
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             getPosts()
//             .then((res) => {
//                 setSearchText(res.data);
//               console.log(res.data, 'Posts List Component');
//             })
//             .catch((err) => {
//               console.log(err);
//             })
//             .finally(() => {
//             });
//         }, 1000);
//         return () => clearTimeout(timer);
//       }, []);
    
//   const filteredBooks = books.filter(
//     ({ id, title }) =>
//       id.toLowerCase().includes(searchText.toLowerCase()) ||
//       title.toLowerCase().includes(searchText.toLowerCase())
//   );

    const navigate = useNavigate();
    const onSubmit = () => {
        navigate(`?s=${searchQuery}`);
    };

    return (
        <form
            action="/search-result"
            method="get"
            autoComplete="off"
            onSubmit={onSubmit}
        >
            <label htmlFor="header-search">
                <span className="visually-hidden">
                    Search blog posts
                </span>
            </label>
            <input
                value={searchQuery}
                onInput={(e) => setSearchQuery(e.target.value)}
                // onChange={({ target }) => setData(target.value)}
                type="text"
                id="header-search"
                placeholder="Search blog posts"
                name="s"
            />
            <button type="submit">Search</button>
            <ul>
        {data.map(({ attributes, id }) => (
          <li key={id}>
            <strong>{attributes.title}</strong>
   
          </li>
        ))}
      </ul>
        </form>
    );
};

export default SearchBar;