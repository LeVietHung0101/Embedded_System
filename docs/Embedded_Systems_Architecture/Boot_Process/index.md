---
title: Boot Process
parent: Embedded Systems Architecture
nav_order: 3
has_children: true
---

<h1>Boot Process</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

Nội dung sau đây tóm lược toàn bộ chuỗi sự kiện từ khi cấp nguồn cho vi điều khiển đến khi ứng dụng người dùng bắt đầu thực thi, bao quát các giai đoạn then chốt như:
- **Khởi tạo phần cứng:** Trạng thái Reset, ổn định điện áp (POR) và thiết lập con trỏ lệnh (PC) từ Vector Reset.
- **Cấu hình hệ thống:** Các phương thức xác định trạng thái chip (cầu chì, chân ngoài) và thiết lập xung nhịp (PLL).
- **Cơ chế Bootloader:** Phân loại các tầng khởi động (Primary/Secondary) và vai trò của các công cụ nạp mã như U-Boot.
- **Thiết lập môi trường C:** Quy trình "C Copy Down" để khởi tạo stack, sao chép dữ liệu vùng `.data` và `.bss` trước khi gọi hàm `main()`.
- **Tối ưu hóa và Bảo mật:** Phân tích ảnh hưởng của kiến trúc bộ nhớ (Harvard/Von Neumann) và các cơ chế bảo vệ như khởi động an toàn (Secure Boot), chế độ phục hồi và cập nhật firmware từ xa (OTA).


---

# 1. Tổng quan về quá trình khởi động hệ thống nhúng

<details markdown="block">
<summary><i>Khái niệm và thuật ngữ</i></summary>

> <table class="hover-table">
>   <thead>
>     <tr>
>       <th>Thuật ngữ</th>
>       <th>Loại</th>
>       <th>Mô tả ngắn</th>
>     </tr>
>   </thead>
>   <tbody>
>     <tr>
>       <td><strong>Boot Process</strong></td>
>       <td>Quy trình</td>
>       <td>Chuỗi sự kiện xảy ra từ khi cấp nguồn hoặc reset cho đến khi ứng dụng bắt đầu chạy.</td>
>     </tr>
>     <tr>
>       <td><strong>Reset Vector</strong></td>
>       <td>Thành phần</td>
>       <td>Vị trí đặc biệt trong bộ nhớ chứa địa chỉ của chỉ thị đầu tiên cần thực thi sau reset.</td>
>     </tr>
>     <tr>
>       <td><strong>main()</strong></td>
>       <td>Hàm</td>
>       <td>Điểm khởi đầu của mã ứng dụng do người dùng viết.</td>
>     </tr>
>     <tr>
>       <td><strong>Flash Memory</strong></td>
>       <td>Bộ nhớ</td>
>       <td>Là một non-volatile memory, thường dùng để lưu trữ firmware trên vi điều khiển.</td>
>     </tr>
>     <tr>
>       <td><strong>RAM</strong></td>
>       <td>Bộ nhớ</td>
>       <td>Bộ nhớ bay hơi dùng để lưu trữ biến và thực thi mã tốc độ cao.</td>
>     </tr>
>     <tr>
>       <td><strong>PCIe</strong></td>
>       <td>Chuẩn kết nối</td>
>       <td><strong>Peripheral Component Interconnect Express (PCI Express)</strong>: là chuẩn kết nối tốc độ cao cho phép mainboard giao tiếp trực tiếp với các linh kiện phần cứng (card đồ họa, ổ cứng SSD NVMe, card mạng).</td>
>     </tr>
>     <tr>
>       <td><strong>SoC / SOC</strong></td>
>       <td>Vi mạch</td>
>       <td><strong>System on a Chip</strong>: là một chip tích hợp CPU, bộ nhớ, bộ điều khiển ngoại vi và các thành phần khác trên cùng một đế bán dẫn.</td>
>     </tr>
>     <tr>
>       <td><strong>BIOS</strong></td>
>       <td>Firmware</td>
>       <td><strong>Basic Input/Output System</strong>: là firmware truyền thống của PC, có nhiệm vụ khởi tạo phần cứng và nạp bootloader hoặc hệ điều hành.</td>
>     </tr>
>     <tr>
>       <td><strong>UEFI</strong></td>
>       <td>Firmware</td>
>       <td><strong>Unified Extensible Firmware Interface</strong>: là firmware hiện đại thay thế BIOS, hỗ trợ giao diện phong phú, ổ đĩa lớn và các tính năng bảo mật nâng cao.</td>
>     </tr>
>     <tr>
>       <td><strong>BIOS/UEFI</strong></td>
>       <td>Firmware</td>
>       <td>Các loại firmware lưu trong ROM/Flash của mainboard, chịu trách nhiệm khởi tạo phần cứng và bắt đầu quá trình khởi động hệ điều hành (gần giống Boot ROM hoặc Bootloader).</td>
>     </tr>
>     <tr>
>       <td><strong>CMOS</strong></td>
>       <td>Bộ nhớ</td>
>       <td><strong>Complementary Metal-Oxide Semiconductor</strong>: là bộ nhớ dung lượng nhỏ được nuôi bằng pin, dùng để lưu các thiết lập hệ thống như thời gian và cấu hình khởi động (configuration storage).</td>
>     </tr>
>     <tr>
>       <td><strong>BIOS/CMOS</strong></td>
>       <td>Firmware / Bộ nhớ</td>
>       <td>BIOS là firmware khởi động hệ thống, còn CMOS là bộ nhớ nhỏ dùng để lưu các thiết lập mà BIOS sử dụng khi khởi động.</td>
>     </tr>
>     <tr>
>       <td><strong>POST</strong></td>
>       <td>Quy trình</td>
>       <td><strong>Power-on self-test</strong>: là chuỗi kiểm tra phần cứng được BIOS/UEFI thực hiện ngay sau khi cấp nguồn hoặc reset.<br>Xem thêm: <a href="https://www.techtarget.com/whatis/definition/POST-Power-On-Self-Test" target="_blank">TechTarget, "POST (Power-On Self-Test)"</a></td>
>     </tr>
>     <tr>
>       <td><strong>MBR</strong></td>
>       <td>Cấu trúc dữ liệu</td>
>       <td><strong>Master boot record</strong>: là vùng đầu tiên của thiết bị lưu trữ chứa thông tin phân vùng và mã khởi động ban đầu (startup code).</td>
>     </tr>
>     <tr>
>       <td><strong>NTLDR</strong></td>
>       <td>Bootloader</td>
>       <td><strong>New Technology Loader (NT Loader)</strong>: là chương trình khởi động được sử dụng trong các phiên bản Windows NT/2000/XP để nạp hệ điều hành.</td>
>     </tr>
>   </tbody>
> </table>
{: .codeBlock }
</details>


## 1.1. Định nghĩa và vai trò của quá trình khởi động

