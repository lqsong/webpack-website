type SuccessFun = (result: any, status: any, xhr: any) => void;

export interface AddDataType {
  firstName: string | number | string[] | undefined;
  lastName: string | number | string[] | undefined;
  email: string | number | string[] | undefined;
  content: string | number | string[] | undefined;
}
