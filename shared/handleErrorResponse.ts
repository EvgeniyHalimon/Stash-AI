export const handleErrorResponse = async (res: Response) => {
  const errorBody = await res.json().catch(() => ({}));
  throw new Error(errorBody.error.message);
};
