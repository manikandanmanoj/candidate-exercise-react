import React from "react";
import { Row, Column, Card, CustomTextFiled } from "../Core";
import { Button, Typography } from "@mui/material";
import { theme, useStyle } from "../styles";
import { makeStyles } from "./CommonStyleUi";
import { textFieldsSign } from "../pages/LoginFlow";

interface signInProcess {
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
  flag: boolean;
  setFields: React.Dispatch<any>;
  fields: textFieldsSign;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  SignupOperations?: () => Promise<void>
  signInOperations?: () => Promise<void>
}

const SignIn = ({ setFlag, flag, handleChange, fields,signInOperations }: signInProcess) => {
  const { styles } = useStyle(makeStyles);
  return (
    <div>
      <Row center middle sx={styles.rowSignin}>
        <Column md={6}>
          <LeftCompo />
        </Column>
        <Column md={6} middle>
          <Card padding={[30]}>
            <Typography fontWeight={700} variant="h6" component={"h6"}>
              Login
            </Typography>
            <Typography color={theme.global?.green}>
              Welcome back please login your account !
            </Typography>
            <Typography mt={1} mb={0.5} color={theme.global?.textGrey}>
              Username
            </Typography>
            <Column md={12}>
              <CustomTextFiled
                name="username"
                placeholder="Enter"
                onChange={handleChange}
                value={fields.username.value}
                error={fields.username.error}
                helperText={
                  fields.username.value === ""
                    ? "Required field"
                    : fields.username.err_msg
                }
                required={fields.username.is_require}
              />
            </Column>
            <Typography mt={2} mb={0.5} color={theme.global?.textGrey}>
              Password
            </Typography>
            <Column md={12}>
              <CustomTextFiled
                type="password"
                name="password"
                placeholder="Enter"
                onChange={handleChange}
                value={fields.password.value}
                error={fields.password.error}
                helperText={
                  fields.password.value === ""
                    ? "Required field"
                    : fields.password.err_msg
                }
                required={fields.password.is_require}
              />
            </Column>
            <Column md={12}>
              <Button onClick={signInOperations} sx={styles.loginButton} variant="contained">
                Login
              </Button>
            </Column>
            <Column md={12} margin={[10, 0, 0, 0]}>
              <Typography variant="caption" component={"p"}>
                New user?{" "}
                <span onClick={() => setFlag(!flag)} style={styles.spanStyle}>
                  {" "}
                  SignUp
                </span>
              </Typography>
            </Column>
          </Card>
        </Column>
      </Row>
    </div>
  );
};

export default SignIn;

export const SignUp = ({
  setFlag,
  flag,
  handleChange,
  fields,
  SignupOperations
}: signInProcess) => {
  const { styles } = useStyle(makeStyles);
  return (
    <div>
      <Row center middle sx={styles.rowSignin}>
        <Column md={6}>
          <LeftCompo />
        </Column>
        <Column md={6} middle>
          <Card padding={[30]}>
            <Typography fontWeight={700} variant="h6" component={"h6"}>
              Signup
            </Typography>
            <Typography color={theme.global?.green}>
              Welcome back please Signup your account !
            </Typography>
            <Typography mt={1} mb={0.5} color={theme.global?.textGrey}>
              Username
            </Typography>
            <Column md={12}>
              <CustomTextFiled
                name="username"
                placeholder="Enter"
                onChange={handleChange}
                value={fields.username.value}
                error={fields.username.error}
                helperText={
                  fields.username.value === ""
                    ? "Required field"
                    : fields.username.err_msg
                }
                required={fields.username.is_require}
              />
            </Column>
            <Typography mt={2} mb={0.5} color={theme.global?.textGrey}>
              Password
            </Typography>
            <Column md={12}>
              <CustomTextFiled
                type="password"
                name="password"
                placeholder="Enter"
                onChange={handleChange}
                value={fields.password.value}
                error={fields.password.error}
                helperText={
                  fields.password.value === ""
                    ? "Required field"
                    : fields.password.err_msg
                }
                required={fields.password.is_require}
              />
            </Column>
            <Typography mt={2} mb={0.5} color={theme.global?.textGrey}>
              Confirm password
            </Typography>
            <Column md={12}>
              <CustomTextFiled
                type="password"
                name="confirm"
                placeholder="Enter"
                onChange={handleChange}
                value={fields.confirm.value}
                error={fields.confirm.error}
                helperText={
                  fields.confirm.value === ""
                    ? "Required field"
                    : fields.confirm.err_msg
                }
                required={fields.confirm.is_require}
              />
            </Column>
            <Column md={12}>
              <Button onClick={SignupOperations} sx={styles.loginButton} variant="contained">
                Signup
              </Button>
            </Column>
            <Column md={12} margin={[10, 0, 0, 0]}>
              <Typography variant="caption" component={"p"}>
                Go back?{" "}
                <span onClick={() => setFlag(!flag)} style={styles.spanStyle}>
                  {" "}
                  Login
                </span>
              </Typography>
            </Column>
          </Card>
        </Column>
      </Row>
    </div>
  );
};

const LeftCompo = () => {
  const { styles } = useStyle(makeStyles);
  return (
    <div>
      <Row center middle>
        <Typography sx={styles.leftSignText}>Welcome Back!</Typography>
      </Row>
    </div>
  );
};
