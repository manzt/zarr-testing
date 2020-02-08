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
  const t2 = tf.tensor((await z.get(selection)).flatten(), raw.shape);
  t2.print();

  console.log('.getRaw')
  const [data, shape] = await z.getRaw(selection);
  const t = tf.tensor(data, shape);
  t.print();
})();