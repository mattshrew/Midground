import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './styles.css';

import Layout from './components/Layout';
import Home from './pages';
import Projects from './pages/projects';
import TTT from './pages/games/ttt';
import C4 from './pages/games/c4';
import AboutMe from './pages/about-me';
import Test from './pages/test';

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
            return <div>Loading...</div>
        }

        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Home />}/>
                        <Route path='projects' element={<Projects />} />
                        <Route path='games/ttt' element={<TTT />} />
                        <Route path='games/c4' element={<C4 />} />
                        <Route path='about-me' element={<AboutMe />} />
                        <Route path='test' element={<Test />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);