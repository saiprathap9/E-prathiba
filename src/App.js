import './App.css';
import{BrowserRouter,Routes,Route} from'react-router-dom'
import LogiPage from './LogiPage';
import Register from './Register';
import VerficationEmail from './VerficationEmail';
import Fexam from './Fexam';
import ExamStart from './ExamStart';
import Finish from './Finish';
import Result from './Result';
import Package from './Package';
import RazorpayPayment from './RazorpayPayment';
import TranstionPage from './TranstionPage';
// import RazorpatPayment from './RazorpatPayment'





function App() {
  return (
  <>
  
  <BrowserRouter>
  

  <Routes>
    
    <Route path='/' element={<LogiPage/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path="/Verfication" element={<VerficationEmail />} />
    <Route path="/Fexam" element={<Fexam />} />
    <Route path="/examStart" element={<ExamStart/>} /> 
     <Route path="/finish" element={<Finish/>} /> 
    <Route path="/rusult" element={<Result/>} />  
    {/* <Route path="/" element={<Home/>} />   */}
    <Route path="/package" element={<Package/>} /> 
    <Route path="/razorpatPayment" element={<RazorpayPayment/>} />   
    <Route path="/transtionPage" element={<TranstionPage/>} />   
    
</Routes>
  </BrowserRouter>
 
  
     </>
  );
}

export default App;
