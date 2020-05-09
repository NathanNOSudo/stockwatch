console.log("signup.js file fired")

// Get elements
const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");
const txtName = document.getElementById("txtName")
const txtPhone = document.getElementById("txtPhone")
const btnLogin = document.getElementById("btnLogin");
const btnSignup = document.getElementById("btnSignUp");
const btnLogout = document.getElementById("btnLogout");
const googleSignInButton = document.getElementById("google-signin-btn")
const phoneSignInButton = document.getElementById("phone-signin-btn")
const preObject = document.getElementById("object")
const passwordRpt = document.getElementById("passwordRpt")

const database = firebase.database()
let rootRef = database.ref()

let auth = firebase.auth()


document.getElementById("btnSignUp").onclick = function () {
    const email = txtEmail.value
    const pass = txtPassword.value
    signUp(email, pass)
};

phoneSignInButton.addEventListener('click', e => {
    numberLogin(phone.value)
    console.log('phone clicked')
})

function signUp(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    console.log("true")
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/weak-password') {
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
}

function updateProfile() {
    let user = firebase.auth().currentUser
    if (user != null) {
        user.updateProfile({
            displayName: "Updated Name"
        })
        user.updateEmail("test@update.com").then(function () {
            alert("Email Updated")
        }).catch(function (error) {
            alert("email not updated")
        })
    } else {
        alert("There is no user!")
    }
}

function verifyUser() {
    let user = firebase.auth().currentUser
    user.sendEmailVerification().then(function () {
        alert("Email sent!")
    }).catch("Email not sent!")
}

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
// TODO: be implemented
// function logout() {
//     firebase.auth().signOut()
//         .then(function () {
//             alert("user signed out")
//         })
//         .catch(function (error) {
//             alert("Something went wrong")
//         })
// }