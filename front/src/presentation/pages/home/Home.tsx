import { useSelector } from "react-redux";
import { RootState } from "../../../context/redux/store";


export const Home = () => {

    const { loading, error,message, user} = useSelector((state: RootState) => state.auth);

    console.log(user);

    return(
        <div>
            <h2>Teste home</h2>
        </div>
    )
}