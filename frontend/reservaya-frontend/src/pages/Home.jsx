import './Home.css';
import ProductList from '../components/products/ProductList';
import MainLayout from '../components/layout/MainLayout';
import SearchBar from '../components/search/SearchBar';

//Pagina principal con el listado de productos
const Home = () => {
    return (
       
       <div className="main-layout">
        <MainLayout>
            <SearchBar />
            {/*Listado de productos*/}
            <ProductList />

        </MainLayout >
        </div>
    );
};
export default Home;