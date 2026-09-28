---
title: CPU
parent: IC
nav_order: 6
---

<h1>Central Processing Unit (CPU)</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

# 1. CPU là gì?

{: .note }
**Central Processing Unit (CPU)**: *Bộ vi xử lý trung tâm* là thành phần chức năng cốt lõi của máy tính. CPU là một tập hợp các mạch điện tử có nhiệm vụ vận hành hệ điều hành (OS) và các ứng dụng của máy tính, đồng thời quản lý nhiều hoạt động khác của máy tính.

Có thể xem CPU là "bộ não" của máy tính. CPU xử lý dữ liệu đầu vào thành thông tin đầu ra, đồng thời lưu trữ và thực thi program instructions thông qua mạng lưới circuitry.

CPU là thành phần xuất hiện trong mọi máy tính, bất kể kích thước hoặc mục đích sử dụng. Smartphone, laptop và PC đều sử dụng CPU.

Mặc dù thường được gọi là một thành phần đơn lẻ, CPU thực tế là tập hợp nhiều computer components phối hợp với nhau để thực hiện quá trình xử lý và điều khiển.

CPU được lắp vào socket trên motherboard - bảng mạch chính kết nối các thành phần của máy tính.

<details markdown="block">
<summary><i>Socket CPU</i></summary>

> Socket CPU: là ổ cắm vật lý giữ vai trò kết nối trung gian giữa bộ vi xử lý (CPU) và hệ thống máy tính. Mỗi dòng CPU hoặc thế hệ khác nhau thường yêu cầu một chuẩn socket riêng biệt.
> 
> Chức năng chính gồm:
> - **Kết nối vật lý và điện**: Tạo ra hàng trăm đến hàng nghìn điểm tiếp xúc giúp truyền tải dữ liệu và điện năng giữa CPU với RAM, ổ cứng và các linh kiện khác.
> - **Cố định linh kiện**: Giúp giữ chặt chip xử lý ở đúng vị trí nhờ hệ thống khung và lẫy kẹp chắc chắn.
> 
> Các loại Socket phổ biến:
> - **LGA (Land Grid Array)**: Các chân tiếp xúc nằm trực tiếp trên socket của mainboard, còn CPU có các điểm tiếp xúc dạng phẳng (pad).
> - **PGA (Pin Grid Array)**: Các chân cắm nằm trên CPU, còn socket trên mainboard là các lỗ nhỏ để cắm chân vào.
> <figure>
>  <img src="{{ site.baseurl }}\assets\images\LGA_and_PGA_socket.png"/>
> </figure>
{: .codeBlock }
</details>

Trong hệ thống máy tính, CPU chịu trách nhiệm thực thi các chỉ thị (executing instructions) và quản lý hoạt động (managing operations), giúp các tác vụ như gaming, typing và video playback hoạt động ổn định thông qua việc tính toán và đưa ra quyết định.

Các chức năng chính:
- Thực hiện mathematical calculations.
- Chạy applications và games.
- Quản lý các hoạt động input/output (I/O).
- Storing và retrieving data trong quá trình xử lý.

CPU có khả năng thực hiện nhiều tác vụ đồng thời (multitasking), bao gồm:
- Điều khiển các các chức năng nội bộ (internal functions) của máy tính.
- Quản lý mức tiêu thụ điện năng (power consumption).
- Phân bổ tài nguyên máy tính (computing resources).
- Giao tiếp với applications, programs và networks.

---

# 2. Thành phần chính của CPU

CPU gồm ba thành phần chính là Control Unit (CU), Arithmetic/Logic Unit (ALU) và Memory Unit, cùng các thành phần hỗ trợ quan trọng như Cache, Registers, Clock, Instruction Register, Instruction Pointer và Buses.

<figure>
  <img
    src="{{ site.baseurl }}\assets\images\Components_of_CPU.png"
  />
  <figcaption>Components of CPU
  </figcaption>
</figure>

## 2.1. Control Unit (CU)

Control Unit (CU) chứa các mạch điện (circuitry) điều khiển hoạt động của CPU thông qua các xung điện (electrical pulses) và phát tín hiệu để các thành phần thực hiện computer instructions.

CU không trực tiếp điều khiển từng application hoặc program, mà phân công và điều phối các tác vụ giữa các thành phần của CPU. Ví dụ: CU đồng bộ việc truyền dữ liệu từ cache memory đến ALU.

## 2.2. Arithmetic/Logic Unit (ALU)

Arithmetic/Logic Unit (ALU) thực hiện toàn bộ arithmetic operations và logical operations.

- **Arithmetic operations**: addition, subtraction, multiplication và division.
- **Logical operations**: thực hiện các phép so sánh giữa letters, numbers hoặc special characters, từ đó phục vụ các computer actions.

