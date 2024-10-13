import { useParams } from "react-router-dom"

export const Task = () => {
    const params = useParams()



    return(
        <div>
            <h2>Task {params.id} </h2>
        </div>
    )
}