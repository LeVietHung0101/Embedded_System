---
title: Boot Process (backup)
parent: Embedded Systems Architecture
nav_order: 3
---

<h1>Boot Process (backup)</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

# Tổng quan về quá trình Boot trong hệ thống nhúng

## Khái niệm về quá trình boot và tầm quan trọng của nó

Quá trình khởi động (**Boot-up**) là chuỗi các bước mà hệ thống thực hiện bắt đầu từ thời điểm bật nguồn (power-on) hoặc giải phóng tín hiệu reset cho đến khi các ứng dụng được tải và thực thi. Đây là giai đoạn vi điều khiển tự khởi tạo bản thân và tìm đường đến hàm `main()` - nơi ứng dụng của người dùng bắt đầu.

**Sự trừu tượng hóa của công cụ:** Trong phát triển phần mềm nhúng, quá trình này thường bị bỏ qua vì các bộ công cụ lập trình (toolchains) hiện đại đã làm rất tốt việc tự động hóa và ẩn đi các chi tiết phức tạp.

Việc hiểu rõ quá trình boot là cực kỳ cần thiết để nắm bắt cách vi điều khiển khởi động, đặc biệt khi cần tùy chỉnh mã nguồn khởi động (boot code) hoặc gỡ lỗi các vấn đề phát sinh trước khi chương trình chính chạy. Mọi CPU đều khởi động theo một cách *tính toán được* (deterministic) đúng theo thiết kế phần cứng của nó.

## Sự khác biệt giữa cách nhìn của kỹ sư phần cứng và phần mềm

Quá trình nạp chương trình (**boot loading**) có thể đơn giản về lý thuyết nhưng lại phức tạp trong thực tế với nhiều phương thức triển khai khác nhau.

- **Góc nhìn phần cứng:** Tập trung vào các trạng thái vật lý như sự ổn định của điện áp, [tín hiệu power-good]({{ "/docs/Embedded_Systems_Architecture/Boot_Process/#quá-trình-cấp-nguồn-và-tín-hiệu-power-good" | relative_url }}), việc cấu hình các chân reset (straps) và cách ánh xạ bộ nhớ (memory mapping) để CPU có thể tìm thấy hướng dẫn thực thi đầu tiên.

- **Góc nhìn phần mềm:** Quan tâm đến việc thiết lập môi trường thực thi, bao gồm việc khởi tạo ngăn xếp (stack), sao chép dữ liệu từ Flash sang RAM (*C Copy Down* - Sao chép xuống môi trường C), và chuyển giao quyền điều khiển từ trình khởi động đến hệ điều hành hoặc ứng dụng.

## Đặc điểm của hệ thống Bare-metal so với hệ thống có hệ điều hành (OS)

**Hệ thống Bare-metal:** Thường không có hệ điều hành hay nhân (kernel) để quản lý tài nguyên. Mã nguồn chạy trực tiếp trên phần cứng và một tệp khởi động (**startup file**) - viết bằng C hoặc Assembly - sẽ thực hiện các chức năng cơ bản như khởi tạo RAM và chuyển quyền điều khiển cho hàm `main()`.

**Hệ thống có hệ điều hành:** Trình khởi động (**Boot loader**) có nhiệm vụ phức tạp hơn là nạp nhân của hệ điều hành (như Linux, Windows hoặc RTOS) vào bộ nhớ. Quá trình này có thể chia thành nhiều giai đoạn (sơ cấp và thứ cấp) để xử lý các hệ điều hành có kích thước lớn hoặc nạp từ các giao tiếp ngoại vi như USB, Ethernet, hay thẻ nhớ SD.

Dù là máy tính cá nhân hay vi điều khiển đơn giản, nguyên lý cơ bản của quá trình boot vẫn giống nhau: CPU tìm đến một địa chỉ xác định (Reset Vector) để bắt đầu thực thi những chỉ thị đầu tiên.

---

# Giai đoạn khởi đầu: Reset và Ổn định phần cứng

## Quá trình cấp nguồn và tín hiệu Power good

Quá trình khởi động của vi điều khiển bắt đầu ngay khi nguồn điện được cấp vào hệ thống. Sau khi cấp nguồn, hệ thống cần một khoảng thời gian ngắn để các đường ray điện áp (voltage rails) ổn định. Thời gian ổn định này khác nhau tùy thuộc vào thiết kế phần cứng và được quy định cụ thể trong datasheet của từng loại vi điều khiển.

Trong các hệ thống phức tạp (như kiến trúc x86), bộ nguồn sẽ gửi một tín hiệu gọi là **"power good signal"** đến bộ vi xử lý khi các mức điện áp và dòng điện đã đạt ngưỡng chấp nhận được. Chỉ khi nhận được tín hiệu này, quá trình reset mới diễn ra để CPU bắt đầu hoạt động.


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