## 2.3. Memory Unit

Memory Unit quản lý dữ liệu và instructions cần thiết cho quá trình xử lý, bao gồm:
- Quản lý data flow giữa RAM và CPU.
- Quản lý hoạt động của cache memory.
- Lưu trữ dữ liệu và instructions phục vụ data processing.
- Cung cấp các cơ chế memory protection.

Các CPU trước đây chủ yếu sử dụng registers, trong khi CPU hiện đại sử dụng thêm cache memory tốc độ cao. Trong quá trình xử lý, dữ liệu có thể được lấy từ RAM, ROM hoặc hard disk và đưa vào registers hoặc cache.

## 2.4. Cache

Cache là bộ nhớ tốc độ cao được tích hợp trên processor chip, với một hoặc nhiều cache levels.

CPU sử dụng cache để xử lý dữ liệu thường xuyên cần truy cập mà không phải truy cập trực tiếp vào RAM. Do nằm gần CPU hơn, cache có tốc độ truy cập cao hơn RAM.

## 2.5. Registers

Registers là vùng nhớ bên trong CPU dùng để lưu trữ dữ liệu cần được truy cập ngay lập tức và thường xuyên trong quá trình xử lý.

Do được tích hợp trực tiếp trong CPU, dữ liệu trong registers có thể được truy cập với độ trễ rất thấp, giúp CPU thực hiện hiệu quả các data-processing instructions.

## 2.6. Clock

Clock đồng bộ hoạt động của các mạch điện và thành phần bên trong CPU bằng cách phát electrical pulses theo các khoảng thời gian đều đặn.

Tốc độ phát các pulses được gọi là clock speed, được đo bằng Hertz (Hz) hoặc megahertz (MHz).

## 2.7. Instruction Register và Instruction Pointer

Hai thành phần này hỗ trợ CPU trong quá trình thực thi instruction set:
- **Instruction Pointer**: chỉ vị trí của instruction tiếp theo mà CPU sẽ thực thi.
- **Instruction Register**: chứa instruction đang được CPU xử lý.

Sau khi instruction hiện tại hoàn thành, instruction tiếp theo được đưa vào Instruction Register, đồng thời Instruction Pointer xác định instruction tiếp theo cần thực thi.

## 2.8. Buses

Buses cung cấp cơ chế truyền data và data flow giữa các computing components trong computer system.
Bus width xác định số lượng bits mà bus có thể truyền song song.

Buses cho phép CPU kết nối với on-board memory và thực hiện việc trao đổi dữ liệu giữa các thành phần khác của hệ thống.

---

# 3. Chức năng của CPU

CPU thực hiện processing instructions từ các programs và điều khiển các hoạt động của máy tính. Quá trình này diễn ra theo chu trình lệnh (CPU instruction cycle), gồm các bước **Fetch → Decode → Execute → Store**. Control Unit chịu trách nhiệm điều khiển chu trình, trong khi computer clock cung cấp tín hiệu đồng bộ. Chu trình này được lặp lại liên tục theo khả năng xử lý của CPU.

<figure>
  <img
    src="{{ site.baseurl }}\assets\images\Functions_of_CPU.png"
    style="width: 50%; height: auto;"
  />
  <figcaption>Functions of the CPU</figcaption>
</figure>

## 3.1. CPU Instruction Cycle

1. Fetch: CPU lấy instruction từ main memory (RAM).
2. Decode: Control Unit phân tích và giải mã instruction đã lấy, xác định operation cần thực hiện. Decoder chuyển các binary instructions thành electrical signals để kích hoạt các thành phần tương ứng của CPU.
3. Execute: CPU thực hiện operation theo instruction, sử dụng các hardware components phù hợp như ALU.
4. Store: Kết quả của instruction được ghi trở lại memory hoặc register.

## 3.2. CPU Clock và Processing Speed

CPU hoạt động theo các clock signals do computer clock cung cấp để đồng bộ các thành phần bên trong. Clock speed xác định tốc độ phát các tín hiệu này và ảnh hưởng đến tốc độ CPU thực hiện instruction cycle.

Có thể điều chỉnh computer clock để CPU hoạt động ở tốc độ cao hơn mức thông thường (overclocking). Tuy nhiên, việc này có thể khiến các linh kiện máy tính bị hao mòn sớm hơn bình thường và có thể vi phạm điều khoản bảo hành của nhà sản xuất CPU.




















---

# Tham khảo

[1] [IBM, "What is a central processing unit (CPU)?"](https://www.ibm.com/think/topics/central-processing-unit)

[2] [GeeksforGeeks, "Central Processing Unit (CPU)"](https://www.geeksforgeeks.org/computer-science-fundamentals/central-processing-unit-cpu/)
