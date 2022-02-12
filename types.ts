export interface Author {
    author (
      name: string,
      bio: string,
      photo: PhotoURL,
      url: string,
    ) : object;
    name: string;
    photo: PhotoURL;
    bio: string;
    url: string;
  }

  export interface Categories {
    category (
      slug: string,
      name: string,
    ) : Array<object>;
    slug: string;
    name: string;
  }

 export interface Comments {
    comments (
      name: string,
      createdAt: string,
      comment: string,
    ) : Array<object>;
    slug: string;
    name: string;
    createdAt: string,
    comment: string,
  }

  export interface CommentsForm {
    name: string;
    email: string,
    comment: string,
    slug: string;
  }

  export interface PhotoURL {
      photo(
          url: string,
      ): object;
      url: string
  }

  export interface Post {
    post (
      bio: string,
      featuredImage: object,
      url: string,
      slug: string,
      createdAt: string,
      title: string,
      excerpt: string

    ) : object;
    author: Author;
    featuredImage: PhotoURL,
    slug: string,
    createdAt: string,
    title: string,
    excerpt: string
  }