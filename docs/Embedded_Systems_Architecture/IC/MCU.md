---
title: MCU
parent: IC
nav_order: 2
---

<h1>Microcontroller Unit (MCU)</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

# 1. MCU là gì?

**Microcontroller unit (MCU / µC / uC)**: Vi điều khiển là một máy tính thu nhỏ nằm trên một mạch tích hợp (Integrated Circuit - IC), bao gồm lõi vi xử lý (processor core), bộ nhớ, các thiết bị ngoại vi I/O có thể lập trình, timer, counter,... MCU chỉ cung cấp dung lượng bộ nhớ, các giao diện và năng lực xử lý ở mức tối thiểu. Các thiết bị ngoại vi tích hợp trên MCU thường mang tính tổng quát hơn so với các gói SoC. MCU thường được sử dụng cho các hệ thống điều khiển nhúng quy mô nhỏ hoặc các ứng dụng điều khiển.

Các thành phần cơ bản của MCU:
- **CPU**: thực thi các lệnh.
- **Memory**: lưu trữ dữ liệu và các lệnh.
- **I/O port**: kết nối MCU với các thiết bị khác.
- **Timers**: đo khoảng thời gian.
- **Analog-to-digital converter (ADC)**: chuyển đổi tín hiệu tương tự sang tín hiệu số.
- **Digital-to-analog converter (DAC)**: chuyển đổi tín hiệu số sang tín hiệu tương tự.

---

# Ưu và nhược điểm của MCU

## Ưu điểm

- Thời gian xử lý ngắn (CPU và các peripheral được tích hợp trên cùng chip, giúp giảm thời gian giao tiếp giữa các thành phần và phù hợp với các tác vụ điều khiển thời gian thực).
- Dễ sử dụng, bảo trì và khắc phục sự cố (mức độ tích hợp cao giúp giảm số lượng IC và kết nối bên ngoài, từ đó đơn giản hóa hardware và troubleshooting).
- Có thể thực hiện nhiều tác vụ tự động (MCU có thể thực hiện đồng thời hoặc tuần tự nhiều tác vụ điều khiển thông qua interrupt, timer và peripheral mà không cần sự can thiệp liên tục của con người).
- Kích thước và chi phí hệ thống thấp do CPU, Flash/ROM, RAM và nhiều peripheral được tích hợp trong một chip (giảm diện tích PCB, độ phức tạp phần cứng và chi phí BOM).
- Có thể mở rộng bộ nhớ và I/O (có thể kết nối external RAM, ROM/Flash và các I/O/peripheral thông qua các interface phù hợp, tùy khả năng của từng MCU).
- Có thể lập trình và tái lập trình (nhiều MCU hiện đại sử dụng Flash memory nên có thể được erase và reprogram nhiều lần; một số MCU/OTP device có giới hạn hoặc không hỗ trợ reprogramming).

<details markdown="block">
<summary><i>Chi phí BOM</i></summary>

> **Chi phí BOM (Bill of Materials cost)** là tổng chi phí của tất cả các nguyên liệu, linh kiện và phụ tùng cần thiết để tạo ra một sản phẩm hoàn chỉnh theo bảng BOM. Chỉ số này giúp doanh nghiệp biết chính xác số tiền cần dùng để mua vật tư đầu vào cho mỗi đơn vị sản phẩm.
{: .codeBlock }
</details>



<details markdown="block">
<summary><i>OTP</i></summary>

> **One-Time Programmable microcontroller (OTP microcontroller)** là loại vi điều khiển chỉ cho phép nạp chương trình (firmware) đúng một lần duy nhất trong suốt vòng đời hoạt động. Phù hợp cho các thiết bị tiêu dùng giá rẻ, sản xuất hàng loạt.
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>Tape-out</i></summary>

