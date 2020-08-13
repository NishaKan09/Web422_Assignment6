import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPost } from '../BlogPost';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {
  blogPost: BlogPost;
  tags: string;

  private post;

  constructor(private postServ: PostService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
      this.post = this.postServ.getPostbyId(this.route.snapshot.params['id']).subscribe(data => {
      this.blogPost = data; 
      this.tags = data.tags.toString();
    })
  }

  ngOnDestroy() {
    if (this.post) this.post.unsubscribe();
  }

  formSubmit(): void {
    this.blogPost.tags = this.tags.split(',').map(tag => tag.trim());
    this.postServ.updatePostById(this.blogPost._id, this.blogPost).subscribe( () => this.router.navigate(['/admin']));
  }

  
  deletePost(id) {
    this.postServ.deletePostById(id).subscribe( () => this.router.navigate(['/admin']));
  }

}
