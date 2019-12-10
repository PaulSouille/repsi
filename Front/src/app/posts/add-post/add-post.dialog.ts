import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PostData } from '../posts';
import { ReactiveFormsModule, Form, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';



/**
 * @title Dialog Overview
 */
@Component({
  selector: 'add-post-dialog',
  templateUrl: 'add-post.dialog.html',
  styleUrls:['add-post.dialog.css']
})
export class AddPostDialog {
  options: FormGroup;
  postForm = new FormGroup({
    name: new FormControl(),
    content: new FormControl(),
    statut: new FormControl(),
    topic: new FormControl()
  });
  
  constructor(
    public dialogRef: MatDialogRef<AddPostDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PostData,
    private formBuilder: FormBuilder) {
      this.options = formBuilder.group({
        hideRequired: false,
        floatLabel: 'auto',
      });

    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addPost(){
    
    console.log(this.postForm.value);
  }

}