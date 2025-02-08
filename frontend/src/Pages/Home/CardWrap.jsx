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
    
    maxWidth="90%"
    width="50%"
    minWidth="350px"
    //size='lg'
    margin="20px" 
    boxShadow=" 4px 4px 8px rgba(0,0,0,0.2),
     -4px -4px 8px rgba(255,255,255,0.2)"
     textAlign="center"
     color='rgb(50, 50, 50)'
    h='80%'
    overflowY="hidden"
    _hover={{
cursor:"pointer",
transform:"scale(1.01)",
//zIndex:1,
boxShadow:" 4px 4px 8px rgba(0,0,0,0.2), 4px 4px 8px rgba(255,255,255,0.2)"

    }}
    >
       <CardHeader fontSize="1 rem" padding='5px' paddingTop='10px' opacity='0.85'>
  <Text wordWrap="break-word"  whiteSpace="normal">{data.series} {data.match_format}</Text>
</CardHeader>

    <div style={{display:"flex" ,
        flexDirection:"rows"}}> 
    <CardBody width="50%" >
        <Text 
        
        wordWrap="break-word"  whiteSpace="normal" fontWeight="700">{data['team1']}</Text>
        <Text 
        wordWrap="break-word" 
        whiteSpace="normal" 
        //fontSize={data.match_format.toLowerCase()==='test' && data.team1_score.lastIndexOf('&')!==-1?'0.85rem':'1rem'}
        fontSize='1rem'
        >{data.team1_score}
        </Text>

        </CardBody>   
        <CardBody width="50%" > 
    <Text wordWrap="break-word"  whiteSpace="normal" fontWeight="700">{data['team2']}</Text>
    <Text wordWrap="break-word" whiteSpace="normal"
    //fontSize={data.match_format.toLowerCase()==='test' && data.team1_score.lastIndexOf('&')!==-1?'1rem':'0.85rem'}
      fontSize='1rem'
      >{data.team2_score} </Text>
    </CardBody> 
    </div>
    <div style={{margin:'auto'}}>
    <Text
    border="1px solid rgba(160, 160, 160, 1)" // Medium silver border
    boxShadow="inset 2px 2px 4px rgba(255, 255, 255, 0.6), inset -2px -2px 4px rgba(0, 0, 0, 0.3)"
    borderRadius="5px"
    p="0"
    ></Text>
    <Text  
    
    whiteSpace="normal" fontWeight="700" >{data.status}</Text>

    <Text opacity='0.7'>{data.match_category}</Text>
    </div>
</Card>
   {/* <div style={{backgroundColor:'black'}}>{img1}</div>
   <img src={img1}/>  */}
</>
)
}