Quá trình khởi động (boot process hoặc boot-up) là một chuỗi các bước mà hệ thống thực hiện giữa thời điểm **bật nguồn (power-on)** và thời điểm **nạp ứng dụng (load applications)**. Về cơ bản, quy trình này bao gồm việc nạp mã chương trình ban đầu vào bộ nhớ và chuẩn bị các điều kiện cần thiết để vi điều khiển có thể vận hành ổn định. 

Vai trò cốt lõi của quá trình này không chỉ đơn giản là kích hoạt CPU mà còn là **thiết lập môi trường thực thi**. Điều này bao gồm việc kiểm tra phần cứng, khởi tạo các thanh ghi CPU, cấu hình hệ thống xung nhịp (clock sources), khởi tạo các driver cho các ngoại vi trên chip như timer, I/O port, UART...

Mặc dù các bộ công cụ phát triển (toolchains) hiện đại thường che giấu sự phức tạp này thông qua các file startup tự động, việc hiểu rõ quy trình khởi động là tối quan trọng để các nhà phát triển biết cách hệ thống từ trạng thái reset tìm được đường đến hàm `main()` quen thuộc. Nếu bất kỳ bước nào trong chuỗi khởi động thất bại, hệ thống có thể không khởi động được hoặc hoạt động không chính xác.

---

## 1.2. Sự khác biệt giữa khởi động MCU và PC

Mặc dù mục tiêu cuối cùng đều là đưa hệ thống vào trạng thái hoạt động, quy trình khởi động của vi điều khiển (MCU) và máy tính cá nhân (PC) có những khác biệt đáng kể về kiến trúc và cách quản lý bộ nhớ:

- **Vị trí thực thi mã:** Trong khi PC thường sao chép chương trình từ non-volatile memory (như ổ cứng) vào RAM để chạy (quá trình [C Copy Down]({{ "/docs/Embedded_Systems_Architecture/Boot_Process/#52-quá-trình-sao-chép-dữ-liệu-c-copy-down" | relative_url }})), các vi điều khiển thường thực thi mã trực tiếp từ bộ nhớ **Flash nội bộ**. Một số MCU nâng cao có thể sao chép một phần mã vào RAM để tối ưu hóa tốc độ thực thi và giảm độ trễ, nhưng đây là tùy chọn thay vì bắt buộc như trên PC.

- **Mức độ tích hợp:** Vi điều khiển được thiết kế như một **hệ thống trên một con chip (System on a Chip - SoC hay SOC)**, nơi CPU, Flash và RAM nằm trên cùng một tấm silicon. Ngược lại, trên PC, các thành phần này thường tách biệt, đòi hỏi quy trình khởi động (BIOS/UEFI) phức tạp hơn để liệt kê và cấu hình các bus ngoại vi như PCIe hay [DRAM]({{ "/docs/Embedded_Systems_Architecture/Memory/Memory/#dram-dynamic-random-access-memory" | relative_url }}).

- **Trình tự thực thi:** Quy trình khởi động PC (như Windows XP) đi qua nhiều giai đoạn phức tạp: từ POST (tự kiểm tra khi bật nguồn), tìm nạp MBR (bản ghi khởi động chính), đến việc nạp NTLDR để chuyển CPU từ real mode sang protected mode. Đối với vi điều khiển, quy trình này thường trực tiếp hơn: CPU tìm nạp **Reset Vector**, thực hiện mã startup (thường bằng assembly hoặc C) để khởi tạo stack và biến, sau đó nhảy thẳng đến hàm `main()`.

- **Tính linh hoạt:**
  + PC cho phép người dùng can thiệp vào cài đặt BIOS/CMOS để thay đổi thứ tự khởi động (boot order). Ví dụ người dùng có thể truy cập vào giao diện BIOS để thay đổi thứ tự khởi động thiết bị trong CMOS như: yêu cầu máy tính kiểm tra ổ đĩa mềm, sau đó đến CD-ROM, rồi mới đến ổ cứng để tìm MBR. Điều này cho phép hệ thống linh hoạt thay đổi nguồn nạp hệ điều hành tùy theo nhu cầu (như cài đặt lại Windows từ USB).
  + Ngược lại, vi điều khiển thường có trình tự khởi động cố định và đơn giản hơn. Nhiều MCU cũ chỉ có một trạng thái cấu hình duy nhất cho toàn bộ các thanh ghi sau khi thoát reset. Các thông số như tốc độ xung nhịp, địa chỉ bắt đầu thực thi, và việc bật/tắt các ngoại vi đều được "cứng hóa" (hard-wired) bởi thiết kế logic của chip. Cách tiếp cận này giúp hệ thống khởi động rất nhanh nhưng thiếu đi khả năng tùy biến khi cùng một loại chip được sử dụng trong các ứng dụng khác nhau.

<!-- 
[?] Real mode, protected mode của CPU là gì? 

-->

---

# 2. Giai đoạn khởi tạo phần cứng ban đầu

<details markdown="block">
<summary><i>Khái niệm và thuật ngữ</i></summary>

> <table class="hover-table">
>   <thead>
>     <tr>
>     <th>Thuật ngữ</th>
>     <th>Loại</th>
>     <th>Mô tả ngắn</th>
>     </tr>
>   </thead>
>   <tbody>
>     <tr>
>     <td><strong>POR / PoR</strong></td>
>     <td>Cơ chế</td>
>     <td>Mạch Power-On Reset tạo ra một tín hiệu reset để đưa hệ thống về một trạng thái xác định và có thể dự đoán được ngay khi điện áp nguồn đạt đến một ngưỡng thiết lập sẵn.</td>
>     </tr>
>     <tr>
>     <td><strong>Voltage Rails</strong></td>
>     <td>Phần cứng</td>
>     <td>Các đường cấp nguồn điện áp cần được ổn định trước khi CPU bắt đầu hoạt động.</td>
>     </tr>
>     <tr>
>     <td><strong>Reset Vector</strong></td>
>     <td>Thành phần</td>
>     <td>Một địa chỉ bộ nhớ cố định chứa con trỏ dẫn đến lệnh khởi đầu của chương trình.</td>
>     </tr>
>     <tr>
>     <td><strong>Program Counter (PC)</strong></td>
>     <td>Thanh ghi</td>
>     <td>Thanh ghi lưu trữ địa chỉ của lệnh tiếp theo mà CPU sẽ thực thi.</td>
>     </tr>
>     <tr>
>     <td><strong>Stack Pointer (SP)</strong></td>
>     <td>Thanh ghi</td>
>     <td>Thanh ghi trỏ đến đỉnh hiện tại của stack trong RAM, dùng để lưu trữ dữ liệu tạm thời.</td>
>     </tr>
>   </tbody>
> </table>
{: .codeBlock }
</details>


---

## 2.1. Trạng thái Reset và ổn định điện áp (POR)

