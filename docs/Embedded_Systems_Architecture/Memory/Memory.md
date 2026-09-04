---
title: Memory
parent: Embedded Systems Architecture
nav_order: 2
has_children: true
---

<h1>Memory</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

# Embedded memory

**Embedded memory** là loại bộ nhớ mà bộ vi xử lý của một thiết bị nhúng sử dụng để thực hiện các chức năng và hoạt động. Bộ nhớ này có thể được tích hợp trực tiếp trên hệ thống trên một vi mạch (SoC - System-on-a-chip) của thiết bị nhúng hoặc có thể là một bộ nhớ riêng lẻ.

## Volatile và non-volatile memory

**Bộ nhớ khả biến (Volatile memory)**: Chỉ có thể lưu trữ dữ liệu miễn là nó được duy trì nguồn điện. Khi nguồn điện bị ngắt, loại bộ nhớ này sẽ mất toàn bộ dữ liệu. Loại volatile memory phổ biến nhất là RAM (bao gồm SRAM và DRAM), thường được sử dụng làm bộ nhớ chính để chạy các chương trình và lưu trữ dữ liệu tạm thời nhờ tốc độ truy cập rất nhanh.

**Bộ nhớ không khả biến (Non-volatile memory)**: Vẫn lưu trữ được dữ liệu ngay cả khi đã tắt nguồn. Trong các hệ thống nhúng, loại bộ nhớ này được sử dụng để lưu trữ mã nguồn (code), các thiết lập cấu hình hoặc dữ liệu mà thiết bị luôn cần dùng đến sau mỗi lần khởi động lại. Mặc dù có khả năng lưu trữ bền vững, bộ nhớ không khả biến thường có tốc độ chậm hơn so với bộ nhớ chính. Một số loại non-volatile memory phổ biến gồm ROM (như Masked ROM, PROM), bộ nhớ Flash, EEPROM, NVRAM, FRAM và PCM (Phase Change Memory).

Một số loại bộ nhớ hiện đại như NVRAM hoặc PCM kết hợp được đặc tính của cả hai: chúng vừa có khả năng lưu trữ dữ liệu vĩnh viễn (không khả biến) vừa có tốc độ truy cập nhanh gần bằng các loại RAM thông thường.

<details markdown="block">
<summary><i>Cơ chế lưu trữ dữ liệu của Volatile memory và Non-Volatile memory khác nhau thế nào?</i></summary>

> Sự khác biệt về khả năng duy trì dữ liệu giữa hai loại bộ nhớ này xuất phát từ cách thức chúng lưu trữ điện tích hoặc trạng thái vật lý:
> 
> **Bộ nhớ khả biến (Volatile memory)**: Điển hình là DRAM, loại bộ nhớ này lưu trữ dữ liệu trên các tụ điện (capacitors) và bóng bán dẫn (transistors). Các tụ điện này có đặc tính tự nhiên là bị rò rỉ điện tích, vì vậy chúng cần được "làm mới" (refresh) liên tục bởi một bộ điều khiển để duy trì dữ liệu. Khi nguồn điện bị ngắt, quá trình làm mới này dừng lại, các tụ điện mất điện tích và dẫn đến việc mất toàn bộ dữ liệu.
> 
> **Bộ nhớ không khả biến (Non-volatile memory)**: Loại bộ nhớ này sử dụng các cơ chế lưu trữ bền vững hơn mà không cần dòng điện duy trì liên tục.
>
> - **Masked ROM**: Dữ liệu được nhà sản xuất ghi trực tiếp lên chip trong quá trình chế tạo và không thể thay đổi.
>
> - **Flash** và **EEPROM**: Được lập trình và xóa bằng các thao tác điện đặc biệt để lưu giữ nội dung lâu dài. Flash và EEPROM dùng một transistor đặc biệt có thêm một lớp "cổng nổi" (floating gate) được cách điện hoàn toàn bởi lớp oxide, gọi là **Floating Gate Transistor**. Khi lập trình, electron được bơm vào floating gate bằng hiệu ứng <a href="https://www.youtube.com/watch?v=2QyKVU1IRZg" target="_blank">Fowler-Nordheim tunneling</a>. Vì lớp oxide cách điện, electron bị "nhốt" lại ngay cả khi mất điện - có thể giữ hàng chục năm. Xóa dữ liệu là dùng điện áp cao để kéo electron ra ngược lại.
>
> - **PCM (Phase Change Memory)**: Sử dụng công nghệ thay đổi pha của vật liệu để lưu trữ dữ liệu, cho phép giữ thông tin trong hàng chục năm mà không cần điện. PCM dùng vật liệu chalcogenide (thường là GST - Ge-Sb-Te). Điểm đặc biệt của vật liệu chalcogenide là nó có thể chuyển đổi qua lại giữa hai trạng thái vật lý: Khi đốt nóng nhanh rồi làm lạnh nhanh → vật liệu ở trạng thái vô định hình (amorphous) → điện trở cao → bit 0. Khi đốt nóng chậm hơn → vật liệu kết tinh (crystalline) → điện trở thấp → bit 1. Trạng thái vật lý này bền vững mà không cần điện.
>
> - **FRAM**: dùng vật liệu sắt điện (ferroelectric) như PZT. Các phân tử trong vật liệu có thể duy trì hai hướng phân cực điện ổn định (lên/xuống) tương ứng với bit 0/1. Không cần điện để duy trì trạng thái - khác hoàn toàn với tụ điện trong DRAM.
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>Tại sao Volatile memory có tốc độ truy cập nhanh hơn Non-Volatile memory?</i></summary>

