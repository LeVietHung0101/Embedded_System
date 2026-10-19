---
title: ECC
parent: Debug
nav_order: 3
---

<h1>Error Correction Code (ECC)</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

# 1. Tổng quan

# 1.1. ECC là gì?

{: .note}
> **Error-Correcting Code (ECC)** là các thuật toán cho phép phát hiện và sửa lỗi trong truyền hoặc lưu trữ dữ liệu. Nó thêm các bit dư thừa (redundant bits) vào dữ liệu gốc, giúp xác định và sửa lỗi, đảm bảo tính toàn vẹn của dữ liệu (data integrity). Bên nhận dữ liệu sẽ so sánh dữ liệu nhận được với redundant bits để phát hiện và sửa lỗi do noise, interference hoặc các yếu tố khác. 

ECC thường dùng trong **RAM** (Random Access Memory) của servers, trong các cơ sở dữ liệu, hệ thống an toàn quan trọng như ô tô, hàng không, quốc phòng, và high-performance workstations yêu cầu data integrity cao. ECC memory modules tích hợp tính năng sửa lỗi để phát hiện và sửa data corruption theo thời gian thực.

Các kỹ thuật phổ biến tạo redundant bits gồm parity checks, checksums, [Hamming codes]({{ "/docs/Embedded_Systems_Architecture/Debug/ECC/#22-hamming-code" | relative_url }}), Reed-Solomon codes, BCH codes. Chúng khác nhau về cách encode/decode dữ liệu và hiệu quả phát hiện/sửa lỗi. Lựa chọn phụ thuộc vào loại lỗi dự kiến và yêu cầu hệ thống.

ECC có thể phát hiện các lỗi sau:
- **Hard errors**: là lỗi vĩnh viễn và do các yếu tố vật lý như nhiệt độ hoặc biến đổi điện áp, và áp lực lên phần cứng gây ra. Chúng dẫn đến hỏng hóc vĩnh viễn của mạch phần cứng nên *chỉ có thể được phát hiện mà không thể sửa bằng ECC*.
- **Soft errors**: là lỗi tạm thời và do nhiễu điện từ và thậm chí cả tia vũ trụ gây ra. Soft errors có thể được phát hiện và cũng có thể được sửa chữa bởi phần cứng ngay cả khi ứng dụng không biết.

ECC hiệu quả trong sửa **single-bit errors** (một bit bị đảo do noise hoặc interference). Một số thuật toán cũng sửa được **multi-bit errors**, tùy thiết kế. ECC không sửa được mọi loại lỗi nếu vượt quá khả năng của thuật toán.

Do có thể phát hiện, sửa chữa hoặc chặn đứng các bit bị lỗi ngay tại gốc, ECC ngăn chặn hiện tượng lỗi dây chuyền (cascading failures), từ đó đảm bảo các thành phần trong hệ thống đạt được **FFI**.

<details markdown="block">
<summary><i>Noise & Interference</i></summary>

> **Noise**: Nhiễu ngẫu nhiên (thường do nhiệt, điện từ trường môi trường) làm thay đổi tín hiệu, gây lỗi bit trong truyền hoặc lưu trữ dữ liệu.
> 
> **Interference**: Nhiễu do tín hiệu ngoài (từ thiết bị khác, sóng radio,...) chồng lấn lên tín hiệu gốc, làm méo hoặc làm hỏng dữ liệu.
{: .codeBlock }
</details>

<details markdown="block">
<summary><i>High-performance workstations</i></summary>

> **High-performance workstations** là máy tính để bàn chuyên dụng, cấu hình mạnh (CPU, GPU, RAM cao), dùng cho các công việc đòi hỏi tính toán nặng như thiết kế 3D, mô phỏng kỹ thuật, xử lý dữ liệu lớn hoặc AI.
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>FFI</i></summary>

