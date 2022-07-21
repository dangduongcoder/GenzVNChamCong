


var manhanvien = [
    { id: 'LS1', text: 'NV 1' },
    { id: 'LS2', text: 'NV 2' },
    { id: 'LS3', text: 'NV 3' }
];

var congviec = [
    { id: 'LS1', text: 'Livestream 1' },
    { id: 'LS2', text: 'Livestream 2' },
    { id: 'LS3', text: 'Livestream 3' }
];


const API = 'https://api.sheetmonkey.io/form/qqdH4sYTBLEiNmCYW27HD5'
const ggFormMaNV = 'entry.1564884042'//ID Form Mã nhân viên
const ggFormMaXT = 'entry.1323120707'//ID Form Mã xác thực
const ggFormMaCV = 'entry.109285077'//ID Form Mã công việc
const ggFormKPI = 'entry.405715830'//ID Form KPI




var count = 2;

var activeForms = [1];



$(document).ready(function () {
    // addJobBox()
    $("#manhanvien").select2({
        placeholder: 'Chọn công việc...',
        data: manhanvien
    })

    $("#job-1").select2({
        placeholder: 'Chọn công việc...',
        data: congviec
    })


});

function sendData() {
    fetch(API, {
        method: "POST",
        headers: {
            'authority': 'docs.google.com',
            'Content-Type': 'application/json',
            'x-client-data': 'CIe2yQEIorbJAQjEtskBCKmdygEImOTKAQiTocsBCNvvywEI07nMAQi3uswBCPi6zAEIgLvMAQiJu8wBCKa8zAEIlb3MAQjEv8wBCPrAzAEYq6nKAQ==',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
        },
        body: `${ggFormMaNV}=1&${ggFormMaXT}=2&${ggFormMaCV}=3&${ggFormKPI}=4`
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch (err => console.log(err));

    // $.ajax({
    //     type: 'POST',
    //     url: API,
    //     headers: {
    //         'authority': 'docs.google.com',
    //         'Content-Type': 'application/json',
    //         'x-client-data': 'CIe2yQEIorbJAQjEtskBCKmdygEImOTKAQiTocsBCNvvywEI07nMAQi3uswBCPi6zAEIgLvMAQiJu8wBCKa8zAEIlb3MAQjEv8wBCPrAzAEYq6nKAQ==',
    //         'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
    //     },
    //     data: `${ggFormMaNV}=1&${ggFormMaXT}=2&${ggFormMaCV}=3&${ggFormKPI}=4`
    //     //OR
    //     //beforeSend: function(xhr) {
    //     //  xhr.setRequestHeader("My-First-Header", "first value");
    //     //  xhr.setRequestHeader("My-Second-Header", "second value");
    //     //}
    // }).done(function (data) {
    //     alert(data);
    // });
}


function getAllInput() {
    let ret = []
    for (let i = 0; i < activeForms.length; i++) {
        console.log(`get value job-${i}`);
        ret.push({
            job: document.getElementById(`job-${activeForms[i]}`).value,
            kpi: document.getElementById(`kpi-${activeForms[i]}`).value
        })
    }
    console.log(ret);
}

function removeJob(_id) {
    document.getElementById(`form-${_id}`).innerHTML = ''
    activeForms = activeForms.filter(item => item !== _id)
}

function addJobBox() {
    document.getElementById('jobs').insertAdjacentHTML('beforeend', `
    <div class="form-group mt-3" id="form-${count}">
        <span>
            Công việc ${count}
            <select id="job-${count}" class="js-states form-control" >
            </select>
        </span>
        <div class="form-group f-flex mt-4">
            <input id="kpi-${count}" type="" class="form-control fw-bold" required>
            <label class="form-control-placeholder">KPI</label>
        </div>
        <div class="form-group f-flex mt-4">
            <button  onclick="removeJob(${count})" id="remove-${count}" class="btn btn-danger rounded px-3 w-100">Xoá công việc ${count}</button>
        </div>
        <hr>
    </div>
    
    `)
    console.log(`job-${count} added`);

    $(`#job-${count}`).ready(() => {
        $(`#job-${count}`).select2({
            placeholder: 'Chọn công việc...',
            data: congviec
        });
        console.log(`job-${count} ready`);
        activeForms.push(count)
        count++;

    });




}


$('#add-job').click(() => {
    addJobBox();
});