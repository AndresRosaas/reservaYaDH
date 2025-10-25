import Header from "./Header";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
    return (
        <div className="main-layout">
            <Header />
            <main className="main-content">{children}</main>
            <Footer />
        </div>
    );
};
export default MainLayout;