Quá trình khởi động phần cứng bắt đầu ngay khi **nguồn điện được cấp** vào hệ thống. Trong giai đoạn này, [mạch Power-On Reset (POR)]({{ "/docs/Embedded_Systems_Architecture/Boot_Process/Power_on_Reset/" | relative_url }}) bên trong vi điều khiển sẽ tạo ra một tín hiệu reset để đưa vi điều khiển về *initial state* - CPU của vi điều khiển bị dừng lại (halted) và bộ nhớ của nó bị xóa - cho đến khi các *voltage rails* đạt mức ổn định cần thiết. Việc đảm bảo điện áp ổn định là điều kiện tiên quyết để các mạch logic hoạt động chính xác.

Khi tín hiệu POR được thực thi, vi điều khiển sẽ reset tất cả các registers, counters và flags về giá trị mặc định của nhà sản xuất (manufaturer). Việc này tránh các hành vi không xác định do nhiễu điện hoặc dữ liệu rác từ lần hoạt động trước. Trong một số thiết kế hệ thống phức tạp, vi điều khiển có thể phải đợi bộ khóa pha (**PLL - Phase-Locked Loop**) đạt được trạng thái khóa xung nhịp (clock locking) trước khi giải phóng tín hiệu reset nội bộ để bắt đầu chạy mã.

<details markdown="block">
<summary><i>Voltage rails</i></summary>

> Voltage rail (đường ray điện áp) là thuật ngữ chỉ một đường nguồn điện có mức điện áp xác định được phân phối đến các linh kiện trong hệ thống.
> Mỗi mức điện áp trong mạch tương ứng với một rail. Rail giống như một "đường cấp điện" chạy khắp bo mạch để cung cấp năng lượng cho các linh kiện cần mức điện áp đó.
> Ví dụ:
> <table class="hover-table">
>   <thead>
>     <tr>
>       <th>Voltage Rail</th>
>       <th>Cấp cho</th>
>     </tr>
>   </thead>
>   <tbody>
>     <tr>
>       <td>12V Rail</td>
>       <td>Đầu vào nguồn, động cơ, relay</td>
>     </tr>
>     <tr>
>       <td>5V Rail</td>
>       <td>IC ngoại vi, cảm biến</td>
>     </tr>
>     <tr>
>       <td>3.3V Rail</td>
>       <td>MCU, Flash, RAM</td>
>     </tr>
>     <tr>
>       <td>1.2V Rail</td>
>       <td>CPU core</td>
>     </tr>
>     <tr>
>       <td>GND Rail</td>
>       <td>Điểm tham chiếu chung</td>
>     </tr>
>   </tbody>
> </table>
{: .codeBlock }
</details>


---

## 2.2. Vector Reset và Program Counter (PC)

Sau khi trạng thái reset được giải phóng (POR negation/deassertion), CPU sẽ tìm nạp địa chỉ lệnh đầu tiên từ một vị trí đặc biệt trong bộ nhớ được gọi là **Reset Vector**. Reset Vector thường nằm ở một địa chỉ cố định trong Flash Memory Map, ví dụ như `0x0000` hoặc một địa chỉ cụ thể do kiến trúc phần cứng quy định.

Tùy thuộc vào kiến trúc chip, cách thức thiết lập ban đầu có thể khác nhau:

- **Đối với dòng ARM Cortex-M:** Phần cứng được thiết kế để tự động nạp giá trị tại địa chỉ `0x00000000` vào thanh ghi **Stack Pointer (SP)** và nạp giá trị tại địa chỉ `0x00000004` (chứa Reset Vector) vào thanh ghi **Program Counter (PC)**.

<figure>
  <img
    src="{{ site.baseurl }}\assets\images\Address_of_StackPointer_and_ProgramCounter_Registers.png"
    style="width: 60%; height: auto;"
  />
</figure>

- **Cơ chế chung:** CPU sẽ nạp địa chỉ được lưu trữ tại Reset Vector vào thanh ghi PC.

Một khi thanh ghi PC đã chứa địa chỉ hợp lệ, CPU sẽ bắt đầu chu kỳ **Tìm nạp - Giải mã - Thực thi (Fetch - Decode - Execute)** từ vị trí đó. Đây chính là điểm bắt đầu của startup code hoặc trình xử lý reset (reset handler), đánh dấu bước chuyển từ kiểm soát thuần túy bằng phần cứng sang thực thi các chỉ thị phần mềm đầu tiên.

---

# 3. Cấu hình Reset và thiết lập hệ thống

<details markdown="block">
<summary><i>Khái niệm và thuật ngữ</i></summary>

> <table class="hover-table">
>   <thead>
>     <tr>
>       <th>Thuật ngữ</th>
>       <th>Loại</th>
>       <th>Mô tả ngắn</th>
>     </tr>
>   </thead>
>   <tbody>
>     <tr>
>       <td><strong>Fuse Programming</strong></td>
>       <td>Cơ chế</td>
>       <td>Sử dụng các cầu chì hoặc thanh ghi không bay hơi để cấu hình chip vĩnh viễn hoặc một lần.</td>
>     </tr>
>     <tr>
>       <td><strong>External Pins / Strap</strong></td>
>       <td>Phần cứng</td>
>       <td>Các chân vật lý được kéo lên (high) hoặc xuống (low) để chọn chế độ khởi động khi reset.</td>
>     </tr>
>     <tr>
>       <td><strong>PLL (Phase-Locked Loop)</strong></td>
>       <td>Linh kiện</td>
>       <td>Mạch nhân tần số giúp tạo ra xung nhịp cao từ nguồn dao động thấp.</td>
>     </tr>
>     <tr>
>       <td><strong>Watchdog Timer</strong></td>
>       <td>Ngoại vi</td>
>       <td>Bộ đếm thời gian giúp reset hệ thống nếu phần mềm bị treo hoặc lỗi.</td>
>     </tr>
>     <tr>
>       <td><strong>Default State</strong></td>
>       <td>Trạng thái</td>
>       <td>Giá trị mặc định của các thanh ghi ngay sau khi thoát khỏi trạng thái reset.</td>
>     </tr>
>     <tr>
>       <td><strong>Wait States</strong></td>
>       <td>Thông số</td>
>       <td>Khoảng thời gian trễ cần thiết khi truy cập bộ nhớ nếu xung nhịp CPU quá nhanh.</td>
>     </tr>
>     <tr>
>       <td><strong>OTP</strong></td>
>       <td>Công nghệ</td>
>       <td>One-time programmable: là công nghệ lập trình một lần cho các linh kiện bán dẫn như vi điều khiển hoặc chip nhớ. Dữ liệu sau khi được ghi vào bộ nhớ OTP sẽ được khóa vĩnh viễn, không thể sửa đổi hay xóa bỏ.</td>
>     </tr>
>   </tbody>
> </table>
{: .codeBlock }
</details>

## 3.1. Các phương thức cấu hình Reset (Reset Configurations)

