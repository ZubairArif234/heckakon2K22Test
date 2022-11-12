
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendSignInLinkToEmail,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";
import {
    doc,
    setDoc,
    getDoc,
    getFirestore,
    getDocFromCache,
    collection,
    getDocs,
    query,
    addDoc,
    onSnapshot,
    where,
    updateDoc,
    arrayUnion,
    arrayRemove,
    deleteDoc,
    orderBy,

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



let AddClassModal =document.getElementById("AddClassModal");
AddClassModal.addEventListener("click",async()=>{
    let CourseName = document.getElementById("CourseName");
    let Teachername = document.getElementById("Teachername");
    let Classtimings = document.getElementById("Classtimings");
    let ScheduleOfClasses = document.getElementById("ScheduleOfClasses");
    let Sectionname = document.getElementById("Sectionname");
    let BatchNumber = document.getElementById("BatchNumber");
    if (CourseName.value.trim() == ""){
        Swal.fire(
            'Error',
            'Invalid CourseName',
            'error'
          )
    }else if (Teachername.value.trim() == ""){
        Swal.fire(
            'Error',
            'Invalid Teacher name',
            'error'
          )
    }
    else if (Classtimings.value.trim() == ""){
        Swal.fire(
            'Error',
            'Invalid Class timings',
            'error'
          )
    }
    else if (ScheduleOfClasses.value.trim() == ""){
        Swal.fire(
            'Error',
            'Invalid Schedule Of Classes',
            'error'
          )
    }
    else if (Sectionname.value.trim() == ""){
        Swal.fire(
            'Error',
            'Invalid Section name',
            'error'
          )
    }
    else if (BatchNumber.value.trim() == ""){
        Swal.fire(
            'Error',
            'Invalid Batch Number',
            'error'
          )
    }
    else {
        const docRef = await addDoc(collection(db, "classes"), {
            CourseName: CourseName.value,
            Teachername: Teachername.value,
            Classtimings:Classtimings.value,
            ScheduleOfClasses:ScheduleOfClasses.value,
            Sectionname:Sectionname.value,
            BatchNumber:BatchNumber.value,


          });
          console.log("Document written with ID: ", docRef.id);
        Swal.fire(
            'success',
            'successfully Class added',
            'success'
          )
    }

    
    
})
// window.onload=()=>{

    let tableClass = document.getElementById("tableClass")
    let classesList = document.getElementById("classesList")
    const q = query(collection(db, "classes"))
    // , where("CourseName", "!=", ""));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        //   const cities = [];
        tableClass.innerHTML=""
        querySnapshot.forEach((doc) => {
            console.log(doc.id)
            // classesList.innerHTML +=` <li><a class="dropdown-item" href="#">${doc.data().CourseName}</a></li>`
            // const classModal =()=>{
            // console.log(event.target);
            //   <th scope="row">${1+1}</th>
            tableClass.innerHTML+=`
            
            <tr>
              
              <td>${doc.data().CourseName}</td>
              <td>${doc.data().Teachername}</td>
              <td>${doc.data().BatchNumber}</td>
            
              <td>${doc.data().Sectionname}</td>
              <td>${doc.data().ScheduleOfClasses}</td>
              <td>${doc.data().Classtimings}</td>
              <td><i class="fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#exampleModal onclick=""></i></td>
              <td><i class="fa-solid fa-trash" onclick="deleteClass('${doc.id}')"></i></td>
            </tr>`
            
        });
        //   console.log("Current cities in CA: ", cities.join(", "));
    });
    const deleteClass = async (id) => {
        //  event.target.parentNode.parentNode.innerHTML = "";
         await deleteDoc(doc(db, "classes", id));
         Swal.fire(
            'error',
            'successfully Class Deleted',
            'error'
          )
    }
    //   cities.push(doc.data().name);
    window.deleteClass=deleteClass;
// }

// }
