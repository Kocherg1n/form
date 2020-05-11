const regForm = document.querySelector(`.form`)
const sendButton = document.querySelector(`.form__button-submit`)
const errorBox = document.querySelector(`.form__error-box`)

sendButton.addEventListener(`click`, (e) => {
    e.preventDefault()

    if (validateForm(regForm) && regForm.elements.agreement.checked) {

        const data = {
            email: regForm.elements.email.value,
            userPassword: regForm.elements.userPassword.value,
            currency: regForm.elements.currency.value,
            agreement: regForm.elements.agreement.value,
        }

        sendRequest(`POST`, `https://jsonplaceholder.typicode.com/users`, data)

        regForm.elements.userPassword.value = ``
        regForm.elements.email.value = ``
    }
})


const sendRequest = (method, url, body = null) => {

    return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest()
        xhr.open(method, url)
        xhr.responseType = `json`

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response)
            } else {
                resolve(xhr.response)
            }
        }
        xhr.onerror = () => {
            reject(xhr.response)
        }
        xhr.setRequestHeader(`Content-Type`, `application/json`)
        xhr.send(JSON.stringify(body))
    })
}


const validateForm = (form) => {
    let valid = true

    if (!validateField(form.elements.userPassword)) {
        valid = false
    }

    if (!validateField(form.elements.email) || validatePassword(form.elements.userPassword)) {
        valid = false
    }
    return valid
}


const validatePassword = (field) => {
    if (field.value.length < 4) {
        field.previousElementSibling.textContent = `Пароль не должен быть меньше 4 символов`
        field.previousElementSibling.style.background = `#e15433`
        field.style.borderColor = `#e15433`
        field.previousElementSibling.style.display = `block`
        return true
    }

    field.style.borderColor = `transparent`
    field.previousElementSibling.style.display = `none`
    errorBox.style.display = `none`
    return false
}


const validateField = (field) => {
    if (!field.checkValidity()) {
        field.previousElementSibling.textContent = field.validationMessage
        field.previousElementSibling.style.background = `#e15433`
        field.style.borderColor = `#e15433`
        field.previousElementSibling.style.display = `block`
        errorBox.style.display = `flex`

        return false
    } else {
        field.style.borderColor = `transparent`
        field.previousElementSibling.style.display = `none`
        errorBox.style.display = `none`

        return true
    }
}