> Volatile Memory nhanh hơn vì nó chỉ cần thao tác trên các tín hiệu điện bên trong mạch bán dẫn, trong khi Non-Volatile Memory phải tạo và duy trì các thay đổi vật lý đủ ổn định để dữ liệu vẫn tồn tại sau khi mất điện.
> 
> **1. Volatile Memory chỉ cần thao tác trên tín hiệu điện**: Lý do cốt lõi khiến Volatile Memory nhanh hơn là dữ liệu được lưu và xử lý trực tiếp thông qua các hiện tượng điện học đơn giản. Trong SRAM, dữ liệu được lưu dưới dạng trạng thái của các transistor; trong DRAM, dữ liệu được lưu dưới dạng điện tích trong tụ điện. Khi cần đọc hoặc ghi dữ liệu, hệ thống chỉ cần thay đổi hoặc kiểm tra các tín hiệu điện bên trong mạch bán dẫn. Các quá trình này diễn ra cực nhanh, thường chỉ mất vài nanosecond.
>
>**2. Non-Volatile Memory phải thay đổi trạng thái vật lý để lưu dữ liệu**: Ngược lại, Non-Volatile Memory cần tạo ra một sự thay đổi vật lý đủ ổn định để dữ liệu vẫn tồn tại ngay cả khi mất nguồn điện. Ví dụ, Flash Memory lưu dữ liệu bằng cách giữ electron trong Floating Gate; PCM lưu dữ liệu bằng cách thay đổi cấu trúc vật liệu giữa trạng thái tinh thể và vô định hình; MRAM lưu dữ liệu bằng trạng thái từ hóa. Những thay đổi vật lý này đòi hỏi nhiều năng lượng và thời gian hơn so với việc chỉ thay đổi tín hiệu điện trong SRAM hoặc DRAM.
>
> **3. Quá trình ghi dữ liệu của Non-Volatile Memory thường phức tạp hơn**: Để ghi dữ liệu vào Flash Memory, hệ thống phải tạo điện áp cao để ép electron xuyên qua một lớp cách điện cực mỏng. Trong PCM, hệ thống phải tạo nhiệt độ rất cao để làm thay đổi cấu trúc vật liệu. Các thao tác này bao gồm nhiều bước vật lý và cần thời gian để hoàn tất. Trong khi đó, SRAM hoặc DRAM chỉ cần thay đổi trạng thái điện áp của một số transistor hoặc tụ điện, giúp tốc độ ghi nhanh hơn đáng kể.
>
> **4. Việc đọc dữ liệu cũng thường chậm hơn**: Không chỉ ghi dữ liệu, việc đọc dữ liệu từ Non-Volatile Memory cũng thường đòi hỏi các phép đo phức tạp hơn. Ví dụ, Flash phải xác định điện áp ngưỡng của transistor để biết có electron đang được lưu trữ hay không. PCM phải đo giá trị điện trở của vật liệu để xác định trạng thái hiện tại. Những phép đo này thường mất nhiều thời gian hơn việc kiểm tra trực tiếp trạng thái của một mạch transistor trong SRAM.
>
> **5. Tính ổn định lâu dài đánh đổi bằng hiệu năng**: Để dữ liệu tồn tại sau khi mất điện, Non-Volatile Memory phải sử dụng các cơ chế lưu trữ ổn định trong thời gian dài. Chính yêu cầu này làm tăng độ phức tạp của quá trình lưu trữ và truy xuất dữ liệu. Ngược lại, Volatile Memory không cần giữ dữ liệu khi mất nguồn nên có thể sử dụng các cơ chế lưu trữ đơn giản hơn, từ đó đạt được độ trễ thấp và tốc độ truy cập cao hơn.
>
> **6. Sự đánh đổi giữa tốc độ và khả năng lưu giữ dữ liệu**: Về bản chất, Volatile Memory tối ưu cho tốc độ, còn Non-Volatile Memory tối ưu cho khả năng lưu giữ dữ liệu. SRAM và DRAM chấp nhận mất dữ liệu khi mất điện để đổi lấy khả năng truy cập cực nhanh. Flash, PCM và các công nghệ Non-Volatile khác chấp nhận độ trễ cao hơn để đảm bảo dữ liệu vẫn được bảo toàn khi nguồn điện bị ngắt.
{: .codeBlock }
</details>

---

# Primary và secondary memory trong máy tính

**Bộ nhớ chính (Primary memory)**: Là bộ nhớ nội bộ chính của hệ thống máy tính, được bộ xử lý trung tâm (CPU) truy cập trực tiếp. CPU có thể truy cập bộ nhớ chính rất nhanh, nhưng đây thường là bộ nhớ khả biến (volatile), nghĩa là dữ liệu sẽ bị mất khi thiết bị mất nguồn điện.

**Bộ nhớ phụ (Secondary memory)**: Thường nằm trong các thiết bị lưu trữ bên ngoài; không được CPU truy cập trực tiếp mà được truy cập thông qua các kênh Input/Output. Bộ nhớ phụ là bộ nhớ không khả biến (non-volatile), giúp duy trì dữ liệu ngay cả khi mất điện. Tuy nhiên, so với bộ nhớ chính, tốc độ của bộ nhớ phụ tương đối chậm.

- **Hard Disk Drive (HDD)**: Thiết bị lưu trữ vĩnh viễn có thể lưu giữ lượng lớn dữ liệu ngay cả khi máy tính tắt. Tốc độ của HDD chậm hơn RAM nhưng dung lượng lưu trữ lớn hơn nhiều.

- **Solid-State Drive (SSD)**: Một giải pháp thay thế nhanh hơn cho ổ cứng HDD vì không có bộ phận chuyển động. SSD cung cấp tốc độ đọc/ghi nhanh hơn so với HDD.

- **Optical Discs (Đĩa quang) and USB Flash Drives**: là những dạng bộ nhớ phụ khác được sử dụng để lưu trữ, mặc dù chúng ít phổ biến hơn trong các hệ thống tốc độ cao hiện đại.

Trong nhiều hệ thống nhúng và vi điều khiển (MCU) hiện đại, CPU không chỉ truy cập trực tiếp RAM mà còn truy cập trực tiếp Flash, EEPROM hoặc các loại bộ nhớ khác thông qua không gian địa chỉ bộ nhớ (directly addressable). Ví dụ đọc dữ liệu từ Flash:

```c
valueInFlash = *(0x08000000);
```

---

<figure>
  <img
    src="{{ site.baseurl }}\assets\images\Embedded_memory_hierarchy.png"
  />
  <figcaption>Hệ thống phân cấp bộ nhớ nhúng (Embedded memory hierarchy)
  </figcaption>
</figure>

# Các loại bộ nhớ trong hệ thống nhúng

Các loại bộ nhớ trong hệ thống nhúng thường được chia thành hai loại chính: bộ nhớ khả biến (volatile) và bộ nhớ không khả biến (non-volatile). Trong mỗi loại đó lại có nhiều loại bộ nhớ RAM và ROM khác nhau. Các kỹ sư sử dụng RAM trong hệ thống nhúng để chạy chương trình và lưu trữ dữ liệu. Họ sử dụng ROM để lưu trữ dữ liệu lâu dài.
- RAM (Random Access Memory) - Bộ nhớ truy cập ngẫu nhiên.
- ROM (Read-Only Memory) - Bộ nhớ chỉ đọc

---

## RAM (Random Access Memory)

RAM (Random Access Memory) là một loại bộ nhớ máy tính. Đây là một thiết bị bán dẫn được đặt gần hoặc trên bộ xử lý và được sử dụng để lưu trữ chương trình và dữ liệu đang hoạt động.

Khi CPU cần đọc dữ liệu:
1. CPU gửi một lệnh đọc (read instruction) kèm theo địa chỉ bộ nhớ của dữ liệu cần truy cập.
1. Địa chỉ này được chuyển đến bộ điều khiển RAM (RAM Controller).
1. Dữ liệu tại địa chỉ đó được đọc và truyền trở lại bộ nhớ đệm của CPU (CPU Cache).

**Timing và Latency**

Quá trình đọc/ghi dữ liệu giữa CPU và RAM được gọi là timing.
- Hệ thống có timing nhanh, tức khoảng thời gian chờ giữa các thao tác đọc/ghi ngắn, sẽ cho phép truy cập dữ liệu nhanh hơn và có độ trễ (latency) thấp hơn.
- Ngược lại, timing chậm làm tăng độ trễ và giảm hiệu năng của hệ thống.

**Đặc điểm**