Trong các hệ thống vi điều khiển hiện đại, thay vì chỉ có một trạng thái cố định duy nhất sau reset, các nhà sản xuất cung cấp nhiều cơ chế để tùy chỉnh cách chip bắt đầu hoạt động. Có bốn phương thức cấu hình phổ biến:

### 3.1.1. Loading default values

Tất cả thanh ghi hệ thống được khởi tạo bằng các giá trị mặc định (fixed values). Khi reset kết thúc, vi điều khiển luôn khởi động trong cùng một trạng thái hệ thống. Đây là phương thức phổ biến và không yêu cầu bất kỳ thiết lập đặc biệt nào trên board, nhưng nó không cung cấp tính linh hoạt hoặc tùy chọn (option) để cấu hình bất kỳ thanh ghi nào. Vì vậy, mặc dù phù hợp với các ứng dụng có yêu cầu khởi động đơn giản, cố định và nhanh chóng, nó lại kém linh hoạt khi cùng một vi điều khiển được sử dụng cho nhiều ứng dụng khác nhau với các yêu cầu boot khác nhau.

<figure>
  <img
    src="{{ site.baseurl }}\assets\images\Reset Configurations_Loading_Default_Values.png"
  />
  <figcaption>Sau khi cấp nguồn, tín hiệu Power-On Reset (POR) giữ hệ thống trong trạng thái reset cho đến khi các mạch nội bộ ổn định. Khi POR được nhả, clock hệ thống bắt đầu hoạt động và phần cứng tự động nạp các giá trị cấu hình mặc định vào các thanh ghi hệ thống. Sau khi quá trình khởi tạo này hoàn tất, tín hiệu System Reset được nhả, cho phép CPU lấy lệnh đầu tiên từ Reset Vector và bắt đầu thực thi chương trình.
  </figcaption>
</figure>

### 3.1.2. Lập trình cầu chì (Fuse Programming)

Phương thức này cấu hình reset-control-word information bằng cách triển khai (implement) các bit và thanh ghi đặc biệt thông qua các cầu chì trên chip hoặc một mảng các thanh ghi bộ nhớ flash không khả biến (on-chip fuses or an array of nonvolatile-flash-memory registers). Các cầu chì và thanh ghi này thường yêu cầu một quy trình thiết lập phần cứng hoặc phần mềm đặc biệt để lập trình (hardware-setup or software sequence). Chúng có điểm đặc trưng là tính năng "lập trình một lần" (write-once), nghĩa là một khi đã được nạp dữ liệu, chúng không thể thay đổi được nữa.

Sau khi các cầu chì này đươc lập trình và tín hiệu [POR]({{ "/docs/Embedded_Systems_Architecture/Boot_Process/Power_on_Reset/" | relative_url }}) được thực thi, reset-control-word information sẽ được đọc trực tiếp từ các cầu chì và sao chép vào các thanh ghi hệ thống tương ứng. Sau đó, hệ thống sẽ tự động hủy kích hoạt tín hiệu Reset và bắt đầu thực thi mã chương trình.

Fuse programming mang lại ba lợi ích:

- Tính linh hoạt cao: Cho phép cấu hình nhiều tùy chọn khác nhau cho các thanh ghi hệ thống mà không cần thay đổi thiết kế phần cứng vật lý.

- Bảo mật tuyệt đối: Vì các cầu chì không thể bị ghi đè, chúng cung cấp một phương thức lưu trữ cấu hình an toàn, khó bị can thiệp bởi các tác động bên ngoài.

- Phân hóa sản phẩm: Đây là chiến lược phổ biến của các nhà sản xuất bán dẫn. Họ sản xuất một tấm silicon duy nhất nhưng làm đứt cầu chì (blowing the fuses) để bật/tắt các tính năng cụ thể, từ đó tạo ra các linh kiện "ảo" ("phantom" parts). Điều này giúp tạo ra các dòng chip có tính năng và mức giá khác nhau (ví dụ: chip giá rẻ bị khóa một số ngoại vi) từ cùng một quy trình sản xuất, giúp tối ưu hóa chi phí.

<figure>
  <img
    src="{{ site.baseurl }}\assets\images\Reset Configurations_Fuse_Programming.png"
  />
  <figcaption>Các reset-configuration bits được lấy (một cách tự động trong quá trình sản xuất) từ các cầu chì tích hợp trên chip (on-chip fuse) hoặc từ các non-volatile registers để cấu hình hệ thống khi khởi động.
  </figcaption>
</figure>

### 3.1.3. Chân cắm ngoài (External Pins/Straps)

Một số chân của vi điều khiển được dùng làm boot configuration pins (hay strap pins). Trạng thái logic (high/low) của một nhóm chân cụ thể này được vi điều khiển chốt (latch) lại và giải mã ngay khi quá trình reset kết thúc để quyết định cấu hình của system registers.

Phương pháp này cung cấp tính linh hoạt (hạn chế) trong việc lựa chọn cấu hình từ điều khiển do số lượng cấu hình khả dụng tỷ lệ thuận với số lượng chân được dành riêng cho mục đích này.


### 3.1.4. Bộ nhớ ngoài nối tiếp (External Serial Memory)

Đối với các vi xử lý hoặc vi điều khiển phức tạp, việc dành riêng hoặc chia sẻ các chân (pin) để hỗ trợ số lượng lớn các tùy chọn cấu hình khi khởi động (power-up options) thường không thực tế. Giải pháp đưa ra là lưu các thông số cấu hình trong một bộ nhớ nối tiếp bên ngoài (External Serial Memory) và nạp chúng trong quá trình reset.

Khi tín hiệu reset của hệ thống được kích hoạt (assert), chip sẽ thiết lập giao tiếp với bộ nhớ nối tiếp (ví dụ: SPI Flash, EEPROM, Serial ROM). Sau đó, thông tin cấu hình reset sẽ được truyền từ bộ nhớ này đến vi điều khiển. Khi nhận được dữ liệu nối tiếp, vi điều khiển sẽ cấu hình các thanh ghi hệ thống dựa trên dữ liệu đã nhận và sau đó hủy kích hoạt reset (deassert reset). 

> Ví dụ, khi đọc dữ liệu được lưu trong bộ nhớ SPI (Serial Peripheral Interface) bên ngoài, hệ thống cũng cần cấu hình tần số xung nhịp của bộ nhớ SPI (the SPI memory’s clock frequency) cùng với các tùy chọn khởi động của vi xử lý, và có thể tùy chọn nạp mã chương trình vào bộ nhớ của vi xử lý.

Ưu điểm của phương pháp này bao gồm:

- Tiết kiệm chân I/O: Không cần nhiều strap pins để chọn cấu hình.

- Hỗ trợ nhiều cấu hình: external serial memory có dung lượng lớn nên có thể lưu nhiều reset-configuration data và cả boot code. Chúng cũng được dễ dàng thay đổi chỉ bằng cách cập nhật nội dung bộ nhớ ngoài.

