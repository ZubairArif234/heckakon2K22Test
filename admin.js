
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


onAuthStateChanged(auth, (user) => {
    console.log(auth)
    if (user) {
        
        // alert("oplirhuj")
        // ...
    } else {
        location.href= "index.html"
      // User is signed out
      // ...
    }

    let logout = document.getElementById("logout")
    logout.addEventListener("click", () => {
        signOut(auth).then(() => {
          window.location.href = "index.html"
          console.log("logout")
        }).catch((error) => {
          // An error happened.
          console.log("login")
        });
      })
      
      


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
    let classes = document.getElementById("classes")
 let classesNavBtn = document.getElementById("classesNavBtn")
    let tableClass = document.getElementById("tableClass")
    let classesList = document.getElementById("classesList")
    classesNavBtn.addEventListener("click",async()=>{
        
        const ql = query(collection(db, "classes"))
        // , where("CourseName", "!=", ""));
        const unsubscribel = onSnapshot(ql, (querySnapshot) => {
            //   const cities = [];
            let coursedropdown = document.getElementById("CoursenameS");
classes.style.display="block"
            tableClass.innerHTML=""
            coursedropdown.innerHTML=""
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
                coursedropdown.innerHTML+=`<option value="${doc.data().CourseName}" onclick="">${doc.data().CourseName}</option>`
                tableClass.innerHTML+=`
                
               <tr>
        
        <td onclick="">${doc.data().CourseName}</td>
        <td>${doc.data().Teachername}</td>
        <td>${doc.data().BatchNumber}</td>
        
        <td>${doc.data().Sectionname}</td>
          <td>${doc.data().ScheduleOfClasses}</td>
          <td>${doc.data().Classtimings}</td>
          
          <td><i class="fa-solid fa-trash" onclick="deleteClass('${doc.id}')"></i></td>
          </tr>`
                


          
          // <td>${doc.data().Teachername}</td>
          // <td>${doc.data().BatchNumber}</td>
          
          // <td>${doc.data().Sectionname}</td>
          //   <td>${doc.data().ScheduleOfClasses}</td>
          //   <td>${doc.data().Classtimings}</td>
            
          //   <td><i class="fa-solid fa-trash" onclick="deleteClass('${doc.id}')"></i></td>
//           const q = query(collection(db, "present"))
//           // , where("CourseName", "!=", ""));
//           const unsubscribe = onSnapshot(q, (querySnapshot) => {
//               //   const cities = [];
//               let tableClasspall = document.getElementById("tableClasspall")
//             let coursedropdown = document.getElementById("CoursenameS");
// classes.style.display="block"
//             tableClass.innerHTML=""
//             coursedropdown.innerHTML=""
//             querySnapshot.forEach((doc) => {
//                 console.log(doc.data())
// tableClasspall.innerHTML +=`
// <tr>
        
//         <td >${doc.data().date}</br> ${doc.data().studentrollno}</br> ${doc.data().studname} </hr></td>
//           </tr>
// `
//             })})
                // classesList.innerHTML +=` <li><a class="dropdown-item" href="#">${doc.data().CourseName}</a></li>`
                // const classModal = async()=>{
                    // const q = query(collection(db, "classes"), where("Teachername", "==", true));
                    
                    // const querySnapshot = await getDocs(q);
                    // // console.log(q)
                    // querySnapshot.forEach((doc) => {
                    //     console.log(doc.id, " => ", doc.data());
                    // // doc.data() is never undefined for query doc snapshots
                    // });
                    // console.log(event.target);
                    //   <th scope="row">${1+1}</th>
                }
        );
        //   console.log("Current cities in CA: ", cities.join(", "));
    });
})
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
        
        
        let addstudent = document.getElementById("addstudent");
        
        // let AddClassModal =document.getElementById("AddClassModal");
        addstudent.addEventListener("click",async()=>{
            let studentName = document.getElementById("studentName");
            let fathername = document.getElementById("fathername");
            let rollno = document.getElementById("rollno");
            let contactno = document.getElementById("contactno");
            let CNICnumber = document.getElementById("CNICnumber");
            let CoursenameS = document.getElementById("CoursenameS");
            if (studentName.value.trim() == ""){
                Swal.fire(
            'Error',
            'Invalid Student Name',
            'error'
          )
        }else if (fathername.value.trim() == ""){
            Swal.fire(
                'Error',
                'Invalid father name',
                'error'
                )
            }
            else if (rollno.value == ""){
                Swal.fire(
                    'Error',
                    'Invalid roll no',
                    'error'
                    )
                }
                else if (contactno.value == ""){
        Swal.fire(
            'Error',
            'Invalid contact no',
            'error'
            )
        }
    else if (CNICnumber.value.trim() == ""){
        Swal.fire(
            'Error',
            'Invalid  CNIC number with dash(-)',
            'error'
            )
        }
        else if (CoursenameS.value == ""){
            Swal.fire(
                'Error',
                'Invalid  Course name',
                'error'
                )
            }else {
                const docRef = await addDoc(collection(db, "students"), {
                    studentName: studentName.value,
                    fathername: fathername.value,
                    rollno:rollno.value,
                    contactno:contactno.value,
                    CNICnumber:CNICnumber.value,
                    CoursenameS:CoursenameS.value,
                    
                    
                    
                    
                });
                
                
                
        
                
                console.log("Document written with ID: ", docRef.id);
                Swal.fire(
            'success',
            'successfully student added',
            'success'
            )
        }
        
        
        
    })



    
    let cardname = document.getElementById("cardname")
    let cardfname = document.getElementById("cardfname")
    let cardrollno = document.getElementById("cardrollno")
    let cardno = document.getElementById("cardno")
    let cardcnic = document.getElementById("cardcnic")
    let cardcoursename = document.getElementById("cardcoursename")
    let cardsearch = document.getElementById("cardsearch")
    cardsearch.addEventListener("click",()=>{
        let cardroll = document.getElementById("cardroll")
        let Coursenamecard = document.getElementById("CoursenameS")
        // console.log(Coursenamecard.value.toLowerCase())
        
        const q= query(collection(db, "students")
        , where("rollno", "==", cardroll.value) ,where( "CoursenameS","==",Coursenamecard.value.toLowerCase()));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            //   const cities = [];
            // tableHome.innerHTML=""
            querySnapshot.forEach((doc) => {
    console.log(doc.data())
    if (cardroll.value == doc.data().rollno){
        
        cardname.innerHTML=doc.data().studentName;
        cardfname.innerHTML = doc.data().fathername;
        cardrollno.innerHTML = doc.data().rollno;
        cardno.innerHTML = doc.data().contactno;
        cardcnic.innerHTML = doc.data().CNICnumber;
        cardcoursename.innerHTML = doc.data().CoursenameS;
        
    }else {
        Swal.fire(
            'success',
            'successfully student Deleted',
            'success'
            )
        }
        console.log(doc.id)
        let id = doc.id
        
    })
});
});

