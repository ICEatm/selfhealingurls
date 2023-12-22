import Datastore from '@seald-io/nedb';
import {readdirSync} from 'fs';
import {join} from 'path';

class DatabaseManager {
  private readonly _databases: {[key: string]: Datastore};
  private static s_instance: DatabaseManager;
  private readonly _dbFilesPath: string;

  private constructor() {
    this._dbFilesPath = join(__dirname, '../data');
    this._databases = {};
    this.loadDatabases();
  }

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.s_instance) {
      DatabaseManager.s_instance = new DatabaseManager();
    }

    return DatabaseManager.s_instance;
  }

  private loadDatabases(): void {
    const files = readdirSync(this._dbFilesPath);
    files.forEach(file => {
      const dbName = file.replace('.db', '');
      const filePath = join(this._dbFilesPath, file);
      this._databases[dbName] = new Datastore({
        filename: filePath,
        autoload: true,
      });
    });
  }

  public getDatabase(databaseName: string): Datastore | undefined {
    return this._databases[databaseName];
  }

  public getAllDatabases(): {[key: string]: Datastore} {
    return this._databases;
  }
}

const DBManager = DatabaseManager.getInstance();
export default DBManager;
