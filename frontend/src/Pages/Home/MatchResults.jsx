import {useState,useEffect,useRef} from 'react'
import CardWrap from './CardWrap'
import {Button,Box,Slider,SliderTrack,SliderFilledTrack,SliderThumb,SliderMark} from '@chakra-ui/react'
import './stylesheets/card.css'
import DropDown from './DropDown'

export default function MatchResults(){
    
  const [data,setData]=useState(null)
    const [selectedMatchType,setSelectedMatchType]=useState('')
   
    useEffect(()=>{
      
        const fetchData = async () => {
            try {
              const response = await fetch('http://127.0.0.1:8000/myapi/hello');
              
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              
              const result = await response.json();
              
              
              setData(result)
            } catch (error) {
              alert("ERROR");
            }
        }
        
        fetchData();
        console.log('mathc results re rendered')
       
    },[])
    
   const scrollRef=useRef(null);
    const scroll=(direction)=>{
      if(scrollRef.current){
        scrollRef.current.scrollLeft+=direction ==="left"?-300:300;
      }
    }
    const leftSymbol="<-"
    const rightSymbol="->"
    return(
        <>
        <div className="card-container"> 
        <Box bgColor="blue.300" 
        w="100%"
       // paddingLeft='15%'
        //paddingRight='15%'
        overflow="auto" 
        maxWidth="inherit"
        display="flex"
        overflowX="auto"
        whiteSpace="nowrap"
        paddingLeft="20px"
        paddingRight="20px"
        ref={scrollRef}
        sx={{scrollbarWidth:'none',
          "&::-webkit-scrollbar":{display:"none"},
          scrollBehavior:'smooth'
        }}
       
          >
       <Button  top="3%" zIndex="1" position="absolute" 
        //bgColor="transparent"
        opacity="0.4"
        _hover ={{
          //backgroundColor:'white'
        opacity:"1"
        }}
       left="1" margin="auto" onClick={()=>scroll('left')}>{leftSymbol}</Button> 

        {console.log(data)}
        {
        data && data!==null && data!==undefined?
        data.filter((match)=>(selectedMatchType==='' ||match.match_category.toLowerCase().trim()===selectedMatchType.toLowerCase().trim()))
        .map((element)=>    
            <CardWrap data={element}></CardWrap>
        ):"no data"}
        <Button zIndex="1"
          margin="auto" 
          position='absolute'
          top="3%" right='1'
          //bgColor="transparent"
           opacity="0.4"
          _hover ={{
            //backgroundColor:'white'
          opacity:"1"
          }}
          onClick={()=>scroll("right")}>{rightSymbol}</Button>

        </Box>
        <div >
        <DropDown selectedMatchType={selectedMatchType} setSelectedMatchType={setSelectedMatchType}></DropDown>
        </div>
         </div>
        </>
    )
}