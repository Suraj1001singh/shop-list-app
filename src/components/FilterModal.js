import * as React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Filters from "./Filters";

export default function FilterModal({ isModalOpen, setIsModalOpen, areaState, setAreaState, categoryState, setCategoryState, openState, setOpenState }) {
  return (
    <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} scroll={"paper"}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
          <Filters areaState={areaState} setAreaState={setAreaState} categoryState={categoryState} setCategoryState={setCategoryState} openState={openState} setOpenState={setOpenState} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsModalOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
