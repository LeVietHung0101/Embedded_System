---
title: Storage units
parent: Memory
nav_order: 2
---

<h1>Storage units</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

# Đơn vị Bộ nhớ và Lưu trữ của Máy tính (Computer Memory and Storage Units)

Bộ xử lý của máy tính được cấu tạo từ nhiều mạch điện tử có thể ở một trong hai trạng thái: **OFF** hoặc **ON**. Hai trạng thái này được biểu diễn dưới dạng nhị phân là **0** và **1**, được gọi là **bit** (*Binary Digit*).

Một nhóm gồm **8 bit** được gọi là **1 byte (Byte)**. Một byte có thể biểu diễn các giá trị từ **00000000** đến **11111111**, tạo ra tổng cộng **256 tổ hợp khác nhau**.

Máy tính sử dụng các byte để lưu trữ và biểu diễn mọi loại thông tin, bao gồm ký tự, số và ký hiệu. Nhiều byte cũng có thể được kết hợp với nhau để biểu diễn các giá trị lớn hơn và các dạng dữ liệu phức tạp hơn.

Dung lượng bộ nhớ thường được đo bằng các đơn vị như **Kilobyte (KB)** và **Megabyte (MB)**. Một **Kilobyte (KB)** bằng **1024 byte**, và một **Megabyte (MB)** bằng **1.048.576 byte** (1024 × 1024 byte), vì máy tính hoạt động dựa trên hệ đếm nhị phân.

Cả **RAM (bộ nhớ chính)** và **bộ nhớ lưu trữ trên đĩa (disk storage)** đều được đo bằng các đơn vị này, nhưng chúng phục vụ những mục đích khác nhau. **RAM** được sử dụng để xử lý và lưu trữ dữ liệu tạm thời trong khi chương trình đang chạy, còn **bộ nhớ lưu trữ trên đĩa** được dùng để lưu giữ lâu dài các tệp tin, ứng dụng và những thông tin khác.

---

# Basic Units of Data Storage

---

## Bit

Bit là đơn vị bộ nhớ nhỏ nhất trong máy tính. Một bit chỉ có thể nhận một trong hai giá trị là 0 hoặc 1, đại diện cho hệ nhị phân mà tất cả các máy tính đều sử dụng. Hệ nhị phân này là nền tảng của mọi dữ liệu số.

---

## Nibble

Nibble gồm 4 bit, tức bằng một nửa của một byte. Nibble đôi khi được sử dụng trong lĩnh vực máy tính, mặc dù không phổ biến bằng byte. Một nibble cũng có thể được biểu diễn bằng một chữ số trong hệ thập lục phân (hexadecimal).

Đơn vị này thường được sử dụng trong ngữ cảnh biểu diễn số ở hệ thập lục phân (hexadecimal), bởi vì:
- Một nibble có thể biểu diễn 16 giá trị khác nhau (từ 0 đến 15).
- Một chữ số hexadecimal cũng có 16 giá trị khả dĩ (0–9 và A–F).

---

## Byte

Trong lịch sử, byte là số lượng bit được sử dụng để mã hóa một ký tự văn bản trong máy tính, và số lượng này phụ thuộc vào kiến trúc phần cứng của từng hệ thống. Tuy nhiên, ngày nay byte gần như luôn được hiểu là 8 bit (hay còn gọi là octet). Hầu hết các máy tính và thiết bị ngoại vi hiện đại được thiết kế để xử lý dữ liệu theo từng byte hoặc nhóm byte, thay vì xử lý từng bit riêng lẻ.

Một byte 8 bit có thể biểu diễn 256 giá trị khác nhau, ví dụ:
- Các số nguyên không âm từ 0 đến 255.
- Hoặc các số nguyên có dấu từ −128 đến 127.

---

## Word

Máy tính thường xử lý các bit theo từng nhóm có kích thước cố định, được gọi theo quy ước là word.

Số lượng bit trong một word thường được xác định bởi:
- Kích thước của các thanh ghi (register) trong CPU, hoặc
- Số lượng bit dữ liệu được đọc từ bộ nhớ chính (main memory) trong một lần truy cập.