Random Access (truy cập ngẫu nhiên) nghĩa là RAM cho phép CPU truy cập trực tiếp đến bất kỳ địa chỉ bộ nhớ nào mà không cần phải đọc qua các địa chỉ trước đó.
RAM là một loại Volatile Memory (bộ nhớ khả biến), nghĩa là dữ liệu chỉ được duy trì khi thiết bị còn được cấp nguồn. Khi mất điện, toàn bộ dữ liệu trong RAM sẽ bị mất.

Có hai loại RAM phổ biến:
- SRAM (Static Random Access Memory)
- DRAM (Dynamic Random Access Memory)

---


### SRAM (Static Random Access Memory)

SRAM cung cấp thời gian truy cập cực nhanh. SRAM có khả năng duy trì dữ liệu miễn là vẫn được cấp nguồn điện và không cần cơ chế làm mới (refresh) định kỳ.

Do được xây dựng từ các mạch transistor phức tạp hơn, SRAM tiêu thụ ít điện năng hơn trong quá trình lưu giữ dữ liệu nhưng có chi phí sản xuất cao hơn DRAM và mật độ lưu trữ thấp hơn. Do chi phí cao và kích thước lớn, SRAM thường không được sử dụng làm bộ nhớ chính của máy tính.

Vì ưu tiên hàng đầu là tốc độ, SRAM thường được sử dụng trong các thành phần yêu cầu truy cập nhanh như:
- CPU Cache (L1, L2, L3 Cache).
- Bộ nhớ nội của MCU.
- Bộ đệm (Buffer) tốc độ cao (trong ổ đĩa cứng, thiết bị ngoại vi máy in hoặc bộ định tuyến hay bộ chuyển mạch mạng).

*"Nhiều SoC và MCU hiện nay đều tích hợp một lượng nhỏ RAM ngay trên chip. Phần bộ nhớ này thường là sự kết hợp giữa SRAM và CPU Cache trên các SoC. Một số dòng chip còn cung cấp nhiều phiên bản khác nhau với các cấu hình bộ nhớ tích hợp khác nhau, cho phép lựa chọn phiên bản có lượng bộ nhớ tốc độ cao phù hợp nhất với nhu cầu của ứng dụng."* - Timo Aarnipuro, Senior Software Engineer for Qt.

SRAM thường được lựa chọn cho các ứng dụng cần:
- **Tốc độ truy cập cực nhanh (khoảng 10 ns).**
- Độ trễ thấp.
- Dung lượng không quá lớn.
- Hiệu năng cao.

Các ứng dụng phổ biến dùng SRAM:
- CPU Cache.
- Cache của ổ đĩa cứng (Hard Drive Cache).
- Cache trong thiết bị mạng (Networking Cache).
- Thiết bị điện tử khoa học và ô tô.
- Vi xử lý (Microprocessor).
- Thiết bị gia dụng hiện đại.
- Đồ chơi điện tử.
- Máy tính.
- Router.
- Thiết bị ngoại vi (Peripheral Equipment).
- Thiết bị di động hoặc chạy bằng pin.

##### Cấu trúc của SRAM

SRAM chủ yếu được sử dụng làm bộ nhớ cache cho CPU. Loại bộ nhớ bán dẫn này được xây dựng từ các mạch chốt (flip-flop) và sử dụng mạch latching hai trạng thái ổn định (bistable latching circuitry) để lưu trữ từng bit dữ liệu.

Mỗi bit dữ liệu trong SRAM được lưu bằng 4 đến 6 transistor (thông thường là cấu trúc 6T SRAM gồm 6 transistor).

Trong một chip SRAM, mỗi ô nhớ (memory cell) lưu trữ một giá trị nhị phân (0 hoặc 1) miễn là vẫn được cấp nguồn điện. Sau khi một flip-flop lưu một bit, nó sẽ duy trì giá trị đó cho đến khi có dữ liệu mới với giá trị ngược lại được ghi vào.

SRAM có kích thước tương đối lớn so với DRAM, nhưng đổi lại cho phép truy cập dữ liệu rất nhanh. Ngoài ra, SRAM thường được tích hợp dưới dạng on-chip memory (bộ nhớ nằm trên cùng chip với bộ xử lý).

<figure>
  <img
    src="{{ site.baseurl }}\assets\images\6t-SRAM-cell.png"
  />
  <figcaption>Diagram of a 6 transistor SRAM cell.<br>
  Nguồn: <a href="https://commons.wikimedia.org/wiki/File:6t-SRAM-cell.png" target="_blank">Wikimedia Commons</a>
  </figcaption>
</figure>

##### Các loại SRAM

Ba loại module SRAM được sử dụng để nâng cấp bộ nhớ đệm của hệ thống trong các máy tính cũ để chúng có thể lưu trữ nhiều dữ liệu hơn. Chúng ta đã nói về tốc độ cao mà SRAM mang lại ở trên. Một lý do khác khiến SRAM thường nhanh là nó cho phép bộ vi xử lý truy cập vào các nguồn bộ nhớ khác ngoài ổ cứng.

1. **Asynchronous static RAM (Async SRAM)**: đây là loại SRAM đầu tiên được sản xuất và thường được sử dụng để nâng cấp tiết kiệm chi phí cho các máy tính cũ. Việc nâng cấp có thể bao gồm tăng dung lượng bộ nhớ hoặc tốc độ.

1. **Synchronous burst static RAM (SBSRAM)**: loại SRAM hoạt động đồng bộ với clock hệ thống và hỗ trợ truyền dữ liệu theo từng đợt (burst). Tốc độ cao hơn ASRAM nhưng chi phí cũng cao hơn.

1. **Pipeline-burst static RAM SRAM - PBSRAM**: PBSRAM là phiên bản cải tiến của SBSRAM - hỗ trợ cơ chế pipeline giúp tăng thông lượng dữ liệu. Sau vòng truy cập đầu tiên, nó được thiết kế để cho phép các chu kỳ truy cập tiếp theo yêu cầu ít chu kỳ máy hơn, cho phép xuất ra nhiều dữ liệu hơn. PBSRAM là loại SRAM hiệu năng cao và được sử dụng phổ biến nhất trong các thiết kế SRAM truyền thống.



---

### DRAM (Dynamic Random Access Memory)

DRAM có tốc độ truy cập chậm hơn SRAM nhưng chi phí thấp hơn đáng kể, cho phép cung cấp dung lượng bộ nhớ lớn với giá thành hợp lý.

Khác với SRAM, dữ liệu trong DRAM được lưu dưới dạng điện tích trong các tụ điện. Điện tích này bị rò rỉ theo thời gian, vì vậy dữ liệu chỉ có thể được giữ trong khoảng từ vài mili giây đến vài giây nếu không được làm mới. Để tránh mất dữ liệu, hệ thống sử dụng một DRAM Controller thực hiện quá trình refresh liên tục. Bộ điều khiển này định kỳ đọc và ghi lại dữ liệu trong các ô nhớ DRAM để duy trì giá trị đã lưu.

Nhờ chi phí thấp và mật độ lưu trữ cao, DRAM thường được sử dụng khi hệ thống cần dung lượng bộ nhớ lớn, chẳng hạn như:

