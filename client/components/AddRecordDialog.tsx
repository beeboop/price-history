import React from "react";
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const CREATE_RECORD = gql`
  mutation CreateRecord($product: String!, $location: String!, $price: String!, $quantity: String!, $unit: String!) {
    createRecord(
      product: $product
      location: $location
      price: $price
      quantity: $quantity
      unit: $unit
    ) {
      success
      message
      record {
        id
      }
    }
  }
`;

const RecordSchema = Yup.object().shape({
  product: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  location: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  price: Yup.number()
    .typeError('Invalid')
    .min(0, 'Invalid')
    .positive('Invalid')
    .required("Required"),
  quantity: Yup.number()
    .typeError('Invalid')
    .min(0, 'Invalid')
    .positive('Invalid')
    .required("Required"),
  unit: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

export default function AddRecordDialog({ open, handleClose }) {
  const classes = useStyles();
  const [createRecord] = useMutation(CREATE_RECORD);

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Add Record</DialogTitle>
      <Formik
        initialValues={{ product: "", location: "", price: "", quantity: "", unit: "" }}
        validationSchema={RecordSchema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
          const result = await createRecord({
            variables: {
              product: values.product,
              location: values.location,
              price: `${values.price}`,
              quantity: `${values.quantity}`,
              unit: values.unit,
            },
          });
          console.log('result:', result);
          handleClose();
          setTimeout(() => location.reload(), 500);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <DialogContent>
              <Field
                name="product"
                error={errors.product && touched.product}
                as={TextField}
                label="Product"
                placeholder="Organic Tomatoes"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                helperText={errors.product && touched.product && errors.product}
                autoFocus
              />
              <Field
                name="location"
                error={errors.location && touched.location}
                helperText={
                  errors.location && touched.location && errors.location
                }
                as={TextField}
                label="Location"
                placeholder="Whole Foods"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Field
                name="price"
                error={errors.price && touched.price}
                helperText={
                  errors.price && touched.price && errors.price
                }
                as={TextField}
                label="Price"
                placeholder="5.00"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Field
                name="quantity"
                error={errors.quantity && touched.quantity}
                helperText={
                  errors.quantity && touched.quantity && errors.quantity
                }
                as={TextField}
                label="Quantity"
                placeholder="2"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Field
                name="unit"
                error={errors.unit && touched.unit}
                helperText={
                  errors.unit && touched.unit && errors.unit
                }
                as={TextField}
                label="Unit"
                placeholder="lb"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary" disabled={isSubmitting}>
                Add
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