Ví dụ:
- Trong kiến trúc x86-32 (tên chính thức là IA-32), một word = 32 bit.
- Tuy nhiên, trong các kiến trúc máy tính khác nhau, cả trong quá khứ lẫn hiện tại, kích thước word có thể là: 4, 8, 16, 24, 32, 64, 72 bit; hoặc nhiều kích thước khác như 9, 12, 18, 36, 48 bit, ...

> <i>Kích thước của word không phải là một giá trị cố định mà phụ thuộc vào kiến trúc phần cứng.</i>

---

## Double Word (DWord) và Quad Word (QWord)

Một số lệnh máy (machine instruction) và định dạng dữ liệu sử dụng nhiều word kết hợp lại:


<table class="hover-table">
  <thead>
    <tr>
      <th>Đơn vị</th>
      <th>Số lượng Word</th>
      <th>Ví dụ trong hệ thống 32 bit</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Word</td>
      <td>1 Word</td>
      <td>32 bit</td>
    </tr>
    <tr>
      <td>Double Word (DWord)</td>
      <td>2 Word</td>
      <td>64 bit</td>
    </tr>
    <tr>
      <td>Quad Word (QWord)</td>
      <td>4 Word</td>
      <td>128 bit</td>
    </tr>
  </tbody>
</table>

---

## Block

Bộ nhớ đệm (cache memory) của máy tính thường hoạt động trên các khối dữ liệu (blocks) thay vì từng word riêng lẻ. Một block gồm nhiều word liên tiếp trong bộ nhớ, và là đơn vị dữ liệu được truyền giữa RAM và cache.

Các block thường được gọi là *Cache Block* hoặc *Cache Line*. Ví dụ: Nếu 1 Word = 4 byte và 1 Cache Line = 64 byte thì 1 Cache Line = 16 Word.

Khi CPU cần đọc một địa chỉ bộ nhớ, toàn bộ cache line thường sẽ được nạp vào cache thay vì chỉ một word duy nhất.

---

## Page

Trong các hệ thống sử dụng bộ nhớ ảo (Virtual Memory), bộ nhớ chính được chia thành các đơn vị lớn hơn gọi là page (trang bộ nhớ). 

> <i>Page là đơn vị cơ bản để hệ điều hành quản lý bộ nhớ ảo.</i>

Một page chứa nhiều block hoặc nhiều word. Dữ liệu được trao đổi giữa RAM và bộ nhớ lưu trữ (SSD/HDD) theo từng page.

Ví dụ kích thước page phổ biến:
<table class="hover-table">
  <thead>
    <tr>
      <th>Hệ thống</th>
      <th>Kích thước Page</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Windows</td>
      <td>4 KB</td>
    </tr>
    <tr>
      <td>Linux</td>
      <td>4 KB</td>
    </tr>
    <tr>
      <td>Một số hệ thống hiệu năng cao</td>
      <td>2 MB, 1 GB (Huge Page)</td>
    </tr>
  </tbody>
</table>

---

# Larger Units of Data Storage

Trong hệ thống lưu trữ dữ liệu, việc sử dụng các **multiplicative prefixes** (tiền tố nhân) là cần thiết để mô tả các mức độ dung lượng từ cực nhỏ đến cực lớn. Các đơn vị này không chỉ giúp quản lý thông tin hiệu quả mà còn hỗ trợ việc đo lường khả năng lưu trữ của thiết bị và thông lượng của kênh truyền thông.

Về mặt kỹ thuật, có hai hệ thống tiền tố (prefixes) được sử dụng để định nghĩa các đơn vị lưu trữ lớn hơn Byte:

1.  **Hệ thập phân (Tiền tố SI):** Dựa trên lũy thừa của 10 ($10^3 = 1.000$). Đây là tiêu chuẩn đo lường quốc tế, ví dụ: 1 Kilobyte (KB) = 1.000 Bytes.
2.  **Hệ nhị phân (Tiền tố IEC):** Dựa trên lũy thừa của 2 ($2^{10} = 1.024$). Để tránh nhầm lẫn với hệ thập phân, các thuật ngữ như **Kibibyte (KiB)**, **Mebibyte (MiB)** đã được giới thiệu. 1 Kibibyte (KiB) chính xác là 1.024 Bytes.

