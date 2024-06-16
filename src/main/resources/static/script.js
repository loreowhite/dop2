let drivers = []

$(document).ready(function () {
    window.onload = () => showList();

    const showList = async function () {
        await $.get("/api/driver", (data) => {
            data.forEach(x => {
                drivers.push(x);
            });
        });
        const bodyList = $(".drivers-list");
        $.each(bodyList, (x) => $(x).remove());
        drivers.forEach(x => {
            bodyList.append(`<div class="driver" id=${x.id}>
                                <a href="/driver/${x.id}">
                                    <h3>
                                        ${x.name} ${x.surname} ${x.patronymic}
                                    </h3>
                                </a>
                                <button onclick="deleteDriver(${x.id})">Удалить</button>
                            </div>`);
        });
    }
});

const addNewDriver = function () {
    const list = $(".drivers-list");
    list.prepend(`
        <div class="add-form">
            <div>Имя</div> <input class="name" type="text" name="Номер" placeholder="Имя">
            <div>Фамилия</div> <input class="surname" type="text" name="Номер" placeholder="Фамилия">
            <div>Отчество</div> <input class="patronymic" type="text" name="Номер" placeholder="Отчество">
            <button onclick="addDriver()">Добавить</button>
        </div>
    `);
}

const addDriver = async function () {
    const name = $(".name").val();
    const surname = $(".surname").val();
    const patronymic = $(".patronymic").val();

    const body = `{
        "name":"${name}",
        "surname":"${surname}",
        "patronymic":"${patronymic}"
    }`;

    let id;
    try {
        id = await $.ajax({
            url: `/api/driver`,
            type: 'POST',
            data: body,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
        });
    } catch (e) {
        console.log(e);
    }

    $(".add-form").remove();

    const licenseInfo = $(".drivers-list");
    licenseInfo.append(`
        <div class="driver" id=${id}>
                                <a href="/driver/${id}">
                                    <h3>
                                        ${name} ${surname} ${patronymic}
                                    </h3>
                                </a>
                                <button onclick="deleteDriver(${id})">Удалить</button>
                            </div>`);
}

const deleteDriver = async function (id) {
    const driver = $(`#${id}`);
    driver.remove();

    $.ajax({
        url: `/api/driver/${id}`,
        type: 'DELETE'
    });
}