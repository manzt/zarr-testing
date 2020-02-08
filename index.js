const config = {
  store: 'http://localhost:5000',
  path: 'dummy_data.zarr',
};

const selection = [
  0,
  null,
  zarr.slice(1,3)
];

(async () => {
  const z = await zarr.openArray(config);

  console.log('.get')
  const nestedArray = await z.get(selection);
  const t = tf.tensor(nestedArray.flatten(), nestedArray.shape);
  t.print();

  console.log('.getRaw')
  const [data, shape] = await z.getRaw(selection);
  const t2 = tf.tensor(data, shape);
  t2.print();
})();