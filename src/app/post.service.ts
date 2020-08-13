import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { BlogPost } from './BlogPost';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  perPage = 6;

  constructor(private http: HttpClient) {}

  getPosts(page, tag, category): Observable<Array<BlogPost>>{ 
    if(tag != undefined && tag != null && category != undefined && category != null){
      return this.http.get<BlogPost[]>('https://afternoon-gorge-07051.herokuapp.com/api/posts?page=' + page +'&perPage=' + this.perPage + '&tag=' + tag + '&category=' + category);
    }
    else if(tag != undefined && tag != null){ 
      return this.http.get<BlogPost[]>('https://afternoon-gorge-07051.herokuapp.com/api/posts?page=' + page +'&perPage=' + this.perPage  + '&tag=' + tag);
    }
    else if(category != undefined && category != null){ 
      return this.http.get<BlogPost[]>('https://afternoon-gorge-07051.herokuapp.com/api/posts?page=' + page +'&perPage=' + this.perPage + '&category=' + category);
    }
    else{
      return this.http.get<BlogPost[]>('https://afternoon-gorge-07051.herokuapp.com/api/posts?page=' + page +'&perPage=' + this.perPage);
    }
  }

  getPostbyId(id): Observable<BlogPost>{
    return this.http.get<BlogPost>('https://afternoon-gorge-07051.herokuapp.com/api/posts/' + id);
  }

  getCategories(): Observable<any>{
    return this.http.get<any>('https://afternoon-gorge-07051.herokuapp.com/api/categories'); 
  }

  getTags(): Observable<string[]>{
    return this.http.get<string[]>('https://afternoon-gorge-07051.herokuapp.com/api/tags');
  }

  getAllPosts():Observable<BlogPost[]>{
    const perPage = Number.MAX_SAFE_INTEGER.toString();

    let params = {
      page: "1",
      perPage: perPage
    }

    return this.http.get<BlogPost[]>('https://afternoon-gorge-07051.herokuapp.com/api/posts', { params });
  }

  newPost(data: BlogPost): Observable<any>{
    return this.http.post<any>('https://afternoon-gorge-07051.herokuapp.com/api/posts', data);
  }

  updatePostById(id: string, data: BlogPost): Observable<any>{
    return this.http.put<any>(`https://afternoon-gorge-07051.herokuapp.com/api/posts/${id}`, data);
  }

  deletePostById(id: string): Observable<any>{
    return this.http.delete<any>(`https://afternoon-gorge-07051.herokuapp.com/api/posts/${id}`);
  }
}