Đây là phương pháp phổ biến trong các SoC, MCU và vi xử lý hiện đại vì tiết kiệm chân I/O, linh hoạt và dễ mở rộng.

<figure>
  <img
    src="{{ site.baseurl }}\assets\images\Reset Configurations_Serial_Memory.png"
    style="width: 60%; height: auto;"
  />
  <figcaption>External Serial Memory không chỉ có thể chứa reset-configuration data mà còn cả boot code.
  </figcaption>
</figure>

## 3.2. Thiết lập xung nhịp và các thông số hệ thống cơ bản

Sau khi cấu hình reset được xác định, hệ thống cần thiết lập môi trường vật lý ổn định để mã phần mềm có thể chạy chính xác:

- **Cấu hình xung nhịp hệ thống (Clock System):** Vi điều khiển thường bắt đầu với một nguồn dao động nội tốc độ thấp để tiết kiệm điện. Mã khởi động (startup code) sẽ kích hoạt các bộ dao động thạch anh bên ngoài hoặc cấu hình bộ **PLL (Phase-Locked Loop)** để nhân tần số lên mức mong muốn cho ứng dụng. Trong quá trình này, CPU có thể phải tạm dừng để đợi PLL đạt trạng thái ổn định (clock locking).

- **Quản lý bộ nhớ và thời gian truy cập:** Nếu xung nhịp được đẩy lên quá cao, tốc độ của bộ nhớ Flash hoặc RAM có thể không đáp ứng kịp, đòi hỏi việc thiết lập các **Wait States** (chu kỳ đợi) để đảm bảo dữ liệu được đọc chính xác.

- **Thiết lập các ngoại vi cốt lõi:** Các bước khởi tạo ban đầu bao gồm việc vô hiệu hóa các ngắt toàn cục để tránh xung đột, cấu hình bộ định thời giám sát (**Watchdog Timer**) để bảo vệ hệ thống khỏi bị treo, và thiết lập các cổng I/O cơ bản. Một số chip có thể bắt đầu ở chế độ năng lượng thấp và cần phần mềm "đánh thức" các hệ thống con cần thiết trước khi đi vào hàm `main()`.

---

# 4. Bootloader và các cơ chế nạp mã

<details markdown="block">
<summary><i>Khái niệm và thuật ngữ</i></summary>

> <table class="hover-table">
>   <thead>
>     <tr>
>       <th>Thuật ngữ</th>
>       <th>Loại</th>
>       <th>Mô tả ngắn</th>
>     </tr>
>   </thead>
>   <tbody>
>     <tr>
>       <td><strong>Bootloader</strong></td>
>       <td>Phần mềm</td>
>       <td>Chương trình chịu trách nhiệm khởi tạo phần cứng ban đầu và nạp mã ứng dụng.</td>
>     </tr>
>     <tr>
>       <td><strong>Primary Boot</strong></td>
>       <td>Cơ chế</td>
>       <td>Thiết bị hoặc giao diện hỗ trợ khởi động trực tiếp ngay sau khi giải phóng reset.</td>
>     </tr>
>     <tr>
>       <td><strong>Secondary Boot</strong></td>
>       <td>Cơ chế</td>
>       <td>Các giao diện được khởi tạo bởi giai đoạn khởi động chính để nạp các chương trình lớn hơn.</td>
>     </tr>
>     <tr>
>       <td><strong>Boot ROM</strong></td>
>       <td>Thành phần</td>
>       <td>Bộ nhớ chỉ đọc chứa startup code cố định do nhà sản xuất cung cấp.</td>
>     </tr>
>     <tr>
>       <td><strong>U-Boot</strong></td>
>       <td>Công cụ</td>
>       <td>Trình nạp mã mã nguồn mở (Universal Boot Loader) phổ biến cho các hệ thống Linux.</td>
>     </tr>
>     <tr>
>       <td><strong>Flash Algorithms</strong></td>
>       <td>Thành phần</td>
>       <td>Mã cấp thấp dùng để thực hiện các thao tác xóa hoặc lập trình bộ nhớ Flash.</td>
>     </tr>
>   </tbody>
> </table>
{: .codeBlock }
</details>


## 4.1. Chức năng và thành phần cốt lõi của Bootloader

Bootloader đóng vai trò là thành phần then chốt trong quá trình khởi động, là cầu nối giữa phần cứng thô và mã ứng dụng người dùng. Trách nhiệm chính của nó bao gồm khởi tạo các thành phần phần cứng cốt lõi (CPU, bộ nhớ, bus, cổng I/O), nạp mã ứng dụng từ non-volatile memory vào RAM để thực thi, và chuyển giao quyền kiểm soát cho ứng dụng sau khi hoàn tất quá trình chuẩn bị. Ngoài ra, bootloader còn cung cấp các cơ chế phục hồi hệ thống và cập nhật firmware khi có sự cố.

Về mặt cấu trúc, một bootloader thường được thiết kế theo dạng module để tăng khả năng tái sử dụng, bao gồm các thành phần quan trọng như:

- **Trình xử lý reset (Reset handlers):** Mã thực thi đầu tiên sau reset để dẫn vào bootloader chính.

- **Trình điều khiển thiết bị (Device drivers):** Dành cho các bộ nhớ Flash, RAM, bus và console gỡ lỗi.

- **Thuật toán Flash và Routine sao chép:** Thực hiện việc di chuyển mã từ Flash vào RAM để tối ưu tốc độ.

- **Kiểm tra lỗi và quản lý Watchdog:** Đảm bảo quá trình nạp mã diễn ra an toàn và có khả năng tự phục hồi nếu bị treo.

## 4.2. Phân loại Bootloader: Primary Boot và Secondary Boot

Các thành phần khởi động được phân loại dựa trên khả năng hỗ trợ thực thi ngay sau khi reset.

- **Giai đoạn khởi động chính (Primary Boot):** Đây là lựa chọn cung cấp khả năng khởi động trực tiếp, nơi CPU tìm nạp lệnh đầu tiên. Phổ biến nhất là khởi động từ **Flash nội bộ** do tính đơn giản và bảo mật cao, hoặc từ **Boot ROM** tích hợp sẵn. Mã trong ROM thường cố định và có thể bao gồm các bước kiểm tra bảo mật (Secure Boot) để xác minh tính toàn vẹn của mã trước khi tiếp tục.

- **Giai đoạn khởi động phụ (Secondary Boot):** Các giao diện này không thể tự khởi động mà cần được khởi tạo bởi giai đoạn Primary Boot. Chúng thường được sử dụng để chứa các hệ điều hành lớn hoặc dữ liệu ứng dụng phức tạp trên các thiết bị như SD card, USB, Ethernet hoặc RAM ngoại vi (như DDR SDRAM). Việc thực thi mã từ các thiết bị thứ cấp này thường nhanh hơn và tiêu thụ ít năng lượng hơn so với đọc trực tiếp từ bộ nhớ Flash truyền thống.

