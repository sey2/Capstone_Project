// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDlK-KHpaQZVaEr5Yb7SNeiIeX5yL8uRzk",
    authDomain: "imgupload-b5b20.firebaseapp.com",
    projectId: "imgupload-b5b20",
    storageBucket: "imgupload-b5b20.appspot.com",
    messagingSenderId: "400718836366",
    appId: "1:400718836366:web:a73109087c193140274fdf",
    measurementId: "G-9MBX8BJMBY"
};

firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
export const firestore = firebase.firestore();

export { storage, firestore };

// 파일 업로드 함수
export const uploadFile = (file) => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    fileRef.put(file)
        .then((snapshot) => {
            console.log('파일 업로드 완료:', snapshot);
        })
        .catch((error) => {
            console.error('파일 업로드 실패:', error);
        });
};
