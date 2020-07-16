import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .required("Required"),
});

export default function Login({
  setIsLoggedIn
}) {
  const [login] = useMutation(LOGIN);

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log('values:', values);
          const result = await login({
            variables: {
              email: values.email,
              password: values.password,
            },
          });
          console.log('result:', result, setIsLoggedIn);
          setIsLoggedIn(true);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="Form">
            {/* <img src="/loginBackground.jpg" alt="background image" /> */}
            <Field
              name="email"
              error={errors.email && touched.email}
              as={TextField}
              label="Email"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              helperText={errors.email && touched.email && errors.email}
              autoFocus
            />
            <Field
              name="password"
              error={errors.password && touched.password}
              helperText={
                errors.password && touched.password && errors.password
              }
              as={TextField}
              label="Passoword"
              margin="normal"
              type="password"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button type="submit" color="primary" disabled={isSubmitting}>
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <div className="Backdrop"></div>
      <style global jsx>{`
        body {
          background: url("/loginBackground.jpg") no-repeat center;
        }
        .Backdrop {
          background-color: rgba(255, 255, 255, 0.7);
          position: fixed;
          top: 0;
          left: 0;
          z-index: -999;
          width: 100vw;
          height: 100vh;
          
        }
        .Form {
          background: gray;
          // position: fixed;
          // top: 50%;
          // left: 50%;
        }
      `}</style>
    </>
  );
}
