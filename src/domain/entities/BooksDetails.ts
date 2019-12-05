/**
 * BookDetail Interface.
 */
interface BookDetail {
  id?: number;
  name: string;
  author: string;
  price: number;
  keywords: string;
  downloadLink: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default BookDetail;
