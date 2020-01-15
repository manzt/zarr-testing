const zarrConfig = {
  store:
    'https://gist.githubusercontent.com/manzt/' +
    'd16dbac0ea3adc3c7b9b61f54fa1f78d/raw/',
  path: '95854058512862accb0182d4a02f86a55ad19139',
  mode: 'r',
}; // (3, 5000, 5000) array

const sliceSelection = [
  zarr.slice(0, 3),
  zarr.slice(0, 2500),
  zarr.slice(0, 2500),
];

function calculateStats(arr) {
  const n = arr.length;
  const mean = arr.reduce((a, b) => a + b) / n;
  const sd = Math.sqrt(
    arr.map(x => (x - mean) ** 2).reduce((a, b) => a + b) / n
  );
  return [mean, sd];
}

function parseSelection(selection) {
  return selection.map(el => `(${el.start}, ${el.stop})`);
}

async function timeIndexing(store, selection, config) {
  const t0 = performance.now();
  await store.get(selection, config);
  const t1 = performance.now();
  return t1 - t0;
}

function initProgressBar(container) {
  const line = new ProgressBar.Line(container, {
    color: '#333',
    trailColor: '#bbb',
    strokeWidth: 1,
    duration: 50,
  });
  line.set(0);
  return line;
}

async function time(store, selection, iters) {
  const times = [];
  const bars = Array(iters)
    .fill()
    .map((_, i) => initProgressBar(`#container`));

  for (const [i, bar] of bars.entries()) {
    const animateThrottled = _.throttle(_.bind(bar.animate, bar), 500);

    const config = {
      concurrencyLimit: 25,
      progressCallback: ({ progress, queueSize }) => {
        animateThrottled(progress / queueSize);
      },
    };

    const id = `indexing [${parseSelection(selection)}] (${i} of ${iters})`;
    console.time(id);
    times.push(await timeIndexing(store, selection, config));
    console.timeEnd(id);

    bar.set(1);
    bar.path.setAttribute('stroke', '#4cbb17');
  }
  const [mean, sd] = calculateStats(times);
  console.log(`mean time ${mean}ms, sd ${sd}ms`);
}

async function main() {
  const z = await zarr.openArray(zarrConfig);
  time(z, sliceSelection, 5);
}

main();
