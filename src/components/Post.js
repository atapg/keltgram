import { Avatar, Card,Toolbar, Typography } from '@material-ui/core'
import {AiFillHeart,AiOutlineHeart} from 'react-icons/ai'
import {FaRegComment} from 'react-icons/fa'
import {FiSend} from 'react-icons/fi'
import {BiHeart} from 'react-icons/bi'
import React from 'react'

const Post = ({item}) => {
    return (
        <Card className="post__item" variant="outlined">
            <Toolbar className="row-min post__header">
                <Avatar className="avatar" alt="Remy Sharp" src="https://www.nj.com/resizer/h8MrN0-Nw5dB5FOmMVGMmfVKFJo=/450x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg" />
                <Typography component="a"><b>{item.username}</b></Typography>
            </Toolbar>
            <img className="post__image" src={item.imageUrl} alt="post"/>
            <Toolbar className="row-min post__caption">
                <div className="container">
                    <div className="actions">
                        <BiHeart />
                        {/* <AiFillHeart /> */}
                        <FaRegComment />
                        <FiSend />
                    </div>
                    <Typography className="username name" component="a">{item.username}</Typography>
                    <Typography className="username desc" component="a">{item.caption}</Typography>
                    <div className="divider" />
                    <div className="comments">
                        <Typography className="username name" component="a">Username</Typography>
                        <Typography className="username cmnt" component="a">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam non assumenda voluptatibus maxime quisquam amet molestias atque quod illo soluta.</Typography>
                    </div>
                </div>
            </Toolbar>
            <div className="comment__container">
                <input type="text" placeholder="Add a comment"/>
            </div>
        </Card>
    )
}

export default Post
