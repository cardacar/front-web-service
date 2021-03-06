import React, { Fragment, useState} from 'react'

export function useForm (initialFValues, validateOnChange= false, validate) {
    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e=>{
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]:value
        })
        if(validateOnChange)
            validate({[name]:value})
    }

    const resetForm = ()=>{
        setValues(initialFValues)
        setErrors({})
    }
    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    }
}

export const Form = (props) => {
    const {children, ...others} = props
    return (
        <Fragment>
            <form autoComplete="off" {...others}>
                {props.children}
            </form>
        </Fragment>
    )
};