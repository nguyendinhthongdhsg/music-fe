
import Header from "./Header";
import Toolbar from "./Toolbar";
import Footer from "./Footer";

function DefaultLayout({ children }) {

    return (
        <main className="Default-Layout">
            { console.log('Default-layout') }
            <Header />
            <div className="Content">
                { children }
            </div>
            <Toolbar />
            <Footer />
        </main>
    )
}

export default DefaultLayout;
