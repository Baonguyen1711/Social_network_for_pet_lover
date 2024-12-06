export function formatDate(input: Date | string): string {
    // Nếu input là chuỗi, chuyển nó thành đối tượng Date
    const date = typeof input === "string" ? new Date(input) : input;

    const day = date.getDate().toString().padStart(2, '0'); // Ngày với hai chữ số
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng với hai chữ số (tháng bắt đầu từ 0)
    const year = date.getFullYear(); // Lấy năm

    return `${day}-${month}-${year}`;
}
export const getTimeAgo = (dateInput: Date): string => {
    const inputDate = new Date(dateInput);
    const currentDate = new Date();
    const diffInSeconds = Math.floor(
      (currentDate.getTime() - inputDate.getTime()) / 1000
    );

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minutes ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} days ago`;
    }
  };
  