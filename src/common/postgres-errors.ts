/** PostgreSQL error code for unique_violation */
const PG_UNIQUE_VIOLATION = '23505';

export function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as { code: string }).code === PG_UNIQUE_VIOLATION
  );
}
