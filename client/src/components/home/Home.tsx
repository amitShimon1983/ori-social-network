import { FunctionComponent } from "react";
import classes from './home.module.css';

interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {
    return (
        <div>
            <h1>Home Page</h1>
        </div>
    );
}

export default Home;