import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import BasicExample from "./pages/BasicExample";
import CustomStyleExample from "./pages/CustomStyleExample";
import "./App.css";

const AppContainer = styled.div`
    min-height: 100vh;
    display: flex;
`;

const Sidebar = styled.nav`
    width: 250px;
    background-color: #f5f5f5;
    padding: 20px;
    border-right: 1px solid #ddd;

    h1 {
        font-size: 1.5rem;
        margin-bottom: 2rem;
        color: #333;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        margin-bottom: 0.5rem;
    }

    a {
        display: block;
        padding: 10px 15px;
        text-decoration: none;
        color: #333;
        border-radius: 4px;
        transition: background-color 0.2s;

        &:hover {
            background-color: #e0e0e0;
        }

        &.active {
            background-color: #1976d2;
            color: white;
        }
    }
`;

const MainContent = styled.main`
    flex: 1;
    padding: 40px;
    max-width: 1200px;
`;

function App() {
    return (
        <BrowserRouter>
            <AppContainer>
                <Sidebar>
                    <h1>TreeView Examples</h1>
                    <ul>
                        <li>
                            <Link to="/">Basic Example</Link>
                        </li>
                        <li>
                            <Link to="/custom-style">Custom Style</Link>
                        </li>
                    </ul>
                </Sidebar>
                <MainContent>
                    <Routes>
                        <Route path="/" element={<BasicExample />} />
                        <Route
                            path="/custom-style"
                            element={<CustomStyleExample />}
                        />
                    </Routes>
                </MainContent>
            </AppContainer>
        </BrowserRouter>
    );
}

export default App;
