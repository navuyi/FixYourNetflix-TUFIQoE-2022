import React, { useLayoutEffect } from "react";
import Select from "./Select/Select";
import { useSubjectSex } from "../hooks/useSubjectSex";


const SubjectSexSelect = () => {
    const {sex, handle_sex_change, init_subject_sex} = useSubjectSex()

    useLayoutEffect(() => {
        init_subject_sex()
    }, [])

    return(
        <Select 
            label="Sex"
            value={sex}
            handle_change={handle_sex_change}
            options={[
                {text: "Male", value: "male"}, 
                {text: "Female", value: "female"}, 
                {text: "Prefer not to disclose", value: "undisclosed"}
            ]}
        />
    )
}



export default SubjectSexSelect