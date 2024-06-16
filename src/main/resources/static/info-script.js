let person;

$(document).ready(function () {
    window.onload = () => showDriverInfo();

    const showDriverInfo = async function () {
        const urls = window.location.href.split("/");
        const id = urls[urls.length - 1];
        person = await $.get(`/api/driver/${id}`);
        const info = $(".drivers-info");
        info.append(`
                <div>
                    <h1>
                        ${person.surname} ${person.name} ${person.patronymic}
                    </h1>
                    <button onclick="updateCredentials()">Редактировать</button>
                </div>
        `);
        await showDriverLicense();
    }

    const showDriverLicense = async function () {
        const license = await $.get(`/api/driver/${person.id}/license`);
        const licenseInfo = $(".driver-license");

        if (license) {
            licenseInfo.append(`
            <h2>Удостоверение</h2>
        <div class="driver-license-info">
            <h3>Номер <div class="number">${license.number}</div></h3>
            <h3>Имя <div class="name">${license.name}</div></h3>
            <h3>Фамилия <div class="surname">${license.surname}</div></h3>
            <h3>Отчество <div class="patronymic">${license.patronymic}</div></h3>
            <h3>Дата выдачи <div class="issueDate">${license.issueDate}</div></h3>
            <h3>Дата окончания <div class="expirationDate">${license.expirationDate}</div></h3>
            <h3>Место жительства <div class="residencePlace">${license.residencePlace}</div></h3>
        </div>
        <div class="driver-license-control">
            <button onclick="deleteDriverLicense()">Удалить удостоверение</button>
            <button onclick="updateLicense()">Обновить удостоверение</button>
        </div>
        `);
        } else {
            licenseInfo.append(`<h2>Удостоверения нет</h2>
                <button onclick="showInputLicenseInfo()">Добавить удостоверение</button>`)
        }
    }
});

const updateCredentials = async function () {
    const info = $(".drivers-info");
    info.children().remove();
    info.append(`
        <div>
            <div>Имя</div> <input class="name" type="text" name="Номер" placeholder="Имя" value="${person.name}">
            <div>Фамилия</div> <input class="surname" type="text" name="Номер" placeholder="Фамилия" value="${person.surname}">
            <div>Отчество</div> <input class="patronymic" type="text" name="Номер" placeholder="Отчество" value="${person.patronymic}">
        </div>
        <button onclick="updateDriverCredentials()">Обновить</button>
    `);
}

const updateDriverCredentials = async function () {
    person.name = $(".name").val();
    person.surname = $(".surname").val();
    person.patronymic = $(".patronymic").val();

    const body = `{
        "name":"${person.name}",
        "surname":"${person.surname}",
        "patronymic":"${person.patronymic}"
    }`;

    try {
        await $.ajax({
            url: `/api/driver/${person.id}`,
            type: 'PUT',
            data: body,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
        });
    } catch (e) {
        console.log(e);
    }

    const licenseInfo = $(".drivers-info");
    licenseInfo.children().remove();
    licenseInfo.append(`
        <div>
            <h1>
                ${person.surname} ${person.name} ${person.patronymic}
            </h1>
            <button onclick="updateCredentials()">Редактировать</button>
        </div>`);
}

const updateLicense = async function () {
    const number = $(".number").text();
    const name = $(".name").text();
    const surname = $(".surname").text();
    const patronymic = $(".patronymic").text();
    const issueDate = $(".issueDate").text();
    const expirationDate = $(".expirationDate").text();
    const residencePlace = $(".residencePlace").text();

    const licenseInfo = $(".driver-license")
    licenseInfo.children().remove();

    licenseInfo.append(`
    <h2>Добавление удостоверения</h2>
    <div>Номер</div> <input class="number" type="text" name="Номер" placeholder="Номер удостоверения" value="${number}">
<div>Имя</div> <input class="name" type="text" name="Номер" placeholder="Имя" value="${name}">
<div>Фамилия</div> <input class="surname" type="text" name="Номер" placeholder="Фамилия" value="${surname}">
<div>Отчество</div> <input class="patronymic" type="text" name="Номер" placeholder="Отчество" value="${patronymic}">
<div>Дата выдачи</div> <input class="issueDate" type="text" name="Номер" placeholder="Дата выдачи" value="${issueDate}">
<div>Дата окончания</div> <input class="expirationDate" type="text" name="Номер" placeholder="Дата окончания" value="${expirationDate}">
<div>Место жительства</div> <input class="residencePlace" type="text" name="Номер" placeholder="Место жительства" value="${residencePlace}">
<button onclick="updateLicenseInfo()">Обновить</button>`);
}