> **Freedom from Interference - FFI** (*Tự do khỏi sự nhiễu loạn*): Là việc đảm bảo rằng một lỗi xảy ra ở một thành phần/vùng dữ liệu này không được phép lây lan, làm hỏng hoặc gây ảnh hưởng xấu đến các thành phần/vùng dữ liệu khác.
>
> Trong các hệ thống điện - điện tử an toàn (ví dụ: bộ điều khiển ô tô tự lái), nhiều phần mềm hoặc chức năng có mức độ quan trọng về an toàn khác nhau (ASIL khác nhau) cùng chạy chung trên một vi điều khiển (MCU) hoặc dùng chung phần cứng (như thanh ghi, RAM, bộ nhớ Flash). Nếu không có FFI, một lỗi nhỏ ở tác vụ giải trí (không quan trọng) có thể làm hỏng vùng nhớ của tác vụ phanh xe (cực kỳ quan trọng), dẫn đến thảm họa.
{: .codeBlock }
</details>

---

# 1.2. Lợi ích và hạn chế

## 1.2.1. Lợi ích

- Tăng độ tin cậy của dữ liệu và tính ổn định của hệ thống.
- Ngăn nguy cơ hỏng dữ liệu, giảm nguy cơ hệ thống bị treo.
- Đảm bảo việc truyền tải và lưu trữ dữ liệu quan trọng một cách chính xác, duy trì tính liên tục và hiệu suất hoạt động.

ECC đảm bảo giao tiếp tin cậy và tính toàn vẹn của dữ liệu trong các hệ thống quan trọng cần độ chính xác cao (như servers, networking equipment, storage devices, computer memory, communication protocols), nơi mà lỗi dữ liệu có thể gây lỗi hệ thống nghiêm trọng, dữ liệu bị xâm phạm hoặc mất.

## 1.2.2. Hạn chế

- ECC làm tăng overhead trong việc truyền hoặc lưu trữ dữ liệu do các redundant bits được thêm vào dữ liệu gốc; gây ảnh hưởng nhẹ đến hiệu suất hệ thống.
- Vẫn có xác suất nhỏ ECC không phát hiện và sửa lỗi.

ECC giảm đáng kể khả năng xảy ra lỗi nhưng không loại bỏ hoàn toàn. Mức độ sửa lỗi phụ thuộc vào thuật toán cụ thể và loại lỗi. Chất lượng phần cứng và điều kiện môi trường cũng ảnh hưởng hiệu quả. ECC là công cụ hữu ích nâng cao độ tin cậy và tính toàn vẹn của dữ liệu nhưng không phải tuyệt đối.

---

## 2. ECC và các phương pháp phát hiện/sửa lỗi khác

## 2.1. Parity checking

**Parity checking** là phương pháp phát hiện lỗi đơn giản được dùng trong SRAM. Trong quá trình ghi dữ liệu (data words), thuật toán này dùng các bit data word để tạo ra các parity bit (bit kiểm tra chẵn lẻ), rồi kết hợp chúng vào các data words cuối cùng, trước khi lưu trữ vào mảng bộ nhớ bên trong (internal memory array). Hạn chế của thuật toán này là chỉ có thể phát hiện lỗi chứ không thể sửa lỗi.

{: .highlight }
> Ví dụ, sử dụng <strong>Even Parity</strong> với dữ liệu 4 bit:
> 
> Dữ liệu ban đầu là <code>1011</code> có 3 bit <code>1</code>, nên parity bit = <code>1</code> để tổng số bit <code>1</code> thành 4 (chẵn).
>
> Công thức tính Even Parity: $P = D_0 \oplus D_1 \oplus D_2 \oplus D_3$ ($\oplus$ là phép XOR)
>
> Với dữ liệu <code>1011</code>: $P = 1 \oplus 0 \oplus 1 \oplus 1 = 1$
>
> Kiểm tra khi đọc:
> - Dữ liệu nhận được là <code>10111</code> (4 bit dữ liệu và 1 parity bit): tổng có 4 bit <code>1</code>, nên parity hợp lệ.
> - Nếu một bit dữ liệu bị đảo, chẳng hạn <code>1011</code> thành <code>1001</code>, tổng số bit <code>1 của dữ liệu nhận được trở thành lẻ. Parity check phát hiện lỗi.

Ngược lại, **ECC** bổ sung nhiều redundant bits để vừa phát hiện vừa sửa lỗi, từ đó mang lại mức độ toàn vẹn dữ liệu cao hơn. Mỗi khi dữ liệu được đọc ra, các parity bit của dữ liệu đã lưu trữ sẽ được so sánh với các parity bit của dữ liệu vừa đọc ra. Nếu xảy ra lỗi ở một bit duy nhất, quá trình so sánh này sẽ phát hiện ra lỗi đó. Do đó, ECC cho phép phát hiện các lỗi mềm (soft errors) với chi phí tối thiểu xét về độ phức tạp của mạch và độ rộng bộ nhớ.

