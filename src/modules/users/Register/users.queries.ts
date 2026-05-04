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


export const getprojects = `SELECT id, name, description, project_id FROM project`;

export  function buildInsertQuery(table: string, data: Record<string, any>) {
  const keys = Object.keys(data);
  const values = Object.values(data);

  const columns = keys.join(', ');
  const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');

  const query = `
    INSERT INTO ${table} (${columns})
    VALUES (${placeholders})
    RETURNING *;
  `;

  return { query, values };
}

export const checkBundleIdExists = 'SELECT id FROM project WHERE bundle_id = $1';