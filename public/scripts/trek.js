const nimiElement = document.getElementById('name');
const emailElement = document.getElementById('email');
const markusElement = document.getElementById('description');
const nuppElement = document.getElementById('registreeru');

nuppElement.onclick = () => {
    const nimi = nimiElement.value;
    const email = emailElement.value;
    const markus = markusElement.value;
    console.log('vajutati', { nimi, email, markus })
}