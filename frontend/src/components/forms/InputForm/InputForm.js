// NPM Modules
import React, { useContext } from 'react';
// Material UI
import { InputAdornment, FormControl, Input, InputLabel } from '@material-ui/core';
// Models
// Own modules
import { Context } from '../Form';
// CSS


// Componente reutilizable de tipo Input (usando material)
export default function InputForm(props) {

    // Uso del contexto que envuelve al HOC del formulario
    const context = useContext(Context);

    // Adornments
    const start = props.icon?<InputAdornment position='start' className='InputIcon__Icon'>{props.icon}</InputAdornment>:undefined;
    const end = props.icon?<InputAdornment position='end' className='InputIcon__Icon'>{props.icon}</InputAdornment>:undefined;
    
    // Render
    return (
        <FormControl className={`InputForm ${props.className}`}>
            { props.label && <InputLabel shrink htmlFor={props.name}>{props.label}</InputLabel> }
            <Input
                name={props.name}
                value={context.inputs[props.name] || ''}
                onChange={context.handleInputChange}
                type={props.type}
                placeholder={props.placeholder}
                startAdornment={start}
                endAdornment={end}
                required={props.required}
                inputProps={{ maxLength: props.maxLength }}
                autoComplete={props.autoComplete}
                disabled={props.disabled}
            />
        </FormControl>
    )
}