const updateLicenseInfo = async function () {
    const number = $(".number").val();
    const name = $(".name").val();
    const surname = $(".surname").val();
    const patronymic = $(".patronymic").val();
    const issueDate = $(".issueDate").val();
    const expirationDate = $(".expirationDate").val();
    const residencePlace = $(".residencePlace").val();

    const body = `{
        "number":${number},
        "name":"${name}",
        "surname":"${surname}",
        "patronymic":"${patronymic}",
        "issueDate": "${issueDate}",
        "expirationDate": "${expirationDate}",
        "residencePlace": "${residencePlace}"
    }`;

    try {
        await $.ajax({
            url: `/api/driver/${person.id}/license`,
            type: 'PUT',
            data: body,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
        });
    } catch (e) {
        console.log(e);
    }

    const licenseInfo = $(".driver-license");
    licenseInfo.children().remove();
    licenseInfo.append(`
        <h2>Удостоверение</h2>
        <div class="driver-license-info">
        <h3>Номер ${number}</h3>
        <h3>Имя ${name}</h3>
        <h3>Фамилия ${surname}</h3>
        <h3>Отчество ${patronymic}</h3>
        <h3>Дата выдачи ${issueDate}</h3>
        <h3>Дата окончания ${expirationDate}</h3>
        <h3>Место жительства ${residencePlace}</h3>
        </div>
        <div class="driver-license-control">
            <button onclick="deleteDriverLicense(${person.id})">Удалить удостоверение</button>
            <button onclick="updateLicense(${person.id})">Обновить удостоверение</button>
        </div>
        `);
}

const showInputLicenseInfo = async function () {
    const licenseInfo = $(".driver-license")
    licenseInfo.children().remove();

    licenseInfo.append(`<h2>Добавление удостоверения</h2>
    <div>Номер</div> <input class="number" type="text" name="Номер" placeholder="Номер удостоверения">
<div>Имя</div> <input class="name" type="text" name="Номер" placeholder="Имя">
<div>Фамилия</div> <input class="surname" type="text" name="Номер" placeholder="Фамилия">
<div>Отчество</div> <input class="patronymic" type="text" name="Номер" placeholder="Отчество">
<div>Дата выдачи</div> <input class="issueDate" type="text" name="Номер" placeholder="Дата выдачи">
<div>Дата окончания</div> <input class="expirationDate" type="text" name="Номер" placeholder="Дата окончания">
<div>Место жительства</div> <input class="residencePlace" type="text" name="Номер" placeholder="Место жительства">
<button onclick="addLicense()">Добавить</button>
`)
}

const addLicense = async function () {
    const number = $(".number").val();
    const name = $(".name").val();
    const surname = $(".surname").val();
    const patronymic = $(".patronymic").val();
    const issueDate = $(".issueDate").val();
    const expirationDate = $(".expirationDate").val();
    const residencePlace = $(".residencePlace").val();

    const body = `{
        "number":${number},
        "name":"${name}",
        "surname":"${surname}",
        "patronymic":"${patronymic}",
        "issueDate": "${issueDate}",
        "expirationDate": "${expirationDate}",
        "residencePlace": "${residencePlace}"
    }`;

    await $.ajax({
        url: `/api/driver/${person.id}/license`,
        type: 'POST',
        data: body,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
    });

    const licenseInfo = $(".driver-license");
    licenseInfo.children().remove();
    licenseInfo.append(`
        <div class="driver-license-info">
        <h3>Номер ${number}</h3>
        <h3>Имя ${name}</h3>
        <h3>Фамилия ${surname}</h3>
        <h3>Отчество ${patronymic}</h3>
        <h3>Дата выдачи ${issueDate}</h3>
        <h3>Дата окончания ${expirationDate}</h3>
        <h3>Место жительства ${residencePlace}</h3>
</div>
<div class="driver-license-control">
<button onclick="deleteDriverLicense()">Удалить удостоверение</button>
<button>Обновить удостоверение</button>
</div>
        `);
}

const deleteDriverLicense = async function () {
    const licenseInfo = $(".driver-license");
    licenseInfo.children().remove();
    licenseInfo.append('<h2>Удостоверения нет</h2>' +
        '<button>Добавить удостоверение</button>');

    $.ajax({
        url: `/api/driver/${person.id}/license`,
        type: 'DELETE'
    });
}