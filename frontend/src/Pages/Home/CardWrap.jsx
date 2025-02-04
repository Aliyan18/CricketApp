import { useState,useEffect } from 'react';
import './stylesheets/card.css'
import {Card,CardHeader,CardBody,CardFooter,Text,Box,Flex,Grid} from "@chakra-ui/react"
export default function CardWrap({data}){
const [img1,setImg1]=useState()
const[img2,setImg2]=useState()
//const [country1,,country2,]=data.split();
console.log(data)
// useEffect(()=>{
//   const fetchData=(country)=>{
//     fetch(`https://restcountries.com/v3.1/name/${country}`)
// .then(response=>{
//     if(!response.ok){
//         throw new Error('Network response was not ok')
//     }
//     return response.json();
// })  
// .then(data=>{
//     console.log(data);
// })
// .catch(err=>{
//     console.log("there has been a problem")
// })
// }
// setImg1(()=>fetchData(country1));
// setImg1(()=>fetchData(country2));
// },[])
console.log(data.match_category)
return(<>
    <Card 
    bg="silver"
    
    maxWidth="100%"
    width="50%"
    minWidth="350px"
    //size='lg'
    margin="20px" 
    boxShadow=" 4px 4px 8px rgba(0,0,0,0.2),
     -4px -4px 8px rgba(255,255,255,0.2)"
     textAlign="center"
     color='rgb(50, 50, 50)'

     fontWeight="700"
    _hover={{
cursor:"pointer",
transform:"scale(1.01)",
//zIndex:1,
boxShadow:" 4px 4px 8px rgba(0,0,0,0.2), 4px 4px 8px rgba(255,255,255,0.2)"

    }}
    >
        <CardHeader  >
            <Text>{data.series} {data.match_format}</Text>
            
        </CardHeader>
    <div style={{display:"flex" ,
        flexDirection:"rows"}}> 
    <CardBody width="50%">
        <Text wordWrap="break-word">{data['team1']}</Text>
        <Text wordWrap="break-word" whiteSpace="normal">{data.team1_score}</Text>
        </CardBody>   
        <CardBody width="50%"> 
    <Text wordWrap="break-word">{data['team2']}</Text>
    <Text wordWrap="break-word" whiteSpace="normal">{data.team2_score} </Text>
    </CardBody> 
    </div>
    <div style={{margin:'auto'}}>
    <Text whiteSpace="normal">{data.status}</Text><br/>

    <Text>{data.match_category}</Text>
    </div>
</Card>
   {/* <div style={{backgroundColor:'black'}}>{img1}</div>
   <img src={img1}/>  */}
</>
)
}