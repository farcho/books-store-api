/**
 * BookDetail Interface.
 */
interface BookDetail {
  id?: number;
  name: string;
  author: string;
  price: number;
  keywords: string;
  download_link: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default BookDetail;
