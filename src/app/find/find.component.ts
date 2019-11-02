import { Component, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

@Component({
  selector: "app-find",
  templateUrl: "./find.component.html",
  styleUrls: ["./find.component.css"]
})
export class FindComponent {
  bookId: string;
  book: any = {};
  loading = false;
  error: string;
  constructor(private apollo: Apollo) {}

  getAuthorNames(authors) {
    if (authors && authors.length > 1)
      return authors.reduce((acc, cur) => acc.name + ", " + cur.name);
    else if (authors && authors.length == 0) return authors[0].name;
  }

  findBook() {
    this.error = "";
    this.loading = true;
    this.apollo
      .query<any>({
        query: gql`
          query($id: ID!) {
            book(id: $id) {
              title
              pages
              chapters
              authors {
                name
              }
            }
          }
        `,
        variables: {
          id: this.bookId
        }
      })
      .subscribe(({ data, loading }) => {
        if (data.book) this.book = data.book;
        else this.error = "Book does not exits";
        this.loading = loading;
      });
  }
}
