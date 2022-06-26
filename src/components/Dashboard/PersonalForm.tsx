import { Box, TextField, Button, Typography, Divider } from "@mui/material";
import { useAuth } from "../../provider/AuthProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertDialog from "../../utility/alert/alertToUser";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import { InlineAlert } from "utility/alert/InlineAlert";

export const PersonalForm = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { user, updateTraveler, deleteTraveler } = useAuth();

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [dialog, setDialog] = useState<boolean>(false);
  const [travelerInput, setTravelerInput] = useState<SelectedTraveler>(user!);

  type SelectedTraveler = {
    id?: number | null;
    email?: FormDataEntryValue | string | null;
    password?: FormDataEntryValue | string | null;
    firstname?: FormDataEntryValue | string | null;
    lastname?: FormDataEntryValue | string | null;
  };

  useEffect(() => {
    user && setTravelerInput(user);
    setDialog(false);
  }, [user]);

  const deleteAccount = () => {
    user?.id !== undefined ? setDialog(true) : setDialog(false);
  };

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
  });

  const formik = useFormik({
    initialValues: {
      firstname: travelerInput?.firstname || "",
      lastname: travelerInput?.lastname || "",
      email: travelerInput?.email || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (travelerInput.id) {
        updateTraveler(travelerInput.id, values)
          .then(() => navigate("/dashboard"))
          .catch((msg) => {
            setError(true);
            setErrorMsg(msg);
          });
      }
    },
  });

  return (
    <Box width="40%">
      <Typography variant="h5">
        {t("dashboard.personalForm.myInformations")}
      </Typography>
      <Divider sx={{ my: 1 }} />
      {dialog ? (
        <AlertDialog
          activate={true}
          dialogTitle={t("dashboard.personalForm.areYouSure")}
          dialogDescription={t("dashboard.personalForm.dataWillBeDeleted")}
          onCloseNoAction={() => setDialog(false)}
          onCloseYesAction={() =>
            user?.id ? deleteTraveler(user.id) : navigate("./")
          }
        />
      ) : null}

      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ width: "100%", mt: 2 }}
      >
        {error ? (
          <Box sx={{ mb: 2 }}>
            <InlineAlert message={errorMsg.toString()} severity="error" />
          </Box>
        ) : null}

        <TextField
          fullWidth
          required
          margin="normal"
          label={t("common.firstName")}
          name="firstname"
          type="text"
          value={formik.values.firstname}
          error={formik.touched.firstname && Boolean(formik.errors.firstname)}
          helperText={formik.touched.firstname && formik.errors.firstname}
          data-cy="firstname"
          id="firstname"
          onChange={formik.handleChange}
          sx={{ my: 1 }}
        />

        <TextField
          fullWidth
          required
          margin="normal"
          label={t("common.name")}
          name="lastname"
          type="text"
          value={formik.values.lastname}
          error={formik.touched.lastname && Boolean(formik.errors.lastname)}
          helperText={formik.touched.lastname && formik.errors.lastname}
          id="lastname"
          data-cy="lastname"
          onChange={formik.handleChange}
          sx={{ my: 1 }}
        />

        <TextField
          fullWidth
          required
          margin="normal"
          id="email"
          label={t("common.mail")}
          name="email"
          autoComplete="email"
          data-cy="email"
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          autoFocus
          onChange={formik.handleChange}
          sx={{ my: 1 }}
        />

        <Button
          type="submit"
          data-cy="submitButton"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 1, py: 1, fontSize: "1rem" }}
        >
          {t("common.save")}
        </Button>
        <Divider sx={{ my: 1 }} />
        {/* TODO */}
        {/* <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
        </Grid> */}
      </Box>
      <Button
        variant="contained"
        data-cy="deleteAccountButton"
        onClick={deleteAccount}
        color="error"
        sx={{
          mt: 1,
          mb: 0,
          "&:hover": {
            backgroundColor: "darkred",
          },
        }}
      >
        {t("dashboard.personalForm.deleteMyAccount")}
      </Button>
    </Box>
  );
};
