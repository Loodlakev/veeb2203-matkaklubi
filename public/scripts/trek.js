const nimiElement = document.getElementById('name');
const emailElement = document.getElementById('email');
const markusElement = document.getElementById('description');
const sonumElement = document.getElementById('message');
const nuppElement = document.getElementById('registreeru');

nuppElement.onclick = async () => {
    const nimi = nimiElement.value;
    const email = emailElement.value;
    const markus = markusElement.value;
    if (nimi === '' || email === '' || markus === '') {
        sonumElement.innerHTML = 'Palun täitke kõik väljad!'
        sonumElement.style.color = 'red';
        return;
    }
    const osaleja = { nimi, email, markus };
    const matkaId = window.location.href.split('/').at(-1);
    const paringuKeha = { matkaId, osaleja };

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paringuKeha),
        });
        const responseJson = await response.json();
        
        if (responseJson.response === "Töötas!") {
            nimiElement.value = '';
            emailElement.value = '';
            markusElement.value = '';
            sonumElement.innerHTML = 'Olete registreeritud!'
            sonumElement.style.color = 'green';
        } else {
            sonumElement.innerHTML = 'Tekkis viga, proovige mõne aja pärast uuesti!'
            sonumElement.style.color = 'red';
        }
    } catch (e) {

        sonumElement.innerHTML = 'Tekkis viga, proovige mõne aja pärast uuesti!'
        sonumElement.style.color = 'red';
    }
}