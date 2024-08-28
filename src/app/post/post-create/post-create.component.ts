import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent implements OnInit {
  enteredContent = '';
  enteredTitle = '';
  mode = 'create';
  private postId: any;
 post: any;

  constructor(public postservice: PostService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this.postservice.getPost(this.postId);
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    }); 
  }


 onAddPost(form: NgForm){
  if(form.invalid){
  return;
  }
  if (this.mode === 'create'){
    this.postservice.addPost(form.value.title,form.value.content);
  }else{
    this.postservice.updatePost(this.postId ,form.value.title,form.value.content);
  }
  form.resetForm();
}
}
