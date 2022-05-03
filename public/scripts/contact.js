const nimeElement = document.getElementById('name')
const emailiElement = document.getElementById('email')
const sonumiElement = document.getElementById('message')
const saadaSonumElement = document.getElementById('sendMessage')

saadaSonumElement.addEventListener('click', () => {
    console.log(nimeElement.value)
    console.log(emailiElement.value)
    console.log(sonumiElement.value)
    nimeElement.value = '';
    emailiElement.value = '';
    sonumiElement.value = '';
});