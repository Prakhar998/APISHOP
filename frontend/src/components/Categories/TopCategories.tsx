import { Typography, Container } from "@mui/material";
import { useNavigate } from "react-router";
import mobiles from "../../assets/category-img/mobiles.jpg"
import headphones from "../../assets/category-img/headphones.jpg";
import laptops from "../../assets/category-img/laptops.jpg";
import bluetoothSpeaker from "../../assets/category-img/bluetooth-speaker.jpg";
import smartWatch from "../../assets/category-img/smart-watch.jpg";
import MainHeading from "../common/MainHeading";

const TopCategories = () => {
    const navigate=useNavigate()

    const img = [
    {
      title: "Mobiles",
      image: mobiles,
      id:'643ee0d61a37f12d64d53332'
    },
    {
      title: "Headphones",
      image: headphones,
      id:'643ee0f31a37f12d64d53338'
    },
    {
      title: "Laptops",
      image: laptops,
      id:'643ee11e1a37f12d64d53341'
    },
    {
      title: "Bluetooth Speaker",
      image: bluetoothSpeaker,
      id:'643ee1281a37f12d64d53344'
    },
    {
      title: "Smart Watch",
      image:smartWatch,
      id:'643ee1121a37f12d64d5333e'
    }
    ];

    const handleClick=(id:string)=>{
        navigate(`/product-category?category[_id]=${id}`)
    }
  return (
    <Container sx={{paddingTop:'70px'}}>
      <MainHeading bgcolor='#fbfbfb'>Best Categories</MainHeading>
      <div style={{ display: "flex", justifyContent: "space-evenly",marginTop:'20px' }}>
        {img.map((e) => {
          return (
            <div
             key={e.id}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => handleClick(e.id)}
            >
              <img
                src={e.image}
                title={e.title}
                width={130}
                height={130}
                style={{ borderRadius: "50%",cursor:'pointer' }}
                alt="no"
              />
              <Typography>{e.title}</Typography>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default TopCategories;
