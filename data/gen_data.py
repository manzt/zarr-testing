import numpy as np
from numcodecs import Zlib
import zarr

if __name__ == "__main__":
    arr = np.arange(3 * 12 * 6).reshape(3, 12, 6)

    z = zarr.open(
        "dummy_data.zarr",
        mode="w",
        shape=arr.shape,
        compressor=Zlib(level=1),
        chunks=(3, 3, 3),
        dtype="<i4",
    )

    z[:, :, :] = arr