Mặc dù có sự phân biệt rõ ràng về mặt tiêu chuẩn, trong thực tế và văn hóa quốc tế, các thuật ngữ hệ thập phân (KB, MB, GB...) thường được dùng **thay thế hoặc đồng nghĩa** với các giá trị nhị phân (1.024, $1.024^2$...) do thói quen lâu đời trong ngành máy tính. Các đơn vị này cho phép chúng ta đo lường từ những tệp văn bản nhỏ đến toàn bộ dữ liệu của internet.

<table class="hover-table">
  <thead>
    <tr>
      <th>Tên đơn vị<br>(Ký hiệu)</th>
      <th>Giá trị thập phân<br>(SI)</th>
      <th>Giá trị nhị phân<br>(IEC)</th>
      <th>Ứng dụng</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Kilobyte<br>(KB / KiB)</strong></td>
      <td>10<sup>3</sup> Bytes</td>
      <td>2<sup>10</sup> (1.024) Bytes</td>
      <td>Đo lường các tệp nhỏ như văn bản thuần túy (10 KB) hoặc đồ họa trang web (5–100 KB).</td>
    </tr>
    <tr>
      <td><strong>Megabyte<br>(MB / MiB)</strong></td>
      <td>10<sup>6</sup> Bytes</td>
      <td>2<sup>20</sup> (1.048.576) Bytes</td>
      <td>Dùng cho tệp lớn hơn: ảnh JPEG độ phân giải cao (1–5 MB), bài hát MP3 3 phút (~3 MB), dung lượng đĩa CD (700–800 MB).</td>
    </tr>
    <tr>
      <td><strong>Gigabyte<br>(GB / GiB)</strong></td>
      <td>10<sup>9</sup> Bytes</td>
      <td>2<sup>30</sup> (1.073.741.824) Bytes</td>
      <td>Phổ biến để đo dung lượng ổ cứng, Flash drive, RAM (16–32 GB), đĩa DVD (4.7 GB) hoặc video chất lượng cao.</td>
    </tr>
    <tr>
      <td><strong>Terabyte<br>(TB / TiB)</strong></td>
      <td>10<sup>12</sup> Bytes</td>
      <td>2<sup>40</sup><br>(1.099.511.627.776 byte)<br>(~1,1 nghìn tỷ) Bytes</td>
      <td>Dung lượng ổ cứng hiện đại (HDD/SSD), các máy trạm cao cấp hoặc máy chủ lưu trữ (10+ TB).</td>
    </tr>
    <tr>
      <td><strong>Petabyte<br>(PB / PiB)</strong></td>
      <td>10<sup>15</sup> Bytes</td>
      <td>2<sup>50</sup><br>(1.125.899.906.842.624 byte)<br>(~1,1 triệu tỷ) Bytes</td>
      <td>Đo lường dữ liệu trong mạng lớn hoặc các trung tâm máy chủ. Google và Facebook lưu trữ hơn 100 PB dữ liệu trên các máy chủ dữ liệu của họ.</td>
    </tr>
    <tr>
      <td><strong>Exabyte<br>(EB / EiB)</strong></td>
      <td>10<sup>18</sup> Bytes</td>
      <td>2<sup>60</sup> Bytes</td>
      <td>Đo lượng dữ liệu khổng lồ được truyền tải qua Internet hàng năm hoặc tổng dữ liệu trên nhiều mạng lưới lưu trữ dữ liệu.</td>
    </tr>
    <tr>
      <td><strong>Zettabyte<br>(ZB / ZiB)</strong></td>
      <td>10<sup>21</sup> Bytes</td>
      <td>2<sup>70</sup> Bytes</td>
      <td>Dùng để đo tổng lượng dữ liệu của toàn thế giới (hiện nay thế giới có khoảng vài ZB dữ liệu).</td>
    </tr>
    <tr>
      <td><strong>Yottabyte<br>(YB / YiB)</strong></td>
      <td>10<sup>24</sup> Bytes</td>
      <td>2<sup>80</sup> Bytes</td>
      <td>Đơn vị lớn nhất trong hệ SI, hiện tại hiếm khi được sử dụng thực tế vì tổng dữ liệu thế giới vẫn nhỏ hơn 1 YB.</td>
    </tr>
  </tbody>
</table>

