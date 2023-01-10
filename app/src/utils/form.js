export function getFormData(form) {
    const formData = new FormData(form);
    const formTypes = Array.from(form.elements);
    const types = {};
    for (const [key, value] of formTypes.entries()) {
        types[value.name] = value.tagName;
    }
    const data = {};

    for (let [key, value] of formData.entries()) {
        if (types[key] === "SELECT") {
            value = parseInt(value, 10);
        }
        data[key] = value;
    }
    data["id"] = form.getAttribute("data-id");
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
