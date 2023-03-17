function checkCredentials() {
    const name = document.getElementById("nameInput").value;
    const pass = document.getElementById("passInput").value;
    
    if (name === "myusername" && pass === "mypassword") {
        location.href = "secret.html";
    } else {
        alert("Incorrect username or password");
    }
}