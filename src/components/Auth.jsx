import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';

const Auth = () => {
  const { login, signup } = useAppContext();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    role: 'Owner/Admin'
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const result = login(formData.username, formData.password);
      if (!result.success) {
        setError(result.message);
      }
    } else {
      if (!formData.name) {
        setError('Please enter your full name');
        return;
      }
      const result = signup(formData.username, formData.password, formData.name, formData.role);
      if (result.success) {
        setIsLogin(true);
        setError('');
        alert('Account created! Please log in.');
      } else {
        setError(result.message);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <p>UNISA Collaboration Platform</p>
        
        {error && (
          <div className="alert alert-error" style={{ marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e0e6ed',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                <option value="Owner/Admin">Owner/Admin</option>
                <option value="Sync Manager">Sync Manager</option>
                <option value="Marketing Manager">Marketing Manager</option>
              </select>
            </div>
          )}

          <button type="submit" className="btn-primary">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="auth-toggle">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => {
            setIsLogin(!isLogin);
            setError('');
          }}>
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>

        {isLogin && (
          <div className="alert alert-info" style={{ marginTop: '20px', fontSize: '12px' }}>
            <strong>Demo Credentials:</strong><br />
            Admin: admin / admin123<br />
            Sync: sync / sync123<br />
            Marketing: marketing / marketing123
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
