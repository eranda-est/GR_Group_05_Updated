

// import { useState } from "react";
// import "../../css/User/EnterCode.css"; // Import the CSS file
// import image from "../../assets/images.png"; // Adjust the path based on your project structure
// import design from "../../assets/design.png"; 


// const EnterCode = () => {
//   const [code, setCode] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`Entered Code: ${code}`);
//   };

//   return (
//     <div className="container-epwsk">

//         <div className="left-section-epwsk">
//         <img src={image} alt="Login Illustration" /> 
//       </div>
    
//       {/* Right Side - Input Form */}
//       <div className="right-section-epwsk">
//          <div className="logo-container-epwsk">
//          <img src="logo.png" alt="Logo" />
//           </div>
//           <div className="design-container-epwsk">
//           <img src={design} alt="Design" />
//         </div>
//         <div className="form-card-epwsk">
//           <h4><b>Enter Your Code</b></h4>
//           <form onSubmit={handleSubmit}>
//             <input
//               type="text"
//               placeholder="Enter Code"
//               value={code}
//               onChange={(e) => setCode(e.target.value)}
//               required
//             />
//             <button type="submit">Continue</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EnterCode;






// import { useState } from "react";
// import "../../css/User/EnterCode.css"; // Import the CSS file
// import desktopImage from "../../assets/images.png"; // Desktop image
// import mobileImage from "../../assets/mobile-extra-img.png"; // Mobile image
// import design from "../../assets/design.png"; 

// const EnterCode = () => {
//   const [code, setCode] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`Entered Code: ${code}`);
//   };

//   return (
//     <div className="container-epwsk">
//         {/* Left Section - Image */}
//         <div className="left-section-epwsk">
//           <img src={desktopImage} alt="Desktop View" className="desktop-img" />
//           <img src={mobileImage} alt="Mobile View" className="mobile-img" />
//         </div>
    
//       {/* Right Side - Input Form */}
//       <div className="right-section-epwsk">
//          <div className="logo-container-epwsk">
//          <img src="logo.png" alt="Logo" />
//           </div>
//           <div className="design-container-epwsk">
//           <img src={design} alt="Design" />
//         </div>
//         <div className="form-card-epwsk">
//           <h4><b>Enter Your Code</b></h4>
//           <form onSubmit={handleSubmit}>
//             <input
//               type="text"
//               placeholder="Enter Code"
//               value={code}
//               onChange={(e) => setCode(e.target.value)}
//               required
//             />
//             <button type="submit">Continue</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EnterCode;













import { useState } from "react";
import axios from "axios";
import "../../css/User/EnterCode.css"; // Import the CSS file
import desktopImage from "../../assets/images.png"; // Desktop image
import mobileImage from "../../assets/mobile-extra-img.png"; // Mobile image
import design from "../../assets/design.png"; 

const EnterCode = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:7000/api/enter-code", { code });
      setMessage(response.data.message);
      setCode(""); // Clear input after submission
    } catch (error) {
      console.error("Error saving code:", error);
      setMessage("Failed to save code");
    }
  };

  return (
    <div className="container-epwsk">
      {/* Left Section - Image */}
      <div className="left-section-epwsk">
        <img src={desktopImage} alt="Desktop View" className="desktop-img" />
        <img src={mobileImage} alt="Mobile View" className="mobile-img" />
      </div>

      {/* Right Side - Input Form */}
      <div className="right-section-epwsk">
        <div className="logo-container-epwsk">
          <img src="logo.png" alt="Logo" />
        </div>
        <div className="design-container-epwsk">
          <img src={design} alt="Design" />
        </div>
        <div className="form-card-epwsk">
          <h4><b>Enter Your Code</b></h4>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <button type="submit">Continue</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default EnterCode;
