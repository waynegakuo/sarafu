import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private snackBar: MatSnackBar = inject(MatSnackBar);

  showSnackbar(
    message: string,
    action: string = 'OK',
    duration: number = 3500
  ) {
    // Show snackbar...
    return this.snackBar.open(message, action, {
      duration,
    });
  }
}
