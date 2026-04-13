import { useState } from "react";

export function useFormValidation() {
  const [errors, setErrors] = useState({});

  const validateForm = (fields) => {
    const newErrors = {};
    
    Object.entries(fields).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = "Please fill in this field";
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field) => {
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return { errors, setErrors, validateForm, clearError };
}