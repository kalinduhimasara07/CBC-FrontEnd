import { useState, useEffect } from "react";
import Header from "../components/header";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formActive, setFormActive] = useState(false);

  // Animate form entrance
  useEffect(() => {
    const timer = setTimeout(() => {
      setFormActive(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          email: email,
          password: password,
        }
      );
      toast.success("Welcome back!");
      console.log(response.data);
    } catch (error) {
      console.error(error.response?.data?.message || "Login failed");
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 to-teal-100">
      <Header />
      <div className="flex flex-1 items-center justify-center relative">
        {/* Decorative circles */}
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-emerald-200 opacity-30 blur-xl" />
        <div className="absolute bottom-20 right-40 w-40 h-40 rounded-full bg-teal-300 opacity-20 blur-xl" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-emerald-400 opacity-10 blur-lg" />
        
        <div className="w-full max-w-4xl flex overflow-hidden rounded-3xl shadow-2xl">
          {/* Left side - Image */}
          <div className="hidden md:block w-1/2 bg-cover bg-center" style={{backgroundImage: "url('/login-background.png')"}}>
            <div className="h-full w-full bg-gradient-to-r from-teal-900/70 to-transparent flex items-center justify-center p-8">
              <div className="text-white space-y-4">
                <h2 className="text-3xl font-bold">Welcome Back</h2>
                <p className="text-teal-50/90 max-w-xs">Sign in to access your account and continue your journey with us.</p>
                <div className="flex space-x-2 pt-4">
                  <span className="w-3 h-3 rounded-full bg-white/20"></span>
                  <span className="w-10 h-3 rounded-full bg-white/90"></span>
                  <span className="w-3 h-3 rounded-full bg-white/20"></span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Login form */}
          <div className={`w-full md:w-1/2 bg-white p-8 md:p-12 transition-all duration-700 ease-in-out transform ${formActive ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="h-full flex flex-col justify-center">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h1>
                <p className="text-gray-500">Please enter your credentials to proceed</p>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 outline-none"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 outline-none"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-sm font-medium text-teal-600 hover:text-teal-800">
                    Forgot password?
                  </a>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign in</span>
                      <svg className="ml-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </>
                  )}
                </button>
              </form>
              
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <a href="#" className="font-medium text-teal-600 hover:text-teal-800">
                    Create one now
                  </a>
                </p>
              </div>
              
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-all">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.545,12.151L12.545,12.151c0,1.054,0.855,1.909,1.909,1.909h3.536c-0.752,1.664-2.415,2.818-4.344,2.818c-2.634,0-4.775-2.14-4.775-4.774s2.14-4.774,4.774-4.774c1.098,0,2.111,0.372,2.918,0.996l2.05-2.049C17.174,5.064,15.799,4.303,14.225,4.303c-4.7,0-8.5,3.8-8.5,8.5s3.8,8.5,8.5,8.5c4.7,0,8.5-3.8,8.5-8.5v-1.425h-8.273C13.088,11.378,12.545,11.635,12.545,12.151z" />
                    </svg>
                  </button>
                  <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-all">
                    <svg className="h-5 w-5 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
                    </svg>
                  </button>
                  <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-all">
                    <svg className="h-5 w-5 text-[#4267B2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43z M20.636 15.44c-.007.05-.03.24-.73.55-.292 1.37-.756 2.72-1.356 3.04-.798.43-1.07.45-1.5.34-.16-.04-.25-.06-.42-.19-.65-.39-.89-.87-1.34-1.42-.45-.54-1.05-1.08-2.27-1.08-1.62 0-2.36 1.02-2.36 2.21 0 1.34.89 2.12 1.72 2.81.19.14.33.34.3.57-.02.18-.11.32-.27.4-.15.09-.33.13-.45.13-.33 0-.99-.32-1.57-.8-.25-.23-.57-.63-.77-.94-.24.75-.94 1.78-1.98 1.78-.93 0-1.54-.53-1.54-1.31 0-.19.05-.38.14-.55.09-.17.23-.33.4-.44.32-.21.66-.33 1.01-.33.05 0 .01-.01.05.03.07.06.16.1.25.08.1-.03.15-.18.15-.31 0-.14-.06-.29-.14-.39-.01-.01-.08-.13-.08-.15-.68.2-1.39.45-2 .86-.79.5-1.25 1.19-1.25 2.01 0 1.45 1.12 2.5 2.31 2.5 1.35 0 2.18-.83 2.51-1.99.32 1.04 1.21 2.03 2.82 2.03 1.21 0 2.43-.61 3.44-1.35.99-.74 1.73-1.62 2.26-2.69.1.73.42 1.37.87 1.76.44.39 1.09.62 1.84.62.18 0 .27-.16.27-.31 0-.14-.09-.29-.24-.36-.62-.28-1.1-.98-1.1-2.17 0-.86.5-2.41 1.01-3.65.08-.14.23-.38.25-.56-.02-.11-.13-.21-.25-.21-.26 0-.4.16-.56.37-.23.3-.35.54-.52.83-.23.4-.49.84-.72 1.3z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



// import { useState } from "react";
// import Header from "../components/header";
// import axios from "axios";
// import toast from "react-hot-toast";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   async function handleLogin() {
//     console.log("Email:", email);
//     console.log("Password:", password);
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/users/login",
//         {
//           email: email,
//           password: password,
//         }
//       );
//       toast.success("Login successful!");
//       console.log(response.data);
//     } catch (error) {
//       console.error(error.response.data.message);
//       toast.error(error.response.data.message);
//     }
//   }
//   return (
//     <>
//       <Header />
//       <div className="flex items-center justify-center h-[calc(100vh-80px)] bg-[url('/login-background.png')] bg-cover bg-center">
//         <div className="w-[50%] h-full "></div>
//         <div className="w-[50%] h-full  flex items-center justify-center">
//           <div className="w-[500px] h-[600px] backdrop-blur-md rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-4 bg-white/30">
//             <h1 className="text-4xl font-bold text-white">Login</h1>
//             <input
//               onChange={(e) => {
//                 setEmail(e.target.value);
//               }}
//               type="text"
//               value={email}
//               className="w-[300px] h-[50px] rounded-2xl border border-[
// #6a927f]"
//             />
//             <input
//               onChange={(e) => {
//                 setPassword(e.target.value);
//               }}
//               type="password"
//               value={password}
//               className="w-[300px] h-[50px] rounded-2xl border border-[
// #6a927f]"
//             />
//             <button
//               onClick={handleLogin}
//               className="w-[300px] h-[50px] rounded-2xl bg-[
// #6a927f] text-white font-bold"
//             >
//               Login
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }