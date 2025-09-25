// A simple function to redirect the user to a page
const redirectTo = (url) => {
    window.location.href = url;
};

// =========================================================================
// FIREBASE AUTHENTICATION & DATABASE LOGIC
// =========================================================================

// Get Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

// =========================================================================
// LOGIN & SIGN-UP PAGE LOGIC (pages/login.html)
// =========================================================================
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const loginError = document.getElementById('login-error');
const signupError = document.getElementById('signup-error');
const showSignupBtn = document.getElementById('show-signup-btn');
const signupSection = document.getElementById('signup-section');

// Check if we are on the login/signup page
if (loginForm && signupForm) {

    // --- Show/Hide Sign-Up Form ---
    showSignupBtn.addEventListener('click', () => {
        signupSection.style.display = 'block';
        showSignupBtn.style.display = 'none'; // Hide the button once the form is shown
    });

    // --- Login Form Submission ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload
        const email = loginForm['login-email'].value;
        const password = loginForm['login-password'].value;

        // Sign in the user with email and password
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                // Redirect on successful login
                redirectTo('../members/dashboard.html');
            })
            .catch((error) => {
                // Show an error message if login fails
                loginError.textContent = error.message;
            });
    });

    // --- Sign Up Form Submission ---
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload
        const name = signupForm['signup-name'].value; // Get the name from the new input field
        const email = signupForm['signup-email'].value;
        const password = signupForm['signup-password'].value;

        // Create a new user with email and password
        auth.createUserWithEmailAndPassword(email, password)
            .then((cred) => {
                // Add initial user data to the Firestore database, including the name
                return db.collection('users').doc(cred.user.uid).set({
                    name: name, // Store the user's name
                    trees: 0,
                    waste: 0,
                    carbon: 0,
                    badges: ['Eco-Explorer'],
                    upcomingTrips: {} // Initially empty
                });
            })
            .then(() => {
                // Redirect to the LOGIN page after successful sign-up
                redirectTo('../pages/login.html');
                alert("Account created! Please log in with your new details.");
            })
            .catch((error) => {
                // Show an error message if sign-up fails
                signupError.textContent = error.message;
            });
    });
}

// =========================================================================
// GLOBAL AUTHENTICATION STATE & LOGOUT LOGIC
// =========================================================================
const navAuthLink = document.getElementById('nav-auth-link');
const logoutBtn = document.getElementById('logout-btn');

// Listen for a change in the user's login state
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is logged in
        navAuthLink.innerHTML = '<li><a href="../members/dashboard.html" class="btn btn-primary">My Dashboard</a></li>';

        // Show the logout button if we are on the dashboard page
        if (logoutBtn) {
            logoutBtn.style.display = 'block';
        }

        // Handle dashboard page-specific logic
        const memberNameSpan = document.getElementById('member-name');
        if (memberNameSpan) {
            db.collection('users').doc(user.uid).get()
                .then((doc) => {
                    if (doc.exists) {
                        const userData = doc.data();
                        // Display the user's name or email if name isn't available
                        memberNameSpan.textContent = userData.name || user.email;
                        document.getElementById('member-trees-counter').textContent = userData.trees;
                        document.getElementById('member-waste-counter').textContent = userData.waste;
                        document.getElementById('member-carbon-counter').textContent = userData.carbon;

                        const badgeGrid = document.getElementById('badge-grid');
                        if (badgeGrid && userData.badges) {
                            badgeGrid.innerHTML = '';
                            userData.badges.forEach(badge => {
                                const badgeItem = document.createElement('div');
                                badgeItem.className = 'badge-item';
                                badgeItem.innerHTML = `<img src="../img/icons/badge-${badge.toLowerCase().replace(' ', '-')}.svg" alt="${badge} Badge"><p>${badge}</p>`;
                                badgeGrid.appendChild(badgeItem);
                            });
                        }
                    } else {
                        console.log("No such document for user!");
                    }
                })
                .catch((error) => {
                    console.error("Error getting user document:", error);
                });
        }
    } else {
        // User is logged out
        navAuthLink.innerHTML = '<li><a href="../pages/login.html" class="btn btn-primary">Member Login</a></li>';

        // Hide the logout button
        if (logoutBtn) {
            logoutBtn.style.display = 'none';
        }
    }
});

// --- Logout Button Click ---
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut()
            .then(() => {
                // Redirect to the homepage after logging out
                redirectTo('../index.html');
            })
            .catch((error) => {
                console.error("Error signing out:", error);
            });
    });
}

// =========================================================================
// DASHBOARD-SPECIFIC FUNCTIONALITY
// =========================================================================
const logTreeBtn = document.getElementById('log-tree-btn');
const memberTreesCounter = document.getElementById('member-trees-counter');
const logActivityFeedback = document.getElementById('log-activity-feedback');

// Check if we are on the dashboard and if the log button exists
if (logTreeBtn) {
    logTreeBtn.addEventListener('click', () => {
        // Ensure a user is logged in
        const user = auth.currentUser;
        if (user) {
            const userDocRef = db.collection('users').doc(user.uid);

            // Get the current user data
            userDocRef.get().then((doc) => {
                if (doc.exists) {
                    const currentTrees = doc.data().trees || 0;
                    const newTreesCount = currentTrees + 1;

                    // Update the user's document in Firestore with the new tree count
                    return userDocRef.update({
                        trees: newTreesCount
                    }).then(() => {
                        // Update the counter on the page to reflect the new count
                        memberTreesCounter.textContent = newTreesCount;

                        // Provide visual feedback
                        logActivityFeedback.textContent = "Tree planted! Your impact has been recorded.";
                        logActivityFeedback.style.color = "green";
                        setTimeout(() => {
                            logActivityFeedback.textContent = "";
                        }, 3000); // Clear the message after 3 seconds
                    });
                } else {
                    // Create the user document if it doesn't exist
                    return userDocRef.set({
                        name: user.displayName || user.email,
                        trees: 1, // Start with one tree
                        waste: 0,
                        carbon: 0,
                        badges: ['Eco-Explorer'],
                        upcomingTrips: {}
                    }).then(() => {
                        memberTreesCounter.textContent = 1;
                        logActivityFeedback.textContent = "Tree planted! Your impact has been recorded.";
                        logActivityFeedback.style.color = "green";
                        setTimeout(() => {
                            logActivityFeedback.textContent = "";
                        }, 3000);
                    });
                }
            }).catch((error) => {
                console.error("Error updating document:", error);
                logActivityFeedback.textContent = "Error: Could not record your activity.";
                logActivityFeedback.style.color = "red";
            });
        } else {
            console.log("No user is signed in.");
        }
    });
}