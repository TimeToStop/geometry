import { Subject } from "rxjs";

export class GeoEvents<T> {
  private readonly event: Subject<T> = new Subject<T>();

  emit(data: T): void {
    this.event.next(data);
  }

  subscribe(callback: (data: T) => void): () => void {
    const subscription = this.event.subscribe((data: T) => callback(data));

    return () => subscription.unsubscribe();
  }
}
