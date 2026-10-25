export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validateLogin(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your name (at least 2 characters).';
  if (!isValidEmail(values.email)) errors.email = 'Enter a valid email address.';
  if (values.password.length < 6) errors.password = 'Password must be at least 6 characters.';
  return errors;
}

export function validateContact(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!isValidEmail(values.email)) errors.email = 'Enter a valid email address.';
  if (!values.subject.trim()) errors.subject = 'Add a subject so we know what to expect.';
  if (values.message.trim().length < 10) errors.message = 'Message should be at least 10 characters.';
  return errors;
}

export function validateStory(values) {
  const errors = {};
  if (values.title.trim().length < 5) errors.title = 'Title should be at least 5 characters.';
  if (!values.category) errors.category = 'Choose a category.';
  if (values.excerpt.trim().length < 20) errors.excerpt = 'Summary should be at least 20 characters.';
  if (values.body.trim().length < 100) errors.body = 'Story should be at least 100 characters.';
  return errors;
}