DRAM thường được lựa chọn cho các ứng dụng cần:
- **Dung lượng lớn.**
- Chi phí thấp trên mỗi GB.
- Mật độ lưu trữ cao.
- Làm bộ nhớ chính của hệ thống.

Các ứng dụng phổ biến sử dụng DRAM:
- Máy chủ (server).
- RAM chính trong máy tính.
- RAM ngoài cho các hệ thống nhúng hiệu năng cao.
- Bộ nhớ của các thiết bị chạy Linux hoặc Android.
- Bộ nhớ hệ thống (System Memory).
- Bộ nhớ kết nối trực tiếp với CPU Bus.
- Điện thoại thông minh và máy tính bảng.
- Máy tính xách tay (Laptop).
- Các thiết bị điện tử cần dung lượng bộ nhớ lớn.
- Card đồ họa (Graphics Card).

##### Cấu trúc của DRAM

DRAM dựa trên cấu trúc ô nhớ 1T1C, hay một transistor, một tụ điện. Các ô nhớ được sắp xếp theo dạng lưới hình chữ nhật. Một điện áp được đặt vào transistor trong ô nhớ DRAM. Điện áp này sau đó được gán một giá trị dữ liệu và được đặt trên một đường bit. Sau khi hoàn tất, nó sẽ nạp điện cho tụ điện lưu trữ. Mỗi bit dữ liệu được lưu trữ trong một tụ điện.

Theo thời gian, điện tích trong tụ điện có xu hướng xả hết khi transistor tắt. Đó là lý do tại sao dữ liệu được lưu trữ trong tụ điện phải được làm mới sau mỗi 64 mili giây. DRAM yêu cầu diện tích chip nhỏ hơn vì nó có ít linh kiện hơn. Do đó, một chip DRAM có dung lượng bộ nhớ lớn hơn so với SRAM. Ngoài ra, DRAM còn có đặc điểm của bộ nhớ ngoài chip.

<figure>
  <img
    src="{{ site.baseurl }}\assets\images\DRAM_Cell_Structure_(Model_of_Single_Circuit_Cell).png"
  />
  <figcaption>DRAM Cell Structure (Model of Single Circuit Cell)<br>
  Nguồn: <a href="https://commons.wikimedia.org/wiki/File:DRAM_Cell_Structure_(Model_of_Single_Circuit_Cell).PNG" target="_blank">Wikimedia Commons</a>
  </figcaption>
</figure>

##### Các loại DRAM

1. **Synchronous DRAM (SDRAM)** là loại DRAM hoạt động đồng bộ với xung nhịp của CPU. Nhờ việc đồng bộ này, bộ điều khiển bộ nhớ có thể biết chính xác thời điểm các chu kỳ xung nhịp của CPU diễn ra, từ đó phối hợp việc truyền dữ liệu hiệu quả hơn và cho phép CPU thực hiện được nhiều tác vụ hơn trong cùng một khoảng thời gian.

1. **Rambus DRAM (RDRAM)** là một loại DRAM từng được sử dụng khá phổ biến, đặc biệt trên các card đồ họa vào đầu những năm 2000. Tuy nhiên, công nghệ này hiện nay đã phần lớn bị thay thế bởi các thế hệ bộ nhớ mới hơn.

1. **Double Data Rate SDRAM (DDR SDRAM)** là phiên bản cải tiến của SDRAM, có khả năng gần như nhân đôi băng thông truyền dữ liệu. Điều này đạt được nhờ cơ chế truyền dữ liệu ở cả cạnh lên (rising edge) và cạnh xuống (falling edge) của tín hiệu xung nhịp. Qua thời gian, DDR SDRAM đã phát triển thành nhiều thế hệ như DDR2, DDR3, DDR4 và các phiên bản mới hơn.

1. **Fast Page Mode DRAM (FPM DRAM)** là một loại DRAM được thiết kế để tăng hiệu năng bằng cách tối ưu việc truy cập dữ liệu trong cùng một trang nhớ (memory page). Nhờ giảm thời gian truy cập lặp lại đến các địa chỉ nằm trong cùng một trang, FPM DRAM cho tốc độ cao hơn các loại DRAM đời trước.

1. **Extended Data Out DRAM (EDO DRAM)** là một cải tiến của FPM DRAM. Loại bộ nhớ này kéo dài thời gian dữ liệu được giữ trên bus dữ liệu sau khi đọc, cho phép bộ xử lý bắt đầu một chu kỳ truy cập mới trước khi chu kỳ trước hoàn toàn kết thúc. Nhờ đó, thời gian đọc bộ nhớ được cải thiện đáng kể trên các bộ vi xử lý thời kỳ đó, chẳng hạn như Intel Pentium.


---

### SDRAM (Synchronous Dynamic Random Access Memory)

SDRAM là loại DRAM được sử dụng phổ biến nhất hiện nay.

Điểm khác biệt của SDRAM là nó hoạt động đồng bộ với xung nhịp của bộ vi xử lý hoặc bộ điều khiển bộ nhớ. Trước khi phản hồi các yêu cầu đọc hoặc ghi, SDRAM sẽ đồng bộ với tín hiệu clock của hệ thống.

Nhờ cơ chế đồng bộ này, bộ xử lý có thể dự đoán chính xác thời điểm dữ liệu sẵn sàng, giúp thực hiện nhiều lệnh hơn trong cùng một khoảng thời gian và nâng cao hiệu năng tổng thể của hệ thống.

Các chuẩn bộ nhớ hiện đại như DDR \ DDR2 \ DDR3 \ DDR4 \ DDR5 đều là các biến thể phát triển từ SDRAM.

---

### Sự khác biệt giữa SRAM và DRAM

Mặc dù đều là Volatile Memory, SRAM và DRAM được thiết kế để phục vụ các nhu cầu khác nhau.
- **SRAM** được tối ưu cho tốc độ, vì vậy thường xuất hiện trong cache CPU và bộ nhớ nội của MCU.
- **DRAM** được tối ưu cho dung lượng và chi phí, nên thường được sử dụng làm bộ nhớ chính của hệ thống.
- **SDRAM** là dạng DRAM đồng bộ với clock hệ thống, giúp cải thiện hiệu năng và là nền tảng của các thế hệ DDR hiện nay.

<figure>
  <img
    src="{{ site.baseurl }}\assets\images\DRAM_and_SRAM_cell.png"
  />
  <figcaption>DRAM and SRAM cell<br>
  Nguồn: <a href="https://www.nationin.com/post/sram-and-dram-digital-electronics-with-composite-memory?srsltid=AfmBOoqGRX_YgFQ58GrNqM31pSO8L3Lii285BGVXcslNT74G7cOOTQyb" target="_blank">Exploring SRAM and DRAM: Dive into the Concept and Implementation in Digital Electronics with Composite Memory</a>
  </figcaption>
</figure>

