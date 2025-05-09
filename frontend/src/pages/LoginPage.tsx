import { useState } from 'react';
import Input from '../components/input/Input';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }

    return (
        <div className="login-wrapper">
            <div className="login-header">
                <p className="title">Repkit</p>
                <p className="subtitle">Design your workout toolkit.</p>
            </div>
            <div className="login-content">
                <form onSubmit={handleSubmit}>
                    <Input 
                        type="username"
                        placeholder="Enter your username."
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="user-info-input"
                    />
                    <Input 
                        type="password"
                        placeholder="Enter your password."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="user-info-input"
                    />
                </form>
            </div>
            <div className="login-footer">
                <p>&copy; 2025 Sean Lee. All rights reserved.</p>
            </div>
        </div>
    );
};

export default LoginPage;