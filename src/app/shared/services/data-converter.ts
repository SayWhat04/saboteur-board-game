export interface DataConverter<T, U> {
  convert(data: T): U;
}
