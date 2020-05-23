export default () => {
  const { env } = process;

  return {
    port: env.PORT,
    mode: env.NODE_ENV,
  };
};
