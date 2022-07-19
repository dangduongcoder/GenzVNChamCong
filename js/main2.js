


var idForm = LINK.split('/forms/d/')[1].split('/')[0]


// Set the options that I want

var count = 0;

var activeBox = []


$(document).ready(function () {
    
    addBox()


});

function addBox() {
    count++
    activeBox.push(count);

    document.getElementsByClassName('login-wrap ')[0].insertAdjacentHTML('beforeend', `
    <div class="login-wrap mb-6">
        <div class="w-full position-relative" id="box-${count}">
            <button onclick="removeBox(${count})" class="position-absolute btn btn-danger" style="bottom: 60px; right: 2px; z-index: 10;">Xoá việc này</button>
            <iframe src="https://docs.google.com/forms/d/${idForm}/viewform?embedded=true" 
            frameborder="0"
            marginheight="0"
            marginwidth="0"
            style="
                width: 100%;
                height: 1500px;
            "
            >
                Đang tải…
            </iframe>
        </div>
        
    </div>
    
    `)
}

function removeBox(_id) {
    document.getElementById(`box-${_id}`).innerHTML = '';
    activeBox = activeBox.filter(item => item !== _id)
}