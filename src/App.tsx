import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { FeedAPI } from "./services/FeedService";
import FeedItem from "./types/FeedItem";
import FeedResult from "./types/FeedResult";
import ChipInput from 'material-ui-chip-input'
import { ImgMediaCard } from "./components/ImgMediaCard";
import { Grid } from "@material-ui/core";

function App() {
    const queryDefaultValue: string[] = ['nyhavn', 'tivoli'];
    const [query, setQuery] = useState<string>(queryDefaultValue.join(','));
    const [items, setItems] = useState<FeedItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        FeedAPI.search(query).then((result: FeedResult) => {
            setLoading(false);
            if (result && result.items) {
                setItems(result.items);
            }
        });
    }, [query]);

    const handleChange = useCallback((chips: string[]) => {
        setQuery(chips.join(','));
    }, []);

    return (
        <div className="App">
            <ChipInput
                defaultValue={queryDefaultValue}
                onChange={(chips) => handleChange(chips)}
                fullWidthInput
                fullWidth
                label={'Type a tag to search'}
            />
            <div style={{ maxWidth: '90%', margin: 'auto', marginTop: '20px', marginBottom: '20px' }}>
                <Grid
                    container
                    spacing={3}
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    {items.map((item: FeedItem, index: number) => {
                        const prop = {
                            ...item,
                            loading: loading,
                        }
                        return <Grid item xs={12} sm={6} md={3} key={index}>
                        <ImgMediaCard {...prop} />
                    </Grid>
                    }
                    )}
                </Grid>
            </div>
        </div>
    );
}

export default App;
