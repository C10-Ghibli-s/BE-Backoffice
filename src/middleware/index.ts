export function errorHandler(error: unknown) {
  console.error(error);
  throw new Error('Faild in the operation in the server.');
}
