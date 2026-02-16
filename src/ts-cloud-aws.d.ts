declare module '@stacksjs/ts-cloud/aws' {
  export class S3Client {
    constructor(region: string)
    getObject(bucket: string, key: string): Promise<string>
    putObject(options: {
      bucket: string
      key: string
      body: string | Buffer | Uint8Array
      contentType?: string
    }): Promise<void>
    headObject(bucket: string, key: string): Promise<unknown>
    listObjects(bucket: string, prefix: string): Promise<unknown[]>
    deleteObject(bucket: string, key: string): Promise<void>
  }
}
