import { Component, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  books: any[];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .query<any>({
        query: gql`
          {
            books {
              title
              authors {
                name
              }
            }
          }
        `
      })
      .subscribe(
        ({ data, loading }) => {
          this.books = data && data.books;
          this.loading = loading;
        },
        error => {
          this.loading = false;
          this.error = error;
        }
      );
  }

  getAuthorNames(authors) {
    if (authors.length > 1)
      return authors.reduce((acc, cur) => acc.name + ", " + cur.name);
    else return authors[0].name;
  }
}
