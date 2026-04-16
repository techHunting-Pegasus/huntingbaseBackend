/**
 * Raw SQL for the `users` table only.
 * Schema: id (int8), email (text), category (text), password (text).
 */

export const SELECT_USER_ID_BY_EMAIL = `
  SELECT id
  FROM users
  WHERE email = $1
  LIMIT 1
`;

export const INSERT_USER = `
  INSERT INTO users (email, password, category)
  VALUES ($1, $2, $3)
  RETURNING id, email, category
`;

export const SELECT_USER_BY_EMAIL = `
  SELECT id, email, password, category
  FROM users
  WHERE email = $1
  LIMIT 1
`;
