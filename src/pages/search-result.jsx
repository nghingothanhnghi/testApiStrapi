import { useState, useEffect } from 'react';
import Announcer from '../components/announcer';
import { getPosts } from '../api/http-common';

// const posts = [
//     { id: '1', name: 'This first post is about React' },
//     { id: '2', name: 'This next post is about Preact' },
//     { id: '3', name: 'We have yet another React post!' },
//     { id: '4', name: 'This is the fourth and final post' },
// ];



const SearchResult = () => {
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


    const filterPosts = (data, query) => {
        if (!query) {
            return data;
        }
    
        return data.filter((post) => {
            const postName = post.attributes.title.toLowerCase();
            console.log(postName, "filter post name")
            return postName.includes(query);
        });
    };


    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const filteredPosts = filterPosts(data, searchQuery);
    console.log(query, 'query from default page')
    console.log(searchQuery, 'searchQuery from query')
    console.log(filteredPosts, 'filtered Posts')
 
    return (
            <div className="SearchResult">
                <Announcer
                    message={`${searchQuery.length} data`}
                />
                <ul>
                    {filteredPosts.map((attributes, id) => (
                        <li key={id}>
                        <strong>{attributes.title}</strong>
                      </li>
                    ))}
                </ul>
            </div>
    );
};

export default SearchResult;