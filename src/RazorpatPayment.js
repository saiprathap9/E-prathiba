// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const RazorpatPayment = () => {
//   const [packageData, setPackageData] = useState(null);
//   const [selected, setSelected] = useState('6 months');
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dynamicId1 = location.state && location.state.id;
//   const dynamicToken1 = location.state && location.state.token; 

//   useEffect(() => {
//     const fetchPackageDetails = async () => {
//       const url = 'https://test.e-prathibha.com/apis/packageDetails';
//       const token = "Wiumkxk6iQmu1xwcSiUr";
//       const id = 2739;
//       const serverKey = '3w99V63pW7tJ7vavGXtCKo8cp';

//       try {
//         const response = await fetch(url, {
//           headers: {
//             tokenu: token,
//             Id: id,
//             server_key: serverKey,
//           },
//         });
//         console.log(response);
//         const data = await response.json();
//         console.log('API data:', data);
//         if (data.status === 200) {
//           setPackageData(data.data);
//         } else {
//           console.error('Failed to fetch package details');
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };

//     fetchPackageDetails();
//   }, [dynamicId1, dynamicToken1, setPackageData]);


 
//   };

//   return (
//     <div className="package-details-container">
//       <h2>Package details</h2>
//       {packageData && (
//         <div>
//           <h3 style={{ color: '' }}>Package: {packageData.name}</h3>
//           <p>Select duration:</p>
//           <div>
//             <label>
//               <input
//                 type="radio"
//                 value="6 months"
//                 checked={selected=== '6 months'}
//                 onChange={handleDurationChange}
//               />
//               6 Months
//             </label>
//           </div>
//           <div>
//             <label>
//               <input
//                 type="radio"
//                 value="1 year"
//                 checked={selected=== '1 year'}
//                 onChange={handleDurationChange}
//               />
//               1 Year
//             </label>
//           </div>
//           <p>Selected duration: {selected}</p>
//           {selected === '6 months' && <p>Amount: {packageData.amount}</p>}
//           {selected === '1 year' && <p>Amount: {packageData.amount_year}</p>}
//           <button
//             onClick={() =>
//               handlePayAmount(
//                 selected === '6 months'
//                   ? packageData.amount
//                   : packageData.amount_year
//               )
//             }
//           >
//             Payment 
//           </button>
//         </div>
//       )}
//     </div>
//   );


// export default RazorpatPayment;
