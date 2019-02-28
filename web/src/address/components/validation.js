const validate = values => {
    const errors = {}
    if(!values.recipient) {
        errors.recipient = 'Required recipient'
    }
    if(!values.asset) {
        errors.asset = 'Required asset'
    }
    return errors
}

export default validate;