<table class="hover-table">
  <thead>
    <tr>
      <th>Đặc điểm</th>
      <th>SRAM</th>
      <th>DRAM</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Loại bộ nhớ</td>
      <td>Volatile Memory</td>
      <td>Volatile Memory</td>
    </tr>
    <tr>
      <td>Tốc độ truy cập (Latency)</td>
      <td><strong>Rất nhanh (~10 ns)</strong></td>
      <td>Chậm hơn SRAM (~60 ns)</td>
    </tr>
    <tr>
      <td>Cơ chế lưu trữ</td>
      <td>Trạng thái của các transistor</td>
      <td>Điện tích trong tụ điện</td>
    </tr>
    <tr>
      <td>Cấu trúc ô nhớ</td>
      <td>6 transistor (6T SRAM)</td>
      <td>1 transistor + 1 tụ điện (1T1C)</td>
    </tr>
    <tr>
      <td>Diện tích silicon cho mỗi bit</td>
      <td>Lớn hơn do sử dụng 6 transistor/bit</td>
      <td>Nhỏ hơn đáng kể nhờ cấu trúc 1T1C</td>
    </tr>
    <tr>
      <td>Chi phí trên mỗi bit</td>
      <td>Cao hơn DRAM khoảng 10 – 100 lần</td>
      <td>Thấp hơn đáng kể</td>
    </tr>
    <tr>
      <td>Cần Refresh</td>
      <td>Không</td>
      <td>Có. Toàn bộ bộ nhớ thường phải được DRAM Controller refresh trong khoảng 32 – 64 ms</td>
    </tr>
    <tr>
      <td>Tiêu thụ điện năng</td>
      <td>Thấp hơn do không cần refresh</td>
      <td>Cao hơn do phải refresh liên tục</td>
    </tr>
    <tr>
      <td>Mật độ lưu trữ</td>
      <td>Thấp</td>
      <td>Cao hơn SRAM khoảng 4 – 10 lần trên cùng diện tích silicon</td>
    </tr>
    <tr>
      <td>Dung lượng điển hình</td>
      <td>Từ vài KB đến vài MB</td>
      <td><strong>Từ vài trăm MB đến hàng chục GB</strong></td>
    </tr>
    <tr>
      <td>Vị trí sử dụng phổ biến</td>
      <td>CPU Cache (L1/L2/L3 Cache), bộ nhớ nội MCU (On-chip memory), buffer tốc độ cao</td>
      <td>RAM hệ thống, DDR RAM, RAM ngoài SoC cho hệ thống nhúng hiệu năng cao</td>
    </tr>
    <tr>
      <td>Ưu điểm chính</td>
      <td>Tốc độ truy cập rất cao, độ trễ thấp</td>
      <td>Dung lượng lớn, giá thành thấp</td>
    </tr>
    <tr>
      <td>Nhược điểm chính</td>
      <td>Chi phí cao, dung lượng hạn chế, chiếm nhiều diện tích silicon</td>
      <td>Chậm hơn SRAM, cần refresh định kỳ và DRAM Controller</td>
    </tr>
    <tr>
      <td>Ví dụ thực tế</td>
      <td>L1 Cache: 32–128 KB, latency ~1 ns</td>
      <td>DDR4/DDR5: 4–64 GB, latency ~50–100 ns</td>
    </tr>
  </tbody>
</table>

Mức tiêu thụ điện năng của SRAM còn phụ thuộc vào tần số truy cập:
- Khi hoạt động ở tần số truy cậpthấp hoặc ở trạng thái chờ (idle), SRAM tiêu thụ rất ít điện năng.
- Khi hoạt động ở tần số truy cập cao, mức tiêu thụ điện năng của SRAM có thể tiệm cận với DRAM.

---

### SRAM và DRAM trong hệ thống nhúng

Nhiều hệ thống nhúng sử dụng cả hai loại RAM là SRAM và DRAM để tận dụng ưu điểm của từng loại.

Thông thường, hệ thống sẽ sử dụng một lượng nhỏ **SRAM** (đắt hơn nhưng có tốc độ truy cập rất cao) cho các phần xử lý quan trọng, nơi hiệu năng và độ trễ thấp là yếu tố then chốt. Các vùng này thường nằm trên đường dữ liệu quan trọng (critical paths) của hệ thống, chẳng hạn như bộ nhớ cache, vùng dữ liệu xử lý thời gian thực hoặc các tác vụ yêu cầu phản hồi nhanh.

Trong khi đó, một khối **DRAM** lớn hơn sẽ được sử dụng cho các chức năng khác cần nhiều dung lượng bộ nhớ nhưng không yêu cầu tốc độ truy cập cực cao.

Trong nhiều hệ thống, SRAM thường chiếm dưới 10% tổng dung lượng RAM, còn phần lớn dung lượng bộ nhớ là DRAM. Cách bố trí này giúp cân bằng giữa:
- Hiệu năng cao nhờ SRAM.
- Dung lượng lớn với chi phí hợp lý nhờ DRAM.

---

## ROM (Read-Only Memory)

ROM (Read-Only Memory) là bộ nhớ non-volatile và giống như một bộ nhớ lưu trữ thông tin vĩnh viễn. Nó cũng lưu trữ chương trình tải khởi động (bootstrap loader) để tải và khởi động hệ điều hành khi máy tính được bật.

### Masked ROM

Với Masked ROM, dữ liệu được ghi vào chip ngay trong quá trình sản xuất. Sau khi hoàn tất:
- Không thể sửa đổi dữ liệu.
- Không thể ghi lại.
- Không thể xóa.

Ưu điểm lớn nhất của Masked ROM là chi phí cực thấp khi sản xuất số lượng lớn. Do đó, Masked ROM thường được sử dụng trong các sản phẩm sản xuất hàng loạt có vòng đời dài nhiều năm.

Nhược điểm của Masked ROM là không thể cập nhật nội dung sau khi chip được sản xuất. Do đó, mọi lỗi trong firmware đều phải được xử lý bằng cách thay thế chip hoặc thiết kế lại sản phẩm.

---

### PROM (Programmable Read-Only Memory)

PROM là loại ROM được bán ở trạng thái chưa được lập trình. Người dùng hoặc nhà sản xuất có thể ghi dữ liệu vào chip một lần duy nhất. Sau khi ghi:
- Dữ liệu được cố định vĩnh viễn.
- Không thể xóa hoặc ghi lại.

PROM thường được sử dụng để lưu:
- Firmware.
- Hằng số trong chương trình.
- Thông tin cấu hình cố định: serial number, cấu hình vô tuyến (radio configuration) hoặc các dữ liệu khác mà người dùng không được phép thay đổi.

PROM đang dần trở nên lỗi thời vì PROM Cần điện áp cao để lập trình và vận hành; đồng thời quy trình lập trình một lần duy nhất gây khó khăn trong sản xuất và quản lý chuỗi cung ứng (logistics).
Điều này đặc biệt bất tiện đối với các công ty mua chip nhớ từ bên thứ ba rồi tích hợp vào sản phẩm của mình.

---

## So sánh các loại bộ nhớ trong hệ thống nhúng

