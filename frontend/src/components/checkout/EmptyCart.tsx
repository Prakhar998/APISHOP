import { Box, Typography, Button } from '@mui/material';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <Box sx={{p:'80px 30px',textAlign:'center'}}>
        <ProductionQuantityLimitsIcon
        sx={{ color: "#00bcd4", fontSize: "100px" }}
              />
        <Typography variant="h4">Your cart is empty!</Typography>
        <Typography variant="h6" sx={{color:'#333'}}>Add items to it now.</Typography>
        <Button component={Link} to="/" variant='contained' sx={{color:'#ffffff',mt:'30px',width:'150px'}}>Shop Now</Button>
    </Box>
  )
}

export default EmptyCart;