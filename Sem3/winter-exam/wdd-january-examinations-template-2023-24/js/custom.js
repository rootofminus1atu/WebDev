const form = document.getElementById("login-form")


form.addEventListener('submit', (e) => {
    e.preventDefault()

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    console.log(`username was: ${username}`)
    console.log(`password was: ${password}`)


    const okElem = document.getElementById('login-ok')
    const notOkElem = document.getElementById('login-not-ok')

    // cybersecurity is my passion
    if (username === 'wmitty' && password === 'password123') {
        console.log("valid login")
        okElem.classList.remove('d-none')
        notOkElem.classList.add('d-none')
    } else {
        console.log("invalid login")
        okElem.classList.add('d-none')
        notOkElem.classList.remove('d-none')
    }
})