const config = {
  store: 'http://localhost:5000',
  path: 'dummy_data.zarr',
};

const selection = [
  0,
  zarr.slice(0,12),
  null,
];

(async () => {
  const z = await zarr.openArray(config);
  const raw = await z.get(selection);
  console.log(raw);
  console.log(z)

  const t = tf.tensor(raw.flatten(), raw.shape);
  t.print();
  console.log(t.shape)
})();