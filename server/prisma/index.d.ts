import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw }

/**
 * Prisma Client JS version: 2.5.0
 * Query Engine version: 9a670138b1db276001d785a2adcba1584c869d24
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export declare type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export declare interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * Same as JsonObject, but allows undefined
 */
export declare type InputJsonObject = {[Key in string]?: JsonValue}
 
export declare interface InputJsonArray extends Array<JsonValue> {}
 
export declare type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export declare type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

export declare type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/

export declare type Datasource = {
  url?: string
}

export type Datasources = {
  db?: Datasource
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn', 'error']
   * 
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn' | 'error'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends Array<LogLevel | LogDefinition>> = GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]> 

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */


export type Action =
  | 'findOne'
  | 'findMany'
  | 'create'
  | 'update'
  | 'updateMany'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate'

/**
 * These options are being passed in to the middleware as "params"
 */
export type MiddlewareParams = {
  model?: string
  action: Action
  args: any
  dataPath: string[]
  runInTransaction: boolean
}

/**
 * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
 */
export type Middleware<T = any> = (
  params: MiddlewareParams,
  next: (params: MiddlewareParams) => Promise<T>,
) => Promise<T>

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Records
 * const records = await prisma.record.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = keyof T extends 'log' ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Records
   * const records = await prisma.record.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
   */
  constructor(optionsArg?: T);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * @deprecated renamed to `$on`
   */
  on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  $connect(): Promise<void>;
  /**
   * @deprecated renamed to `$connect`
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;
  /**
   * @deprecated renamed to `$disconnect`
   */
  disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md#raw-database-access).
  */
  $executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * @deprecated renamed to `$executeRaw`
   */
  executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md#raw-database-access).
  */
  $queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;
 
  /**
   * @deprecated renamed to `$executeRaw`
   */
  queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * `prisma.record`: Exposes CRUD operations for the **Record** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Records
    * const records = await prisma.record.findMany()
    * ```
    */
  get record(): RecordDelegate;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): UserDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const QueryMode: {
  default: 'default',
  insensitive: 'insensitive'
};

export declare type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


export declare const SortOrder: {
  asc: 'asc',
  desc: 'desc'
};

export declare type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


export declare const RecordDistinctFieldEnum: {
  authorId: 'authorId',
  createdAt: 'createdAt',
  customdate: 'customdate',
  id: 'id',
  isOnSale: 'isOnSale',
  location: 'location',
  price: 'price',
  product: 'product',
  quantity: 'quantity',
  unit: 'unit'
};

export declare type RecordDistinctFieldEnum = (typeof RecordDistinctFieldEnum)[keyof typeof RecordDistinctFieldEnum]


export declare const UserDistinctFieldEnum: {
  createdAt: 'createdAt',
  email: 'email',
  id: 'id',
  password: 'password'
};

export declare type UserDistinctFieldEnum = (typeof UserDistinctFieldEnum)[keyof typeof UserDistinctFieldEnum]



/**
 * Model Record
 */

export type Record = {
  authorId: number
  createdAt: Date
  customdate: Date | null
  id: number
  isOnSale: boolean
  location: string
  price: string
  product: string
  quantity: string
  unit: string
}


export type AggregateRecord = {
  count: number
  avg: RecordAvgAggregateOutputType | null
  sum: RecordSumAggregateOutputType | null
  min: RecordMinAggregateOutputType | null
  max: RecordMaxAggregateOutputType | null
}

export type RecordAvgAggregateOutputType = {
  authorId: number
  id: number
}

export type RecordSumAggregateOutputType = {
  authorId: number
  id: number
}

export type RecordMinAggregateOutputType = {
  authorId: number
  id: number
}

export type RecordMaxAggregateOutputType = {
  authorId: number
  id: number
}


export type RecordAvgAggregateInputType = {
  authorId?: true
  id?: true
}

export type RecordSumAggregateInputType = {
  authorId?: true
  id?: true
}

export type RecordMinAggregateInputType = {
  authorId?: true
  id?: true
}

export type RecordMaxAggregateInputType = {
  authorId?: true
  id?: true
}

export type AggregateRecordArgs = {
  where?: RecordWhereInput
  orderBy?: Enumerable<RecordOrderByInput>
  cursor?: RecordWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<RecordDistinctFieldEnum>
  count?: true
  avg?: RecordAvgAggregateInputType
  sum?: RecordSumAggregateInputType
  min?: RecordMinAggregateInputType
  max?: RecordMaxAggregateInputType
}

export type GetRecordAggregateType<T extends AggregateRecordArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetRecordAggregateScalarType<T[P]>
}

export type GetRecordAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof RecordAvgAggregateOutputType ? RecordAvgAggregateOutputType[P] : never
}
    
    

export type RecordSelect = {
  authorId?: boolean
  createdAt?: boolean
  customdate?: boolean
  id?: boolean
  isOnSale?: boolean
  location?: boolean
  price?: boolean
  product?: boolean
  quantity?: boolean
  unit?: boolean
  user?: boolean | UserArgs
}

export type RecordInclude = {
  user?: boolean | UserArgs
}

export type RecordGetPayload<
  S extends boolean | null | undefined | RecordArgs,
  U = keyof S
> = S extends true
  ? Record
  : S extends undefined
  ? never
  : S extends RecordArgs | FindManyRecordArgs
  ? 'include' extends U
    ? Record  & {
      [P in TrueKeys<S['include']>]:
      P extends 'user'
      ? UserGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Record ? Record[P]
: 
      P extends 'user'
      ? UserGetPayload<S['select'][P]> : never
    }
  : Record
: Record


export interface RecordDelegate {
  /**
   * Find zero or one Record.
   * @param {FindOneRecordArgs} args - Arguments to find a Record
   * @example
   * // Get one Record
   * const record = await prisma.record.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneRecordArgs>(
    args: Subset<T, FindOneRecordArgs>
  ): CheckSelect<T, Prisma__RecordClient<Record | null>, Prisma__RecordClient<RecordGetPayload<T> | null>>
  /**
   * Find zero or more Records.
   * @param {FindManyRecordArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Records
   * const records = await prisma.record.findMany()
   * 
   * // Get first 10 Records
   * const records = await prisma.record.findMany({ take: 10 })
   * 
   * // Only select the `authorId`
   * const recordWithAuthorIdOnly = await prisma.record.findMany({ select: { authorId: true } })
   * 
  **/
  findMany<T extends FindManyRecordArgs>(
    args?: Subset<T, FindManyRecordArgs>
  ): CheckSelect<T, Promise<Array<Record>>, Promise<Array<RecordGetPayload<T>>>>
  /**
   * Create a Record.
   * @param {RecordCreateArgs} args - Arguments to create a Record.
   * @example
   * // Create one Record
   * const Record = await prisma.record.create({
   *   data: {
   *     // ... data to create a Record
   *   }
   * })
   * 
  **/
  create<T extends RecordCreateArgs>(
    args: Subset<T, RecordCreateArgs>
  ): CheckSelect<T, Prisma__RecordClient<Record>, Prisma__RecordClient<RecordGetPayload<T>>>
  /**
   * Delete a Record.
   * @param {RecordDeleteArgs} args - Arguments to delete one Record.
   * @example
   * // Delete one Record
   * const Record = await prisma.record.delete({
   *   where: {
   *     // ... filter to delete one Record
   *   }
   * })
   * 
  **/
  delete<T extends RecordDeleteArgs>(
    args: Subset<T, RecordDeleteArgs>
  ): CheckSelect<T, Prisma__RecordClient<Record>, Prisma__RecordClient<RecordGetPayload<T>>>
  /**
   * Update one Record.
   * @param {RecordUpdateArgs} args - Arguments to update one Record.
   * @example
   * // Update one Record
   * const record = await prisma.record.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends RecordUpdateArgs>(
    args: Subset<T, RecordUpdateArgs>
  ): CheckSelect<T, Prisma__RecordClient<Record>, Prisma__RecordClient<RecordGetPayload<T>>>
  /**
   * Delete zero or more Records.
   * @param {RecordDeleteManyArgs} args - Arguments to filter Records to delete.
   * @example
   * // Delete a few Records
   * const { count } = await prisma.record.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends RecordDeleteManyArgs>(
    args: Subset<T, RecordDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Records.
   * @param {RecordUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Records
   * const record = await prisma.record.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends RecordUpdateManyArgs>(
    args: Subset<T, RecordUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Record.
   * @param {RecordUpsertArgs} args - Arguments to update or create a Record.
   * @example
   * // Update or create a Record
   * const record = await prisma.record.upsert({
   *   create: {
   *     // ... data to create a Record
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Record we want to update
   *   }
   * })
  **/
  upsert<T extends RecordUpsertArgs>(
    args: Subset<T, RecordUpsertArgs>
  ): CheckSelect<T, Prisma__RecordClient<Record>, Prisma__RecordClient<RecordGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyRecordArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateRecordArgs>(args: Subset<T, AggregateRecordArgs>): Promise<GetRecordAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Record.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__RecordClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Record findOne
 */
export type FindOneRecordArgs = {
  /**
   * Select specific fields to fetch from the Record
  **/
  select?: RecordSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RecordInclude | null
  /**
   * Filter, which Record to fetch.
  **/
  where: RecordWhereUniqueInput
}


/**
 * Record findMany
 */
export type FindManyRecordArgs = {
  /**
   * Select specific fields to fetch from the Record
  **/
  select?: RecordSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RecordInclude | null
  /**
   * Filter, which Records to fetch.
  **/
  where?: RecordWhereInput
  /**
   * Determine the order of the Records to fetch.
  **/
  orderBy?: Enumerable<RecordOrderByInput>
  /**
   * Sets the position for listing Records.
  **/
  cursor?: RecordWhereUniqueInput
  /**
   * The number of Records to fetch. If negative number, it will take Records before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Records.
  **/
  skip?: number
  distinct?: Enumerable<RecordDistinctFieldEnum>
}


/**
 * Record create
 */
export type RecordCreateArgs = {
  /**
   * Select specific fields to fetch from the Record
  **/
  select?: RecordSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RecordInclude | null
  /**
   * The data needed to create a Record.
  **/
  data: RecordCreateInput
}


/**
 * Record update
 */
export type RecordUpdateArgs = {
  /**
   * Select specific fields to fetch from the Record
  **/
  select?: RecordSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RecordInclude | null
  /**
   * The data needed to update a Record.
  **/
  data: RecordUpdateInput
  /**
   * Choose, which Record to update.
  **/
  where: RecordWhereUniqueInput
}


/**
 * Record updateMany
 */
export type RecordUpdateManyArgs = {
  data: RecordUpdateManyMutationInput
  where?: RecordWhereInput
}


/**
 * Record upsert
 */
export type RecordUpsertArgs = {
  /**
   * Select specific fields to fetch from the Record
  **/
  select?: RecordSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RecordInclude | null
  /**
   * The filter to search for the Record to update in case it exists.
  **/
  where: RecordWhereUniqueInput
  /**
   * In case the Record found by the `where` argument doesn't exist, create a new Record with this data.
  **/
  create: RecordCreateInput
  /**
   * In case the Record was found with the provided `where` argument, update it with this data.
  **/
  update: RecordUpdateInput
}


/**
 * Record delete
 */
export type RecordDeleteArgs = {
  /**
   * Select specific fields to fetch from the Record
  **/
  select?: RecordSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RecordInclude | null
  /**
   * Filter which Record to delete.
  **/
  where: RecordWhereUniqueInput
}


/**
 * Record deleteMany
 */
export type RecordDeleteManyArgs = {
  where?: RecordWhereInput
}


/**
 * Record without action
 */
export type RecordArgs = {
  /**
   * Select specific fields to fetch from the Record
  **/
  select?: RecordSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RecordInclude | null
}



/**
 * Model User
 */

export type User = {
  createdAt: Date
  email: string
  id: number
  password: string
}


export type AggregateUser = {
  count: number
  avg: UserAvgAggregateOutputType | null
  sum: UserSumAggregateOutputType | null
  min: UserMinAggregateOutputType | null
  max: UserMaxAggregateOutputType | null
}

export type UserAvgAggregateOutputType = {
  id: number
}

export type UserSumAggregateOutputType = {
  id: number
}

export type UserMinAggregateOutputType = {
  id: number
}

export type UserMaxAggregateOutputType = {
  id: number
}


export type UserAvgAggregateInputType = {
  id?: true
}

export type UserSumAggregateInputType = {
  id?: true
}

export type UserMinAggregateInputType = {
  id?: true
}

export type UserMaxAggregateInputType = {
  id?: true
}

export type AggregateUserArgs = {
  where?: UserWhereInput
  orderBy?: Enumerable<UserOrderByInput>
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
  count?: true
  avg?: UserAvgAggregateInputType
  sum?: UserSumAggregateInputType
  min?: UserMinAggregateInputType
  max?: UserMaxAggregateInputType
}

export type GetUserAggregateType<T extends AggregateUserArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetUserAggregateScalarType<T[P]>
}

export type GetUserAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof UserAvgAggregateOutputType ? UserAvgAggregateOutputType[P] : never
}
    
    

export type UserSelect = {
  createdAt?: boolean
  email?: boolean
  id?: boolean
  password?: boolean
  record?: boolean | FindManyRecordArgs
}

export type UserInclude = {
  record?: boolean | FindManyRecordArgs
}

export type UserGetPayload<
  S extends boolean | null | undefined | UserArgs,
  U = keyof S
> = S extends true
  ? User
  : S extends undefined
  ? never
  : S extends UserArgs | FindManyUserArgs
  ? 'include' extends U
    ? User  & {
      [P in TrueKeys<S['include']>]:
      P extends 'record'
      ? Array<RecordGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof User ? User[P]
: 
      P extends 'record'
      ? Array<RecordGetPayload<S['select'][P]>> : never
    }
  : User
: User


export interface UserDelegate {
  /**
   * Find zero or one User.
   * @param {FindOneUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneUserArgs>(
    args: Subset<T, FindOneUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>
  /**
   * Find zero or more Users.
   * @param {FindManyUserArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Users
   * const users = await prisma.user.findMany()
   * 
   * // Get first 10 Users
   * const users = await prisma.user.findMany({ take: 10 })
   * 
   * // Only select the `createdAt`
   * const userWithCreatedAtOnly = await prisma.user.findMany({ select: { createdAt: true } })
   * 
  **/
  findMany<T extends FindManyUserArgs>(
    args?: Subset<T, FindManyUserArgs>
  ): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>
  /**
   * Create a User.
   * @param {UserCreateArgs} args - Arguments to create a User.
   * @example
   * // Create one User
   * const User = await prisma.user.create({
   *   data: {
   *     // ... data to create a User
   *   }
   * })
   * 
  **/
  create<T extends UserCreateArgs>(
    args: Subset<T, UserCreateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Delete a User.
   * @param {UserDeleteArgs} args - Arguments to delete one User.
   * @example
   * // Delete one User
   * const User = await prisma.user.delete({
   *   where: {
   *     // ... filter to delete one User
   *   }
   * })
   * 
  **/
  delete<T extends UserDeleteArgs>(
    args: Subset<T, UserDeleteArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Update one User.
   * @param {UserUpdateArgs} args - Arguments to update one User.
   * @example
   * // Update one User
   * const user = await prisma.user.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends UserUpdateArgs>(
    args: Subset<T, UserUpdateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Delete zero or more Users.
   * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
   * @example
   * // Delete a few Users
   * const { count } = await prisma.user.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends UserDeleteManyArgs>(
    args: Subset<T, UserDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Users.
   * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Users
   * const user = await prisma.user.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends UserUpdateManyArgs>(
    args: Subset<T, UserUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one User.
   * @param {UserUpsertArgs} args - Arguments to update or create a User.
   * @example
   * // Update or create a User
   * const user = await prisma.user.upsert({
   *   create: {
   *     // ... data to create a User
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the User we want to update
   *   }
   * })
  **/
  upsert<T extends UserUpsertArgs>(
    args: Subset<T, UserUpsertArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyUserArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateUserArgs>(args: Subset<T, AggregateUserArgs>): Promise<GetUserAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__UserClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  record<T extends FindManyRecordArgs = {}>(args?: Subset<T, FindManyRecordArgs>): CheckSelect<T, Promise<Array<Record>>, Promise<Array<RecordGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * User findOne
 */
export type FindOneUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which User to fetch.
  **/
  where: UserWhereUniqueInput
}


/**
 * User findMany
 */
export type FindManyUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which Users to fetch.
  **/
  where?: UserWhereInput
  /**
   * Determine the order of the Users to fetch.
  **/
  orderBy?: Enumerable<UserOrderByInput>
  /**
   * Sets the position for listing Users.
  **/
  cursor?: UserWhereUniqueInput
  /**
   * The number of Users to fetch. If negative number, it will take Users before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Users.
  **/
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
}


/**
 * User create
 */
export type UserCreateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to create a User.
  **/
  data: UserCreateInput
}


/**
 * User update
 */
export type UserUpdateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to update a User.
  **/
  data: UserUpdateInput
  /**
   * Choose, which User to update.
  **/
  where: UserWhereUniqueInput
}


/**
 * User updateMany
 */
export type UserUpdateManyArgs = {
  data: UserUpdateManyMutationInput
  where?: UserWhereInput
}


/**
 * User upsert
 */
export type UserUpsertArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The filter to search for the User to update in case it exists.
  **/
  where: UserWhereUniqueInput
  /**
   * In case the User found by the `where` argument doesn't exist, create a new User with this data.
  **/
  create: UserCreateInput
  /**
   * In case the User was found with the provided `where` argument, update it with this data.
  **/
  update: UserUpdateInput
}


/**
 * User delete
 */
export type UserDeleteArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter which User to delete.
  **/
  where: UserWhereUniqueInput
}


/**
 * User deleteMany
 */
export type UserDeleteManyArgs = {
  where?: UserWhereInput
}


/**
 * User without action
 */
export type UserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
}



/**
 * Deep Input Types
 */


export type NestedIntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: NestedIntFilter
}

export type IntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type NestedDateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date | string>
  notIn?: Enumerable<Date | string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: NestedDateTimeFilter
}

export type DateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date | string>
  notIn?: Enumerable<Date | string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeFilter
}

export type NestedDateTimeNullableFilter = {
  equals?: Date | string | null
  in?: Enumerable<Date | string> | null
  notIn?: Enumerable<Date | string> | null
  lt?: Date | string | null
  lte?: Date | string | null
  gt?: Date | string | null
  gte?: Date | string | null
  not?: NestedDateTimeNullableFilter
}

export type DateTimeNullableFilter = {
  equals?: Date | string | null
  in?: Enumerable<Date | string> | null
  notIn?: Enumerable<Date | string> | null
  lt?: Date | string | null
  lte?: Date | string | null
  gt?: Date | string | null
  gte?: Date | string | null
  not?: Date | string | NestedDateTimeNullableFilter | null
}

export type NestedBoolFilter = {
  equals?: boolean
  not?: NestedBoolFilter
}

export type BoolFilter = {
  equals?: boolean
  not?: boolean | NestedBoolFilter
}

export type NestedStringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: NestedStringFilter
}

export type StringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  mode?: QueryMode
  not?: string | NestedStringFilter
}

export type RecordListRelationFilter = {
  every?: RecordWhereInput
  some?: RecordWhereInput
  none?: RecordWhereInput
}

export type UserWhereInput = {
  AND?: Enumerable<UserWhereInput>
  OR?: Array<UserWhereInput>
  NOT?: Enumerable<UserWhereInput>
  createdAt?: Date | string | DateTimeFilter
  email?: string | StringFilter
  id?: number | IntFilter
  password?: string | StringFilter
  record?: RecordListRelationFilter
}

export type UserRelationFilter = {
  is?: UserWhereInput | null
  isNot?: UserWhereInput | null
}

export type RecordWhereInput = {
  AND?: Enumerable<RecordWhereInput>
  OR?: Array<RecordWhereInput>
  NOT?: Enumerable<RecordWhereInput>
  authorId?: number | IntFilter
  createdAt?: Date | string | DateTimeFilter
  customdate?: Date | string | DateTimeNullableFilter | null
  id?: number | IntFilter
  isOnSale?: boolean | BoolFilter
  location?: string | StringFilter
  price?: string | StringFilter
  product?: string | StringFilter
  quantity?: string | StringFilter
  unit?: string | StringFilter
  user?: UserWhereInput | null
}

export type RecordOrderByInput = {
  authorId?: SortOrder
  createdAt?: SortOrder
  customdate?: SortOrder
  id?: SortOrder
  isOnSale?: SortOrder
  location?: SortOrder
  price?: SortOrder
  product?: SortOrder
  quantity?: SortOrder
  unit?: SortOrder
}

export type RecordWhereUniqueInput = {
  id?: number
}

export type UserOrderByInput = {
  createdAt?: SortOrder
  email?: SortOrder
  id?: SortOrder
  password?: SortOrder
}

export type UserWhereUniqueInput = {
  email?: string
  id?: number
}

export type UserCreateWithoutRecordInput = {
  createdAt?: Date | string
  email: string
  password: string
}

export type UserCreateOneWithoutRecordInput = {
  create?: UserCreateWithoutRecordInput
  connect?: UserWhereUniqueInput
}

export type RecordCreateInput = {
  createdAt?: Date | string
  customdate?: Date | string | null
  isOnSale?: boolean
  location: string
  price: string
  product: string
  quantity: string
  unit: string
  user: UserCreateOneWithoutRecordInput
}

export type UserUpdateWithoutRecordDataInput = {
  createdAt?: Date | string
  email?: string
  password?: string
}

export type UserUpsertWithoutRecordInput = {
  update: UserUpdateWithoutRecordDataInput
  create: UserCreateWithoutRecordInput
}

export type UserUpdateOneRequiredWithoutRecordInput = {
  create?: UserCreateWithoutRecordInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutRecordDataInput
  upsert?: UserUpsertWithoutRecordInput
}

export type RecordUpdateInput = {
  createdAt?: Date | string
  customdate?: Date | string | null
  isOnSale?: boolean
  location?: string
  price?: string
  product?: string
  quantity?: string
  unit?: string
  user?: UserUpdateOneRequiredWithoutRecordInput
}

export type RecordUpdateManyMutationInput = {
  createdAt?: Date | string
  customdate?: Date | string | null
  isOnSale?: boolean
  location?: string
  price?: string
  product?: string
  quantity?: string
  unit?: string
}

export type RecordCreateWithoutUserInput = {
  createdAt?: Date | string
  customdate?: Date | string | null
  isOnSale?: boolean
  location: string
  price: string
  product: string
  quantity: string
  unit: string
}

export type RecordCreateManyWithoutUserInput = {
  create?: Enumerable<RecordCreateWithoutUserInput>
  connect?: Enumerable<RecordWhereUniqueInput>
}

export type UserCreateInput = {
  createdAt?: Date | string
  email: string
  password: string
  record?: RecordCreateManyWithoutUserInput
}

export type RecordUpdateWithoutUserDataInput = {
  createdAt?: Date | string
  customdate?: Date | string | null
  isOnSale?: boolean
  location?: string
  price?: string
  product?: string
  quantity?: string
  unit?: string
}

export type RecordUpdateWithWhereUniqueWithoutUserInput = {
  where: RecordWhereUniqueInput
  data: RecordUpdateWithoutUserDataInput
}

export type RecordScalarWhereInput = {
  AND?: Enumerable<RecordScalarWhereInput>
  OR?: Array<RecordScalarWhereInput>
  NOT?: Enumerable<RecordScalarWhereInput>
  authorId?: number | IntFilter
  createdAt?: Date | string | DateTimeFilter
  customdate?: Date | string | DateTimeNullableFilter | null
  id?: number | IntFilter
  isOnSale?: boolean | BoolFilter
  location?: string | StringFilter
  price?: string | StringFilter
  product?: string | StringFilter
  quantity?: string | StringFilter
  unit?: string | StringFilter
}

export type RecordUpdateManyDataInput = {
  createdAt?: Date | string
  customdate?: Date | string | null
  isOnSale?: boolean
  location?: string
  price?: string
  product?: string
  quantity?: string
  unit?: string
}

export type RecordUpdateManyWithWhereNestedInput = {
  where: RecordScalarWhereInput
  data: RecordUpdateManyDataInput
}

export type RecordUpsertWithWhereUniqueWithoutUserInput = {
  where: RecordWhereUniqueInput
  update: RecordUpdateWithoutUserDataInput
  create: RecordCreateWithoutUserInput
}

export type RecordUpdateManyWithoutUserInput = {
  create?: Enumerable<RecordCreateWithoutUserInput>
  connect?: Enumerable<RecordWhereUniqueInput>
  set?: Enumerable<RecordWhereUniqueInput>
  disconnect?: Enumerable<RecordWhereUniqueInput>
  delete?: Enumerable<RecordWhereUniqueInput>
  update?: Enumerable<RecordUpdateWithWhereUniqueWithoutUserInput>
  updateMany?: Enumerable<RecordUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<RecordScalarWhereInput>
  upsert?: Enumerable<RecordUpsertWithWhereUniqueWithoutUserInput>
}

export type UserUpdateInput = {
  createdAt?: Date | string
  email?: string
  password?: string
  record?: RecordUpdateManyWithoutUserInput
}

export type UserUpdateManyMutationInput = {
  createdAt?: Date | string
  email?: string
  password?: string
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
