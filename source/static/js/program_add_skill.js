function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

async function makeRequest(url, method = 'GET', data = undefined) {
    let opts = {method, headers: {}};

    if (!csrfSafeMethod(method))
        opts.headers['X-CSRFToken'] = getCookie('csrftoken');

    if (data) {
        opts.headers['Content-Type'] = 'application/json';
        opts.body = JSON.stringify(data);
    }

    let response = await fetch(url, opts);

    if (response.ok) {  // нормальный ответ
        return response;
    } else {            // ошибка
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

async function update_program(event) {
    event.preventDefault()
    let id = event.target.getAttribute("data-id")
    document.getElementById("add_creteria").value = ""
    // const criteria = document.getElementById("criteria")
    // if(criteria){
    //     criteria.remove()
    // }
    let modal_body = document.getElementById("modal_body")
    const main_goal = document.getElementById("add_goal")
    let add_goal = [...(modal_body.getElementsByClassName("add_goal"))]
    main_goal.value = ""
            add_goal.forEach((el)=>{
                if (el !== main_goal){
                    el.remove()
                }
            })
    let url = event.target.getAttribute("href");
    const response = await makeRequest(url);
    let update_pr = await response.json();
    if (update_pr.error){alert(update_pr.error)}else {
        let add_creteria = document.getElementById("add_creteria")
        add_creteria.value = update_pr.add_creteria
        // const input_criteria = document.createElement("input")
        // input_criteria.setAttribute("id", "criteria")
        // input_criteria.value = update_pr.criteria
        // add_creteria.before(input_criteria)
        const add_new_goal = document.getElementById('add_new_goal')
        add_new_goal.onclick = (e) => {
            e.preventDefault()
            const input = document.createElement("input")
            input.setAttribute("class", "add_goal")
            input.setAttribute("placeholder", "Добавить цель")
            add_new_goal.before(input)
        }
        for (let i = 0; i < update_pr.goals.length; i++) {
            const input = document.createElement("input")
            input.setAttribute("class", "add_goal")
            input.setAttribute("placeholder", "Добавить цель")
            input.value = update_pr.goals[i]
            add_new_goal.after(input)
        }
        $("#exampleModal").modal("show")
        const button = document.getElementById('save')

        button.onclick = async (e) => {
            e.preventDefault()

            event.target.style.backgroundColor = 'red'
            let add_creteria = document.getElementById("add_creteria")
            let add_creteria_value = add_creteria.value
            // let criteria = input_criteria.value
            let add_goal = [...(modal_body.getElementsByClassName("add_goal"))]
            let goals = add_goal.map((el) => {
                return el.value
            })
            try {
                await makeRequest(url, 'POST', {'id': id, 'add_creteria': add_creteria_value, 'goals': goals});


                $("#exampleModal").modal("hide")
            } catch (error) {
                console.log(error);
            }
        }
    }
}


function add_new_input_goal(){
    const modal_body = document.getElementById("add_new_goal");
    const input = document.createElement("input")
    input.innerHTML = '<input name ="add_goal" placeholder="Добавить цель">'
    console.log(input);
    modal_body.appendChild(input)
}

async function open_modal(event){
    event.preventDefault()
    document.getElementById("add_creteria").value = ""
    // const criteria = document.getElementById("criteria")
    // if(criteria){
    //     criteria.remove()
    // }
    let modal_body = document.getElementById("modal_body")
    const main_goal = document.getElementById("add_goal")
    let add_goal = [...(modal_body.getElementsByClassName("add_goal"))]
    main_goal.value = ""
            add_goal.forEach((el)=>{
                if (el !== main_goal){
                    el.remove()
                }
            })

    $("#exampleModal").modal("show")
    let id = event.target.getAttribute("data-id")
    let url = event.target.getAttribute("href");
    const button = document.getElementById('save')
    const add_new_goal = document.getElementById('add_new_goal')
    add_new_goal.onclick = (e) => {
        e.preventDefault()
        const input = document.createElement("input")
        input.setAttribute("class", "add_goal")
        input.setAttribute("placeholder", "Добавить цель")
        add_new_goal.after(input)
    }
    button.onclick =  async (e) => {
        e.preventDefault()

        event.target.style.backgroundColor = 'red'
        let add_creteria = document.getElementById("add_creteria")
        let add_creteria_value = add_creteria.value
        let add_goal = [...(modal_body.getElementsByClassName("add_goal"))]
        let goals = add_goal.map( (el) => {
                return el.value
        })
        try {
            await makeRequest(url, 'POST', {'id': id, 'add_creteria': add_creteria_value, 'goals': goals});


            $("#exampleModal").modal("hide")
        }
        catch (error) {
            console.log(error);
        }
    }
}