<!-- 
## 4.3. Công cụ nạp mã phổ biến (U-Boot)

Trong các hệ thống nhúng phức tạp, đặc biệt là các hệ thống dựa trên Linux, **U-Boot (Universal Boot Loader)** là một công cụ mã nguồn mở vô cùng mạnh mẽ. U-Boot cung cấp một môi trường tương tác linh hoạt thông qua cửa sổ dòng lệnh (console), cho phép người dùng thực hiện các thao tác gỡ lỗi như nạp/kết xuất bộ nhớ (memory dump), truy cập giao diện nối tiếp, và lập trình trực tiếp cho các bộ nhớ Flash.

Khả năng của U-Boot rất đa dạng, từ việc hỗ trợ khởi động từ nhiều giao diện khác nhau (SATA, PCIe, Ethernet) đến khả năng tự di chuyển chính nó vào RAM để tăng tốc độ xử lý. Với cấu trúc thư mục tiêu chuẩn, U-Boot có tính di động (portability) rất cao, cho phép các nhà phát triển dễ dàng chuyển đổi (porting) sang các nền tảng phần cứng mới mà chỉ cần thay đổi các file cấu hình cụ thể cho CPU và board mạch. Nhờ cộng đồng hỗ trợ đông đảo, U-Boot luôn được cập nhật các driver và tính năng mới, trở thành lựa chọn hàng đầu cho các dự án hệ thống nhúng hiện đại. 
-->


---

# 5. Thiết lập môi trường thực thi ngôn ngữ C (C Startup Sequence)

<details markdown="block">
<summary><i>Khái niệm và thuật ngữ</i></summary>

> <table class="hover-table">
>   <thead>
>     <tr>
>       <th>Thuật ngữ</th>
>       <th>Loại</th>
>       <th>Mô tả ngắn</th>
>     </tr>
>   </thead>
>   <tbody>
>     <tr>
>       <td><strong>Stack Pointer (SP)</strong></td>
>       <td>Thanh ghi</td>
>       <td>Con trỏ quản lý vùng nhớ stack cho các biến cục bộ và lời gọi hàm.</td>
>     </tr>
>     <tr>
>       <td><strong>.data Section</strong></td>
>       <td>Phân đoạn</td>
>       <td>Vùng nhớ chứa các biến toàn cục hoặc tĩnh đã được khởi tạo giá trị.</td>
>     </tr>
>     <tr>
>       <td><strong>.bss Section</strong></td>
>       <td>Phân đoạn</td>
>       <td>Vùng nhớ chứa các biến toàn cục hoặc tĩnh chưa được khởi tạo hoặc bằng 0.</td>
>     </tr>
>     <tr>
>       <td><strong>C Copy Down</strong></td>
>       <td>Quy trình</td>
>       <td>Quá trình sao chép dữ liệu khởi tạo từ Flash sang RAM để thiết lập môi trường C.</td>
>     </tr>
>     <tr>
>       <td><strong>Linker Script</strong></td>
>       <td>Tệp tin</td>
>       <td>Tệp cấu hình xác định vị trí và kích thước của các vùng nhớ trong chip.</td>
>     </tr>
>   </tbody>
> </table>
{: .codeBlock }
</details>

---

## 5.1. Khởi tạo stack (Stack Pointer)

Việc thiết lập **Stack Pointer (SP)** là một yêu cầu bắt buộc trước khi bất kỳ mã C nào có thể thực thi, vì ngôn ngữ C dựa vào stack để lưu trữ các biến cục bộ, đối số hàm và địa chỉ trả về. Stack thường được đặt tại một vùng nhớ RAM cụ thể, và kích thước của nó được xác định dựa trên yêu cầu của ứng dụng thông qua file linker (.ld).

Đối với các kiến trúc như **ARM Cortex-M**, phần cứng thực hiện bước này một cách tự động bằng cách nạp giá trị từ địa chỉ đầu tiên của bảng vector (`0x00000000`) trực tiếp vào thanh ghi SP ngay khi reset. Trong các kiến trúc khác, startup code phải thực hiện một lệnh gán thủ công để trỏ SP vào đỉnh của vùng RAM đã được quy định. Nếu không có stack, việc gọi các hàm phức tạp hoặc xử lý ngắt sẽ gây ra lỗi hệ thống nghiêm trọng.

## 5.2. Quá trình sao chép dữ liệu (C Copy Down)

Quy trình **"C Copy Down"** là bước thiết lập các giá trị ban đầu cho bộ nhớ RAM để đảm bảo các biến toàn cục hoạt động đúng như mong đợi. Quá trình này bao gồm hai nhiệm vụ chính:

- **Khởi tạo phân đoạn .data:** Các biến toàn cục và tĩnh có giá trị khởi tạo khác 0 (ví dụ: `int x = 10;`) được lưu trữ vĩnh viễn trong Flash. Reset handler sẽ sao chép các giá trị này từ Flash sang địa chỉ RAM tương ứng được chỉ định bởi bộ liên kết (linker). Việc sao chép này không chỉ khởi tạo giá trị mà còn giúp truy cập dữ liệu nhanh hơn và giảm độ trễ so với việc đọc trực tiếp từ Flash.

- **Xóa trắng phân đoạn .bss:** Các biến không được khởi tạo tường minh hoặc khởi tạo bằng 0 (ví dụ: `static int y;`) sẽ được xếp vào vùng .bss. Thay vì tốn không gian Flash để lưu các số 0, startup code chỉ cần đọc địa chỉ bắt đầu và độ dài của vùng này từ bảng ký hiệu của linker, sau đó thực hiện lệnh xóa trắng (ghi giá trị 0) cho toàn bộ vùng RAM đó.

## 5.3. Chuyển giao điều khiển sang hàm main()

Sau khi stack đã sẵn sàng và tất cả các biến toàn cục đã được khởi tạo đúng giá trị trong RAM, môi trường thực thi cho ngôn ngữ C được coi là đã hoàn tất. Đây là thời điểm startup code thực hiện bước cuối cùng: **jump** hoặc **call** đến hàm `main()`.

Tại thời điểm này, quyền kiểm soát hệ thống được chuyển từ mã khởi động cấp thấp (thường viết bằng assembly hoặc được công cụ biên dịch tạo sẵn) sang mã ứng dụng do người dùng viết. Hàm `main()` thường bắt đầu bằng một vòng lặp vô tận để thực hiện logic chính của hệ thống nhúng, và từ đây, trình tự khởi động chính thức kết thúc, đưa vi điều khiển vào chế độ vận hành bình thường. Nếu hàm `main()` vì lý do nào đó trả về giá trị, hệ thống thường sẽ rơi vào một vòng lặp "hang" vô tận để bảo vệ hệ thống khỏi các hành vi không xác định.

