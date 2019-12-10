import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PostData } from '../posts';



/**
 * @title Dialog Overview
 */
@Component({
  selector: 'add-post-dialog',
  templateUrl: 'add-post.dialog.html',
  styleUrls:['add-post.dialog.css']
})
export class AddPostDialog {

  constructor(
    public dialogRef: MatDialogRef<AddPostDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PostData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}