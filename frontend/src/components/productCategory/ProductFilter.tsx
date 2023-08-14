import { Box,Radio, Checkbox, Rating, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {useSearchParams} from "react-router-dom";

const rating = [
  {
    value: 5,
    count: 120,
  },
  {
    value: 4,
    count: 70,
  },
  {
    value: 3,
    count: 40,
  },
];

export const ProductFilter = (props: any) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [checkboxCategory, setCheckboxCategory] = useState<any>([]);
  const [radioCheck, setRadioCheck] = useState<any>(null);
  const {categories} = useSelector((state:RootState)=>state.filterProducts);
  

  const categoryHandler = (e:React.ChangeEvent<HTMLInputElement>,catId?:string) => {
    
    const priceUrl = (radioCheck || e.target.type=='radio') ? ((checkboxCategory.length >0 || e.target.type=='checkbox') ? `&${e.target.type=='radio' ? e.target.value : radioCheck}` : `?${e.target.type=='radio' ? e.target.value : radioCheck}`) : '';
    
    
    if(e.target.checked){
      setCheckboxCategory((prevState:[])=>{
            const catChecked = catId ? [catId, ...prevState] : [...prevState];
            let catUrl = '';
            catChecked.map((catId?:string, index?:number)=>{
              catUrl += index===0 ? `category[_id]=${catId}` : `&category[_id]=${catId}`
            })
            catUrl += priceUrl;
            setSearchParams(catUrl);
            props.setSearchToggle(!props.searchToggle);
            return catChecked;
          })
      }  
      else {
    setCheckboxCategory((prevState:[])=>{
          const catUnchecked = prevState.filter((title:string) => title !== catId);
          let catUrl = '';
          catUnchecked.map((catId:string, index:number)=>{
            catUrl += index===0 ? `category[_id]=${catId}` : `&category[_id]=${catId}`
          })
          catUrl += priceUrl;
          setSearchParams(catUrl);
          props.setSearchToggle(!props.searchToggle);
          return catUnchecked;
        });
      }
    
  }

  useEffect(()=>{
    let urlPrice = '';
    for (const entry of searchParams.entries()) {
      if(entry[0]=='category[_id]'){
        setCheckboxCategory((prev:any)=>[...prev, entry[1]]);
      }
      if((entry[0]=='price[gte]') || (entry[0]=='price[lte]')){
        urlPrice += entry[0]=='price[lte]' ? `&${entry[0]}=${entry[1]}` : `${entry[0]}=${entry[1]}`
        setRadioCheck(urlPrice);
      }
    }
  },[]);

  return (
    <Box>
      <Typography sx={{ fontSize: "14px", fontWeight: 700, color: "#00bcd4" }}>
        PRODUCT CATEGORIES
      </Typography>
      <Box sx={{ marginBottom: "16px" }}>
        {categories.data.map((category: any, i: any) => {
          return (
            <Box sx={{ display: "flex", marginLeft: -1 }} key={i}>
              <Checkbox
                value={category.title}
                onChange={(e)=>categoryHandler(e,category.id)}
                checked={checkboxCategory.includes(category.id)}
              />
              <Typography
                sx={{
                  fontSize: "12px",
                  marginTop: "12px",
                  fontWeight: 700,
                  color: "#12121b",
                }}
              >
                {category.title.toLocaleUpperCase()}
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  marginTop: "12px",
                  marginLeft: "4px",
                  fontWeight: 500,
                  color: "#12121b",
                }}
              >
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Typography sx={{ fontSize: "14px", fontWeight: 700, color: "#00bcd4" }}>
      FILTER BY PRICE
      </Typography>
      <Box sx={{ marginBottom: "16px" }}>
            <Box sx={{ display: "flex",alignItems:'center', marginLeft: -1 }} >
              <Radio
                value="price[gte]=5&price[lte]=100"
                onChange={e=>{setRadioCheck(e.target.value); categoryHandler(e);}}
                checked={radioCheck=="price[gte]=5&price[lte]=100"}
              />
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#12121b",
                }}
              >
                $5 - $100
              </Typography>
            </Box>
            <Box sx={{ display: "flex",alignItems:'center', marginLeft: -1 }} >
              <Radio
                value="price[gte]=100&price[lte]=250"
                onChange={e=>{setRadioCheck(e.target.value); categoryHandler(e);}}
                checked={radioCheck=='price[gte]=100&price[lte]=250'}
              />
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#12121b",
                }}
              >
                $100 - $250
              </Typography>
            </Box>
            <Box sx={{ display: "flex",alignItems:'center', marginLeft: -1 }} >
              <Radio
                value="price[gte]=250&price[lte]=500"
                onChange={e=>{setRadioCheck(e.target.value); categoryHandler(e);}}
                checked={radioCheck=="price[gte]=250&price[lte]=500"}
              />
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#12121b",
                }}
              >
                $250 - $500
              </Typography>
            </Box>
            <Box sx={{ display: "flex",alignItems:'center', marginLeft: -1 }} >
              <Radio
                value="price[gte]=500&price[lte]=999"
                onChange={e=>{setRadioCheck(e.target.value); categoryHandler(e);}}
                checked={radioCheck=="price[gte]=500&price[lte]=999"}
              />
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#12121b",
                }}
              >
                $500 - $999
              </Typography>
            </Box>
            <Box sx={{ display: "flex",alignItems:'center', marginLeft: -1 }} >
              <Radio
                value="price[gte]=999"
                onChange={e=>{setRadioCheck(e.target.value); categoryHandler(e);}}
                checked={radioCheck=="price[gte]=999"}
              />
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#12121b",
                }}
              >
                $999 AND UP
              </Typography>
            </Box>
      </Box>

      <Typography sx={{ marginBottom:'16px', fontSize: "14px", fontWeight: 700, color:'#00bcd4' }}>
        AVERAGE RATING
      </Typography>
      {rating.map((e, i) => (
        <Box sx={{ display: "flex" }} key={i}>
          <Rating
            name="text-feedback"
            value={e.value}
            readOnly
            precision={0.5}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 500,
              marginLeft: "8px",
              marginTop: "4px",
              color: "#12121b",
            }}
          >
            {`(${e.count})`}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
