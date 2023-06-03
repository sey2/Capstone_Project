import React, { useState } from "react";
import { storage, firestore } from "./firebase";

const ImageUploader = () => {
    const [image, setImage] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (image) {
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on(
                "state_changed",
                null,
                (error) => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref("images")
                        .child(image.name)
                        .getDownloadURL()
                        .then((url) => {
                            // 업로드된 이미지 URL을 받아서 활용
                            console.log(url);
                        });
                }
            );
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>업로드</button>
        </div>
    );
};

export default ImageUploader;