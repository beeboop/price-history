import React from "react";
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
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
        product
        location
        price
        quantity
        unit
        date
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
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  date: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    qtyUnitContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridColumnGap: theme.spacing(3),
      paddingRight: theme.spacing(10),
    }
  })
);

const formatYyyyDashMmDashDd = (date: Date): string => {
  const yyyy = date.getUTCFullYear();
  const mm = `${date.getUTCMonth()+1}`.padStart(2, '0');
  const dd = `${date.getUTCDate()}`.padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}


export default function AddRecordDialog({ open, handleClose }) {
  const classes = useStyles();
  const [createRecord] = useMutation(CREATE_RECORD, {
    update: (cache, data) => {
      const newRecord = data?.data?.createRecord?.record;
      cache.modify({
        fields: {
          records(existingRecords, { readField }) {
            const newRecordRef = cache.writeFragment({
              data: newRecord,
              fragment: gql`
                fragment NewRecord on Record {
                  id
                  product
                  location
                  price
                  quantity
                  unit
                  date
                }
              `
            });

            if (existingRecords.some(ref => readField('id', ref) === newRecord.id)) {
              return existingRecords;
            }
      
            return [newRecordRef, ...existingRecords];
          }
        }
      });
    }
  });
  const now = new Date();

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Add Record</DialogTitle>
      <Formik
        initialValues={{ product: "", location: "", price: "", quantity: "", unit: "", date: formatYyyyDashMmDashDd(now) }}
        validationSchema={RecordSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const result = await createRecord({
            variables: {
              product: values.product,
              location: values.location,
              price: `${values.price}`,
              quantity: `${values.quantity}`,
              unit: values.unit,
              date: new Date(values.date).getTime() / 1000,
            },
          });
          handleClose();
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <DialogContent>
              <Field
                name="date"
                error={errors.date && touched.date}
                helperText={
                  errors.date && touched.date && errors.date
                }
                as={TextField}
                type="date"
                label="Date"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Field
                name="product"
                error={errors.product && touched.product}
                helperText={errors.product && touched.product && errors.product}
                as={TextField}
                label="Product"
                placeholder="Organic Tomatoes"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
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
              <div className={ classes.qtyUnitContainer }>
                <Field
                  name="quantity"
                  error={errors.quantity && touched.quantity}
                  helperText={
                    errors.quantity && touched.quantity && errors.quantity
                  }
                  as={TextField}
                  label="Quantity"
                  type="number"
                  placeholder="2"
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
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <Field
                name="price"
                error={errors.price && touched.price}
                helperText={
                  errors.price && touched.price && errors.price
                }
                as={TextField}
                label="Price"
                placeholder="5.00"
                type="number"
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
