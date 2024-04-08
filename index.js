// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBGMYQS9X1O74dTYFX64Z-08GroSIc2VkM",
    authDomain: "property-hub-cf99f.firebaseapp.com",
    databaseURL: "https://property-hub-cf99f-default-rtdb.firebaseio.com",
    projectId: "property-hub-cf99f",
    storageBucket: "property-hub-cf99f.appspot.com",
    messagingSenderId: "394674200067",
    appId: "1:394674200067:web:7006a13d7f022411433836"

};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()


// Set up our register function
function register() {
    // Get all our input fields
    fname = document.getElementById('firstname').value
    lname = document.getElementById('lastname').value
    email = document.getElementById('email').value
    password = document.getElementById('password').value

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!')
        return
        // Don't continue running the code
    }
    if (validate_field(fname) == false || validate_field(lname) == false) {
        alert('One or More Extra Fields is Outta Line!!')
        return
    }

    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
        .then(function () {
            // Declare user variable
            var user = auth.currentUser

            // Add this user to Firebase Database
            var database_ref = database.ref()

            // Create User data
            var user_data = {
                email: email,
                firstname: fname,
                lastname: lname,

                last_login: Date.now()
            }

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).set(user_data)

            // DOne
            alert('User Created!!')
        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code
            var error_message = error.message

            alert(error_message)
        })
}

// Set up our login function
function login() {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!')
        return
        // Don't continue running the code
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(function () {
            // Declare user variable
            var user = auth.currentUser

            // Add this user to Firebase Database
            var database_ref = database.ref()

            // Create User data
            var user_data = {
                last_login: Date.now()
            }

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).update(user_data)

            // DOne
            alert('User Logged In!!')
            window.location.assign("home.html")

        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code
            var error_message = error.message

            alert(error_message)
        })
}




// Validate Functions
function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        // Email is good
        return true
    } else {
        // Email is not good
        return false
    }
}

function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
        return false
    } else {
        return true
    }
}

function validate_field(field) {
    if (field == null) {
        return false
    }

    if (field.length <= 0) {
        return false
    } else {
        return true
    }
}