---

## 2.2. Hamming code

**Hamming code** là một trong những thuật toán phổ biến nhất để phát hiện và sửa lỗi single-bit bằng cách sử dụng nhiều parity check bits. So với các cơ chế ECC khác (chẳng hạn như *Viterbi decoding* và *Reed-Solomon codes*), mạch triển khai Hamming Code có độ phức tạp thấp hơn, mức tiêu thụ năng lượng thấp hơn và thời gian giải mã ngắn hơn.

Hamming Code được biểu diễn dưới dạng $(n, k)$, trong đó các data words gồm $k$ bit được ánh xạ thành các codewords gồm $n$ bit.

Thuật toán Hamming Code dùng để sửa lỗi một bit (**Single-Error Correction - SEC**) yêu cầu $N+1$ parity bits cho mỗi $2^N$ bit dữ liệu.

{: .highlight }
> Ví dụ, <strong>Hamming Code (7,4)</strong> sử dụng 4 data bits và 3 parity bits.
> 
> <strong>Bước 1: Gán dữ liệu</strong><br>
> Giả sử dữ liệu đầu vào là <code>1011</code>.
> - Các parity bits được đặt tại những vị trí là lũy thừa của 2: 1, 2 và 4.
> - Các data bits nằm tại vị trí còn lại là 3, 5, 6 và 7.
> 
> <table class="hover-table">
>   <tbody>
>     <tr>
>       <td><strong>Vị trí</strong></td>
>       <td>1</td>
>       <td>2</td>
>       <td>3</td>
>       <td>4</td>
>       <td>5</td>
>       <td>6</td>
>       <td>7</td>
>     </tr>
>     <tr>
>       <td><strong>Loại bit</strong></td>
>       <td>$P_1$</td>
>       <td>$P_2$</td>
>       <td>$D_1$</td>
>       <td>$P_4$</td>
>       <td>$D_2$</td>
>       <td>$D_3$</td>
>       <td>$D_4$</td>
>     </tr>
>     <tr>
>       <td><strong>Giá trị</strong></td>
>       <td>?</td>
>       <td>?</td>
>       <td>1</td>
>       <td>?</td>
>       <td>0</td>
>       <td>1</td>
>       <td>1</td>
>     </tr>
>   </tbody>
> </table>
> 
> <strong>Bước 2: Tính Parity Check Bits</strong><br>
> Mỗi parity bit kiểm tra một tập hợp vị trí cụ thể:
> 
> <table class="hover-table">
>   <tbody>
>     <tr>
>       <td><strong>Parity bit</strong></td>
>       <td><strong>Các vị trí được kiểm tra</strong></td>
>       <td><strong>Phép tính (Even Parity)</strong></td>
>     </tr>
>     <tr>
>       <td>$P_1$</td>
>       <td>1, 3, 5, 7</td>
>       <td>$P_1 = 1 \oplus 0 \oplus 1 = 0$</td>
>     </tr>
>     <tr>
>       <td>$P_2$</td>
>       <td>2, 3, 6, 7</td>
>       <td>$P_2 = 1 \oplus 1 \oplus 1 = 1$</td>
>     </tr>
>     <tr>
>       <td>$P_4$</td>
>       <td>4, 5, 6, 7</td>
>       <td>$P_4 = 0 \oplus 1 \oplus 1 = 0$</td>
>     </tr>
>   </tbody>
> </table>
> 
> Codeword tạo thành là <code>0110011</code>.
> 
> <strong>Bước 3: Phát hiện và sửa lỗi</strong><br>
> Giả sử bit tại vị trí 6 bị đảo từ 1 thành 0 trong quá trình lưu trữ hoặc truyền dữ liệu.
> - Codeword ban đầu: <code>0110011</code>
> - Codeword nhận được: <code>0110001</code>
> 
> Khi đọc dữ liệu, bộ giải mã tính lại parity cho từng nhóm để tạo <i>syndrome</i>.
> 
> 
> <table class="hover-table">
>   <tbody>
>     <tr>
>       <td><strong>Syndrome bit</strong></td>
>       <td><strong>Các vị trí được kiểm tra</strong></td>
>       <td><strong>Phép tính</strong></td>
>     </tr>
>     <tr>
>       <td>$S_1$</td>
>       <td>1, 3, 5, 7</td>
>       <td>$S_1 = 0 \oplus 1 \oplus 0 \oplus 1 = 0$</td>
>     </tr>
>     <tr>
>       <td>$S_2$</td>
>       <td>2, 3, 6, 7</td>
>       <td>$S_2 = 1 \oplus 1 \oplus 0 \oplus 1 = 1$</td>
>     </tr>
>     <tr>
>       <td>$S_4$</td>
>       <td>4, 5, 6, 7</td>
>       <td>$S_4 = 0 \oplus 0 \oplus 0 \oplus 1 = 1$</td>
>     </tr>
>   </tbody>
> </table>
> 
> Ghép các kết quả theo thứ tự $S_4S_2S_1$, ta được: $$S = 110_2 = 6_{10}$$
> 
> Syndrome bằng <code>110</code> cho biết bit tại vị trí 6 bị lỗi. Bộ giải mã đảo bit 6 từ 0 về 1:
> - Codeword sau sửa: <code>0110011</code>
> - Dữ liệu khôi phục: <code>1011</code>

