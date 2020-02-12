const config = {
  store: 'http://localhost:5000',
  path: 'dummy_data.zarr',
};

const selection = [
  2, zarr.slice(4,12,2), zarr.slice(3,6)
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
  t2.print();

  const div = document.getElementById("main");

  const text = document.createTextNode(`
  flatten nested: [${nestedArray.flatten()}]
  \n
  typed array: [${data}]`
  );
  div.appendChild(text);

  console.log(
    `Arrays are identical: ${JSON.stringify(nestedArray.flatten()) === JSON.stringify(data)}`
  );
})();