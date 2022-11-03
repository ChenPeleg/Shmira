export {};
type trueWithDescriptionArgs =
  | {
      messageOnFail: "";
      explainMsg: (var1: any, var2: any) => string;
    }
  | string;
declare global {
  namespace jest {
    interface Matchers<R> {
      toBePowerOf(received: any, power: any): CustomMatcherResult;
      eq(received: any, message: any): R;
    }
  }
}