---

## 2.3. SECDED

**SECDED (Single-Error Correction, Double-Error Detection)** là cơ chế ECC thường được triển khai bằng cách mở rộng Hamming Code với một parity bit.

Nguyên lý hoạt động:
- **Single-bit error**: Phát hiện và sửa được lỗi tại một bit.
- **Double-bit error**: Phát hiện được hai bit bị lỗi, nhưng không thể sửa chính xác cả hai bit bằng SECDED cơ bản.
- **Không có lỗi**: Dữ liệu vượt qua kiểm tra ECC.

{: .codeBlock }
> <i><strong>Hamming code</strong> có khoảng cách tối thiểu $k = 3$, điều này có nghĩa là bộ giải mã có thể phát hiện và sửa lỗi một bit, nhưng không thể phân biệt lỗi hai bit của một codeword với lỗi một bit của một codeword khác. Do đó, một số lỗi hai bit sẽ được giải mã sai như thể chúng là lỗi một bit và do đó không được phát hiện, trừ khi không có nỗ lực sửa chữa nào được thực hiện.</i>
>
> <i>Để khắc phục nhược điểm này, Hamming code có thể được mở rộng bằng một bit chẵn lẻ bổ sung. Bằng cách này, có thể tăng khoảng cách tối thiểu của Hamming code lên $k = 4$, cho phép bộ giải mã phân biệt giữa lỗi một bit và lỗi hai bit. Do đó, bộ giải mã có thể phát hiện và sửa lỗi một bit và đồng thời phát hiện (nhưng không sửa) lỗi hai bit.</i>

**SECDED** tăng khả năng bảo vệ dữ liệu so với **Hamming code** chỉ sửa lỗi đơn bit (SEC), đặc biệt trong các hệ thống bộ nhớ như SRAM, nơi cần phát hiện lỗi kép để tránh sử dụng dữ liệu sai.

---

# 3. ECC trong AURIX™ MCU

## 3.1. Tổng quan

ECC trong AURIX™ MCU là cơ chế phần cứng được tích hợp sẵn để bảo vệ dữ liệu lưu trữ trong bộ nhớ flash (non-volatile memory), nhằm tăng độ tin cậy và hỗ trợ các yêu cầu an toàn chức năng (functional safety), chống lại lỗi phần cứng ngẫu nhiên (soft error, bit flip do nhiễu, aging,...).

ECC sẽ thêm các redundancy bit vào dữ liệu khi ghi vào Program Flash (PFlash) hoặc Data Flash (DFlash).
- **PFlash**: Thường dùng để chứa mã chương trình (program code). ECC được tính trên cả nội dung page (32 bytes hay 256 bits) và các bit địa chỉ.
- **DFlash**: Thường dùng để chứa dữ liệu (data). ECC được tính chủ yếu trên nội dung page (8 bytes hay 64 bits).

