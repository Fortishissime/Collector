import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { Link } from 'react-router-dom';

const TermsCheckbox = ({ acceptTerms, setAcceptTerms }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={acceptTerms}
          onChange={(e) => setAcceptTerms(e.target.checked)}
          name="terms"
          color="primary"
          required
        />
      }
      label={
        <span className="text-gray-400">
          I accept the{' '}
          <Link to="/terms" className="text-blue-500 hover:underline">
            Terms of Service
          </Link>
        </span>
      }
      style={{ color: 'white' }}
    />
  );
};

export default TermsCheckbox;