let markattendence = document.getElementById("markattendence")
markattendence.addEventListener("click",async()=>{
    
    
    let cardcoursename = document.getElementById("cardcoursename")
    let cardname = document.getElementById("cardname")
    let cardroll = document.getElementById("cardroll")
    let Coursenamecard = document.getElementById("CoursenameS")
    let cardrollno = document.getElementById("cardrollno")
    let attendencedrop = document.getElementById("attendencedrop")
    // console.log(cardrollno.value)

    const qwe= query(collection(db, "present")
        , where("rollno", "==", cardroll.value) ,where( "CoursenameS","==",Coursenamecard.value.toLowerCase()));
        const unsubscribewe = onSnapshot(qwe, (querySnapshot) => {

        })
    const qw= query(collection(db, "students")
        , where("rollno", "==", cardroll.value) ,where( "CoursenameS","==",Coursenamecard.value.toLowerCase()));
        const unsubscribew = onSnapshot(qw, (querySnapshot) => {
            //   const cities = [];
            // tableHome.innerHTML=""
querySnapshot.forEach((doc) => {
    let nameStudent = doc.data().studentName
    let nameStudentroll = doc.data().rollno
    console.log(cardrollno.innerHTML)
})})
if(attendencedrop.value =="present"){
    
    const docRef = await addDoc(collection(db, "present"), {
        date:new Date(),
        studentrollno:cardrollno.innerHTML,
        studname:cardname.innerHTML,
        // course:cardcoursename
        
    });
}else if (attendencedrop.value =="leave"){
    const docRef = await addDoc(collection(db, "leave"), {
        date:new Date(),
        studentrollno:cardrollno.innerHTML,
        studname:cardname.innerHTML,
        // course:cardcoursename
        
    });
    
}else if (attendencedrop.value =="late"){
    const docRef = await addDoc(collection(db, "leave"), {
        date:new Date(),
        studentrollno:cardrollno.innerHTML,
        studname:cardname.innerHTML,
        // course:cardcoursename
        
    });
}
else{
    
    const docRef = await addDoc(collection(db, "absent"), {
        date:new Date(),
        studentrollno:cardrollno.innerHTML,
        studname:cardname.innerHTML,
        // course:cardcoursename
    
    });
}
    // let attendencedrop = document.getElementById("attendencedrop");
    
})