<table class="hover-table">
  <thead>
    <tr>
      <th>Loại bộ nhớ</th>
      <th>Khả năng phát hiện lỗi</th>
      <th>Khả năng sửa lỗi</th>
      <th>Tên gọi kỹ thuật</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>PFlash</td>
      <td>Phát hiện lỗi 3 bit</td>
      <td>Sửa lỗi 1 bit và 2 bit</td>
      <td><strong>DECTED</strong> (Double Error Correction, Triple Error Detection)</td>
    </tr>
    <tr>
      <td>DFlash</td>
      <td>Phát hiện lỗi 4 bit</td>
      <td>Sửa lỗi 1, 2 và 3 bit</td>
      <td><strong>TECQED</strong> (Triple Error Correction, Quad Error Detection)</td>
    </tr>
  </tbody>
</table>

**SRAM** (volatile memory) thường dùng Hamming code kiểu **SECDED** (Single Error Correction, Double Error Detection). PFlash thường dùng BCH code để đạt khả năng **DECTED**.

Khi đọc dữ liệu, phần cứng sẽ kiểm tra các redundancy bits này để:
- Phát hiện lỗi bit.
- Sửa lỗi (nếu số bit lỗi nằm trong khả năng của mã).
- Báo cáo lỗi cho phần mềm/hệ thống.

Lưu ý:
- Việc sửa lỗi chỉ xảy ra ở phía đọc (reader nhận dữ liệu đã sửa). Dữ liệu gốc trong flash không bị ghi đè/sửa lại.
- Lỗi được ghi nhận trong các thanh ghi trạng thái và có thể kích hoạt alarm tới Safety Management Unit (SMU).

ECC mặc định đã được bật vì đây là cơ chế an toàn then chốt của phần cứng AURIX. Tuy nhiên, có thể tạm thời tắt để phục vụ mục đích kiểm thử (test), nhưng không khuyến khích tắt trong ứng dụng thực tế.

---

## 3.2. SRAM Error Detection & Correction (EDC/ECC)

Tất cả các **SRAM** đều được triển khai với ECC cho dữ liệu được lưu trữ. Đa số SRAM đều có ECC được tính toán chỉ trên dữ liệu.

Trong thao tác **WRITE**, các bit checksum (bit ECC) cho input data word được tạo ra bằng bộ mã hóa ECC (ECC encoder). Các bit này được lưu trữ trong SRAM cùng với và bổ sung cho data word.

Trong thao tác **READ**, ECC encoder so sánh "data word đọc được và các bit ECC" với "giá trị ECC mong đợi". Nếu do bất kỳ lỗi phần cứng ngẫu nhiên, soft error,... dẫn đến data word lưu trong SRAM bị hỏng, sẽ có sự không khớp so với giá trị ECC mong đợi. Điều này được thông báo như một lỗi và báo động (alarm).

Hai loại mã ECC khác nhau được sử dụng trong hệ thống cho các SRAM khác nhau:
- Mã **SECDED** có thể phát hiện tối đa lỗi hai bit (DBE), đồng thời sửa được lỗi một bit (SBE). Nghĩa là khoảng cách Hamming của các mã này là $k = 4$.
- Mã **DED** chỉ có thể phát hiện tối đa lỗi hai bit, nhưng không thể sửa bất kỳ lỗi nào. <code>ECCS.ECE</code> vẫn tồn tại và có thể được ghi và đọc cho <code>SSH</code> với <code>DED</code>. Tuy nhiên, nó không có chức năng.

Có hai thông báo lỗi được gửi đến **SMU** từ ECC encoder thông qua các báo động CE và UCE.  
Đối với các SRAM dùng ECC SECDED:  
- Báo động lỗi có thể sửa **CE – Correctable Error**: SBE đã được sửa hoặc phát hiện.
- Báo động lỗi không thể sửa **UCE – Uncorrectable Error**: DBE đã được phát hiện.

Đối với các SRAM dùng ECC DED, chỉ có một thông báo lỗi duy nhất và được thông báo bằng lỗi DBE cùng báo động UCE.

- Thông báo **SBE** (tùy thuộc vào <code>ECCS.ECE</code>, được chuyển tiếp như một nguồn trong báo động CE hoặc UCE) cũng như theo dõi trong ETRR/ERRINFO được kích hoạt bằng cách đặt **ALMSRCS.SBE = 1**.
- Thông báo **DBE** (được chuyển tiếp như một nguồn trong báo động UCE) cũng như theo dõi trong <code>ETRR/ERRINFO</code> được kích hoạt bằng cách đặt **ALMSRCS.DBE = 1**.