> Trong thiết kế vi mạch, **tape-out** là thời điểm hoàn thành giai đoạn thiết kế chip và gửi bản thiết kế cuối cùng (thường dưới dạng tệp GDSII hoặc OASIS chứa dữ liệu hình học) đến nhà máy sản xuất (foundry) để chế tạo mặt nạ quang học và sản xuất tấm silicon (wafer).
{: .codeBlock }
</details>



## Nhược điểm

- Thường được sử dụng cho các thiết bị và hệ thống quy mô nhỏ (phù hợp với embedded control, sensor, actuator, appliance và các hệ thống có yêu cầu tính toán vừa phải).
- Cấu trúc và chức năng tích hợp có thể phức tạp (một MCU hiện đại có nhiều peripheral, clock domain, interrupt, DMA, communication interface và configuration register cần quản lý).
- Không thể trực tiếp điều khiển tải công suất lớn (GPIO của MCU thường chỉ cung cấp dòng/điện áp giới hạn; tải lớn cần transistor, MOSFET, relay hoặc power driver làm tầng giao tiếp).
- Tài nguyên tính toán và bộ nhớ bị giới hạn (CPU performance, Flash, RAM, số lượng peripheral và I/O phụ thuộc vào từng dòng MCU).
- Không phải MCU nào cũng có Analog I/O (ADC, DAC hoặc analog comparator chỉ được tích hợp trên một số MCU; nếu không có, cần external analog IC).
- Có thể bị ảnh hưởng bởi tĩnh điện (ESD) (MCU sử dụng CMOS semiconductor nên các chân I/O và mạch bên trong có thể bị hư hỏng hoặc malfunction nếu chịu ESD vượt quá mức bảo vệ).

<details markdown="block">
<summary><i>CMOS</i></summary>

> **Complementary metal-oxide-semiconductors (CMOS)** là một loại công nghệ được dùng để chế tạo mạch tích hợp, đồng thời là tên gọi của một con chip nhớ nhỏ trên bo mạch chủ máy tính dùng để lưu trữ các thiết lập hệ thống quan trọng.
> 
> Chức năng chính của CMOS:
> **Lưu trữ thông tin khởi động**: Giữ lại các thiết lập phần cứng, thứ tự khởi động ổ cứng và cấu hình BIOS (Basic Input/Output System) ngay cả khi máy tính đã tắt nguồn.
> **Duy trì đồng hồ thời gian thực**: Giúp máy tính cập nhật chính xác ngày và giờ hệ thống liên tục qua thời gian.
{: .codeBlock }
</details>




<details markdown="block">
<summary><i>ESD</i></summary>

> **Electrostatic Discharge (ESD)** - hiện tượng phóng tĩnh điện hoặc xả tĩnh điện: là hiện tượng dòng điện chạy đột ngột và tức thời giữa hai vật có điện thế khác nhau khi chúng tiếp xúc hoặc đến gần nhau. Nguyên nhân là sự tích tụ điện tích trên bề mặt vật liệu (thường do ma sát, tiếp xúc và tách rời giữa các vật cách điện như nhựa, nilon).
{: .codeBlock }
</details>


---

# Ứng dụng

- Các thiết bị phát hiện và điều khiển ánh sáng.
- Các thiết bị được sử dụng trong công nghiệp.
- Các thiết bị dùng cho process control.
- Các thiết bị được sử dụng trong công nghiệp.
- Đo lường các vật thể quay.
- Current gauge.
- Các thiết bị đo lường di động.



---

# Tham khảo

[1] [GeeksforGeeks, "Difference between MCU and SoC"](https://www.geeksforgeeks.org/computer-organization-architecture/difference-between-mcu-and-soc/)

[2] [Ampheo, "Microprocessor vs Microcontroller vs System on Chip: What Are the Differences Among Them?"](https://www.ampheo.com/blog/microprocessor-vs-microcontroller-vs-system-on-chip-what-are-the-differences-among-them?srsltid=AfmBOorVHEWKOxo-kMa8mspqk0cqhepew-P5tmWRJ3dLyD_4Sw4RgJWd)