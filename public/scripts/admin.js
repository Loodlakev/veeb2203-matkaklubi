const matkadElement = document.getElementById('matkad');
const matkaDetailElement = document.getElementById('matka-detail');
const matkaPealkiriElement = document.getElementById('matka-pealkiri');
const detailPealkiriElement = document.getElementById('detail-pealkiri');
const detailKirjeldusElement = document.getElementById('detail-kirjeldus');
const detailAsukohtElement = document.getElementById('detail-asukoht');
const detailAlgusElement = document.getElementById('detail-algus');
const detailLoppElement = document.getElementById('detail-lopp');
const detailHindElement = document.getElementById('detail-hind');
const detailPiltElement = document.getElementById('detail-pilt');
const detailSalvestaElement = document.getElementById('detail-salvesta');
const detailOsalejadElement = document.getElementById('detail-osalejad');
let matkad;
let matk;

const laeMatkad = async () => {
    matkadElement.innerHTML = '';
    const response = await fetch('/api/treks');
    matkad = await response.json();
    for (let i = 0; i < matkad.length; i++) {
        matkadElement.innerHTML += `
            <div>
                <a href="#" onclick="kuvaMatkaDetail(${matkad[i].id})">${matkad[i].title}</a>
            </div>
        `;
    }
}

const kuvaMatkaDetail = (id) => {
    matk = matkad.find((matk) => matk.id === id);
    let osalejateNimed = "";
    for (let i = 0; i < matk.participants.length; i++) {
        osalejateNimed += `<div>${matk.participants[i].nimi}</div>`;
    }
    matkaDetailElement.style.display = 'flex';
    matkaPealkiriElement.innerHTML = matk.title;
    detailPealkiriElement.value = matk.title;
    detailKirjeldusElement.value = matk.description;
    detailAsukohtElement.value = matk.locationDescription;
    detailAlgusElement.value = matk.startsAt;
    detailLoppElement.value = matk.endsAt;
    detailHindElement.value = matk.price;
    detailPiltElement.value = matk.imageUrl;
    detailSalvestaElement.addEventListener("click", salvestaMatk);
    detailOsalejadElement.innerHTML = osalejateNimed;
}

const salvestaMatk = async () => {
    matk.title = detailPealkiriElement.value;
    matk.description = detailKirjeldusElement.value;
    matk.locationDescription = detailAsukohtElement.value;
    matk.startsAt = detailAlgusElement.value;
    matk.endsAt = detailLoppElement.value;
    matk.price = detailHindElement.value;
    matk.imageUrl = detailPiltElement.value;

    try {
        const response = await fetch(`/api/treks/${matk.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(matk),
        });
        const responseJson = await response.json();
        console.log(responseJson);
    } catch (e) {
        console.log(e);
    }
    await laeMatkad();
    kuvaMatkaDetail(matk.id);
}

(async () => {
    await laeMatkad();
})();
