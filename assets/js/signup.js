console.log("signup.js file fired")
const firebaseConfig = {
    apiKey: "AIzaSyBz83kqwVu8gWrGAjkitG3sh5VtbWfbG2U",
    authDomain: "stock-a30ff.firebaseapp.com",
    databaseURL: "https://stock-a30ff.firebaseio.com",
    projectId: "stock-a30ff",
    storageBucket: "stock-a30ff.appspot.com",
    messagingSenderId: "628920247502",
    appId: "1:628920247502:web:93439270d44745fc435c9f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get elements
const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");

const database = firebase.database()
let rootRef = database.ref()

let auth = firebase.auth()


document.getElementById("btnSignUp").onclick = function () {
    const email = txtEmail.value
    const pass = txtPassword.value
    signUp(email, pass)
};

// TODO: Not functional until button is redone for google
// 
// document.getElementById("btnGoogle").onclick = function(){
//     signInGoogle()
//     console.log('google clicked')
// }

document.getElementById('btnPhone').onclick = function(){
    // link to a phone sign in (page?)/element
        // can also unhide a phone textbox once clicked to input phone value 
        // also will need to hide email/pass and add recaptcha container
    //     numberLogin(phone.value)
    //     console.log('phone clicked')
}

function signUp(email, password) {
    console.log('sign up function fired')

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(e=>{
            console.log("then fired")
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error.code + error.message)
            if (errorCode === 'auth/weak-password') {
                console.log('Password is weak, needs at least 6 characters with a combination of letters and numbers');
                alert('Password is weak, needs at least 6 characters with a combination of letters and numbers');
                alert(errorMessage);
            } else {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Passwords do not match.');
                    alert(errorMessage);
                }
            }

        })
        window.location.href = "../main.html"
}
// email verification - features is not working yet
// function verifyUser() {
//     let user = firebase.auth().currentUser
//     user.sendEmailVerification().then(function () {
//         alert("Email sent!")
//     }).catch("Email not sent!")
// }

function signInGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly")
    firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
            alert("User authenticated")
            let user = result.user
            console.log("User ====== ", user)
        })
        .catch(function (error) {
            alert("Authentication failed!")
        })
}

function anonymousLogin() {
    firebase.auth().signInAnonymously().then(function () {
        alert("OK")
    }).catch(function (error) {
        alert("something is wrong!")
    })
}

function numberLogin(phoneNumber) {
    console.log("numberLogin called!")
    let appVerifier = new firebase.auth.RecaptchaVerifier('todo: add recaptcha div')

    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
            let code = window.prompt("please, enter the 6 digit code!")
            return confirmationResult.confirm(code)
        }).then((result) => {
            document.getElementById('todo: recaptcha div').innerHTML = "Authenticated"
        }).catch((error) => {
            console.log("Error ======= ", error)
            document.getElementById('todo: recaptcha div').innerHTML = "Not Authenticated"
        })
}


////////////////////////////////////////////
//          ADMIN FEATURES                //
////////////////////////////////////////////

// function updateProfile() {
//     let user = firebase.auth().currentUser
//     if (user != null) {
//         user.updateProfile({
//             displayName: "Updated Name"
//         })
//         user.updateEmail("test@update.com").then(function () {
//             alert("Email Updated")
//         }).catch(function (error) {
//             alert("email not updated")
//         })
//     } else {
//         alert("There is no user!")
//     }
// }


// function deleteUser() {
//     let user = firebase.auth().currentUser
//     user.delete().then(function () {
//         alert("user deleted!")
//     }).catch(function (error) {
//         alert("User not deleted!")
//     })
// }

// function resetPassword() {
//     let user = firebase.auth().currentUser
//     firebase.auth().sendPasswordResetEmail(user.email).then(function () {
//         alert("Email sent!")
//     }).catch("Email not sent!")
// }



// TO BE IMPLEMENTED FEATURES


// btnLogout.addEventListener('click', e => {
//     firebase.auth().signOut()
// })

// Add a realtime listener - logout button hiding
// firebase.auth().onAuthStateChanged(firebaseUser => {
//     if (firebaseUser) {
//         console.log(firebaseUser);
//         btnLogout.classList.remove("hide");
//     } else {
//         console.log("not logged in");
//         btnLogout.classList.add("hide");
//     }
// });
// rootRef.on('value', (snapshot) => {
//     snapshotValue = snapshot.val()
//     console.log(snapshotValue)
// })
// function logout() {
//     firebase.auth().signOut()
//         .then(function () {
//             alert("user signed out")
//         })
//         .catch(function (error) {
//             alert("Something went wrong")
//         })
// }