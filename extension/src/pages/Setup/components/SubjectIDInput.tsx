import React, { useLayoutEffect } from "react";
import { useSubjectID } from "../hooks/useSubjectID";
import Input from "./Input/Input";



const SubjectIDInput = () => {
    const {init_subject_id, handle_subject_id_change, subjectID} = useSubjectID()

    useLayoutEffect(() => {
        init_subject_id()
    }, [])

    return(
        <Input 
            type="text"
            placeholder="Subject ID"
            value={subjectID}
            handle_change={handle_subject_id_change}
            label={"Subject ID"}
        />
    )
}


export default SubjectIDInput