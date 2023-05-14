type Event<T = void> = (args: T) => void;

export const makeEvent = <T = void>() => {
  let events: Event<T>[] = [];
  let oneTimeEvents: Event<T>[] = [];

  return {
    on(event: Event<T>) {
      events.push(event);
    },
    once(event: Event<T>) {
      oneTimeEvents.push(event);
    },
    off(event: Event<T>) {
      events = events.filter((e) => e !== event);
      if (oneTimeEvents.length) {
        oneTimeEvents = oneTimeEvents.filter((e) => e !== event);
      }
    },
    emit(data: T) {
      events.forEach((e) => e(data));
      oneTimeEvents = [];
    },
  };
};