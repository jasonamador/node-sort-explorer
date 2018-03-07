/*
random array generators object
*/
let generators = {
  strings : (size, min = 3, max = 8) =>
    Array.apply(null, {length: size}).map(e =>
      Array.apply(null, {length: Math.floor(Math.random() * (max - min)) + min}).map(s => String.fromCodePoint(Math.floor(Math.random() * 26) + 65)
    ).join('')
    ),
  integers : (size=10, min=0, max=50) =>
    Array.apply(null, {length: size}).map(e => Math.floor(Math.random() * (max - min)) + Math.floor(min))
};

/*
helpers
*/
function swap(arr, first, second) {
  if (arr[first] && arr[second]) {
    let tmp = arr[first];
    arr[first] = arr[second];
    arr[second] = tmp;
  }
}

function merge(arr1, arr2) {
  console.log('merging', arr1, arr2)
  let newArr = [];
  let idx1 = idx2 = 0;
  while (idx1 < arr1.length && idx2 < arr2.length) {
    if (arr1[idx1] < arr2[idx2]) {
      newArr.push(arr1[idx1]);
      console.log('pushing', arr1[idx1], 'to new array')
      idx1++;
    } else {
      newArr.push(arr2[idx2]);
      console.log('pushing', arr2[idx2], 'to new array')
      idx2++;
    }
  }
  console.log('made', newArr, '+ arr1 sliced at', idx1, arr1.slice(idx1), 'and arr2 sliced at', idx2, arr2.slice(idx2));
  return newArr.concat(arr1.slice(idx1)).concat(arr2.slice(idx2));
}

function partition(arr, left, right) {
  console.log('partitioning', arr, 'on', left, 'and', right);
  let pivot = arr[Math.floor((right + left) / 2)];
  while (left <= right) {
    console.log(left, '<=', right);
    while (arr[left] < pivot) {
      console.log(arr[left], '<', pivot, 'so left index++');
      left++;
    }
    while (arr[right] > pivot) {
      console.log(arr[right], '>', pivot, 'so right index--');
      right--;
    }
    if (left <= right) {
      console.log(left, '<=', right, 'so swap them');
      swap(arr, left, right);
      left++;
      right--;
      console.log('and increment left index to', left, 'and decrement right to', right);
    }
  }
  console.log('return left index:', left);
  return left;
}

/*
algorithms
*/
let sorts = {
  selection : (arr) => {
    console.log('Selection sort with', arr.length, 'strings');
    let start = process.hrtime();
    let minIdx;
    let swaps = 0;
    let iterations = 0;
    for (let i = 0; i < arr.length; i++) {
      minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[minIdx] > arr[j]) {
          minIdx = j;
          swaps++;
        }
        iterations++;
      }
      swap(arr, i, minIdx);
    }
    console.log('swaps: ', swaps);
    console.log('iterations: ', iterations)
    console.log('time (ms): ', process.hrtime(start)[1] / 1000000);
    return arr;
  },
  bubble : (arr) => {
    console.log('Bubble sort with', arr.length, 'strings');
    let start = process.hrtime();
    let swaps = 0;
    let iterations = 0;
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] > arr[j]) {
  				swap(arr, i, j);
          swaps++;
        }
        iterations++;
      }
    }
    console.log('swaps: ', swaps);
    console.log('iterations: ', iterations)
    console.log('time (ms): ', process.hrtime(start)[1] / 1000000);
    return arr;
  },
  merge : (arr) => {
    console.log('merge sort', arr);
    if (arr.length < 2) {
      return arr;
    }
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(sorts.merge(left), sorts.merge(right));
  },
  quick : (arr, left = 0, right = arr.length - 1) => {
    console.log('quicksort on', arr, 'with left', left, 'right', right);
    let index;
    if (arr.length > 1) {
      console.log('arr is bigger than 1, so:');
      index = partition(arr, left, right);
      if (left < index - 1) {
        console.log('left index', left, '< index - 1 (', index-1, ')');
        sorts.quick(arr, left, index - 1);
      }
      if (index < right) {
        console.log('right index', right, '> index - 1 (', index-1, ')');
        sorts.quick(arr, index, right);
      }
    }
    return arr;
  }
};

/*
get the CLI params and do the thing they want
*/
let count = process.argv[2] || 100;
let type = process.argv[3] || 'integers';
let sort = process.argv[4] || 'bubble';
console.log(sorts[sort](generators[type](count)));
