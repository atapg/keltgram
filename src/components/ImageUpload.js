import React, {useState} from 'react'
import { Card, LinearProgress } from '@material-ui/core'
import { db, storage } from '../firebase'
import firebase from 'firebase'
import {AiOutlineCloudDownload, AiOutlineSend} from 'react-icons/ai'

const ImageUpload = ({username, email}) => {
    const [caption, setCaption] = useState('')
    const [progress, setProgress] = useState(0)
    const [image, setImage] = useState(null)

    const changeHandler = e => {
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    const uploadHandler = () => {
        if(image){
            const uploadTask = storage.ref(`images/${image.name}`).put(image)
            uploadTask.on(
                "state_changed", 
                (snapShot) => {
                    const progress = Math.round(
                        (snapShot.bytesTransferred / snapShot.totalBytes) * 100
                    )
                    setProgress(progress)
                },
                (err) => {
                    console.log(err)
                },
                () => {
                    storage
                        .ref("images")
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            db.collection("posts").add({
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                caption: caption,
                                imageUrl: url,
                                username: username ? username : email
                            })
                            setProgress(0)
                            setImage(null)
                            setCaption('')
                        })
                }
            )
        } else {
            alert('Please select an image and write somthing about it !!!')
        }
    }

    return (
        <div className="posts">
            <Card className="post__item" variant="outlined">
                <div className="text__area">
                    <textarea className="create__post__caption" type="text" placeholder="What's on your mind?"
                        onChange={e => setCaption(oldCap => oldCap = e.target.value)}
                        value={caption}
                    />
                    {progress > 0 && 
                        <LinearProgress className="progress__bar" variant="determinate" value={progress} />
                    }
                </div>
                <div className="action__container">
                    <input 
                        type="file" 
                        onChange={changeHandler}
                        id="contained-button-file"
                        multiple
                        type="file"
                        accept="image/*"
                        className="upload"
                    />
                    <label className="center upload__container" htmlFor="contained-button-file">
                        <AiOutlineCloudDownload 
                            className="send__actions" 
                        />
                        {image && <p>{image?.name}</p>}
                    </label>
                    <AiOutlineSend className="send__actions" onClick={uploadHandler} />
                </div>
            </Card>
        </div>
    )
}

export default ImageUpload
