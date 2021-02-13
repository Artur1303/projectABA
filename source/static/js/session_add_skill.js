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

async function addSkill(event) {
    event.preventDefault();
    let skill = event.target;
    console.log(skill)
    let id = skill.id;
    console.log(id)
    let url = skill.href;
    console.log(url)
    let remove = skill.parentElement.childNodes[3]
    console.log(remove)
    try {
        let response = await makeRequest(url, 'POST', {'id': id}).then((response) => response.json());
        if (response['add'] === 'add'){
             skill.style.display = 'none';
             remove.style.display = 'inline';
        }
        console.log(response)
    } catch (error) {
        console.log(error);
    }
}


async function deleteSkill(event) {
    event.preventDefault();
    let skill = event.target;
    console.log(skill)
    let id = skill.id;
    console.log(id)
    let url = skill.href;
    console.log(url)
    skill.style.display = 'none'
    let add = skill.parentElement.childNodes[1]
    console.log(add)
    try {
        let response = await makeRequest(url, 'DELETE', {'id': id}).then((response) => response.json());
        console.log(response)
        if (response['remove'] === 'remove'){
            add.style.display = 'inline';
        }
        console.log(response)
    } catch (error) {
        console.log(error);
    }
}
