import AddIcon from "@mui/icons-material/Add";
// import useSWR from 'swr'
import { Button, Container, FormControl, TextField, Box } from "@mui/material";
import useStore from "../stores/useStore";
import Item from "./Item";
import { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
export default function TodoForm() {
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
      .filter((item) => item.date >= startItem && item.date <= endItem)
      .map((item) => ({ id: item.id, value: item.value, date: item.date }));
    setFilterItems(filterItem);
    setStart("");
    setEnd("");
    console.log(filterItem);
  };
  const initialValues = {
    id: Math.floor(Math.random() * 1000),
    todo: "",
    date: "",
  };
  const onSubmit = (values) => {
    console.log(items);
    setItems([
      ...items,
      {
        ...values,
        id: Math.floor(Math.random() * 1000),
      },
    ]);
  };
  const validationSchema = Yup.object({
    todo: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    date: Yup.string().required("Required"),
  });

  // const formik = useFormik({
  //   id: Math.floor(Math.random() * 1000),
  //   initialValues: {
  //     todo:inputValue,
  //     date:date
  //   },
  //   validationSchema: Yup.object({
  //     todo:Yup.string().max(10, "Must be 15 characters or less")
  //     .required("Required"),
  // date: Yup.string().required("Required"),
  //   }),
  //   onSubmit: values => {
  //     console.log(items)
  //     setItems([...items,{
  //       ...values,
  //       id: Math.floor(Math.random() * 1000)
  //     }])
  //   },
  // });
  return (
    <Container maxWidth="sm" sx={{ padding: "1.5rem" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <FormControl fullWidth={true}>
            <label htmlFor="todo">todo</label>
            <Field name="todo" type="text" />
            <ErrorMessage name="todo" />

            <label htmlFor="date">date</label>
            <Field name="date" type="date" />
            <ErrorMessage name="date" />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: "0.5rem" }}
              startIcon={<AddIcon fontSize="large" />}
            ></Button>
          </FormControl>
        </Form>
      </Formik>
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
          onClick={(e) => setSearchActive(false)}
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

// <label htmlFor="todo">todo list</label>
//           <input
//          id="todo"
//          type="text"
//          {...formik.getFieldProps('todo')}
//        />
//        {formik.touched.todo && formik.errors.todo ? (
//           <div>{formik.errors.todo}</div>
//         ) : null}
//          <label htmlFor="date">picke the date</label>
//          <input
//          id="date"
//          type="date"
//          {...formik.getFieldProps('date')}
//          />
//          {formik.touched.date && formik.errors.date ? (
//           <div>{formik.errors.date}</div>
//         ) : null}
