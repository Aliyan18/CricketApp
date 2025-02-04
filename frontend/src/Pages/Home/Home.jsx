import {useState,useEffect} from 'react'
import Fixtures from "./Fixtures"
import MatchResults from "./MatchResults"
import Footer from "../Footer"
import Loader from "../Loader"
export default function Home(){
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Simulate window loading
      window.onload = () => {
        setTimeout(() => setLoading(false), 1000); // Add delay for testing
      };
    }, []);
  
    return(
        <>
        {loading?(<Loader></Loader>): 
        (<>
         {/* <MatchResults></MatchResults>  */}
         <div style={{display:'flex',flexDirection:'row-reverse',marginBottom:'100px'}}>
           <Fixtures ></Fixtures>  
         </div>
         <Footer></Footer>
        </>)
         }
       
        </>
    )
}