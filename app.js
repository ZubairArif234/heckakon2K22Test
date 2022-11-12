import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendSignInLinkToEmail,
    onAuthStateChanged
 } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
 import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";
 import { doc,
   setDoc,
   getDoc,
   getFirestore,
   getDocFromCache,
   collection, 
   getDocs,
   query,
   updateDoc,
    where,
    
 } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"; 


const firebaseConfig = {
  apiKey: "AIzaSyBKYcD_35A49akt0OitN62MQbMCwcKGvuU",
  authDomain: "saylani-project-assignment.firebaseapp.com",
  projectId: "saylani-project-assignment",
  storageBucket: "saylani-project-assignment.appspot.com",
  messagingSenderId: "677719458063",
  appId: "1:677719458063:web:11e29676238dbb299cfe7a"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore()





































// const passwordField = document.querySelector("#loginPass");
// const eyeIcon= document.querySelector("#eye");
// eye.addEventListener("click", function(){
//   this.classList.toggle("fa-eye-slash");
//   const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
//   passwordField.setAttribute("type", type);
// })











// // apna code
let loginBUTTON = document.getElementById("loginBUTTON");
loginBUTTON.addEventListener("click",async()=>{
    event.preventDefault()
    let loginEmail =document.getElementById("loginEmail");
    let loginPass =document.getElementById("loginPass");
    
    
    
    
    if( loginEmail.value.trim() == ""  ){
    Swal.fire(
                'Error',
                'Invalid email',
                'error'
              )
        }else if ( loginPass.value.trim() == ""  ){
            Swal.fire(
                'Error',
                'Invalid password',
                'error'
              )
        }else{

          signInWithEmailAndPassword(auth, loginEmail.value,loginPass.value)
          .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // window.localStorage.setItem("users", JSON.stringify(user))
      Swal.fire(
        'success',
        'successfully login',
        'success'
      )
      // ...
      
    
      
    })
    .catch((error) => {
        Swal.fire(
            'Error',
          'user not registered',
          'error'
          )
      const errorCode = error.code;
      const errorMessage = error.message;
    });
    loginEmail.value="";
    loginPass.value=""
    onAuthStateChanged(auth, (user) => {
      console.log(auth)
      if (user) {
        location.href= "admin.html"
        
        // alert("oplirhuj")
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }
    
    // const docRef = doc(db, "admin", "dgssQTOuRLZvlPhQSSQa");
    // const docSnap = await getDoc(docRef);
    
    // if (docSnap.exists()) {
      //     console.log("Document data:", docSnap.data());
      // else {
        //    window.location="admin.html"
        // }
    // } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    // }



})