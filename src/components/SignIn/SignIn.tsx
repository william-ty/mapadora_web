import * as React from "react";
import { useState } from "react";

import { useFormik } from "formik";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as yup from "yup";

import { useAuth } from "../../provider/AuthProvider";
import { useTranslation } from "react-i18next";

import SigninImage from '../../img/pexels-quang-nguyen-vinh-2132126.jpg'; // Import using relative path
// import SigninImage2 from '../../img/pexels-quang-nguyen-vinh-2178175.jpg'; // Import using relative path

export const SignIn = () => {
  const { t } = useTranslation();

  const { signin } = useAuth();

  const [error, setError] = useState(false);

  // Form validation
  const validationSchema = yup.object({
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
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      signin(values).catch(() => setError(true));
    },
  });

  return (
    <Box sx={{
      width: '100%', height: "92vh", pt: 12, background: `url(${SigninImage})`,
      backgroundPosition: "center 45%",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
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
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            {t("auth.login")}
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1, width: "100%" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={t("common.mail")}
                name="email"
                value={formik.values.email}
                error={(formik.touched.email && Boolean(formik.errors.email)) || error}
                helperText={formik.touched.email && formik.errors.email}
                onChange={formik.handleChange}
                autoComplete="email"
                autoFocus
                variant='filled'
                InputProps={{ disableUnderline: true }}
                sx={{
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
                  my: 1,
                }}
              />
              {error ? (
                <Typography color="error">{t("auth.mailError")}</Typography>
              ) : (
                <></>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={t("common.password")}
                type="password"
                id="password"
                value={formik.values.password}
                error={(formik.touched.password && Boolean(formik.errors.password)) || error}
                helperText={formik.touched.password && formik.errors.password}
                onChange={formik.handleChange}
                autoComplete="current-password"
                variant='filled'
                InputProps={{ disableUnderline: true }}
                sx={{
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
                  my: 1
                }}
              />
              {error ? (
                <Typography color="error">{t("auth.passwordError")}</Typography>
              ) : (
                <></>
              )}
              {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label={t("auth.dontForgetMe")}
            data-cy="rememberCheckBox"
          /> */}
              <Button
                type="submit"
                color="secondary"
                fullWidth
                variant="contained"
                sx={{
                  borderRadius: '4px', mt: 1, mb: 1, fontSize: '1rem', py: 1.5, textTransform: 'capitalize', '&:hover': {
                    backgroundColor: 'secondary.darky'
                  }
                }}
                data-cy="submitLogin"
              >
                {t("auth.login")}
              </Button>
              <Grid container justifyContent="space-evenly">
                {/* <Grid item>
                  <Link href="#" variant="body2" color='secondary'>
                    {t("auth.renewPassword")}
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href="/signup" variant="body2" color='secondary'>
                    {t("auth.createAccount")}
                  </Link>
                </Grid>
              </Grid>
          </Box>
        </Box>
      </Container>
    </Box >
  );
};
