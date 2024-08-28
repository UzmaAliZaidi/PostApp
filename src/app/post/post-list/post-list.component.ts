import { Component, Input, input, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit , OnDestroy {
    /*posts = [
      {title: 'FIrst Post', content: 'this is the first post'},
      {title: 'Second Post', content: 'this is the second post'},
      {title: 'Third post', content: 'this is the third post'}
    ];*/
  posts : Post[]= [];
 private postsSub : Subscription| undefined;;

   constructor(public postService : PostService){}
   ngOnInit(){
     this.postService.getPosts();
     this.postsSub = this.postService.getPostUpdateListener()
     .subscribe((posts:Post[]) => {
      this.posts = posts;
     });
   }

   onDelete(postId:string){
    this.postService.deletePost(postId);
   }

   ngOnDestroy() {
    if (this.postsSub) {
      this.postsSub.unsubscribe();
    }
  }
}
