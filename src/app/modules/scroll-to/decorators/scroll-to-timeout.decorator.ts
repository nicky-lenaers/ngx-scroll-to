export function TimeOut(ms: number = 0) {

  return (target: Object, key: string, descriptor: TypedPropertyDescriptor<any>) => {

    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      setTimeout(() => originalMethod.apply(this, args), ms);
    };

    return descriptor;
  };

}
