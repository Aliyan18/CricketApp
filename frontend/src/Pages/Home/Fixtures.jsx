import{useState,useEffect} from 'react'
import{Box,Card,Text,CardHeader,CardBody,CardFooter} from '@chakra-ui/react'
import Loader from '../Loader'

export default function Fixtures(){
const [matches,setMatches]=useState(null)
//const [loading, setLoading] = useState(true);


useEffect(()=>{

   const fetchData= async()=>{
        try {
            const response = await fetch('http://127.0.0.1:8000/myapi/match_info');
            
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            
            const result = await response.json();
            
            //setLoading(false)
            setMatches(result)
          console.log('fixtures re rendered')
          }
           catch (error) {
            alert("ERROR");
          }
       }
  
   fetchData();
   console.log("")
},[])
const fixtures= "<< fixtures "
const scrollbarStyle = `
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background:grey ; /* Sky blue */
    border-radius: 4px;
    border-color:
  }
  ::-webkit-scrollbar-track {
    background: silver; /* Light gray */
  }`
return(
<>

<style>{scrollbarStyle}</style>
<div style={{ width:'32%',margin:'15px',padding:0,height:"100vh",marginBottom:'10px'}}>
<div style={{ fontWeight:'600', fontSize:'1.2rem', color: "#87CEEB", width: "100%",display:'flex', textAlign: "right",alignItems:'flex-end',justifyContent:"flex-end"  }}>
  <u>{fixtures}</u>
</div>
<div style={{
  height:'100%',
  border:'1px solid #87CEEB',
  borderRadius:'7px', 
  backgroundColor:'#87CEEB',
  overflowY:'auto',
  overflowX:'hidden'}}>
{matches!==null ?matches.map((el)=><Card
margin='1px'
  width="100%"
  borderWidth="2.5px"
  borderColor="grey.300"
  borderRadius="10px"
  boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
  alignItems="center"
  overflow="hidden"
  marginRight="6px"
  backgroundColor="#fff"
  padding="0px"
  height="180px"
>
  <CardHeader
    fontSize="1rem"
    fontWeight="bold"
    color="#333"
    textAlign="center"
    marginBottom="5px"
    height="5%"
  >
    {el.series_name} {el.format}
  </CardHeader>

  <div
    style={{
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "2px",
    }}
  >
    <CardBody
      width="100%"
      
      style={{
        fontSize: "1rem",
        fontWeight: "normal",
        color: "#333",
        textAlign: "center",
      }}
    >
      {el.team1}
    </CardBody>
    <CardBody
      style={{
        fontSize: "1rem",
        fontWeight: "bold",
        color: "#007BFF",
        textAlign: "center",
      }}
    >
      vs
    </CardBody>
    <CardBody
      style={{
        fontSize: "1rem",
        fontWeight: "normal",
        color: "#333",
        textAlign: "center",

      }}
    >
      {el.team2}
    </CardBody>
  </div>

  <div
    style={{
      
      marginBottom: "3px",
      color: "#666",
      fontSize: "0.8rem",
      width:'100%',
      //paddingLeft:'35%',
      textAlign:'center',
      //paddingLeft:'35%%'
      height:'7%'
    }}
  >
    {el.date}
    {el.time}
  </div>

  <CardFooter
    style={{
      fontSize: "0.9rem",
      color: "#555",
      textAlign: "center",
      height:"5%"
    }}
  >
    {el.city}, {el.country}
  </CardFooter>
</Card>
):<div>Loading...
 {/* // <Loader></Loader> */}
  </div>}</div>
</div>
</>

)
}