import React, { ChangeEvent, useLayoutEffect } from "react";
import Input from "./Input/Input";
import { useSubjectAge } from "../hooks/useSubjectAge";

const SubjectAgeInput = () => {
    const {age, handle_age_change, init} = useSubjectAge()

    useLayoutEffect(() =>{
        init() 
    }, [])

    return(
        <Input
            placeholder="Age"
            label="Age"
            handle_change={handle_age_change}
            type="text"
            value={age}
        />
    )
}

export default SubjectAgeInput