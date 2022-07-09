import { FunctionComponent } from "react";
import classes from './home.module.css';
import { gql, useQuery } from '@apollo/client';

interface HomeProps {

}

const GET_ACCOUNT = gql`
  query GetAccount {
    getAccount {
      _id
      name
      email
      avatar
    }
  }
`;
const Home: FunctionComponent<HomeProps> = () => {
    const { data, error, loading } = useQuery(GET_ACCOUNT)
    return (
        <div>
            <h1>Home Page, {JSON.stringify(data)}</h1>
        </div>
    );
}

export default Home;