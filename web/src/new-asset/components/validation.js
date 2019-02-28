const validate = values => {
    const errors = {}
    if(!values.name) {
        errors.name = 'Required name'
    } else {
        if(!values.name.includes('@')){
            errors.name = 'Enter valid telegram channel'
        }
    }
    if(!values.description) {
        errors.description = 'Required description'
    }
    return errors
}

export default validate;