> <i><strong>Lưu ý:</strong> Ngoài các đơn vị trên, còn có các thuật ngữ giả thuyết hoặc lý thuyết cho tương lai như <strong>Bronto Byte</strong> và <strong>Sagan Byte</strong> nhưng chúng hiện chưa được sử dụng trong thực tế lưu trữ.</i>

## Tốc độ truyền dữ liệu

Trong hệ thống lưu trữ và viễn thông, **tốc độ truyền dữ liệu** (còn được gọi là thông lượng - throughput) là một chỉ số quan trọng dùng để mô tả khả năng chuyển tải thông tin của một kênh truyền thông trong một khoảng thời gian nhất định,.

Dưới đây là chi tiết về các đơn vị đo lường và quy ước tính toán tốc độ truyền dữ liệu dựa trên các nguồn tài liệu:

### Các đơn vị đo lường cơ bản

Tốc độ truyền dữ liệu thường được đo bằng hai đơn vị chính là **bit trên giây (bps)** hoặc **byte trên giây (Bps)**.
- **1 bit trên giây (bps):** Là đơn vị nhỏ nhất của tốc độ truyền dữ liệu.
- **1 byte trên giây (Bps):** Tương đương với **8 bit trên giây**.
- Trong viễn thông, đơn vị cơ bản thường dùng là **bit**, trong khi đối với việc truyền tải các tệp tin lưu trữ, đơn vị **byte** thường được ưu tiên sử dụng.

### Các đơn vị đo lường lớn hơn

Khi tốc độ truyền tải tăng lên, các tiền tố nhân được thêm vào để dễ dàng quản lý các con số lớn. Theo hệ nhị phân (thường dùng trong tính toán bộ nhớ máy tính), các đơn vị được quy đổi như sau:
- **1 KBps (kilobyte trên giây):** Bằng 1.024 byte trên giây.
- **1 MBps (megabyte trên giây):** Bằng 1.024 kilobyte trên giây.
- **1 GBps (gigabyte trên giây):** Bằng 1.024 megabyte trên giây.

### Quy ước tính toán: Thập phân và Nhị phân

Có một sự khác biệt quan trọng cần lưu ý giữa việc đo lường dung lượng lưu trữ và tốc độ truyền tải:
- **Trong viễn thông:** Các tiền tố như "kilo" thường được hiểu theo hệ thập phân (lũy thừa của 10). Ví dụ, 1 kilobit thường được tính là **1.000 bit**.
- **Tốc độ tải xuống (Kbps):** Thông thường được tính dựa trên quy ước **1.000 bit trên giây**, thay vì 1.024 bit trên giây như trong các phép tính bộ nhớ RAM hay đĩa cứng.

### Thành tựu về tốc độ truyền tải
Công nghệ truyền dẫn dữ liệu không ngừng phát triển với những cột mốc đáng kinh ngạc. Kỷ lục tốc độ truyền dữ liệu nhanh nhất thế giới được ghi nhận vào tháng 10 năm 2022 đã đạt mức **1,84 petabit trên giây (Pbps)**. Để hình dung độ lớn, con số này tương đương với khoảng **14,7 tỷ megabit trên giây (Mbps)**.

### Bảng tóm tắt quy đổi tốc độ (Hệ nhị phân)

<table class="hover-table">
  <thead>
    <tr>
      <th>Đơn vị (Ký hiệu)</th>
      <th>Giá trị tương đương</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1 bps</strong></td>
      <td>Đơn vị cơ sở (bit per second)</td>
    </tr>
    <tr>
      <td><strong>1 Bps</strong></td>
      <td>8 bps</td>
    </tr>
    <tr>
      <td><strong>1 KBps</strong></td>
      <td>1.024 Bps</td>
    </tr>
    <tr>
      <td><strong>1 MBps</strong></td>
      <td>1.024 KBps</td>
    </tr>
    <tr>
      <td><strong>1 GBps</strong></td>
      <td>1.024 MBps</td>
    </tr>
  </tbody>
</table>

---

# Tham khảo

1. [Understanding file sizes: Bytes, KB, MB, GB, TB, PB, EB, ZB, YB - Geeksforgeeks](https://www.geeksforgeeks.org/computer-science-fundamentals/understanding-file-sizes-bytes-kb-mb-gb-tb-pb-eb-zb-yb/)
2. [Units of information - Wikipedia](https://en.wikipedia.org/wiki/Units_of_information)

