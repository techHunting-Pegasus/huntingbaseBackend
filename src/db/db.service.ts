import {
  Injectable,
  OnModuleDestroy,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, type QueryResult, type QueryResultRow } from 'pg';

@Injectable()
export class DbService implements OnModuleDestroy {
  private pool: Pool | null = null;

  constructor(private readonly config: ConfigService) {}

  private getPool(): Pool {
    if (this.pool) {
      return this.pool;
    }
    const connectionString = this.config.get<string>('DATABASE_URL')?.trim();
    if (!connectionString) {
      throw new ServiceUnavailableException(
        'Database is not configured (set DATABASE_URL)',
      );
    }
    const ssl = /supabase\.co/i.test(connectionString)
      ? { rejectUnauthorized: false }
      : undefined;
    this.pool = new Pool({ connectionString, ssl });
    return this.pool;
  }

  
 
  async query<T extends QueryResultRow = QueryResultRow>(
    text: string,
    values?: unknown[],
  ): Promise<QueryResult<T>> {
    const pool = this.getPool();
    return pool.query<T>(text, values);
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool?.end();
  }
}
