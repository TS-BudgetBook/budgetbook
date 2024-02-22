import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {
  private modals: any[] = [];

  add(modal: any) {
    this.modals.push(modal);
  }
}
