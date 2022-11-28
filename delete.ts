// @ts-check

/**
 * @name PromiseRunner
 * @description  execute in parallel promises by chunks
 * @type <ReturnType> : the type of data to be returned
 * @param arrayPromises : the array of promises to execute
 * @param chunks : the value of chunks
 * @returns : an array of returnType
 */
const PromiseRunner: <ReturnType>(
  arrayPromises: Array<() => Promise<ReturnType>>,
  chunks: number
) => Promise<ReturnType[]> = async (arrayPromises, chunks) => {
  const arr = [];
  for (const p of arrayPromises) {
    const res = await p().then((r) => r);
    arr.push(res);
  }
  return arr;
};
/**
 * @type <ReturnType> : the type of data to be returned
 */
const runner: typeof PromiseRunner = async (arrayPromises, chunks) => {
  return [];
};

const runPromisesInParallelChunks: typeof PromiseRunner = async <ReturnType>(
  arrayPromises: Array<() => Promise<ReturnType>>,
  chunks: number
): Promise<ReturnType[]> => {
  const result: ReturnType[] = [];
  let resu: ReturnType[] = [];
  let cnt: number = 0;

  async function delayExecution(number: number) {
    return number;
  }

  const chain = async (
    shrinkArray: Array<() => Promise<ReturnType>>
  ): Promise<ReturnType> => {
    if (!shrinkArray.length) {
      return new Promise<ReturnType>((resolve) => Promise.resolve());
    }
    // console.log(shrinkArray.length);
    const i: number = cnt++;
    const res: ReturnType = await shrinkArray.shift()!();
    await delayExecution(100);
    // SAVE RESULT OF THE EXECUTION OF THE FUNCTION
    result[i] = res;
    return chain(shrinkArray);
  };
  const arrChains: Array<Promise<ReturnType>> = [];
  while (chunks-- > 0 && arrayPromises.length > 0) {
    arrChains.push(chain(arrayPromises));
  }
  // RESULT IS AN ARRAY OF THE RESULT OF EACH PROMISE
  resu = await Promise.all(arrChains).then(() => result);

  return resu;
};
export const d = runPromisesInParallelChunks([], 1);
