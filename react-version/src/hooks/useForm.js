import { useState } from 'react';

// Reusable controlled-form hook.
// validate(values) returns an object of error messages keyed by field name.
// onSubmit(values) runs only when there are no errors.
export default function useForm(initialValues, validate, onSubmit) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field as soon as the user edits it.
    setErrors((prev) => {
      const { [name]: _removed, ...rest } = prev;
      return rest;
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const found = validate ? validate(values) : {};
    setErrors(found);
    if (Object.keys(found).length === 0) {
      onSubmit(values);
      setValues(initialValues);
    }
  }

  return { values, errors, handleChange, handleSubmit };
}
