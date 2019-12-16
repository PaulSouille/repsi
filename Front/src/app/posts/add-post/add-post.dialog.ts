import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PostData } from '../posts';
import { ReactiveFormsModule, Form, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { formatDate } from '@angular/common';
import { PostsService } from '../posts.service';



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
    state: new FormControl(),
    topic: new FormControl()
  });
  
  constructor(
    public dialogRef: MatDialogRef<AddPostDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PostData,
    private formBuilder: FormBuilder,
    private postsService: PostsService) {
      this.options = formBuilder.group({
        hideRequired: false,
        floatLabel: 'auto',
      });

    }  

  onNoClick(): void {
    this.dialogRef.close();
  }

  addPost(){

    const new_post:PostData = {
      content: this.postForm.value.content,
      creation_date: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      creator: localStorage.getItem('userId'),
      state: this.postForm.value.state,
      topic: this.postForm.value.topic,
      name: this.postForm.value.name

    }
    this.postsService.addPost(new_post);
    this.postForm.reset();
    this.onNoClick();
    

  }

}