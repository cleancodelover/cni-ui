import * as yup from "yup";

export const iLoginFormValidation = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required')
});

export const iSignUpFormValidation = yup.object().shape({
  full_name: yup.string().required('Full name is required'),
  org_id: yup.number().required('Organization ID is required').integer('Organization ID must be an integer'),
  phone_number: yup.string().required('Phone number is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  password_confirmation: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required'),
});

export const iUpdateProfileFormValidation = yup.object().shape({
  firstName: yup.string().min(2).required("First name can't be empty"),
  lastName: yup.string().min(2).required("Last name can't be empty")
});
