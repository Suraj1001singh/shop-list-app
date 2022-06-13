import * as React from "react";
import { Box, Card, CardActions, CardContent, Typography, Modal, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch } from "react-redux";
import * as action from "../redux/actions";
import ShopForm from "./ShopForm";

export default function ShopCard({ shop }) {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = React.useState(false);
  const handleDelete = () => {
    dispatch(action.deleteShop(shop));
  };
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    minWidth: "200px",
    bgcolor: "background.paper",
    border: "2px solid #ffff",
    boxShadow: 24,
    p: 4,
    padding: "5rem 2rem 2rem 2rem",
  };

  return (
    <Card sx={{ minWidth: 275, maxWidth: "500px", margin: "1rem", height: "fit-content", padding: "1rem" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {shop?.shopName}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {shop?.area}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {shop?.category}
        </Typography>
        <Typography variant="body2">
          Open At: {shop?.openingTime}
          <br />
          Close At : {shop?.closingTime}
        </Typography>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton onClick={() => setIsEdit(true)}>
          <EditIcon />
        </IconButton>
        <IconButton color="error" onClick={handleDelete}>
          <DeleteOutlineIcon />
        </IconButton>
      </CardActions>
      <Modal open={isEdit}>
        <Box sx={modalStyle}>
          <ShopForm shop={shop} setIsEdit={setIsEdit}></ShopForm>
        </Box>
      </Modal>
    </Card>
  );
}