Lưu ý rằng các bit <code>ECCS.CENE</code>, <code>UCENE</code> và <code>TRE</code> hoạt động như các enable toàn cục bổ sung và phải được đặt để các thông báo báo động ECC được gửi đến SMU cũng như để kích hoạt theo dõi lỗi trong <code>ETRR/ERRINFO</code>.

---

## 3.3. Các Thanh ghi

> *Application firmware is running on Core0 (trên RAM).*

### 3.3.1. ECCR - PFI ECC Read Register

ECC Read Register sẽ lưu trữ ECC checksum được đọc trong lần truy cập gần nhất đọc bộ nhớ NVM tại PFLASH BANK.
- Offset: <code>0x00000000</code>
- System Reset Value: <code>0x00000000</code>
- <code>PFI0_ECCR.RCODE</code> ([21:0] bits): Error Correction Read Code - ECC code, read from the Flash read buffer with last data read operation.


### 3.3.2. HF_ECCR - DF0 ECC Read Register

ECC Read Register phải lưu trữ ECC checksum đọc được trong lần truy cập gần nhất đọc NVM tại DF0 (bao gồm cả CFS và UCB) và DF1 (khi DF1 được cấu hình ở chế độ không phải HSM_exclusive), trong trường hợp thao tác đọc được khởi tạo thông qua giao diện phụ (slave interface) DMU SRI.
- Offset: <code>0x0000040</code>
- Application Reset Value: <code>0x00000000</code>
- <code>HF_ECCR.RCODE</code> ([21:0] bits): Error Correction Read Code - ECC checksum read during the last NVM read access.

### 3.3.3. HF_ECCW - DF0 ECC Write Register

ECC Write Register chứa các bit dùng để vô hiệu hóa quá trình mã hóa ECC (ECC encoding) cho các khối PFLASH và DF0.
- Offset: <code>0x0000004C</code>
- Application Reset Value: <code>0x00000000</code>
- <code>HF_ECCW.WCODE</code> ([21:0] bits): Error Correction Write Code - 22-bit ECC code for the current 64-bit (for DFLASH) or 256-bit (for PFLASH) write buffer to be written into the assembly buffer instead of a generated ECC.
- <code>HF_ECCW.PECENCDIS</code> ([29:28] bits): PFLASH ECC Encoding Disable
  + <code>0x00</code>, <code>0x01</code>, <code>0x10</code>: The ECC code is automatically calculated. 
  + <code>0x11</code>: The ECC code is taken from WCODE.


---

### 3.3.4. Các thanh ghi và thông tin khác

- Alarm Sources Configuration Register, page 1240/2080, AURIX TC3xx Family User's Manual Part 1
- Error Information Register x, page 1243/2080, AURIX TC3xx Family User's Manual Part 1
- SRAM Error Detection & Correction (EDC/ECC), page 1244/2080, AURIX TC3xx Family User's Manual Part 1
- CPUx Flash Configuration Register 3, page 328/2080, AURIX TC3xx Family User's Manual Part 1


---

## 3.4. Cách chèn lỗi vào PFLASH của AURIX™ TC3xx MCU

### 3.4.1. Cách 1

1. Programming data với chức năng tạo ECC tự động được bật.
2. Đọc data vừa được lập trình để hardware tự tính giá trị ECC và lưu vào trong trong <code>PFI0_ECCR.RCODE</code>.
3. Tắt tính năng tạo mã lỗi ECC tự động: <code>ECCW.PECENCDIS</code> = $11_B$.
4. Ghi giá trị ECC tìm được ở bước 2 vào <code>ECCW.WCODE</code>.
5. Thiết lập thêm bits vào dữ liệu đọc được (read data) để tạo các lỗi bit trong data cần lập trình.
6. Reprogram với data trên.

### 3.4.2. Cách 2