---

# 6. Kiến trúc bộ nhớ và tối ưu hóa hiệu suất khởi động

<details markdown="block">
<summary><i>Khái niệm và thuật ngữ</i></summary>

> <table class="hover-table">
>   <thead>
>     <tr>
>       <th>Thuật ngữ</th>
>       <th>Loại</th>
>       <th>Mô tả ngắn</th>
>     </tr>
>   </thead>
>   <tbody>
>     <tr>
>       <td><strong>Harvard Architecture</strong></td>
>       <td>Kiến trúc</td>
>       <td>Cấu trúc máy tính có các đường bus và bộ nhớ riêng biệt cho lệnh và dữ liệu.</td>
>     </tr>
>     <tr>
>       <td><strong>Von Neumann Architecture</strong></td>
>       <td>Kiến trúc</td>
>       <td>Cấu trúc máy tính sử dụng chung một hệ thống bus cho cả lệnh và dữ liệu.</td>
>     </tr>
>     <tr>
>       <td><strong>Interrupt Latency</strong></td>
>       <td>Thông số</td>
>       <td>Khoảng thời gian trễ từ khi một ngắt xảy ra cho đến khi trình xử lý ngắt bắt đầu thực thi.</td>
>     </tr>
>     <tr>
>       <td><strong>RAM Functions</strong></td>
>       <td>Cơ chế</td>
>       <td>Các hàm cụ thể được lập trình viên chỉ định để sao chép và thực thi từ RAM nhằm tăng tốc độ.</td>
>     </tr>
>     <tr>
>       <td><strong>Wait States</strong></td>
>       <td>Thông số</td>
>       <td>Các chu kỳ chờ mà CPU phải thực hiện khi tốc độ truy cập bộ nhớ (như Flash) chậm hơn tốc độ xử lý của CPU.</td>
>     </tr>
>   </tbody>
> </table>
{: .codeBlock }
</details>


## 6.1. Ảnh hưởng của kiến trúc phần cứng Harvard và Von Neumann

Kiến trúc phần cứng của vi điều khiển quyết định cách thức CPU truy cập lệnh và dữ liệu trong quá trình khởi động và vận hành:

- **Kiến trúc Harvard:** Điểm đặc trưng là sự tách biệt hoàn toàn giữa bus lệnh và bus dữ liệu. Điều này cho phép CPU có thể *tìm nạp lệnh từ Flash và truy cập dữ liệu từ RAM cùng một lúc*, giúp tối ưu hóa băng thông xử lý. Trong quá trình khởi động, mã chương trình thường bắt đầu thực thi trực tiếp từ Reset Vector nằm trong bộ nhớ ROM/Flash. Các dòng chip như PIC24 hay dsPIC33 là những ví dụ điển hình cho kiến trúc này.

- **Kiến trúc Von Neumann:** Sử dụng một bus duy nhất cho cả lệnh và dữ liệu. Để khắc phục hạn chế về băng thông, các hệ thống này thường sử dụng cơ chế *caching dự đoán (predictive caching)* để nạp trước các chỉ thị từ ROM vào một bộ đệm, giúp CPU không phải chờ đợi lâu trong chu kỳ nạp. 

Dù theo kiến trúc nào, nhà thiết kế chip cũng phải ánh xạ bộ nhớ Flash vào không gian địa chỉ mà CPU tìm nạp ngay sau reset (ví dụ: địa chỉ `0x0000` hoặc `0xFFFC`). Việc hiểu rõ kiến trúc giúp lập trình viên cấu hình đúng các vùng nhớ trong tệp linker để đảm bảo CPU tìm thấy startup code chính xác.

## 6.2. Thực thi mã từ RAM so với Flash

Việc lựa chọn nơi thực thi mã là một chiến lược quan trọng để cân bằng giữa tính tiện dụng và hiệu suất hệ thống:

- **Thực thi từ Flash:** Đây là phương thức phổ biến nhất vì Flash là non-volatile memory, giữ được firmware ngay cả khi mất điện. Tuy nhiên, Flash thường có tốc độ truy cập chậm hơn CPU, dẫn đến việc phải cấu hình thêm các **chu kỳ đợi (wait states)**, làm giảm hiệu suất tổng thể.

- **Thực thi từ RAM:** Được coi là một kỹ thuật tối ưu hóa nâng cao hoặc khởi động thứ cấp (secondary boot). Thực thi mã từ RAM mang lại nhiều lợi ích:
    
    - **Tốc độ cao hơn:** RAM có thời gian truy cập nhanh hơn nhiều so với Flash, giúp CPU hoạt động ở tốc độ tối đa mà không cần chu kỳ đợi.
        
    - **Giảm độ trễ ngắt:** Bằng cách **di chuyển bảng vector ngắt (Vector Table Relocation) từ Flash vào RAM**, hệ thống có thể phản hồi các sự kiện ngắt nhanh hơn đáng kể.
        
    - **Tiết kiệm năng lượng:** Trong một số trường hợp, việc đọc từ RAM tiêu thụ ít điện năng hơn so với việc kích hoạt các mạch đọc Flash liên tục.

    - **Quy trình triển khai:** Để thực thi từ RAM, bootloader hoặc startup code phải thực hiện việc sao chép các hàm cụ thể (RAM functions) hoặc toàn bộ chương trình từ Flash sang các run address tương ứng trong RAM trước khi thực hiện lệnh jump/call đến hàm `main()`. Kỹ thuật này đặc biệt hữu ích trong các ứng dụng xử lý thời gian thực khắt khe hoặc khi cần thực hiện các thao tác ghi/xóa trực tiếp lên bộ nhớ Flash. (??)

---



# 7. Các khía cạnh nâng cao và bảo mật

<details markdown="block">
<summary><i>Khái niệm và thuật ngữ</i></summary>

> <table class="hover-table">
>   <thead>
>     <tr>
>       <th>Thuật ngữ</th>
>       <th>Loại</th>
>       <th>Mô tả ngắn</th>
>     </tr>
>   </thead>
>   <tbody>
>     <tr>
>       <td><strong>Secure Boot</strong></td>
>       <td>Cơ chế</td>
>       <td>Quá trình xác minh tính xác thực và toàn vẹn của phần mềm trước khi cho phép thực thi.</td>
>     </tr>
>     <tr>
>       <td><strong>Checksum</strong></td>
>       <td>Kỹ thuật</td>
>       <td>Giá trị dùng để kiểm tra xem dữ liệu có bị lỗi hoặc bị thay đổi hay không.</td>
>     </tr>
>     <tr>
>       <td><strong>Recovery Mode</strong></td>
>       <td>Chế độ</td>
>       <td>Trạng thái cho phép hệ thống khôi phục lại hoạt động khi firmware chính bị hỏng.</td>
>     </tr>
>     <tr>
>       <td><strong>OTA (Over-The-Air)</strong></td>
>       <td>Công nghệ</td>
>       <td>Phương thức cập nhật phần mềm hoặc firmware từ xa thông qua kết nối mạng.</td>
>     </tr>
>     <tr>
>       <td><strong>Encrypted Execution</strong></td>
>       <td>Cơ chế</td>
>       <td>Kỹ thuật giải mã và xác minh mã nguồn đã được mã hóa trước khi thực thi để bảo vệ bí mật công nghệ.</td>
>     </tr>
>     <tr>
>       <td><strong>Authentication</strong></td>
>       <td>Quy trình</td>
>       <td>Xác thực danh tính người dùng hoặc thiết bị trước khi cấp quyền truy cập vào ứng dụng.</td>
>     </tr>
>   </tbody>
> </table>
{: .codeBlock }
</details>