<table class="hover-table">
  <thead>
    <tr>
      <th>Nhóm bộ nhớ</th>
      <th>Loại bộ nhớ</th>
      <th>Đặc điểm chính</th>
      <th>Ưu điểm</th>
      <th>Hạn chế</th>
      <th>Ứng dụng điển hình</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3">RAM<br>(Volatile Memory)</td>
      <td>SRAM<br>(Static RAM)</td>
      <td>
        Lưu dữ liệu bằng các transistor, không cần refresh.
      </td>
      <td>
        Tốc độ truy cập rất cao, độ trễ thấp, tiêu thụ ít điện năng hơn DRAM.
      </td>
      <td>
        Giá thành cao, mật độ lưu trữ thấp, dung lượng hạn chế.
      </td>
      <td>
        CPU Cache (L1/L2/L3), SRAM nội MCU, buffer tốc độ cao.
      </td>
    </tr>
    <tr>
      <td>DRAM<br>(Dynamic RAM)</td>
      <td>
        Lưu dữ liệu bằng tụ điện và transistor, cần refresh định kỳ.
      </td>
      <td>
        Chi phí thấp, dung lượng lớn, mật độ lưu trữ cao.
      </td>
      <td>
        Chậm hơn SRAM, cần bộ điều khiển refresh.
      </td>
      <td>
        RAM hệ thống, RAM ngoài cho SoC và các thiết bị nhúng hiệu năng cao.
      </td>
    </tr>
    <tr>
      <td>SDRAM<br>(Synchronous DRAM)</td>
      <td>
        DRAM hoạt động đồng bộ với clock/bus của hệ thống.
      </td>
      <td>
        Hiệu năng cao hơn DRAM thông thường, mật độ lưu trữ lớn.
      </td>
      <td>
        Tiêu thụ điện năng cao hơn SRAM, vẫn cần refresh.
      </td>
      <td>
        DDR SDRAM, bộ nhớ chính của PC, SoC và các hệ thống nhúng chạy Linux.
      </td>
    </tr>
    <tr>
      <td rowspan="2">ROM<br>(Non-Volatile Memory)</td>
      <td>Masked ROM</td>
      <td>
        Dữ liệu được ghi sẵn trong quá trình sản xuất chip.
      </td>
      <td>
        Chi phí cực thấp khi sản xuất số lượng lớn, độ tin cậy cao.
      </td>
      <td>
        Không thể thay đổi hoặc cập nhật nội dung sau khi sản xuất.
      </td>
      <td>
        Thiết bị sản xuất hàng loạt có firmware cố định.
      </td>
    </tr>
    <tr>
      <td>PROM<br>(Programmable ROM)</td>
      <td>
        Có thể lập trình một lần duy nhất sau khi mua.
      </td>
      <td>
        Cho phép ghi dữ liệu theo nhu cầu trước khi đưa vào sử dụng.
      </td>
      <td>
        Không thể xóa hoặc ghi lại, yêu cầu điện áp lập trình cao.
      </td>
      <td>
        Lưu firmware, serial number, thông tin cấu hình cố định.
      </td>
    </tr>
  </tbody>
</table>

---

# Các bộ nhớ mang đặc tính của cả bộ nhớ khả biến và không khả biến

**Hybrid Memory** (bộ nhớ lai) là nhóm bộ nhớ kết hợp khả năng ghi/xóa và cập nhật dữ liệu nhiều lần của Volatile Memory với khả năng lưu giữ dữ liệu khi mất nguồn điện của Non-Volatile Memory. Nhờ đó, chúng vừa linh hoạt trong việc cập nhật dữ liệu, vừa có thể lưu trữ dữ liệu lâu dài mà không cần nguồn điện. Các loại Hybrid Memory phổ biến gồm EEPROM, Flash, NVRAM, FRAM và PCM.

---

## EEPROM (Electrically Erasable Programmable Read-Only Memory)

EEPROM là loại bộ nhớ có thể được xóa và lập trình lại bằng tín hiệu điện. Tuy nhiên, nó có số chu kỳ ghi/xóa giới hạn, thường vào khoảng 10.000 lần. 

Nó thường được dùng để 
- Lưu trữ firmware trong quá trình phát triển sản phẩm.
- Lưu các tham số cấu hình cần giữ lại sau khi mất điện.

Đặc điểm nổi bật
- Non-Volatile Memory.
- Có thể ghi/xóa bằng điện.
- Cho phép ghi theo từng byte.
- Phù hợp với dữ liệu cấu hình có dung lượng nhỏ.

EEPROM đặc biệt hữu ích đối với các sản phẩm cần cập nhật firmware sau khi đã được bán cho khách hàng.

---

## Flash Memory

Flash Memory là loại bộ nhớ được sử dụng trong hệ thống nhúng phổ biến hơn bất kỳ loại non-volatile memory hoặc hybrid memory (bộ nhớ lai) nào khác. Flash gồm 2 loại là NAND Flash và NOR Flash.

Flash có các ưu điểm:
- Tốc độ đọc nhanh.
- Giá thành thấp.
- Dung lượng lớn.
- Phù hợp để lưu trữ các tệp dữ liệu lớn.

Tương tự EEPROM, Flash cũng có thể được lập trình lại bằng điện. Tuy nhiên:
- EEPROM cho phép ghi/xóa theo từng byte.
- Flash thường phải ghi/xóa theo từng sector hoặc block.

---

### NAND Flash

Đây là loại Flash được sử dụng phổ biến nhất. NAND Flash có kích thước nhỏ và mật độ lưu trữ cao.
Ứng dụng: USB Flash Drive, Thẻ nhớ SD, SSD (Solid State Drive).

---

### NOR Flash

NOR Flash thường được sử dụng để lưu firmware và hỗ trợ Execute-In-Place (XIP), tức CPU có thể thực thi mã trực tiếp từ Flash mà không cần sao chép vào RAM trước.

So sánh với NAND Flash:
- Tốc độ đọc nhanh hơn.
- Độ bền ghi/xóa thường thấp hơn.
- Giá thành cao hơn.

---

## NVRAM (Non-Volatile Random Access Memory)

NVRAM là loại non-volatile RAM thường được sử dụng trong các hệ thống mà *thời gian khởi động* là yếu tố cực kỳ quan trọng. Ví dụ như thiết bị công nghiệp, hệ thống viễn thông và thiết bị y tế.

Đặc điểm:
- Truy cập ngẫu nhiên như RAM.
- Giữ dữ liệu lâu dài như ROM.
- Tốc độ cao.
- Giá thành đắt.

---

## FRAM (Ferroelectric Random Access Memory)

FRAM là một loại non-volatile RAM sử dụng vật liệu sắt điện (ferroelectric) để lưu trữ dữ liệu.

So với EEPROM và Flash:
- Tốc độ đọc nhanh hơn.
- Tiêu thụ ít điện năng hơn.
- Hỗ trợ số chu kỳ ghi/xóa lớn hơn rất nhiều.

Do đó, FRAM đôi khi được sử dụng để thay thế EEPROM hoặc Flash trong các ứng dụng cần ghi dữ liệu thường xuyên. Ví dụ như:
- Bộ ghi dữ liệu (Data Logger).
- Đồng hồ thông minh.
- Thiết bị IoT.

