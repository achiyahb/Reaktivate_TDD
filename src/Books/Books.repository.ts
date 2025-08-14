import ApiGateway from "../Shared/ApiGateway";

interface Book {
  author: string;
  name: string;
}

interface BookAddResponse {
  status: string;
}

class BooksRepository {
  private httpGateway: ApiGateway;

  constructor() {
    this.httpGateway = new ApiGateway();
  }

  getBooks = async (): Promise<Book[]> => {
    const booksDto = await this.httpGateway.get<Book[]>("/");
    return booksDto;
  };

  addBook = async ({ name, author }: Book): Promise<boolean> => {
    const bookAddDto = await this.httpGateway.post<BookAddResponse>("/books", {
      name,
      author,
    });
    return bookAddDto && bookAddDto.status === "ok" ? true : false;
  };
}

const booksRepository = new BooksRepository();
export default booksRepository;