1. Ghi data vào vùng non-cacheable address của PFLASH (<code>0xAxxxxxxx</code>).
2. Đọc data vừa được ghi; và đọc giá trị ECC được lưu tại <code>HF_ECCR.RCODE</code>.
3. Đặt <code>HF_ECCW.WCODE</code> = giá trị ECC vừa đọc. Đồng thời đặt <code>HF_ECCW.PECENCDIS</code> = <code>0x11</code> (để ECC được lấy từ <code>HF_ECCW.WCODE</code>).
4. Thực hiện lại bước 1 nhưng với data đã được thay đổi N-bit (N=1,2,3). Khi này, data tại vùng PFLASH đó được thay đổi nhưng vẫn giữ giá trị ECC cũ.
5. Đặt lại <code>HF_ECCW.PECENCDIS</code> = <code>0x00</code> để chuyển sang chế độ tự động tính ECC.
6. Thực hiện truy cập đọc NVM tại vùng nhớ trên, lỗi ECC sẽ được tạo ra. Cảnh báo SMU liên quan đến ALM7 sẽ được thiết lập

---

# Tham khảo

[1] [Lenovo, "Understanding Error-Correcting Code Techniques"](https://www.lenovo.com/us/en/glossary/what-is-ecc/?orgRef=https%253A%252F%252Fwww.google.com%252F&srsltid=AU7gw4WCdWQze3g2arSwhp45L-9qTcAI74iCA_EZ5kg6cDyPBFmnPaLq)

[2] [Infineon - Community, "Error Correcting Code to Detect and Correct Single-Bit Errors"](https://community.infineon.com/t5/Knowledge-Base-Articles/Error-Correcting-Code-to-Detect-and-Correct-Single-Bit-Errors/ta-p/258070)

[3] [Infineon - Community, "AURIX™ MCU: Error Correction Code (ECC) Support"](https://community.infineon.com/t5/Knowledge-Base-Articles/AURIX-MCU-Error-Correction-Code-ECC-Support/ta-p/474931)

[4] [ResearchGate, "Introduction into the Error-Correcting Codes"](https://www.researchgate.net/publication/389271190_Introduction_into_the_Error-Correcting_Codes) *(Walsh-Hadamard code, Reed-Solomon code, Convolutional codes)*

[5] [Jonathan Scarlett, "CS5275 Lecture 9: Error-Correcting Codes"](https://www.comp.nus.edu.sg/~scarlett/CS5275_notes/09-ECC.pdf) *(Parity Checks, Hamming Code, Linear Codes, Reed-Solomon Codes, Distance-Based Codes, Capacity-Achieving Codes)*

[6] [Functional Safety First, "ECC (Error Correction Codes)"](https://www.functionalsafetyfirst.com/2021/01/ecc-error-correction-codes.html)

[7] [Infineon - Community, "AURIX™ MCU: Inject faults in PFLASH"](https://community.infineon.com/t5/Knowledge-Base-Articles/AURIX-MCU-Inject-faults-in-PFLASH/ta-p/329326)

[8] [Infineon - Community, "How to inject faults in Pflash of AURIX™ TC3xx microcontrollers?"](https://community.infineon.com/t5/AURIX/How-to-inject-faults-in-Pflash-of-AURIX-TC3xx-microcontrollers/td-p/318836)

[9] [Infineon, "AURIX TC3xx Family User's Manual Part 1"](https://www.infineon.com/assets/row/public/documents/10/44/infineon-aurix-tc3xx-part1-usermanual-en.pdf)

[10] [Infineon, "AURIX TC3xx Family User's Manual Part 2"](https://www.infineon.com/assets/row/public/documents/10/44/infineon-aurix-tc3xx-part2-usermanual-en.pdf)

[11] [Mouser, "AP32597 - Safe application development for AURIX™ Application Kit TC3xx Safety"](https://www.mouser.com/pdfDocs/Infineon-Safe_Application_Development_for_Application_Kit_TC3xx-ApplicationNotes-v01_00-EN.pdf) *(6.2.2.1 PFlash NVM, Safety Mechanism PFLASH: UPDATE_CHECK)*

---

# Đọc thêm

[1] [Lauterbach - Support, "\[TriCore\] Debugging Safety-Critical Applications"](https://support.lauterbach.com/kb/articles/debugging-safety-critical-applications)

[2] [Abhishek Anand, "Working with Flash memory"](https://abhishek-anand.medium.com/working-with-flash-memory-5187a920f816)
