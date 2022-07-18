export const ANON = 'anon';

export abstract class IShape {
  private isDefault: boolean = true;
  private isAnon: boolean = true;
  private name: string = '';
  private title: string = '';

  constructor(title: string) {
    this.title = title;
  }

  abstract calculate(): void;
  abstract defaultName(): string;

  setName(name: string): void {
    this.isDefault = false;
    this.isAnon = false;
    this.name = name;
  }

  getName(): string {
    return this.isDefault ? this.defaultName() : this.name;
  }

  getTitle(): string {
    return this.title;
  }

  isAnonymous(): boolean {
    return this.isAnon;
  }
}
