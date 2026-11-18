export const parseArguments = (args: string[], argCount: number): number[] => {
  if (argCount > 0 && args.length != argCount)
    throw new Error('Invalid Arg-Count')
  const [, , ...nums] = args.map((a) => Number(a))

  if (nums.some((n) => isNaN(n)))
    throw new Error('Provided values were not numbers!')
  return nums
}
