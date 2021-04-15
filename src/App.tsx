import React, { useEffect, useState } from "react";
import "./App.css";
import { FeedAPI } from "./services/FeedService";
import FeedItem from "./types/FeedItem";
import FeedResult from "./types/FeedResult";

function App() {
    const [query, setQuery] = useState<string>("f1,nature");
    const [items, setItems] = useState<FeedItem[]>([]);

    useEffect(() => {

        FeedAPI.search(query).then((result: FeedResult) => {
            console.log('result', result);
            if (result && result.items) {
                setItems(result.items);
            }
        });
    }, [query]);

    return <div className="App">{ items.map((item: FeedItem) => {
        return <img key={ item.link } src={ item.media.m } alt={ item.title } />
    })}</div>;
}

export default App;
