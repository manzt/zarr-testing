import numpy as np
from numcodecs import Zlib
import zarr

if __name__ == "__main__":
    arr = np.arange(3 * 20 * 10).reshape(3, 20, 10)

    z = zarr.open(
        "dummy_data.zarr",
        mode="w",
        shape=arr.shape,
        compressor=Zlib(level=1),
        chunks=(1, 10, 5),
        dtype="<i4",
    )

    z[:, :, :] = arr