export function getFormData(form) {
    const formData = new FormData(form);
    const data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }
    return data;
}

export function setFormData(form, data) {
    for (const key in data) {
        const input = form.querySelector(`[name=${key}]`);
        if (input) {
            input.value = data[key];
        }
    }
}

export function clearForm(form) {
    form.reset();
}
