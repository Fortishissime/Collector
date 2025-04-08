import React, { useState } from 'react';
import {
  Button,
  TextField,
  CircularProgress,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material';
import TermsCheckbox from './TermsCheckbox.jsx';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';
import { useNavigate } from 'react-router-dom';

const SignUpForm = ({ avatar }) => {
  const [formData, setFormData] = useState({
    nickname: '',
    password: '',
    mail: '',
    birth_date: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const navigate = useNavigate();

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_])[A-Za-z\d!@#$%^&*]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    let errors = {};
    const birthDate = new Date(formData.birth_date);
    const age = new Date().getFullYear() - birthDate.getFullYear();

    if (age < 18) {
      errors.birth_date = 'You must be 18 or older.';
    }
    if (!emailRegex.test(formData.mail)) {
      errors.mail = 'Please provide a valid email address.';
    }
    if (!passwordRegex.test(formData.password)) {
      errors.password =
        'Password must be at least 8 characters, include an uppercase letter, a number, and a special character.';
    }
    if (!formData.nickname || !formData.mail || !formData.birth_date || !formData.password) {
      errors.general = 'All fields are required.';
    }
    if (!acceptTerms) {
      errors.general = 'You must accept the terms and conditions.';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages({});
    setSuccessMessage('');
    setLoading(true);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrorMessages(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const preparedData = {
        ...formData,
        nickname: formData.nickname.toLowerCase(),
        mail: formData.mail.toLowerCase(),
        avatar,
        displayName: formData.nickname.charAt(0).toUpperCase() + formData.nickname.slice(1),
      };

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preparedData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Registered successfully!');
        setIsLocked(true);
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/');
        }, 2000);
      } else {
        setErrorMessages((prev) => ({
          ...prev,
          ...(data.email && { mail: data.email }),
          ...(data.nickname && { nickname: data.nickname }),
          general: data.error || 'Something went wrong. Please try again.',
        }));
      }
    } catch (error) {
      setErrorMessages({ general: 'An error occurred. Please try again later.' });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          error={!!errorMessages.nickname}
          helperText={errorMessages.nickname}
          disabled={isLocked}
        />
        <TextField
          fullWidth
          label="E-mail"
          name="mail"
          value={formData.mail}
          onChange={handleChange}
          error={!!errorMessages.mail}
          helperText={errorMessages.mail}
          disabled={isLocked}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type={passwordVisible ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          error={!!errorMessages.password}
          helperText={errorMessages.password}
          disabled={isLocked}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setPasswordVisible((prev) => !prev)}
                  edge="end"
                  aria-label="toggle password visibility"
                >
                  {passwordVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Date of Birth"
          type="date"
          name="birth_date"
          value={formData.birth_date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          error={!!errorMessages.birth_date}
          helperText={errorMessages.birth_date}
          disabled={isLocked}
        />
        <TermsCheckbox
          acceptTerms={acceptTerms}
          setAcceptTerms={setAcceptTerms}
          disabled={isLocked}
        />
        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={loading || isLocked}
        >
          {loading ? <CircularProgress size={24} /> : 'Sign Up'}
        </Button>
        <ErrorMessage message={errorMessages.general} />
        <SuccessMessage message={successMessage} />
      </form>
    </div>
  );
};

export default SignUpForm;
