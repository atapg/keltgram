import React, {useState} from 'react'
import { Button } from '@material-ui/core'
import { db, storage } from '../firebase'
import firebase from 'firebase'

const ImageUpload = ({username, email}) => {
    const [caption, setCaption] = useState('')
    const [progress, setProgress] = useState(0)
    const [image, setImage] = useState(null)

    const changeHandler = e => {
        if(e.target.files[0]){
            setImage(oldImg => oldImg = e.target.files[0])
        }
    }

    const uploadHandler = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        console.log('Here1')

        uploadTask.on(
            "state_changed", 
            (snapShot) => {
                const progress = Math.round(
                    (snapShot.bytesTransferred / snapShot.totalBytes) * 100
                )
                setProgress(progress)
                console.log('Here2')
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
                            username: username
                        })
                        setProgress(0)
                        setImage(null)
                        setCaption('')
                    })
            }
        )
    }

    return (
        <div>
            <input type="text" placeholder="Enter a caption..."
                onChange={e => setCaption(oldCap => oldCap = e.target.value)}
                value={caption}
            />
            <progress value={progress} max="100" />
            <input type="file" onChange={changeHandler} />
            <Button variant="contained" color="secondary" onClick={uploadHandler}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload
