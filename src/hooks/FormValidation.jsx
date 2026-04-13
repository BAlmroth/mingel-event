import { useState } from "react";

export function useFormValidation() {
  // state to store validation errors for form fields
  const [errors, setErrors] = useState({});

  const validateForm = (fields) => {
    const newErrors = {};
    
    // check each field for empty values
    Object.entries(fields).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = "Please fill in this field";
      }
    });
    
    setErrors(newErrors);
    // return true if no errors, false if there are errors
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field) => {
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return { errors, setErrors, validateForm, clearError };
}