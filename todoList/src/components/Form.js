import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Container,
  FormControl,
  TextField,
  Box
} from "@mui/material";
import useStore from "../stores/useStore";
import Item from "./Item";
import { useState } from "react";
export default function Form() {
  const {
    inputValue,
    setInputValue,
    items,
    setItems,
    editItems,
    setEditItems,
    date,
    setDate,
    filterItems,
    setFilterItems,
    searchActive,
    setSearchActive,
  } = useStore((state) => state);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const addItem = (e) => {
    e.preventDefault();
    const item = {
      id: Math.floor(Math.random() * 1000),
      value: inputValue,
      date: date,
    };
    setItems([...items, item]);
    setInputValue("");
    setDate("");
    if (editItems) {
      const editTask = items.find((item) => item.id === editItems);
      const updateItem = items.map((item) =>
        item.id === editTask.id
          ? { id: item.id, value: inputValue, date: date }
          : item
      );
      setItems(updateItem);
      setEditItems(0);
      setInputValue("");
      setDate("");
      console.log(updateItem);
    }
  };
  function editItem(id) {
    const edit = items.find((item) => item.id === id);
    setInputValue(edit.value);
    setDate(edit.date);
    setEditItems(id);
  }
  function deleteItem(id) {
    const newArr = items.filter((item) => item.id !== id);
    setItems(newArr);
  }
  const filterItem = () => {
      setSearchActive(true);
    const startItem = start;
    const endItem = end;
      const filterItem = items
        .filter((item) => item.date >= startItem  && item.date <= endItem)
        .map((item) => ({ id: item.id, value: item.value, date: item.date }));
      setFilterItems(filterItem);
      setStart("");
      setEnd("");
      console.log(filterItem);
  };
  return (
    <Container maxWidth="sm" sx={{ padding: "1.5rem" }}>
      <form onSubmit={addItem}>
        <FormControl fullWidth={true}>
          <TextField
            label="I will do this"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            required={true}
          />
          <TextField
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            id="standard-basic"
            variant="standard"
            sx={{ mt: "0.5rem" }}
            required={true}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: "0.5rem" }}
            startIcon={<AddIcon fontSize="large" />}
          ></Button>
        </FormControl>
      </form>
      <Box
        fullWidth={true}
        sx={{
          mt: "1.5rem",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <TextField
          sx={{ mr: "1rem" }}
          type="date"
          label="from"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <TextField
          type="date"
          label="to"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
        <Button
          onClick={filterItem}
          type="click"
          variant="contained"
          sx={{ ml: "1rem" }}
          fontSize="large"
        >
          sort
        </Button>
        <Button
          onClick={e=>setSearchActive(false)}
          type="click"
          variant="contained"
          sx={{ ml: "1rem" }}
          fontSize="large"
        >
          clear
        </Button>
      </Box>
      <Item deleteItem={deleteItem} editItem={editItem} />
    </Container>
  );
}
