const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeLogin = document.getElementById('closeLogin');
const closeSignup = document.getElementById('closeSignup');

loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'flex';
});

signupBtn.addEventListener('click', () => {
    signupModal.style.display = 'flex';
});

closeLogin.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

closeSignup.addEventListener('click', () => {
    signupModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (e.target === signupModal) {
        signupModal.style.display = 'none';
    }
});

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Login functionality would be implemented here');
    loginModal.style.display = 'none';
});

document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Signup functionality would be implemented here');
    signupModal.style.display = 'none';
});