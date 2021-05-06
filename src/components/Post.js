import { Avatar, Card,Toolbar, Typography } from '@material-ui/core'
import {AiOutlinePlus} from 'react-icons/ai'
import {FaRegComment} from 'react-icons/fa'
import {FiSend} from 'react-icons/fi'
import {BiHeart} from 'react-icons/bi'
import React,{useState, useEffect} from 'react'
import { db } from '../firebase'
import { useStateValue } from '../store/StateProvider'
import firebase from 'firebase'

const Post = ({item, postId}) => {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    const [{person}, dispatch] = useStateValue()

    useEffect(() => {
        let unsubscribe

        if(postId){
            unsubscribe = db
                .collection('posts')
                .doc(postId)
                .collection('comments')
                .orderBy('timestamp', 'desc')
                .onSnapshot(snapShot => {
                    setComments(snapShot.docs.map(doc => doc.data()))
                })
        }

        return () => {
            unsubscribe()
        }

    },[postId])

    const postComment = e => {
        e.preventDefault()
        if(person){
            db.collection('posts').doc(postId).collection('comments').add({
                text: comment,
                username: person?.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            setComment('')
        } else {
            alert('Please sign in to add comments')
        }
    }

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
                        {
                            comments.map((comment, index) => (
                                <div key={index}>
                                {/* ERROR HERE KEY */}
                                    <Typography className="username name" component="a">{comment.username}</Typography>
                                    <Typography className="username cmnt" component="a">{comment.text}</Typography>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Toolbar>
            <div className="comment__container">
                <input type="text" onChange={e => setComment(oldComment => oldComment = e.target.value)} value={comment} placeholder="Add a comment..."/>
                <button
                    className="send__btn center"
                    onClick={postComment}
                    disabled={!comment}
                >
                    <AiOutlinePlus/>
                </button>
            </div>
        </Card>
    )
}

export default Post
