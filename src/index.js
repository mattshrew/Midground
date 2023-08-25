import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './styles.css';

import Layout from './components/Layout';
import Home from './pages';
import TTT from './pages/ttt';
import C4 from './pages/c4';
import AboutMe from './pages/about-me';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    componentDidMount() {
        this.setState({ loading: false });
    }

    render() {
        if (this.loading) {
            return <>idk</>
        }

        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Home />}/>
                        <Route path='ttt' element={<TTT />} />
                        <Route path='c4' element={<C4 />} />
                        <Route path='about-me' element={<AboutMe />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);