export { };
declare global {
    namespace jest {
        interface Matchers<R> {
            toBePowerOf(received: any, power: any): CustomMatcherResult;
        }
    }
}