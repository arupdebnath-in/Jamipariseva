import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: ''
  });

  const handleSignUpChange = (e) => {
    let newSignUpData = {...signUpData}
    newSignUpData[e.target.name] = e.target.value
    setSignUpData(newSignUpData)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      const storedUser = localStorage.getItem(loginEmail);

      if (!storedUser) {
        alert("Account does not exist. Please Sign Up.");
        return;
      }

      const userData = JSON.parse(storedUser);

      if (userData.password === loginPassword) {
        // ✅ KEY CHANGE HERE: Save the active login email so CitizenDetails knows who to look up
        localStorage.setItem("activeUserEmail", loginEmail);
        
        navigate('/dashboard/services');
      } else {
        alert("Incorrect password. Please try again.");
      }

    } else {
      if (!signUpData.email || !signUpData.password || !signUpData.firstName) {
        alert("Please fill in the required fields.");
        return;
      }

      if (signUpData.password !== signUpData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      if (localStorage.getItem(signUpData.email)) {
        alert("An account with this email already exists.");
        return;
      }

      localStorage.setItem(signUpData.email, JSON.stringify(signUpData));
      alert("Registration successful! You can now log in.");
      
      setSignUpData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', gender: '' });
      setIsLogin(true);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#7A98A6] font-sans m-0 p-0 w-full">
      <div className="flex justify-center items-center min-h-screen w-full py-[30px]">
        <div className="bg-white p-[25px] rounded-[10px] shadow-[0_4px_8px_rgba(0,0,0,0.1)] w-[1000px] max-w-[95%]">
          
          <div className="flex justify-between mb-5">
            <button 
              className={`w-1/2 p-[10px] border-none cursor-pointer text-[16px] rounded-t-[10px] ${isLogin ? 'bg-[#033452] text-white' : 'bg-[#f3f3f3] text-black'}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button 
              className={`w-1/2 p-[10px] border-none cursor-pointer text-[16px] rounded-t-[10px] ${!isLogin ? 'bg-[#033452] text-white' : 'bg-[#f3f3f3] text-black'}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          {isLogin ? (
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold mb-5">Login</h2>
              <input 
                type="email" 
                placeholder="Email Address" 
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                className="p-[10px] mb-[10px] border border-[#ddd] rounded-[5px] focus:outline-none focus:border-[#033452] focus:shadow-[0_0_5px_rgba(3,52,82,0.3)] transition-all duration-200"
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                className="p-[10px] mb-[10px] border border-[#ddd] rounded-[5px] focus:outline-none focus:border-[#033452] focus:shadow-[0_0_5px_rgba(3,52,82,0.3)] transition-all duration-200"
              />
              <a href="#" className="color-[#08172f] no-underline mb-10 text-right">Forgot Password?</a>
              <button type="submit" className="p-[10px] bg-[#033452] text-white border-none rounded-[5px] cursor-pointer hover:opacity-90">
                Login
              </button>
              <p className="text-center mt-[10px]">
                Don't have an account? <span className="cursor-pointer text-[#033452] font-semibold" onClick={() => setIsLogin(false)}>Sign Up</span>
              </p>
            </form>
          ) : (
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold mb-5">Sign Up</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[15px] mt-[15px]">
                <div className="flex flex-col">
                  <input 
                    type="text" 
                    name="firstName"
                    placeholder="First Name" 
                    value={signUpData.firstName}
                    onChange={handleSignUpChange}
                    className="w-full p-[10px] border border-[#ddd] rounded-[5px] box-border transition-all duration-200 focus:outline-none focus:border-[#033452] focus:shadow-[0_0_5px_rgba(3,52,82,0.3)]"
                  />
                </div>

                <div className="flex flex-col">
                  <input 
                    type="text" 
                    name="lastName"
                    placeholder="Last Name" 
                    value={signUpData.lastName}
                    onChange={handleSignUpChange}
                    className="w-full p-[10px] border border-[#ddd] rounded-[5px] box-border transition-all duration-200 focus:outline-none focus:border-[#033452] focus:shadow-[0_0_5px_rgba(3,52,82,0.3)]"
                  />
                </div>

                <div className="flex flex-col">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email Address" 
                    value={signUpData.email}
                    onChange={handleSignUpChange}
                    className="w-full p-[10px] border border-[#ddd] rounded-[5px] box-border transition-all duration-200 focus:outline-none focus:border-[#033452] focus:shadow-[0_0_5px_rgba(3,52,82,0.3)]"
                  />
                </div>

                <div className="flex flex-col">
                  <input 
                    type="password" 
                    name="password"
                    placeholder="Password" 
                    value={signUpData.password}
                    onChange={handleSignUpChange}
                    className="w-full p-[10px] border border-[#ddd] rounded-[5px] box-border transition-all duration-200 focus:outline-none focus:border-[#033452] focus:shadow-[0_0_5px_rgba(3,52,82,0.3)]"
                  />
                </div>

                <div className="flex flex-col">
                  <input 
                    type="password" 
                    name="confirmPassword"
                    placeholder="Confirm Password" 
                    value={signUpData.confirmPassword}
                    onChange={handleSignUpChange}
                    className="w-full p-[10px] border border-[#ddd] rounded-[5px] box-border transition-all duration-200 focus:outline-none focus:border-[#033452] focus:shadow-[0_0_5px_rgba(3,52,82,0.3)]"
                  />
                </div>

                <div className="flex flex-col">
                  <select 
                    name="gender"
                    value={signUpData.gender}
                    onChange={handleSignUpChange}
                    className="w-full p-[10px] border border-[#ddd] rounded-[5px] box-border transition-all duration-200 bg-white focus:outline-none focus:border-[#033452] focus:shadow-[0_0_5px_rgba(3,52,82,0.3)]"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="mt-5 w-full p-[10px] bg-[#033452] text-white border-none rounded-[5px] cursor-pointer hover:opacity-90">
                Register
              </button>
              <p className="text-center mt-[10px]">
                Already have an account? <span className="cursor-pointer text-[#033452] font-semibold" onClick={() => setIsLogin(true)}>Login</span>
              </p>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}

export default Login;