---

## PCM (Phase Change Memory)

PCM (còn gọi là PCRAM) là bộ nhớ non-volatile lưu trữ dữ liệu bằng cách thay đổi trạng thái vật lý của vật liệu chuyển pha (phase-change material), thường là vật liệu chalcogenide như GST (Ge-Sb-Te).

Ưu điểm:
- Giữ được dữ liệu khi mất điện (trong nhiều thập kỷ, thậm chí lâu hơn).
- Có tốc độ ghi nhanh hơn Flash.
- Tiêu thụ ít điện năng hơn Flash.
- Hỗ trợ số chu kỳ ghi/xóa cao hơn trong nhiều trường hợp.
- Có hiệu năng đọc/ghi rất cao, tiệm cận SDRAM

Do đó, PCM được xem là một ứng cử viên tiềm năng để thay thế Flash Memory trong tương lai.

---

## So sánh các bộ nhớ mang đặc tính của cả bộ nhớ khả biến và không khả biến

<table class="hover-table">
  <thead>
    <tr>
      <th>Loại bộ nhớ</th>
      <th>Đơn vị Read/Write/Erase</th>
      <th>Ưu điểm chính</th>
      <th>Hạn chế chính</th>
      <th>Ứng dụng phổ biến</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>EEPROM</td>
      <td>R/W/E: Byte / Word</td>
      <td>Dễ cập nhật dữ liệu, hỗ trợ ghi/xóa từng byte</td>
      <td>Số chu kỳ ghi/xóa giới hạn (~10.000 lần), dung lượng nhỏ</td>
      <td>Firmware, tham số cấu hình, serial number</td>
    </tr>
    <tr>
      <td>Flash Memory</td>
      <td>R/W: Byte / Word / Page<br>E: Block / Sector</td>
      <td>Dung lượng lớn, giá thành thấp, tốc độ đọc cao</td>
      <td>Phải xóa theo sector hoặc block trước khi ghi</td>
      <td>Firmware, SSD, USB, thẻ nhớ</td>
    </tr>
    <tr>
      <td>NAND Flash</td>
      <td>R/W: Page<br>E: Block</td>
      <td>Mật độ lưu trữ cao, chi phí thấp</td>
      <td>Không hỗ trợ Execute-In-Place (XIP), độ trễ truy cập ngẫu nhiên cao hơn NOR</td>
      <td>SSD, USB Flash Drive, SD Card</td>
    </tr>
    <tr>
      <td>NOR Flash</td>
      <td>R/W: Byte / Word<br>E: Block / Sector</td>
      <td>Đọc nhanh, hỗ trợ Execute-In-Place (XIP)</td>
      <td>Đắt hơn NAND Flash, dung lượng thường nhỏ hơn</td>
      <td>Firmware MCU/SoC, Bootloader</td>
    </tr>
    <tr>
      <td>NVRAM</td>
      <td>R/W: Byte</td>
      <td>Tốc độ cao, giữ dữ liệu khi mất điện</td>
      <td>Chi phí cao</td>
      <td>Thiết bị yêu cầu khởi động nhanh, hệ thống công nghiệp</td>
    </tr>
    <tr>
      <td>FRAM</td>
      <td>R/W: Byte / Word</td>
      <td>Ghi nhanh, tiêu thụ điện năng thấp, tuổi thọ ghi/xóa rất cao</td>
      <td>Dung lượng còn hạn chế, giá thành cao hơn Flash</td>
      <td>Data Logger, IoT, thiết bị đo lường</td>
    </tr>
    <tr>
      <td>PCM (PCRAM)</td>
      <td>R/W: Byte / Word</td>
      <td>Tốc độ đọc/ghi gần SDRAM, tiêu thụ điện năng thấp hơn Flash</td>
      <td>Chi phí cao, công nghệ chưa phổ biến rộng rãi</td>
      <td>Bộ nhớ thế hệ mới, tiềm năng để thay thế Flash</td>
    </tr>
  </tbody>
</table>

---

# External Memory (bộ nhớ ngoài)

Mặc dù SSD và SD Card thường được liệt kê như các loại bộ nhớ ngoài (External Memory), chúng không phải là công nghệ bộ nhớ mới. Về bản chất, cả hai đều được xây dựng trên nền Flash Memory, kết hợp với bộ điều khiển và giao tiếp phần cứng phù hợp để phục vụ nhu cầu lưu trữ dữ liệu dung lượng lớn.

---

## SSD (Solid-State Drive)

SSD là thiết bị lưu trữ không sử dụng các bộ phận cơ khí chuyển động như ổ cứng HDD truyền thống. Trong các hệ thống nhúng, SSD được sử dụng khá phổ biến để cung cấp dung lượng lưu trữ lớn với tốc độ truy cập cao.

SSD được xây dựng chủ yếu dựa trên Flash Memory (thường là **NAND Flash**) và được quản lý bởi một bộ điều khiển (SSD Controller) để thực hiện các chức năng như:
- Quản lý khối dữ liệu.
- Wear leveling (cân bằng hao mòn).
- Sửa lỗi dữ liệu (Error Correction).
- Quản lý ghi/xóa bộ nhớ Flash.

Đặc điểm:
- Non-Volatile Memory.
- Dung lượng lớn.
- Tốc độ đọc/ghi cao.
- Độ bền cơ học tốt do không có bộ phận chuyển động.

<figure>
  <img
    src="{{ site.baseurl }}\assets\images\Difference_between_HDD_AND_SSD.png"
  />
  <figcaption>Do không có các bộ phận chuyển động cơ học, SSD cũng ít có khả năng bị hư hỏng do rơi hoặc va đập hơn. Ngoài ra, SSD tiêu thụ ít điện năng hơn, giúp kéo dài thời lượng pin cho các thiết bị sử dụng pin như laptop.<br>
  Nguồn: <a href="https://www.geeksforgeeks.org/computer-organization-architecture/introduction-to-solid-state-drive-ssd/" target="_blank">Introduction to Solid-State Drive (SSD)</a>
  </figcaption>
</figure>

<table class="hover-table">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>HDD</th>
      <th>SSD</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Long-term Storage</td>
      <td>Đáng tin cậy hơn cho việc lưu trữ dữ liệu dài hạn.</td>
      <td>Kém phù hợp hơn cho lưu trữ dài hạn do nguy cơ mất dữ liệu nếu không được cấp nguồn trong thời gian dài (ví dụ trên 1 năm).</td>
    </tr>
    <tr>
      <td>Access Speed</td>
      <td>Tốc độ truy cập dữ liệu chậm hơn SSD.</td>
      <td>Tốc độ truy cập dữ liệu cao hơn đáng kể so với HDD.</td>
    </tr>
    <tr>
      <td>Performance</td>
      <td>Hiệu năng có thể bị ảnh hưởng do hiện tượng phân mảnh dữ liệu (fragmentation).</td>
      <td>Hiệu năng không bị ảnh hưởng bởi hiện tượng phân mảnh dữ liệu.</td>
    </tr>
    <tr>
      <td>Suitable For</td>
      <td>
        <ul>
          <li>Lưu trữ dữ liệu dung lượng lớn.</li>
          <li>Lưu trữ dữ liệu dài hạn.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Truy xuất dữ liệu nhanh.</li>
          <li>Laptop hoặc máy tính để bàn nhờ tiêu thụ ít điện năng và kích thước nhỏ gọn.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

