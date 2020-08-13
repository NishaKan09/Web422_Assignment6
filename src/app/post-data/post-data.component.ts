import { Component, OnInit, OnDestroy} from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css']
})
export class PostDataComponent implements OnInit, OnDestroy {
  post: BlogPost;
  querySub: any;
  commentName: string;
  commentText: string;
  
  constructor(private route: ActivatedRoute, private postServ: PostService) { }

  ngOnInit() {
    this.querySub = this.route.params.subscribe(params =>{
      this.postServ.getPostbyId(params['id']).subscribe(data => { 
        this.post = data;
        this.post.views++,
        this.postServ.updatePostById(this.post._id, this.post).subscribe();
      });
    });
  }

  ngOnDestroy() {
    if (this.querySub){ 
      this.querySub.unsubscribe(); 
    }
  }

  submitComment(): void {
    this.post.comments.push({ 
      author: this.commentName,
      comment: this.commentText,
      date: new Date().toLocaleDateString()
    });

    this.postServ.updatePostById(this.post._id, this.post).subscribe( () => {
      this.commentName = '';
      this.commentText = '';
    })
  }

}