## 7.1. Khởi động an toàn (Secure Boot) và xác minh bảo mật

**Khởi động an toàn (Secure Boot)** là một trong những phương thức bảo vệ hệ thống nhúng mạnh mẽ nhất ngay từ tầng phần cứng. Trong các ứng dụng đòi hỏi tính bảo mật cao, quy trình khởi động không chỉ đơn thuần là nạp mã mà còn phải đi kèm với các **bước kiểm tra bảo mật (security checks)** nghiêm ngặt. Nếu một hoặc nhiều bước kiểm tra tính toàn vẹn (như xác minh chữ ký số hoặc đối chiếu mã băm) thất bại, quá trình khởi động sẽ bị dừng lại ngay lập tức để ngăn chặn việc thực thi mã độc hoặc mã đã bị chỉnh sửa trái phép.

Bên cạnh đó, các Bootloader hiện đại còn tích hợp nhiều tính năng bảo mật nâng cao khác:

- **Thực thi mã hóa (Encrypted Execution):** Đối với các ứng dụng nhạy cảm, mã nguồn lưu trong bộ nhớ có thể được mã hóa. Bootloader sẽ chịu trách nhiệm giải mã và xác minh mã này trước khi cho phép CPU thực thi.

- **Xác thực (Authentication):** Bootloader có thể yêu cầu xác thực người dùng hoặc thiết bị đầu cuối trước khi mở quyền truy cập vào các tài nguyên của ứng dụng.

- **Khởi động dự phòng lỗi (Fail Safe Booting):** Trước khi bắt đầu thực thi, hệ thống sẽ kiểm tra các giá trị **checksum** để đảm bảo tính hợp lệ của toàn bộ bản dựng phần mềm. Việc sử dụng bộ nhớ Flash nội bộ được coi là an toàn hơn các tùy chọn bộ nhớ ngoài do khó can thiệp vật lý vào dữ liệu đã lưu trữ.

## 7.2. Chế độ phục hồi và cập nhật Firmware (OTA)

Để đảm bảo tính bền bỉ và khả năng duy trì lâu dài của hệ thống nhúng, Bootloader thường được trang bị các cơ chế phục hồi và cập nhật linh hoạt:

- **Chế độ phục hồi (Recovery Mode):** Bootloader có khả năng phát hiện khi firmware ứng dụng bị hỏng (corrupt) thông qua việc kiểm tra các lỗi logic hoặc lỗi bộ nhớ. Trong trường hợp này, nó sẽ kích hoạt quy trình khôi phục, thường là sử dụng mã lưu trong **Boot ROM** không thể ghi xóa để nạp lại firmware mới.

- **Cập nhật Firmware từ xa (OTA):** Tính năng này cho phép hệ thống tải và ghi lại firmware mới thông qua các giao tiếp mạng (như Ethernet, Wi-Fi) mà không cần can thiệp vật lý trực tiếp vào thiết bị. Điều này giúp tiết kiệm đáng kể chi phí bảo trì, tương tự như việc kỹ sư chỉ cần nạp phần mềm mới qua USB thay vì phải gửi toàn bộ thiết bị về nhà máy để sửa chữa.
- **Khởi động đa hình ảnh (Multi-image Booting):** Một số hệ thống hỗ trợ lưu trữ nhiều bản sao ứng dụng (ví dụ: cơ chế nâng cấp A/B). Nếu bản cập nhật mới gặp sự cố, Bootloader có thể tự động chuyển sang khởi động từ bản sao cũ vẫn đang hoạt động ổn định, đảm bảo hệ thống luôn sẵn sàng. 

Các công cụ mạnh mẽ như **U-Boot** hỗ trợ rất tốt các kịch bản này bằng cách cho phép người dùng tương tác qua console để nạp ảnh hệ điều hành qua mạng, thực hiện các lệnh xóa/ghi Flash thủ công hoặc tự động hóa hoàn toàn quy trình cập nhật.

---

# Tham khảo

[1] [System on Chips, "What is the Boot Process of a Microcontroller?"](https://www.systemonchips.com/what-is-the-boot-process-of-a-microcontroller/)

[2] [Tech Dhaba, "Microcontroller Boot Process"](https://blogtechdhaba.wordpress.com/2023/05/13/microcontroller-boot-process/)

[3] [Microcontrollers Lab, "Microcontroller Booting Process – Reset Sequence"](https://microcontrollerslab.com/microcontroller-booting-process-reset-sequence/)

[4] [Electronics Stack Exchange, "How Does a Microcontroller Boot and Startup Step by Step?"](https://electronics.stackexchange.com/questions/224156/how-does-a-microcontroller-boot-and-startup-step-by-step)

[5] [Jacob Beningo, "Understanding the Microcontroller Boot Process"](https://www.beningo.com/understanding-the-microcontroller-boot-process/)

[6] [EE Times, "Understanding Embedded System Boot Techniques"](https://www.eetimes.com/understanding-embedded-system-boot-techniques/)

[7] [Beningo Embedded Group, "Embedded Basics – Understanding the Microcontroller Boot Process"](https://www.beningo.com/understanding-the-microcontroller-boot-process/)


<!-- 
Trình bày nội dung thuộc "______" trong nguồn "Dàn ý". Sử dụng các nguồn còn lại để Tổng hợp và diễn giải thông tin.

Đầu mỗi section, tạo bảng "Khái niệm và thuật ngữ" gồm:
| Thuật ngữ | Loại | Mô tả ngắn |


1: Tổng quan về quá trình khởi động hệ thống nhúng
2: Giai đoạn khởi tạo phần cứng ban đầu
3: Cấu hình Reset và thiết lập hệ thống
4: Bootloader và các cơ chế nạp mã
5: Thiết lập môi trường thực thi ngôn ngữ C (C Startup Sequence)
6: Kiến trúc bộ nhớ và tối ưu hóa hiệu suất khởi động
7: Các khía cạnh nâng cao và bảo mật



Trình bày lại thông tin sau dưới dạng bảng table-hover.

[thông tin]
...

[format bảng table-hover]
<table class="hover-table">
  <thead>
    <tr>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>






 -->