<details markdown="block">
<summary><i>Power good & power fail signals</i></summary>

> Một số bộ nguồn (PSU) cung cấp tín hiệu "power good" khi được bật và gửi tín hiệu "power fail" khi được tắt. Điều này thường được sử dụng cho mục đích giám sát và điều khiển.
> 
> - **Power good signal**: sau khi điện áp đầu ra của bộ nguồn đạt 90% điện áp định mức (rated voltage), tín hiệu TTL (khoảng 5V) sẽ được gửi đi trong vòng 10-500ms tiếp theo. Mục đích là thông báo cho mainboard biết rằng điện áp đầu ra đã ổn định và an toàn, sẵn sàng để hệ thống bắt đầu khởi động.
> 
> - **Power fail signal**: trước khi điện áp đầu ra của bộ nguồn thấp hơn 90% điện áp định mức, "power good signal" sẽ tắt ít nhất 1ms trước đó.
> 
> <i>Điện áp định mức (rated voltage) là điện áp đầu ra mà nhà sản xuất thiết kế và cam kết bộ nguồn sẽ cung cấp trong điều kiện hoạt động bình thường.</i>
> 
> <i>TTL signal (Transistor-Transistor Logic signal) là một chuẩn tín hiệu logic số. Thông thường, Logic 0 (LOW) tương ứng với điện áp 0 ~ 0.8 V, Logic 1 (HIGH) tương ứng với điện áp 2 ~ 5 V.</i>
> 
> <figure><img src="{{ site.baseurl }}\assets\images\PowerGood_PowerFail_Signals.png"/></figure>
> Xem thêm: 
> 1. [Mạch power good - OSC.VN](https://osc.vn/mach-power-good-a46.html)
> 2. [What is power good and power fail signals and how can use it? - MEAN WELL EUROPE N.V.](https://meanwellpowersupplies.com/technical-articles/faq/what-is-power-good-and-power-fail-signals-and-how-can-use-it/)
> 
{: .codeBlock }
</details>


## Các loại Reset chính

Hệ thống nhúng thường có hai loại reset cơ bản để đưa các thành phần phần cứng về trạng thái xác định:

- **Power-on Reset (POR):** Đây là tín hiệu reset được tạo ra nội bộ bên trong chip trong khi điện áp nguồn đang tăng lên (ramping up). Nó đảm bảo vi điều khiển không bắt đầu hoạt động cho đến khi nguồn điện đủ ổn định. Trong quá trình này, nếu các giá trị vận hành (operational values) khác với thiết lập mặc định, hệ thống có thể thực hiện tái cấu hình các ngoại vi phần cứng thông qua các sơ đồ reset đặc thù (hardware-reset-configuration schemes).

- **External Reset (Reset ngoại vi):** Được kích hoạt thông qua việc tác động trực tiếp vào một chân cắm vật lý (pin toggle) trên vi điều khiển.

## Trạng thái phần cứng trong giai đoạn Reset

**Cấu hình mặc định:** Khi tín hiệu reset được thực thi, nó cưỡng ép tất cả các flip-flops trong vi điều khiển về một trạng thái định sẵn. Các thanh ghi hệ thống sẽ được nạp giá trị mặc định, quy định các thông số như tốc độ xung nhịp (clock-speed configuration), vị trí địa chỉ bắt đầu (start-address location), kích thước cổng bộ nhớ ngoài (external-memory-port size) và trạng thái kích hoạt/vô hiệu hóa của các ngoại vi (peripheral enable/disable state).

**Tái cấu hình phần cứng:** Trong quá trình thiết lập Power-on Reset (POR), nếu các giá trị vận hành cần thiết khác với thiết lập mặc định, hệ thống có thể thực hiện tái cấu hình các ngoại vi phần cứng thông qua các sơ đồ reset đặc thù (hardware-reset-configuration schemes).

## Sự ổn định của xung nhịp (Clock Stabilization)

Trước khi CPU bắt đầu thực thi mã lệnh, hệ thống có thể cần chờ đợi các mạch PLL (Phase-Locked Loop) đạt được trạng thái khóa xung nhịp (clock locking). Việc đảm bảo xung nhịp ổn định trước khi giải phóng reset nội bộ là bước then chốt để đảm bảo vi điều khiển thực thi các lệnh đầu tiên một cách chính xác và ổn định.

## Kết thúc giai đoạn reset

Khi các điều kiện về nguồn điện và xung nhịp đã thỏa mãn, tín hiệu reset sẽ được giải phóng (negation/deassertion). Tại thời điểm này, quyền kiểm soát hệ thống được giao cho **Reset Vector** – một đoạn mã assembly được ghi sẵn bởi nhà sản xuất chip (manufaturer) – để trỏ tới địa chỉ chứa các chỉ thị khởi động đầu tiên.

---

# Các phương pháp cấu hình Reset hệ thống

Trong các vi điều khiển cũ, toàn bộ hệ thống thanh ghi thường có một trạng thái cấu hình cố định duy nhất sau khi giải phóng reset, dẫn đến các hạn chế về tốc độ xung nhịp, địa chỉ bắt đầu hoặc trạng thái ngoại vi. Để tăng tính linh hoạt cho các ứng dụng phức tạp, các vi điều khiển hiện đại triển khai nhiều sơ đồ cấu hình reset khác nhau. Có **bốn phương pháp chính** thường được sử dụng:

## Cấu hình mặc định (Default Configuration)

- **Đặc điểm:** Đây là phương pháp phổ biến nhất và không yêu cầu thiết lập đặc biệt nào trên bo mạch. 

- **Hoạt động:** Tất cả các thanh ghi hệ thống được khởi tạo với các **giá trị cố định** ngay khi thoát khỏi trạng thái reset.

- **Ưu và nhược điểm:** Đây là phương pháp **nhanh nhất** để khởi tạo hệ thống trước khi quá trình boot bắt đầu, nhưng lại **ít linh hoạt nhất** vì không cho phép người dùng kiểm soát trạng thái hệ thống khi khởi động.

## Lập trình cầu chì (Fuse Programming)

- **Đặc điểm:** Cấu hình reset là kết quả của việc lập trình thông qua các chế độ kiểm tra đặc biệt, cầu chì (fuses) hoặc các thanh ghi flash không khả biến trên chip.

- **Hoạt động:** Khi tín hiệu reset được thực thi, thông tin từ "từ điều khiển reset" (reset-control-word) sẽ được đọc từ các cầu chì và sao chép vào các thanh ghi hệ thống tương ứng.

- **Tính chất:** Các cầu chì này thường có khả năng **lập trình một lần (OTP)** trong suốt vòng đời của chip.

- **Ứng dụng:** Các nhà sản xuất bán dẫn thường dùng phương pháp này để tạo ra các biến thể sản phẩm khác nhau từ cùng một miếng silicon bằng cách thổi cầu chì để kích hoạt hoặc vô hiệu hóa các tính năng cụ thể.

## Sử dụng chân cắm bên ngoài (External Pins)

- **Đặc điểm:** Sử dụng một nhóm các chân (pins) của vi điều khiển để xác định tùy chọn cấu hình. 

- **Hoạt động:** Các chân này được kéo lên cao (high) hoặc xuống thấp (low) từ bên ngoài trong quá trình reset. Khi reset được giải phóng, vi điều khiển sẽ **chốt (latch)** các giá trị này lại và giải mã chúng để thiết lập các thanh ghi hệ thống.

- **Triển khai:** Kỹ sư thường sử dụng các bộ đệm bên ngoài hoặc trình điều khiển dòng (như chip 74LVC125) để đưa tín hiệu logic vào các chân cấu hình.

- **Hạn chế:** Sự linh hoạt của phương pháp này bị giới hạn bởi số lượng chân cắm có sẵn dành cho mục đích cấu hình.

## Giao tiếp nối tiếp bên ngoài (External Serial Interface)

- **Đặc điểm:** Thay vì dùng chân cắm, dữ liệu cấu hình reset được tải từ một bộ nhớ nối tiếp bên ngoài (như SPI flash hoặc I2C EEPROM).

- **Hoạt động:** Khi hệ thống reset, chip sẽ thiết lập giao tiếp với bộ nhớ nối tiếp để chuyển dữ liệu cấu hình vào vi điều khiển. Sau khi nhận đủ dữ liệu, hệ thống mới bắt đầu thực thi mã lệnh.

- **Ưu điểm:** Cung cấp **tính linh hoạt tối đa** vì bộ nhớ nối tiếp có thể lưu trữ lượng lớn dữ liệu cấu hình. Trong một số thiết kế tiên tiến, bộ nhớ này thậm chí có thể chứa cả mã nguồn bootloader. 

- **Ứng dụng:** Đây là lựa chọn ưu tiên cho các bộ vi xử lý tích hợp cao và phức tạp, nơi việc dành riêng các chân cắm vật lý cho mục đích cấu hình là không khả thi.

---

#  Trình tự khởi động của CPU (CPU Boot Sequence)

## Tính xác định của quá trình khởi động

- Mọi CPU đều khởi động theo một cách **tính toán được (deterministic)**, đúng theo thiết kế phần cứng của lõi xử lý đó. 

- Khi nguồn điện ổn định và tín hiệu reset được giải phóng, CPU sẽ thực hiện một chuỗi các bước cố định để tìm đến những chỉ thị đầu tiên thay vì bắt đầu một cách ngẫu nhiên.

## Điểm bắt đầu: Reset Vector và Vector Table

- **Reset Vector:** Đây là một vị trí đặc biệt trong bản đồ bộ nhớ (memory map) mà CPU sẽ nhìn vào đầu tiên để tìm địa chỉ của chỉ thị khởi động. Tùy vào thiết kế chip, vị trí này có thể là địa chỉ `0x0000` hoặc một địa chỉ cụ thể khác như `0xFFFC`.

- **Bảng Vector (Vector Table):** Chứa danh sách các địa chỉ trỏ đến các trình xử lý ngắt (interrupt handlers) và reset handler. 

- **Ví dụ cụ thể trên ARM Cortex-M:** 
    - Địa chỉ `0x00000000` chứa giá trị khởi tạo cho **Main Stack Pointer (MSP)**.
    - Địa chỉ `0x00000004` chứa địa chỉ của **Reset Vector** (trỏ đến đoạn mã Reset Handler).

## Các bước nạp thanh ghi hệ thống

Ngay khi thoát khỏi trạng thái reset, CPU thực hiện các thao tác nạp dữ liệu quan trọng sau:

- **Khởi tạo Stack Pointer (SP):** CPU tự động nạp giá trị từ địa chỉ đầu tiên của bộ nhớ vào thanh ghi SP để thiết lập vùng ngăn xếp ban đầu cho các biến tạm và lệnh gọi hàm.

- **Nạp Program Counter (PC):** Thanh ghi PC (bộ đếm chương trình) được nạp địa chỉ của Reset Vector. PC luôn giữ địa chỉ của lệnh tiếp theo sẽ được thực thi.

## Vòng lặp hoạt động cơ bản: Fetch - Decode - Execute

Sau khi PC đã có địa chỉ khởi đầu, CPU bắt đầu thực hiện chu kỳ xử lý liên tục:

- **Lấy lệnh (Fetch):** CPU đọc một lệnh (giá trị 8, 16 hoặc 32-bit) từ địa chỉ đang lưu trong PC, sau đó tăng giá trị PC để chuẩn bị cho lệnh tiếp theo.

- **Giải mã (Decode):** Chuyển đổi lệnh nhị phân vừa lấy được thành các tín hiệu điều khiển nội bộ của CPU.

- **Thực thi (Execute):** CPU thực hiện các thao tác cụ thể như tính toán số học, đọc/ghi dữ liệu vào RAM hoặc rẽ nhánh đến địa chỉ khác.

## Ảnh hưởng của kiến trúc hệ thống (Von Neumann vs. Harvard)

- **Kiến trúc Von Neumann:** Sử dụng một bus duy nhất cho cả lệnh và dữ liệu. CPU phải điều phối việc dùng bus để vừa lấy lệnh khởi động vừa truy cập dữ liệu.

- **Kiến trúc Harvard:** Có các bus độc lập cho lệnh và dữ liệu. Điều này cho phép CPU thực thi các chỉ thị khởi động trực tiếp từ ROM (Flash) trong khi đồng thời truy cập vào RAM, giúp tối ưu hóa tốc độ boot.

## Reset Handler – Mã thực thi đầu tiên

- Chỉ thị đầu tiên mà CPU thực hiện không phải là hàm `main()` của ứng dụng người dùng. 

- Thay vào đó, nó thực thi **Reset Handler** – một đoạn mã (thường bằng Assembly) thực hiện các bước khởi tạo phần cứng thấp nhất (như tắt ngắt, thiết lập xung nhịp) và chuẩn bị môi trường ngôn ngữ C trước khi chính thức gọi hàm `main()`.

---

# Phân loại thành phần Boot: Sơ cấp (Primary) và Thứ cấp (Secondary)

Việc phân loại các thành phần khởi động phụ thuộc vào khả năng hỗ trợ thực thi mã lệnh ngay lập tức sau khi tín hiệu reset được giải phóng.

## Thành phần Boot sơ cấp (Primary Boot Devices)
Đây là những thiết bị có khả năng hỗ trợ khởi động trực tiếp và cung cấp chỉ thị thực thi đầu tiên cho bộ vi xử lý.

- **Đặc điểm:** Các giao tiếp sơ cấp thường được kích hoạt ngay sau khi reset và có thể được cấu hình thông qua các tùy chọn reset cứng. Chúng thường chứa các trình khởi động (bootloaders) hoặc các đoạn mã khởi tạo nhỏ.

- **Các loại thiết bị phổ biến:**
    - **Internal Flash (Flash nội vi):** Là phương pháp phổ biến và đơn giản nhất cho vi điều khiển. Nó giúp giảm sự phụ thuộc vào các giao tiếp bên ngoài và có tính bảo mật cao vì mã nguồn nằm bên trong chip. Tuy nhiên, nó bị giới hạn về dung lượng bộ nhớ.
    - **Boot ROM:** Thường chứa một trình khởi động cơ bản do nhà sản xuất cung cấp. Nó cho phép vi điều khiển thực hiện các trình tự phức tạp hơn như nạp chương trình từ các nguồn bên ngoài (Ethernet, USB, thẻ SD) hoặc dùng để khôi phục hệ thống khi phần mềm trong bộ nhớ chính bị hỏng.
    - **External NOR Flash:** Cho phép CPU khởi động trực tiếp qua bus giao tiếp bên ngoài. Đây là một trong những cách nhanh nhất để khởi động các hệ điều hành lớn vì tốc độ đọc cao và bus dữ liệu có thể lên tới 32-bit.
    - **NAND Flash:** Đang dần trở nên phổ biến như một lựa chọn boot sơ cấp nhờ dung lượng lớn và chi phí thấp, dù tốc độ đọc thấp hơn NOR Flash và cần có bộ điều khiển (controller) đi kèm.

## Thành phần Boot thứ cấp (Secondary Boot Devices)
Đây là các thiết bị hoặc giao tiếp được khởi tạo và cấu hình bởi mã nguồn từ thiết bị sơ cấp.

- **Đặc điểm:** Chúng thường chứa các nhân hệ điều hành (OS kernel) có kích thước lớn. Mã nguồn từ các thiết bị này có thể được thực thi trực tiếp hoặc sao chép vào bộ nhớ truy cập được của bộ xử lý trước khi chạy.

- **Các loại thiết bị phổ biến:**
    - **RAM nội vi (Internal RAM):** Luôn được coi là kỹ thuật boot thứ cấp vì thiết bị sơ cấp phải nạp mã vào RAM trước khi thực thi. Chạy mã từ RAM nhanh hơn và tiêu thụ ít năng lượng hơn so với chạy từ Flash.
    - **DRAM / DDR SDRAM:** Sử dụng trong các ứng dụng cao cấp cần hiệu suất cao và xử lý đa phương tiện. Thông thường, một trình khởi động từ ROM hoặc Flash sẽ nạp hệ điều hành từ một bộ nhớ lưu trữ vào DRAM để thực thi nhằm tăng tốc độ.
    - **Các giao tiếp ngoại vi:** Bao gồm USB, Ethernet, thẻ nhớ SDHC, SPI, I2C, SATA và PCIe. Các giao tiếp này cần được trình khởi động sơ cấp thiết lập các thông số (như tần số xung nhịp) trước khi có thể tải dữ liệu hoặc mã lệnh vào hệ thống.

## Mối quan hệ và Quá trình chuyển giao

- **Trình tự:** Quá trình khởi động thường bắt đầu từ thiết bị sơ cấp (ví dụ: ROM nội vi), sau đó thực hiện các bước khởi tạo cơ bản để chuyển quyền điều khiển sang thiết bị thứ cấp (ví dụ: DDR SDRAM hoặc NAND Flash) nơi chứa ứng dụng chính hoặc hệ điều hành.

- **Lợi ích của sự kết hợp:** Việc chia giai đoạn này cho phép hệ thống linh hoạt hơn (có thể nạp phần mềm từ nhiều nguồn khác nhau) và tối ưu hóa tốc độ khởi động bằng cách chuyển mã nguồn từ các bộ nhớ lưu trữ chậm sang các bộ nhớ thực thi tốc độ cao như RAM.


---

# Quá trình thiết lập môi trường thực thi (C Copy Down)

Quá trình **"C Copy Down"** là giai đoạn then chốt trong việc chuẩn bị môi trường thực thi cho ngôn ngữ C, đảm bảo các biến và cấu trúc chương trình được đặt đúng vị trí bộ nhớ cần thiết trước khi ứng dụng chính bắt đầu. Dưới đây là các bước chi tiết của quá trình này:

## Sao chép Vector Table từ Flash sang RAM

- **Hành động:** Bảng vector (chứa các địa chỉ trình xử lý ngắt) được sao chép từ bộ nhớ Flash vào RAM.

- **Lý do:** Tốc độ thực thi từ RAM nhanh hơn Flash, giúp **giảm độ trễ** (latency) khi CPU đáp ứng các yêu cầu ngắt từ hệ thống. Một số kiến trúc vi điều khiển yêu cầu cập nhật thanh ghi bảng vector để trỏ đến vị trí mới trong RAM sau khi sao chép.

## Khởi tạo phân đoạn dữ liệu (.data section)

- **Thành phần:** Chứa các biến toàn cục, biến tĩnh (static) đã được lập trình viên gán giá trị khởi tạo cụ thể (ví dụ: `int Var = 0x32;`).

- **Thực hiện:** Các giá trị khởi tạo này được lưu trữ vĩnh viễn trong Flash. Trình khởi động sẽ sao chép toàn bộ nội dung từ vùng lưu trữ trong Flash sang địa chỉ tương ứng trong RAM để biến có thể được đọc và ghi trong quá trình chương trình chạy.

## Xóa phân đoạn BSS (.bss section)

- **Thành phần:** Chứa các biến toàn cục và biến tĩnh không được khởi tạo rõ ràng hoặc được gán giá trị bằng không (ví dụ: `static int Var;`).

- **Thực hiện:** Để tiết kiệm không gian Flash, hệ thống không lưu trữ các giá trị "không" này. Thay vào đó, trình khởi động dựa trên thông tin từ linker script để xác định vùng nhớ RAM dành cho .bss và thực hiện **xóa trắng (ghi giá trị 0)** cho toàn bộ vùng đó.

## Sao chép các hàm thực thi trong RAM (RAM functions)

- **Mục đích:** Đôi khi lập trình viên muốn một số hàm cụ thể chạy trực tiếp từ RAM thay vì Flash để tối ưu hóa hiệu suất hoặc thực hiện các thao tác ghi vào Flash.

- **Thực hiện:** Tương tự như phân đoạn dữ liệu, mã máy của các hàm này được sao chép từ Flash sang RAM tại thời điểm boot. Thực thi mã từ RAM không chỉ nhanh hơn mà còn tiêu thụ ít năng lượng hơn.

## Thiết lập Stack và Heap

- **Ngăn xếp (Stack):** Là vùng RAM được dành riêng để lưu trữ các biến cục bộ, đối số hàm và địa chỉ trả về. Quá trình boot nạp giá trị vào thanh ghi **Stack Pointer (SP)** để xác định đỉnh của ngăn xếp.

- **Bộ nhớ động (Heap):** Vùng RAM dùng cho việc cấp phát bộ nhớ động thông qua các hàm như `malloc()`. Trình khởi động đảm bảo vùng nhớ này được định nghĩa và sẵn sàng theo sơ đồ bộ nhớ đã thiết lập trong linker script.

**Kết luận:** Nếu không hoàn tất quá trình "C Copy Down", môi trường runtime của C sẽ không được thiết lập đúng, dẫn đến việc các biến có giá trị rác hoặc hệ thống bị lỗi ngay khi bắt đầu thực thi hàm `main()`.


---

# Vai trò của Startup File và Linker Script

Trong các bộ công cụ lập trình (toolchains) hiện đại, quá trình boot thường được tự động hóa và ẩn đi, nhưng thực chất nó dựa trên hai thành phần cốt lõi là Startup File và Linker Script để thiết lập hệ thống trước khi hàm `main()` bắt đầu.

## Chức năng của Startup File (Tệp khởi động)

Startup file là một đoạn mã đặc biệt (thường được viết bằng Assembly hoặc C) được nhà sản xuất vi điều khiển hoặc IDE cung cấp sẵn để thực hiện các nhiệm vụ khởi tạo mức thấp nhất.

- **Chứa bảng Vector (Vector Table):** Tệp này định nghĩa bảng vector ngắt, bao gồm địa chỉ của Stack Pointer ban đầu và Reset Vector (trỏ đến Reset Handler).

- **Reset Handler:** Đây là mã thực thi đầu tiên sau khi reset. Nó thực hiện các nhiệm vụ phần cứng quan trọng như:
    - **Vô hiệu hóa các ngắt:** Đảm bảo hệ thống không bị gián đoạn bởi các sự kiện bên ngoài trong quá trình khởi tạo.
    - **Khởi tạo bộ nhớ:** Thực hiện quá trình "C Copy Down", sao chép dữ liệu từ Flash sang RAM và xóa vùng nhớ BSS.
    - **Thiết lập Stack:** Cấu hình thanh ghi Stack Pointer để chuẩn bị môi trường cho các biến cục bộ và lệnh gọi hàm trong C.

- **Chuyển giao quyền điều khiển:** Sau khi hoàn tất các bước chuẩn bị môi trường runtime cho ngôn ngữ C, Startup file sẽ thực hiện lệnh nhảy để gọi hàm `main()` của ứng dụng người dùng.

## Tầm quan trọng của Linker Script trong việc định nghĩa bản đồ bộ nhớ

Linker Script (thường có đuôi `.ld`) đóng vai trò là "bản thiết kế" cho trình liên kết (linker), chỉ dẫn cách phân bổ các thành phần của chương trình vào các vùng nhớ vật lý của vi điều khiển.

- **Định nghĩa Memory Map (Bản đồ bộ nhớ):** Linker Script xác định chính xác địa chỉ bắt đầu và kích thước của các vùng nhớ quan trọng như Flash (để lưu mã lệnh và dữ liệu hằng số) và RAM (để lưu dữ liệu biến đổi).

- **Phân bổ các phân đoạn (Sections):** Nó quyết định vị trí đặt của các phân đoạn mã máy như `.text` (mã chương trình), `.data` (biến đã khởi tạo), `.bss` (biến chưa khởi tạo), và vùng `.stack`.

- **Quản lý địa chỉ Nạp (LMA) và địa chỉ Thực thi (VMA):** 
    - Linker Script cho phép một đoạn mã hoặc dữ liệu được lưu trữ tại một địa chỉ trong Flash (Load Address) nhưng lại được CPU truy cập tại một địa chỉ khác trong RAM khi chạy (Run Address).
    - Điều này cực kỳ quan trọng để thực hiện việc sao chép các hàm từ Flash sang RAM nhằm tăng tốc độ thực thi hoặc thực hiện các thao tác ghi Flash.

- **Cung cấp ký hiệu (Symbols) cho Startup File:** Linker Script định nghĩa các ký hiệu như `_sdata`, `_edata`, `_sbss` để Startup File biết chính xác vùng nhớ nào cần sao chép hoặc xóa trắng trong quá trình boot.

Việc nắm vững và tùy chỉnh Startup File cùng Linker Script cho phép lập trình viên kiểm soát hoàn toàn hiệu suất hệ thống, tối ưu hóa việc sử dụng bộ nhớ và xử lý các tình huống gỡ lỗi phức tạp ở mức phần cứng.

---

# Các kiến trúc hệ thống và Công cụ Bootloader đặc thù

## So sánh kiến trúc Von Neumann và Harvard trong quá trình boot
Sự khác biệt về kiến trúc phần cứng ảnh hưởng trực tiếp đến cách CPU truy cập mã lệnh khởi động và dữ liệu:

- **Kiến trúc Von Neumann:** Sử dụng một bus duy nhất cho cả lệnh và dữ liệu. Trong kiến trúc này, mã lệnh thường được nạp từ bộ nhớ không khả biến (như đĩa hoặc flash) vào RAM rồi mới thực thi. Một số hệ thống sử dụng kỹ thuật "predictive caching" để nạp trước mã lệnh từ ROM nhằm tối ưu hóa thời gian CPU phải chờ đợi. Ví dụ điển hình cho kiến trúc này là dòng MSP430.

- **Kiến trúc Harvard:** Có các bus độc lập cho lệnh và dữ liệu. Mã lệnh thường được thực thi trực tiếp từ ROM (Flash) trong khi dữ liệu được truy cập qua bus riêng từ RAM. Quá trình này bắt đầu ngay tại reset vector. Các dòng chip như PIC24 và dsPIC33 là những ví dụ phổ biến của kiến trúc này.

## Trình khởi động đa năng U-Boot trong hệ thống Linux nhúng
Das U-Boot (Universal Boot Loader) là một công cụ mã nguồn mở mạnh mẽ và phổ biến nhất trong các thiết kế dựa trên Linux,.

- **Khả năng hỗ trợ rộng rãi:** U-Boot hỗ trợ nhiều kiến trúc CPU khác nhau như ARM, MIPS, x86, RISC-V và PPC. Nó tuân thủ "10 quy tắc vàng" trong thiết kế, bao gồm các tiêu chí: nhỏ gọn, nhanh, đơn giản và dễ cấu hình,.

- **Tính năng tương tác:** U-Boot cung cấp một môi trường tương tác cho phép người dùng nhập lệnh qua giao diện console (như HyperTerminal) để gỡ lỗi hoặc cấu hình thủ công,.

- **Cơ chế Relocation (Tự di dời):** Sau khi khởi tạo cơ bản, U-Boot có khả năng tự sao chép chính nó từ Flash/ROM vào một địa chỉ cao trong RAM để tiếp tục thực thi, giúp tránh việc bị ghi đè khi nạp Kernel hệ điều hành,,.

- **Hỗ trợ đa giao tiếp:** Nó cho phép nạp hệ điều hành từ nhiều nguồn khác nhau như USB, Ethernet, thẻ SD, PCIe hoặc SATA,.

## Nghiên cứu điển hình: Quá trình boot của x86 và Windows XP
Quá trình khởi động trên nền tảng x86 phức tạp hơn với nhiều giai đoạn chuyển tiếp:

- **Giai đoạn BIOS và POST:** Sau khi nhận tín hiệu "power-good" từ bộ nguồn, CPU thoát trạng thái reset và thực thi BIOS từ ROM. BIOS thực hiện POST (Power-on Self-Test) để kiểm tra phần cứng cơ bản như bộ nhớ và video,.

- **Tìm kiếm thiết bị khởi động:** BIOS đọc cấu hình từ CMOS để xác định thứ tự ưu tiên các thiết bị boot, sau đó tìm kiếm Master Boot Record (MBR) trên sector đầu tiên của ổ đĩa. MBR chứa bảng phân vùng và mã nạp phân vùng để tiếp tục quy trình.

- **Vai trò của NTLDR (New Technology Loader):** Đây là tệp kiểm soát việc nạp Windows XP. Nhiệm vụ quan trọng nhất của NTLDR là chuyển bộ xử lý từ "real mode" sang "protected mode" (cho phép truy cập bộ nhớ 32-bit và phân trang).

- **Nạp Kernel và Driver:** NTLDR đọc tệp cấu hình boot, hiển thị menu lựa chọn hệ điều hành nếu có, sau đó nạp các trình điều khiển thiết bị (drivers) được đánh dấu là thiết bị khởi động trước khi bàn giao quyền điều khiển cho nhân hệ điều hành (Kernel). Quá trình kết thúc khi người dùng đăng nhập thành công vào hệ thống.



---

Phần **"IX. Kết thúc quá trình Boot: Chuyển giao quyền điều khiển"** là 

# Kết thúc quá trình Boot: Chuyển giao quyền điều khiển

Đây là giai đoạn cuối cùng sau khi môi trường thực thi đã được thiết lập đầy đủ. Tại thời điểm này, hệ thống sẵn sàng để bắt đầu chạy các ứng dụng của người dùng hoặc nhân hệ điều hành. Chi tiết các bước như sau:

## Kích hoạt lại các ngắt (Interrupts)

- Trong giai đoạn đầu của quá trình boot (Reset Handler), các ngắt thường bị vô hiệu hóa để đảm bảo quá trình khởi tạo phần cứng và thiết lập bộ nhớ không bị gián đoạn.

- Khi tất cả các bước chuẩn bị (như C Copy Down, thiết lập Stack/Heap) đã hoàn tất, trình khởi động sẽ thực hiện lệnh **kích hoạt lại các ngắt**. Điều này cho phép hệ thống bắt đầu đáp ứng các sự kiện từ ngoại vi và các lỗi hệ thống khi ứng dụng chính thức chạy,.

## Chuyển giao quyền điều khiển cho ứng dụng (Hàm main)


- **Điểm nhập (Entry Point):** Sau khi hoàn tất các thủ tục khởi tạo trong Startup file hoặc Reset Handler, bộ vi xử lý thực hiện lệnh nhảy đến địa chỉ của **hàm `main()`**,,.

- **Bắt đầu ứng dụng người dùng:** Đây là nơi mà mã nguồn do lập trình viên viết bắt đầu được thực thi. Lúc này, trình khởi động (Bootloader) hoặc trình xử lý reset (Reset Handler) đã hoàn thành nhiệm vụ và **bàn giao hoàn toàn quyền kiểm soát CPU** cho ứng dụng chính,.

- **Trạng thái an toàn:** Hệ thống lúc này được đưa về một trạng thái vận hành an toàn và xác định, sẵn sàng xử lý các tác vụ logic của chương trình.

## Quy trình kết thúc trong các hệ thống phức tạp (Hệ điều hành)

Đối với các hệ thống có quy mô lớn hơn như Linux hoặc Windows, việc chuyển giao quyền điều khiển còn bao gồm các bước đặc thù:

- **Hệ điều hành Linux:** Sau khi nhận quyền điều khiển từ U-Boot, Kernel sẽ thực hiện gắn kết hệ thống tệp tin gốc (**Rootfs**) và khởi chạy tiến trình **`Init`**. Đây là tiến trình đầu tiên chạy trên không gian người dùng (user space) và nó sẽ chịu trách nhiệm khởi tạo tất cả các ứng dụng khác cho đến khi hệ thống tắt,.

- **Hệ điều hành Windows XP:** Quá trình boot được coi là thực sự kết thúc chỉ khi người dùng **đăng nhập thành công** vào hệ thống. Trước đó, quyền điều khiển được chuyển qua các giai đoạn trung gian như trình quản lý phiên (session-manager) để tạo ra môi trường người dùng và hệ thống đồ họa.

**Tóm lại**, sự kiện nhảy đến hàm `main()` đánh dấu bước chuyển mình từ giai đoạn "khởi tạo phần cứng/phần mềm" sang giai đoạn "vận hành ứng dụng", hoàn tất chu trình boot của hệ thống nhúng,,.



---

# Tham khảo

1. [Microcontroller Booting Process - Reset Sequence - Microcontrollerslab](https://microcontrollerslab.com/microcontroller-booting-process-reset-sequence/)
2. [Embedded System Boot Techniques - EE Times](https://www.eetimes.com/understanding-embedded-system-boot-techniques/)
3. [Embedded Basics - Understanding the Microcontroller Boot Process - Beningo Embedded Group](https://www.beningo.com/understanding-the-microcontroller-boot-process/)
4. [How does a microcontroller boot and startup, step by step? - Electrical Engineering](https://electronics.stackexchange.com/questions/224156/how-does-a-microcontroller-boot-and-startup-step-by-step)
