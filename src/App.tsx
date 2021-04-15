import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { FeedAPI } from "./services/FeedService";
import FeedItem from "./types/FeedItem";
import FeedResult from "./types/FeedResult";
import ChipInput from 'material-ui-chip-input'

function App() {
    const queryDefaultValue : string[] = ['nature', 'f1'];
    const [query, setQuery] = useState<string>(queryDefaultValue.join(','));
    const [items, setItems] = useState<FeedItem[]>([]);

    useEffect(() => {
        FeedAPI.search(query).then((result: FeedResult) => {
            console.log('result', result);
            if (result && result.items) {
                setItems(result.items);
            }
        });
    }, [query]);

    const handleChange = useCallback((chips: string[]) => {
        console.log('chips', chips.join(','));
        setQuery(chips.join(','));
    }, []);

    return (
        <div className="App">
            <ChipInput
                defaultValue={queryDefaultValue}
                onChange={(chips) => handleChange(chips)}
            />
            { items.map((item: FeedItem) => {
                return <img key={item.link} src={item.media.m} alt={item.title} />
            })}
        </div>
    );
}

export default App;
