import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useNavigate } from "react-router-dom";

import { Traveler } from "../../model/Traveler";
import { useState } from "react";
import api from "../../api/api";
import { useMutation } from "react-query";
import { useTranslation } from "react-i18next";
import SignupImage from '../../img/pexels-quang-nguyen-vinh-2178175.jpg'; // Import using relative path
import { useFormik } from "formik";
import * as yup from "yup";
import { InlineAlert } from "utility/alert/InlineAlert";

export const SignUp = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const createUser = async (traveler: Traveler) =>
    api.create({ route: Traveler.routeName, body: traveler, hasToken: false });

  const mutation = useMutation(createUser, {
    onSuccess: (data, variables, context) => {
      setError(false);
      navigate("/signin");
    },

    onError: (errorFetch: string) => {
      setErrorMsg(errorFetch);
      setError(true);
    },
  });

  // Form validation
  const validationSchema = yup.object({
    firstname: yup
      .string()
      .required(t("auth.formValidation.firstname.required"))
      .min(2, t("auth.formValidation.firstname.min"))
      .max(50, t("auth.formValidation.firstname.max")),
    lastname: yup
      .string()
      .required(t("auth.formValidation.lastname.required"))
      .min(2, t("auth.formValidation.lastname.min"))
      .max(50, t("auth.formValidation.lastname.max")),
    email: yup
      .string()
      .required(t("auth.formValidation.email.required"))
      .email(t("auth.formValidation.email.valid"))
      .max(255, t("auth.formValidation.email.max")),
    password: yup
      .string()
      .required(t("auth.formValidation.password.required"))
      .min(4, t("auth.formValidation.password.min"))
      .max(55, t("auth.formValidation.password.max")),
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return (
    <Box sx={{
      width: '100%', minHeight: "92vh", maxHeight: "92vh", background: `url(${SignupImage})`,
      backgroundPosition: "center 35%",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: 'secondary.light',
            borderRadius: '8px',
            p: 4,
            pt: 3
          }}
        >
          <Avatar sx={{ bgcolor: "secondary.main", mb: 1 }}>
            <AppRegistrationIcon />
          </Avatar>
          <Typography data-cy="signupText" component="h1" variant="h5">
            {t("auth.signupTitle")}
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            {
              error ? (
                <InlineAlert message={errorMsg.toString()} severity="error" />
              ) : null
            }
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstname"
              label={t("common.firstName")}
              name="firstname"
              autoComplete="firstname"
              value={formik.values.firstname}
              error={formik.touched.firstname && Boolean(formik.errors.firstname)}
              helperText={formik.touched.firstname && formik.errors.firstname}
              onChange={formik.handleChange}
              autoFocus
              variant='filled'
              InputProps={{ disableUnderline: true }}
              sx={{
                my: 1,
                borderRadius: "4px",
                '& .MuiFilledInput-root': {
                  borderRadius: "4px",
                  backgroundColor: "secondary.lightest",
                },
                "& label.Mui-focused": {
                  color: "secondary.main"
                },
                "& label": {
                  color: "secondary.darkest"
                },
                "&:hover": {
                  borderRadius: '4px'
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastname"
              label={t("common.name")}
              name="lastname"
              autoComplete="lastname"
              value={formik.values.lastname}
              error={formik.touched.lastname && Boolean(formik.errors.lastname)}
              helperText={formik.touched.lastname && formik.errors.lastname}
              onChange={formik.handleChange}
              variant='filled'
              InputProps={{ disableUnderline: true }}
              sx={{
                my: 1,
                borderRadius: "4px",
                '& .MuiFilledInput-root': {
                  borderRadius: "4px",
                  backgroundColor: "secondary.lightest",
                },
                "& label.Mui-focused": {
                  color: "secondary.main"
                },
                "& label": {
                  color: "secondary.darkest"
                },
                "&:hover": {
                  borderRadius: '4px'
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t("common.mail")}
              name="email"
              autoComplete="email"
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              onChange={formik.handleChange}
              variant='filled'
              InputProps={{ disableUnderline: true }}
              sx={{
                my: 1,
                borderRadius: "4px",
                '& .MuiFilledInput-root': {
                  borderRadius: "4px",
                  backgroundColor: "secondary.lightest",
                },
                "& label.Mui-focused": {
                  color: "secondary.main"
                },
                "& label": {
                  color: "secondary.darkest"
                },
                "&:hover": {
                  borderRadius: '4px'
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("common.password")}
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              onChange={formik.handleChange}
              variant='filled'
              InputProps={{ disableUnderline: true }}
              sx={{
                my: 1,
                borderRadius: "4px",
                '& .MuiFilledInput-root': {
                  borderRadius: "4px",
                  backgroundColor: "secondary.lightest",
                },
                "& label.Mui-focused": {
                  color: "secondary.main"
                },
                "& label": {
                  color: "secondary.darkest"
                },
                "&:hover": {
                  borderRadius: '4px'
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{
                borderRadius: '4px', mt: 1, mb: 1, fontSize: '1rem', py: 1.5, textTransform: 'capitalize', '&:hover': {
                  backgroundColor: 'secondary.darky'
                }
              }}
            >
              {t("common.signup")}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