// let homepage = document.getElementById("home")
// homepage.addEventListener=("click",()=>{

// })

// homepage.addEventListener("click",()=>{
    // window.onload=()=>{
        let tableHome = document.getElementById("tableHome")
            // let classesList = document.getElementById("classesList")
            const q= query(collection(db, "students")
            , where("studentName", "!=", ""));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                //   const cities = [];
    tableHome.innerHTML=""
    querySnapshot.forEach((doc) => {
        console.log(doc.data())
        
            tableHome.innerHTML+=`
            
            <tr>
            
            <td>${doc.data().studentName}</td>
            <td>${doc.data().fathername}</td>
              <td>${doc.data().rollno}</td>
              
              <td>${doc.data().contactno}</td>
              <td>${doc.data().CNICnumber}</td>
              <td>${doc.data().CoursenameS}</td>
              
              <td><i class="fa-solid fa-trash" onclick="deleteStudent('${doc.id}')"></i></td>
              </tr>`
              
            });
            //   console.log("Current cities in CA: ", cities.join(", "));
        });
        
    
        const deleteStudent = async (id) => {
            //  event.target.parentNode.parentNode.innerHTML = "";
            await deleteDoc(doc(db, "students", id));
            Swal.fire(
            'success',
            'successfully student Deleted',
            'success'
            )
        }
        //   cities.push(doc.data().name);
    window.deleteStudent=deleteStudent;

    
    // }
    
    // let classesNavBtn = document.getElementById("classesNavBtn");
    let home = document.getElementById("home");
    
    let classes1 = document.getElementById("classesdiv");
    classesNavBtn.addEventListener("click",()=>{
        let classtablediv = document.getElementById("classtablediv")
        if(classes1.style.display=='block'){
            classes1.style.display="none";
            classtablediv.style.display="none"
            home.style.display = "block"
        }
        else{
            home.style.display = "none"
            classes1.style.display="block";
            classtablediv.style.display="block"
            
        }
    })
});
let page = document.getElementById("page");
page.addEventListener("click",()=>{
    let classes1 = document.getElementById("classesdiv")
    let classtablediv = document.getElementById("classtablediv")
    classtablediv.style.display="none"
    classes1.style.display="none"
    home.style.display="block"
    // if(classes.style.display=='none'){
    //     classes.style.display="block";
    //     home.style.display = "none"
    // }
    // else{
    //     home.style.display = "block"
    //     classes.style.display="none";
        
    // }
})
;