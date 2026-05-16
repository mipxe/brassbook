import React, {useState} from "react";
import './signInput.css';
import './feedbackInput.css'


interface SignFieldProps extends React.HTMLAttributes<HTMLInputElement>{
    label?: string
    placeHolder?: string
    type?: string
    name?: string
}
function Input({name, label, placeHolder, id, type, className}: SignFieldProps) {
    const [value, setValue] = useState('')

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value)
    }

    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                placeholder={placeHolder}
                className={className}
                onChange={(event) => changeHandler(event)}
            />
        </>
    )
}

export default Input