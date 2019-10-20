import axios, { AxiosResponse } from 'axios';
import { User, UserProps } from './User';
import { Eventing } from './Eventing';

export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(public rootUrl: string, public deserialize: (json: K) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((response: AxiosResponse) => {
      for (const value of response.data) {
        // const user = T.buildUser(value as K);
        this.models.push(this.deserialize(value as K));
      }
    });

    this.trigger('change');
  }
}
