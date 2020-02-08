const config = {
  store: 'http://localhost:5000',
  path: 'dummy_data.zarr',
};

const selection = [
  null, zarr.slice(3,6), null
];

(async () => {
  const z = await zarr.openArray(config);

  console.log('.get')
  const nestedArray = await z.get(selection);
  const t = tf.tensor(nestedArray.flatten(), nestedArray.shape);
  t.print();

  console.log('.getRaw')
  const { data, shape } = await z.getRaw(selection);
  const t2 = tf.tensor(data, shape);
  console.log(data)
  t2.print();
})();