// types.ts

export type IJSONValue = string | number | boolean | null | IJSONArray | IJSONObject;
export type IJSONArray = Array<IJSONValue>;
export interface IJSONObject {
  [key: string]: IJSONValue;
}
