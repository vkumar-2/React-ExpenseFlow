import React from 'react';
import '../scss/_layout.scss';

const Layout = ({component}) =>
{
    return (
        <section id="layout">
            <Header/>
            <Main content={component}/>
            <Footer/>
        </section>
    );
}

const Header = () =>
{
    return (
        <header>
            <div id="logo-container">
                <img src={"./src/assets/logo.png"}/>
            </div>
        </header>
    );
}
const Main = ({content}) =>
{
    return (<main>{content}</main>);
}
const Footer = () =>
{
    return (
        <footer>
            <p>&copy; 2025 - {new Date().getFullYear()}</p>
            <p>Built with {/* */}
                <a href="https://react.dev/" target="_blank">React</a> & {/* */}
                <a href="https://sass-lang.com/" target="_blank">Sass</a>
            </p>
        </footer>
    );
}

export default Layout;