---

## SD Card (Secure Digital Card)

SD Card là một loại bộ nhớ không khả biến được sử dụng rộng rãi trong các thiết bị di động và hệ thống nhúng.

Bên trong SD Card thực chất cũng sử dụng NAND Flash Memory kết hợp với một bộ điều khiển để quản lý dữ liệu.

Đặc điểm
- Non-Volatile Memory.
- Dung lượng từ vài GB đến hàng trăm GB.
- Kích thước nhỏ gọn.
- Dễ dàng tháo lắp và thay thế.
- Chi phí thấp.

Ứng dụng phổ biến: Máy ảnh kỹ thuật số, Điện thoại di động, Thiết bị IoT, Bộ ghi dữ liệu (Data Logger), Các hệ thống nhúng cần mở rộng dung lượng lưu trữ.

---






---

# Các loại bộ nhớ khác

**Cache Memory**: Bộ  nhớ cache  được sử dụng để lưu trữ dữ liệu chương trình đang được thực thi trong CPU. Bất cứ khi nào CPU cần truy cập bộ nhớ, nó sẽ kiểm tra bộ nhớ cache trước. Nếu dữ liệu không được tìm thấy trong bộ nhớ cache, CPU sẽ chuyển sang bộ nhớ chính. 

**Registers**: Đây là những vùng nhớ nhỏ, cực nhanh bên trong CPU được sử dụng để lưu trữ dữ liệu đang được xử lý. Các thanh ghi rất quan trọng để thực thi các lệnh một cách hiệu quả.

**Tertiary memory (Bộ nhớ thứ cấp)**: đề cập đến các thiết bị lưu trữ được sử dụng để sao lưu và lưu trữ dữ liệu, chẳng hạn như băng từ (magnetic tapes).

**Offline memory (Bộ nhớ ngoại tuyến)**: là bộ nhớ không thể truy cập trực tiếp bởi máy tính (ví dụ: external hard drives, optical discs (đĩa quang)) nhưng dữ liệu có thể được truy xuất khi được kết nối.

**Disk storage**:  là một cơ chế lưu trữ dữ liệu dựa trên một đĩa quay. Quá trình ghi dữ liệu sử dụng nhiều thay đổi điện tử, từ tính, quang học hoặc cơ học khác nhau đối với lớp bề mặt của đĩa. Ổ đĩa là một thiết bị thực hiện cơ chế lưu trữ. Tùy theo công nghệ lưu trữ, disk storage có thể được chia thành các loại chính sau:

<table class="hover-table">
  <thead>
    <tr>
      <th>Loại</th>
      <th>Công nghệ</th>
      <th>Đặc điểm</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>HDD (Hard Disk Drive)</strong></td>
      <td>Đĩa từ quay cơ học</td>
      <td>Dung lượng lớn, giá rẻ, tốc độ chậm hơn SSD</td>
    </tr>
    <tr>
      <td><strong>SSD (Solid State Drive)</strong></td>
      <td>Bộ nhớ flash (NAND Flash)</td>
      <td>Tốc độ cao, không có bộ phận chuyển động, giá cao hơn HDD</td>
    </tr>
    <tr>
      <td><strong>SSHD (Solid State Hybrid Drive)</strong></td>
      <td>HDD + bộ nhớ flash</td>
      <td>Kết hợp dung lượng lớn của HDD và tốc độ của SSD</td>
    </tr>
    <tr>
      <td><strong>Optical Storage</strong></td>
      <td>Đĩa quang</td>
      <td>Ví dụ: CD, DVD, Blu-ray</td>
    </tr>
    <tr>
      <td><strong>Flash Storage</strong></td>
      <td>Bộ nhớ flash</td>
      <td>USB, thẻ nhớ SD, microSD, ổ cứng di động SSD</td>
    </tr>
    <tr>
      <td><strong>Magnetic Tape</strong></td>
      <td>Băng từ</td>
      <td>Chủ yếu dùng sao lưu dữ liệu trong doanh nghiệp</td>
    </tr>
  </tbody>
</table>

Trong các tài liệu hiện đại, mặc dù thuật ngữ "disk storage" vẫn được dùng rộng rãi, nhưng nó không còn chỉ riêng thiết bị dạng "đĩa" nữa. Ví dụ:
- HDD: thật sự dùng đĩa từ (disk).
- SSD: không có đĩa vật lý nhưng vẫn được xếp vào disk storage vì đóng vai trò lưu trữ lâu dài.
- USB Flash Drive và thẻ SD: cũng là storage nhưng thường được gọi cụ thể là flash storage.

Do đó, khi đọc tài liệu về kiến trúc máy tính, ta có thể hiểu **Disk storage = Secondary Storage = Non-Volatile Storage**

---

# Tổ chức bộ nhớ (Memory Organization)

**Nạp chương trình (Program Load):** Khi một chương trình được thực thi, nó sẽ được tải từ bộ nhớ lưu trữ thứ cấp (HDD/SSD) vào bộ nhớ chính (RAM). Một phần của chương trình cũng có thể được nạp vào bộ nhớ đệm (cache) để tăng tốc độ thực thi.

**Truy cập dữ liệu (Accessing Data):** CPU truy cập dữ liệu thông qua các thanh ghi (register) và bộ nhớ đệm (cache) để thực hiện các phép tính nhanh chóng. Nếu dữ liệu không có trong cache, CPU sẽ lấy dữ liệu từ RAM. Nếu dữ liệu cũng không có trong RAM, hệ thống sẽ truy xuất dữ liệu từ bộ nhớ lưu trữ thứ cấp.

**Hoán đổi và bộ nhớ ảo (Swapping and Virtual Memory):** Khi hệ thống hết bộ nhớ RAM vật lý, một số phần của chương trình (gọi là các *pages*) có thể được chuyển tạm thời ra bộ nhớ lưu trữ thứ cấp. Quá trình này được gọi là **phân trang (paging)** và được quản lý bởi trình quản lý bộ nhớ của hệ điều hành.

---

Tham khảo:
1. [Memory Options for Embedded Systems: How to Select the Right Memory Configuration - Qt.io](https://www.qt.io/software-insights/how-to-select-a-memory-configuration-for-embedded-systems)
2. [SRAM vs DRAM: Difference Between SRAM & DRAM Explained - Enterprise Storage Forum](https://www.enterprisestorageforum.com/hardware/sram-vs-dram/#sram-types)
3. [Memory Organisation in Computer Architecture - Geeksforgeeks](https://www.geeksforgeeks.org/computer-organization-architecture/memory-organisation-in-computer-architecture/)
4. [Disk storage](https://en.wikipedia.org/wiki/Disk_storage)