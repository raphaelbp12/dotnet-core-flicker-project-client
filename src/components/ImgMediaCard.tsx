import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import FeedItem from '../types/FeedItem';
import { Avatar, CardHeader } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import moment from 'moment'
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
    },
    content: {
        textAlign: "left",
        fontWeight: 'bold'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

interface ImgMediaCardProps extends FeedItem {
    loading: boolean;
}

export const ImgMediaCard: FC<ImgMediaCardProps> = props => {
    const classes = useStyles();
    const authorName = props.author.split('"')[1];

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    props.loading ? (<Skeleton variant="circle" width={40} height={40} />) : (<Avatar aria-label="recipe" className={classes.avatar}>
                        {authorName[0].toUpperCase()}
                    </Avatar>)

                }
                titleTypographyProps={{ variant: 'caption', align: 'left' }}
                subheaderTypographyProps={{ variant: 'caption', align: 'left' }}
                title={props.loading ? (<Skeleton variant="text" />) : authorName}
                subheader={props.loading ? (<Skeleton variant="text" />) : moment(props.published).format("LL")}
            />
            {props.loading ? (<Skeleton variant="rect" height={140} />) : (<CardMedia
                component="img"
                alt={props.title}
                height="140"
                image={props.media.m}
                title={props.title}
            />)}
            <CardContent className={classes.content}>
            {props.loading ? (<Skeleton variant="text" />) : (<Typography gutterBottom variant="caption" component="h2">
                    {props.title}
                </Typography>)}
                
            </CardContent>
        </Card>
    );
}