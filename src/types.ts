export interface Asset {
  ID: string;
  Color: string;
  Size: string;
  Owner: string;
  AppraisedValue: string;
}
export interface querySelector {
  Name?: string;
  Owner?: string;
  Value?: number;
  Artist?: string;
}
export interface queryString {
  selector: querySelector;
}
