import ApiGateway from "../Shared/ApiGateway";
import { Book } from "./Book.interface";

interface BookAddResponse {
  status: string;
}

class BooksRepository {
  private httpGateway: ApiGateway;

  constructor() {
    this.httpGateway = new ApiGateway();
  }

  getBooks = async (ownerId = "achiya"): Promise<Book[]> => {
    const booksDto = await this.httpGateway.get<Book[]>(`/books/${ownerId}`);
    return booksDto;
  };

  addBook = async ({
    name,
    author,
    ownerId,
    isPrivate,
  }: Book): Promise<boolean> => {
    const bookAddDto = await this.httpGateway.post<BookAddResponse>(
      `/books/${ownerId}`,
      {
        name,
        author,
        isPrivate,
      }
    );
    return bookAddDto && bookAddDto.status === "ok" ? true : false;
  };

  getPrivateBooks = async (ownerId = "achiya"): Promise<Book[]> => {
    const booksDto = await this.httpGateway.get<Book[]>(
      `/books/${ownerId}/private`
    );
    return booksDto;
  };
}

const booksRepository = new BooksRepository();
export default booksRepository;
