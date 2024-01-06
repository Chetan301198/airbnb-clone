import { IListingParams } from "./constant";
import HomeClient from "./components/HomeClient";

interface HomeProps {
  searchParams: IListingParams;
}

const Home = ({ searchParams }: HomeProps) => {
  return <HomeClient searchParams={searchParams} />;
};

export default Home;
