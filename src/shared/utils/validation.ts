export interface ValidationErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export const validateContactForm = (formData: {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Full Name validation
  if (!formData.fullName.trim()) {
    errors.fullName = 'Full name is required';
  } else if (formData.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters';
  }

  // Email validation
  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
  }

  // Phone validation
  if (!formData.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else {
    // Remove all non-digit characters for validation
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      errors.phone = 'Phone number must be at least 10 digits';
    } else if (phoneDigits.length > 15) {
      errors.phone = 'Phone number must not exceed 15 digits';
    }
  }

  // Message validation
  if (!formData.message.trim()) {
    errors.message = 'Message is required';
  } else if (formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return errors;
};

export const hasValidationErrors = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length > 0;
};
