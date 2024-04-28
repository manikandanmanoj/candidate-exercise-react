import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment ,InputBaseProps } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';

interface TextFieldProps {
  type?: string;
  [props: string]: any;
  margin?: string;
  value?: any;
  error?: boolean;
  helperText?: string
  inputProps?: InputBaseProps['inputProps'];
}

const CustomTextFiled = ({ type, value, error, helperText, inputProps,margin, ...props }: TextFieldProps) => {
  const [isFocus, setIsFocus] = useState<boolean>((value + '').length > 0);
  const [passwordShown, setShown] = useState<boolean>(false);

  return (
      <TextField
        id="outlined-error-helper-text"
        variant="outlined"
        helperText={error ? helperText : ''}
        error={error}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(value && (value + '').length > 0)}
        value={value}
        type={type === 'password' ? passwordShown ? type = '' : type = 'password' : type}
        onKeyPress={(event) => {
          if (type === 'number') {
            if (event?.key === '-' || event?.key === '+' || event?.key === 'e') {
              event.preventDefault();
            }
          }
        }}
        InputProps={ inputProps ?? {
          style: {
            height:!props.multiline && 41,
          },
          ...props.inputProps,
          autocomplete: type === 'password' && 'new-password',
          endAdornment: type === 'password' || type === '' ? (
            <InputAdornment position="end" >
              <IconButton
                aria-label="Toggle password visibility"
                onClick={() => setShown(!passwordShown)}
              >
                {passwordShown ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ) : null
        }}
        InputLabelProps={{
          style: {
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '100%',
            fontSize: '0.9rem',
            color: isFocus || value ? '#6896c2' : 'black',
            paddingTop: margin === '' ? isFocus ? 0 : 2.6 : !margin ? 3.2 : 0,
            fontWeight: isFocus ? 400 : 400
          }
        }}
        {...props}
      />
  );
};

export default CustomTextFiled;