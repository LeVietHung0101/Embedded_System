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

## 1.1. ECC là gì?

{: .note}
> **Error-Correcting Code (ECC)** là các thuật toán cho phép phát hiện và sửa lỗi trong truyền và lưu trữ dữ liệu. Nó thêm các bit dư thừa (redundant bits) vào dữ liệu gốc, giúp xác định và sửa lỗi, đảm bảo tính toàn vẹn của dữ liệu (data integrity). Bên nhận dữ liệu sẽ so sánh dữ liệu nhận được với redundant bits để phát hiện và sửa lỗi do nhiễu điện (noise, interference), single-bit flip hoặc các yếu tố khác.

ECC thường được sử dụng trong:
- RAM của server và high-performance workstation
- Hệ thống an toàn quan trọng (ô tô, hàng không, quốc phòng)
- Cơ sở dữ liệu và hệ thống yêu cầu data integrity cao

Các kỹ thuật tạo redundant bits khác nhau về cách encode/decode dữ liệu và hiệu quả phát hiện/sửa lỗi. Lựa chọn phụ thuộc vào loại lỗi dự kiến và yêu cầu hệ thống. Một số kỹ thuật tạo redundant bits phổ biến gồm:
- Parity checks.
- Checksums.
- [Hamming codes]({{ "/docs/Embedded_Systems_Architecture/Debug/ECC/#22-hamming-code" | - relative_url }}).
- Reed-Solomon codes.
- BCH codes.

<details markdown="block">
<summary><i>High-performance workstations</i></summary>

> **High-performance workstations** là máy tính để bàn chuyên dụng, cấu hình mạnh (CPU, GPU, RAM cao), dùng cho các công việc đòi hỏi tính toán nặng như thiết kế 3D, mô phỏng kỹ thuật, xử lý dữ liệu lớn hoặc AI.
{: .codeBlock }
</details>

---

## 1.2. Soft error và Hard error

ECC có thể phát hiện các lỗi Soft error và Hard error.

<table class="hover-table">
  <thead>
    <tr>
      <th>Loại lỗi</th>
      <th>Đặc điểm</th>
      <th>Nguyên nhân</th>
      <th>Khả năng của ECC</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Soft error</strong></td>
      <td>Tạm thời, không hỏng phần cứng</td>
      <td>Nhiễu điện (noise, interference),<br>biến động điện áp (voltage spike),<br>bức xạ nền vũ trụ (cosmic background radiation)</td>
      <td>Phát hiện và sửa được</td>
    </tr>
    <tr>
      <td><strong>Hard error</strong></td>
      <td>Vĩnh viễn, tái diễn tại cùng địa chỉ</td>
      <td>Khiếm khuyết vật lý, suy giảm DRAM, nhiệt độ cao</td>
      <td>Chỉ phát hiện, không sửa được</td>
    </tr>
  </tbody>
</table>

**Hard error** thường cần các biện pháp bảo trì như ghi log, cô lập vùng memory bị lỗi hoặc thay thế DIMM bị ảnh hưởng. Do phản ánh tình trạng hư hỏng phần cứng thực sự, hard error là rủi ro dài hạn đối với độ tin cậy của hệ thống doanh nghiệp (enterprise system).

ECC hiệu quả trong sửa **single-bit errors** (một bit bị đảo do nhiễu điện). Một số thuật toán cũng sửa được **multi-bit errors**, tùy thiết kế. ECC không sửa được mọi loại lỗi nếu vượt quá khả năng của thuật toán.

ECC ngăn chặn hiện tượng lỗi dây chuyền (cascading failures), từ đó đảm bảo các thành phần trong hệ thống đạt được **Freedom from Interference (FFI)** trong các hệ thống an toàn chức năng (ví dụ ASIL theo ISO 26262).

<details markdown="block">
<summary><i>Noise & Interference</i></summary>

> **Noise**: Nhiễu ngẫu nhiên (thường do nhiệt, điện từ trường môi trường) làm thay đổi tín hiệu, gây lỗi bit trong truyền hoặc lưu trữ dữ liệu.
> 
> **Interference**: Nhiễu do tín hiệu ngoài (từ thiết bị khác, sóng radio,...) chồng lấn lên tín hiệu gốc, làm méo hoặc làm hỏng dữ liệu.
{: .codeBlock }
</details>

<details markdown="block">
<summary><i>DIMM</i></summary>

> **DIMM - Dual In-line Memory Module** (*Mô-đun bộ nhớ kép nội tuyến*), là một thanh bảng mạch in (thường gọi là thanh RAM) chứa các chip nhớ DRAM.
>
> Đặc điểm chính của DIMM:
> - **Đường truyền dữ liệu 64-bit**: DIMM hỗ trợ kênh dữ liệu 64-bit nguyên bản, giúp truyền tải dữ liệu nhanh và hiệu quả gấp đôi thế hệ cũ SIMM (32-bit).
> - **Chân cắm hai mặt**: Các điểm tiếp xúc điện (pins) ở hai mặt trước và sau của thanh DIMM hoạt động độc lập với nhau.
> - **Kích thước tiêu chuẩn**: Chiều dài chuẩn trên máy tính để bàn (desktop) và máy chủ là khoảng 133,35 mm.
>
> Các loại DIMM phổ biến:
> - **SO-DIMM (Small Outline DIMM)**: Kích thước nhỏ hơn (khoảng 67,6 mm), thiết kế chuyên dụng cho laptop và máy tính mini.
> - **UDIMM (Unbuffered DIMM)**: Loại RAM không đệm phổ biến nhất trên máy tính cá nhân (PC) giúp giảm độ trễ.
> - **RDIMM (Registered DIMM)**: RAM có thanh ghi (register), thường dùng cho máy chủ (server) hoặc máy trạm (workstation) để tăng độ ổn định.
> - **LRDIMM (Load-Reduced DIMM)**: Giảm tải điện dung trên bus bộ nhớ, cho phép gắn dung lượng RAM cực lớn trên máy chủ.
> - **CUDIMM (Clocked Unbuffered DIMM)**: Tích hợp trình tạo xung nhịp (clock driver) trên thanh RAM để đạt tốc độ cao hơn cho các PC hiệu năng cao.
{: .codeBlock }
</details>

<details markdown="block">
<summary><i>FFI</i></summary>

> **Freedom from Interference - FFI** (*Khả năng không bị can thiệt* / *Khả năng chống nhiễu*) là việc đảm bảo rằng một lỗi xảy ra ở một thành phần/vùng dữ liệu này không được phép lây lan, làm hỏng hoặc gây ảnh hưởng xấu đến các thành phần/vùng dữ liệu khác.
>
> Trong các hệ thống điện - điện tử an toàn (ví dụ: bộ điều khiển ô tô tự lái), nhiều phần mềm hoặc chức năng có mức độ quan trọng về an toàn khác nhau (*ASIL* khác nhau) cùng chạy chung trên một vi điều khiển (MCU) hoặc dùng chung phần cứng (như thanh ghi, RAM, bộ nhớ Flash). Nếu không có FFI, một lỗi nhỏ ở tác vụ giải trí (không quan trọng) có thể làm hỏng vùng nhớ của tác vụ phanh xe (cực kỳ quan trọng), dẫn đến thảm họa.
{: .codeBlock }
</details>

<details markdown="block">
<summary><i>ASIL</i></summary>

> **Automotive Safety Integrity Level - ASIL**  (*Mức độ toàn vẹn an toàn ô tô*) là hệ thống phân loại rủi ro được định nghĩa trong tiêu chuẩn quốc tế ISO 26262 về an toàn chức năng cho các hệ thống điện và điện tử trên ô tô. Mục đích của ASIL là đảm bảo các linh kiện, phần cứng và phần mềm trong xe hoạt động an toàn, ngăn ngừa hoặc giảm thiểu tối đa các sự cố kỹ thuật có thể gây nguy hiểm cho người ngồi trên xe hoặc người đi đường.
{: .codeBlock }
</details>

---

## 1.3. Lợi ích và hạn chế

**Lợi ích**:
- Sửa lỗi đảo bit trong volatile memory.
- Khôi phục dữ liệu trên flash.
- Tăng độ tin cậy dữ liệu, giảm nguy cơ hệ thống treo hoặc silent data corruption (dữ liệu bị sai lệch mà không được phát hiện).
- Đảm bảo tính toàn vẹn dữ liệu trong các hệ thống quan trọng (server, networking equipment, storage, communication protocols).
- Giảm chi phí dài hạn nhờ hạn chế downtime và data recovery.

**Hạn chế**:
- Tăng overhead (redundant bits) gây ảnh hưởng nhẹ đến hiệu suất và tăng chi phí.
- Vẫn tồn tại xác suất nhỏ không phát hiện/sửa được lỗi do vượt quá khả năng của thuật toán.
- Hiệu quả phụ thuộc vào chất lượng phần cứng và điều kiện môi trường.

---

# 2. ECC trong Memory (RAM)

## 2.1. Cách ECC hoạt động trong memory

ECC trong memory sử dụng các **parity bits (check bits)** bổ sung, thường thông qua các **DRAM** component bổ sung trên memory module, để kiểm tra tính chính xác của từng data word được lưu trữ.

Khi ghi dữ liệu (**write**), memory controller trong processor tạo ECC dựa trên mẫu bit của dữ liệu và lưu ECC cùng dữ liệu gốc.

Khi đọc dữ liệu (**read**), controller tính toán lại ECC và so sánh với giá trị đã lưu:
- Nếu hai ECC khớp nhau, dữ liệu được xem là không có lỗi.
- Nếu phát hiện single-bit error, memory controller tự động sửa lỗi bằng ECC bits.
- Nếu phát hiện multi-bit error, → memory controller báo lỗi (tùy cơ chế SECDED hoặc mạnh hơn).

Để ECC hoạt động, cả CPU và motherboard phải hỗ trợ chế độ ECC. Sự phối hợp này cho phép phát hiện và sửa lỗi trên toàn bộ đường truyền memory (end-to-end), giúp đảm bảo độ tin cậy của dữ liệu. Cơ chế **SECDED** (*Single Error Correction, Double Error Detection*) này là tiêu chuẩn trên server-class DIMM và là nền tảng đảm bảo tính ổn định, toàn vẹn dữ liệu trong hệ thống doanh nghiệp.
- Memory module sử dụng DRAM x8 width: hỗ trợ phát hiện và sửa single-bit error; phát hiện multi-bit error.
- Memory module sử dụng DRAM x4 width: hỗ trợ ECC phát hiện và sửa multi-bit error (phù hợp mission-critical server).

Các nền tảng máy chủ doanh nghiệp (enterprise servers) thường yêu cầu memory module thuộc loại ECC-class, gồm:
- Registered DIMMs (RDIMM)
- Load Reduced DIMMs (LRDIMM)
- Multiplexed Rank DIMMs (MRDIMM)

Sự ra đời của DDR5 cũng mang đến [On-die ECC (ODECC)]({{ "/docs/Embedded_Systems_Architecture/Debug/ECC/#523-on-die-ecc" | relative_url }}), bổ sung khả năng phát hiện và sửa single-bit error bên trong từng DRAM component. On-die ECC cải thiện độ ổn định cho cả server system và các hệ thống sử dụng DDR5, bất kể memory module có thuộc loại ECC-class hay không.
> <i>Nguyên nhân: các loại module DDR5 không tương thích socket với ECC hoặc non-ECC Unbuffered DIMMs (UDIMM), vốn thường được sử dụng trong desktop PC và workstation phổ thông.</i>

{: .codeBlock }
> **DIMM - Dual In-line Memory Module** (*Mô-đun bộ nhớ kép nội tuyến*), là một thanh bảng mạch in (thường gọi là thanh RAM) chứa các chip nhớ DRAM.
>
> Đặc điểm chính của DIMM:
> - **Đường truyền dữ liệu 64-bit**: DIMM hỗ trợ kênh dữ liệu 64-bit nguyên bản, giúp truyền tải dữ liệu nhanh và hiệu quả gấp đôi thế hệ cũ SIMM (32-bit).
> - **Chân cắm hai mặt**: Các điểm tiếp xúc điện (pins) ở hai mặt trước và sau của thanh DIMM hoạt động độc lập với nhau.
> - **Kích thước tiêu chuẩn**: Chiều dài chuẩn trên máy tính để bàn (desktop) và máy chủ là khoảng 133,35 mm.
>
> Các loại DIMM phổ biến:
> - **SO-DIMM (Small Outline DIMM)**: Kích thước nhỏ hơn (khoảng 67,6 mm), thiết kế chuyên dụng cho laptop và máy tính mini.
> - **UDIMM (Unbuffered DIMM)**: Loại RAM không đệm phổ biến nhất trên máy tính cá nhân (PC) giúp giảm độ trễ.
> - **RDIMM (Registered DIMM)**: RAM có thanh ghi (register), thường dùng cho máy chủ (server) hoặc máy trạm (workstation) để tăng độ ổn định.
> - **LRDIMM (Load-Reduced DIMM)**: Giảm tải điện dung trên bus bộ nhớ, cho phép gắn dung lượng RAM cực lớn trên máy chủ.
> - **CUDIMM (Clocked Unbuffered DIMM)**: Tích hợp trình tạo xung nhịp (clock driver) trên thanh RAM để đạt tốc độ cao hơn cho các PC hiệu năng cao.
><figure>
>  <img src="{{ site.baseurl }}\assets\images\DIMM.png" />
>  <figcaption>
>  Nguồn: <a href="https://techterms.com/definition/sodimm" target="_blank">Techterms, "SO-DIMM"</a><br><a href="https://www.apacer.com/en/product/industrial-product/detail/industrial_dram/ddr_udimm" target="_blank">Apacer, "DDR UDIMM"</a><br><a href="https://enterprise.goodram.com/en/rdimm-ecc-reg-series/" target="_blank">Goodram Enterprise, "RDIMM ECC REG"</a><br><a href="https://enterprise.goodram.com/en/lrdimm-series/" target="_blank">Goodram Enterprise, "LRDIMM"</a><br><a href="https://www.integralmemory.com/product/8gb-pc-cudimm-ram-module-ddr5-6400mts-pc5-51200-clocked-unbuffered-non-ecc-dimm-1-1v-1gx16-cl52/" target="_blank">Integral Memory, "CUDIMM RAM MODULE"</a>
>  </figcaption>
></figure>

---

## 2.2. Vì sao memory xảy ra lỗi?

Các memory error xảy ra do DRAM cell lưu dữ liệu dưới dạng điện tích rất nhỏ, dễ bị nhiễu loạn bởi:
- Nhiễu điện (noise, interference).
- Biến động điện áp (voltage spike).
- Sai lệch timing.
- Nhiệt độ cao.
- Bức ức xạ nền vũ trụ (cosmic background radiation).

Khi process node thu nhỏ và mật độ memory tăng, nguy cơ bit flip tăng (tạo ra soft error), đặc biệt trên server chạy liên tục dưới tải cao. Những lỗi này có thể không gây crash nhưng vẫn âm thầm làm sai lệch dữ liệu.

---

## 2.3. ECC RAM và Non-ECC RAM

Server system thường yêu cầu **ECC RAM**. Trong các thành phần khác của data center như workstation, edge system hoặc router, ECC có thể là tùy chọn thông qua UDIMM (Unbuffered DIMM) hoặc SO-DIMM (Small Outline DIMM). Workstation PC và laptop cũng có thể hỗ trợ ECC nếu sử dụng processor phù hợp và được cấu hình hỗ trợ trong BIOS. Việc lựa chọn ECC-class RAM cần dựa trên loại ứng dụng mà hệ thống sẽ chạy.

**Non-ECC RAM** không có chức năng phát hiện và sửa lỗi memory, nên không phù hợp với workload sử dụng nhiều memory, chạy liên tục hoặc phục vụ nhiều người dùng độc lập (multi-tenant). Ngược lại, do ECC-class module có thêm DRAM component làm tăng chi phí, non-ECC RAM là lựa chọn kinh tế hơn cho các ứng dụng phổ thông trên client PC và laptop không yêu cầu hoạt động 24/7.

<table class="hover-table">
  <thead>
    <tr>
      <th>Tiêu chí</th>
      <th>ECC Memory</th>
      <th>Non-ECC Memory</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Khả năng</td>
      <td>Phát hiện + sửa lỗi</td>
      <td>Không có</td>
    </tr>
    <tr>
      <td>Độ tin cậy</td>
      <td>Cao, phù hợp mission-critical</td>
      <td>Thấp hơn</td>
    </tr>
    <tr>
      <td>Chi phí</td>
      <td>Cao hơn</td>
      <td>Thấp hơn</td>
    </tr>
    <tr>
      <td>Hiệu năng</td>
      <td>Có overhead nhỏ</td>
      <td>Tốt hơn một chút</td>
    </tr>
    <tr>
      <td>Ứng dụng</td>
      <td>Server, workstation, hệ thống an toàn</td>
      <td>PC phổ thông, gaming, laptop thông thường</td>
    </tr>
  </tbody>
</table>

<details markdown="block">
<summary><i>Workstation, Edge system và Router</i></summary>

> **Workstation**: Máy tính được thiết kế cho công việc chuyên môn, thường có hiệu năng cao hơn PC phổ thông. Ví dụ: Máy tính dùng để thiết kế CAD, mô phỏng, dựng hình 3D hoặc phát triển phần mềm.
>
> **Edge system**: Hệ thống máy tính xử lý dữ liệu gần nơi dữ liệu được tạo ra, thay vì gửi toàn bộ dữ liệu lên Cloud hoặc Data Center. Ví dụ: Máy tính công nghiệp xử lý dữ liệu từ camera AI ngay tại nhà máy.
>
> **Router**: Thiết bị mạng định tuyến dữ liệu giữa các mạng khác nhau. Ví dụ: Router kết nối mạng nội bộ của công ty với Internet.
{: .codeBlock }
</details>

---

## 2.4. Ảnh hưởng của ECC memory đến hiệu năng trong hệ thống doanh nghiệp

Server workload tạo áp lực lớn lên memory do các process chạy dài hạn, mức độ đồng thời cao (sustained concurrency) và tập dữ liệu lớn được lưu trong memory. Chỉ một memory error trong database buffer, VM host hoặc phép tính tài chính cũng có thể gây gián đoạn dịch vụ hoặc làm sai lệch giao dịch. Vì vậy, ECC memory là yêu cầu quan trọng đối với server system.

Các môi trường nhạy cảm với tính toàn vẹn dữ liệu (data integrity):
- Virtualization cluster.
- Database platform.
- Môi trường tính toán tài chính và khoa học.
- Các hệ thống yêu cầu độ tin cậy 24/7 và thời gian hoạt động ổn định, có thể dự đoán (predictable uptime).

ECC không nhằm tăng tốc độ memory mà giúp toàn bộ platform hoạt động ổn định hơn, đặc biệt trong các hệ thống phục vụ nghiệp vụ quan trọng (business-critical systems).

<details markdown="block">
<summary><i>Sustained concurrency</i></summary>

> **Sustained concurrency** là tình trạng nhiều tác vụ hoặc yêu cầu được xử lý đồng thời trong thời gian dài. Ví dụ: Server liên tục phục vụ hàng nghìn người dùng hoặc nhiều VM (virtual machine) cùng lúc.
{: .codeBlock }
</details>

---

## 2.5. Các hệ thống và ứng dụng cần ECC để đảm bảo tính ổn định

ECC rất quan trọng trong các môi trường yêu cầu hệ thống hoạt động liên tục, xử lý dữ liệu quan trọng hoặc phục vụ nhiều workload dùng chung tài nguyên (multi-tenant). Các hệ thống này cần khả năng vận hành có khả năng chịu lỗi (fault-tolerant operation), do đó ECC là yêu cầu nền tảng thay vì chỉ là tính năng tùy chọn.

Các trường hợp sử dụng gồm:

- **Database và transaction-driven system**: Database engine phụ thuộc nhiều vào RAM để xử lý transaction và duy trì các tập dữ liệu lớn trong memory. ECC ngăn các giá trị bị lỗi lan truyền qua query hoặc log, giúp bảo vệ độ chính xác dữ liệu và tránh gián đoạn dịch vụ.

- **Virtualization và multi-tenant platform**: Hypervisor hợp nhất nhiều workload trên cùng physical host. Một bit flip trong host memory có thể ảnh hưởng đến nhiều virtual machine (VM). ECC giúp đảm bảo data integrity trên tài nguyên dùng chung và duy trì tính ổn định của môi trường multi-tenant.

- **Data center SSD storage và workload có cường độ ghi cao**: SSD trong data center phải xử lý các mẫu truy cập liên tục và khối lượng ghi lớn. Khi NAND hao mòn, raw error rate tăng, khiến ECC trở nên cần thiết để duy trì độ chính xác dữ liệu lâu dài và hiệu năng ổn định, có thể dự đoán.

- **Bảo vệ khỏi silent data corruption**: Silent error thường không có biểu hiện rõ ràng và khó chẩn đoán. Memory ECC sửa phần lớn soft error trước khi chúng ảnh hưởng đến ứng dụng, trong khi SSD controller dành cho doanh nghiệp sử dụng cơ chế sửa lỗi tiên tiến để bảo vệ dữ liệu trong suốt vòng đời thiết bị.

Trong các workload này, ECC giữ vai trò trung tâm trong việc duy trì độ chính xác của dữ liệu xuyên suốt quá trình xử lý và lưu trữ. Đây là yếu tố quan trọng để đảm bảo tính ổn định của những hệ thống mà ngay cả lỗi nhỏ cũng có thể phát triển thành sự cố vận hành.

---

# 3. ECC trong SSD

## 3.1. Nguyên lý hoạt động

Tương tự như ECC *bảo vệ dữ liệu đang truyền* trong system memory, SSD (Solid-State Drive) sử dụng cơ chế ECC để *bảo vệ dữ liệu được lưu* trong NAND flash. Do flash memory suy giảm theo số chu kỳ program/erase (P/E cycles), tỷ lệ lỗi bit thô (raw bit error rate) tăng dần theo thời gian. SSD controller phải sửa các lỗi này để duy trì độ chính xác của dữ liệu.

SSD hiện đại sử dụng thuật toán **LDPC** (Low-Density Parity-Check), có khả năng sửa lỗi mạnh hơn các phương pháp BCH trước đây. LDPC phân tích các mẫu dữ liệu và tái tạo những giá trị bị lỗi, giúp các loại NAND mật độ cao như TLC và QLC duy trì độ tin cậy trong suốt vòng đời thiết bị.

Quá trình này diễn ra tự động ở chế độ nền, đóng vai trò quan trọng trong việc cân bằng tính bền vững (endurance), tính ổn định của hiệu năng và tính toàn vẹn dữ liệu lâu dài (long-term data integrity).

Khác với ECC trong memory, ECC của SSD không cho phép người dùng tự lựa chọn. Khả năng và cách thức sửa lỗi phụ thuộc vào controller, firmware và thiết kế của ổ đĩa dành cho khách hàng hay doanh nghiệp.

<details markdown="block">
<summary><i>TLC & QLC NAND Flash</i></summary>

> **TLC (Triple-Level Cell)**: Loại NAND flash lưu 3 bit dữ liệu trên mỗi cell, tương ứng 8 trạng thái có thể biểu diễn. TLC có mật độ lưu trữ cao hơn SLC và MLC, thường được dùng trong SSD phổ thông.
> 
> **QLC (Quad-Level Cell)**: Loại NAND flash lưu 4 bit dữ liệu trên mỗi cell, tương ứng 16 trạng thái có thể biểu diễn. QLC có mật độ lưu trữ cao hơn TLC, nhưng thường có endurance thấp hơn và việc đọc/ghi đòi hỏi kiểm soát chính xác hơn.
{: .codeBlock }
</details>

<details markdown="block">
<summary><i>Endurance</i></summary>

> **Endurance** (*Tính bền vững*) là khả năng chịu đựng hoạt động ghi/xóa lặp lại trước khi thiết bị hoặc memory suy giảm đến mức không còn đáp ứng yêu cầu. Endurance của SSD thường được thể hiện qua chỉ số TBW (Terabytes Written) hoặc DWPD (Drive Writes Per Day).
{: .codeBlock }
</details>

---

## 3.2. Vì sao SSD xảy ra lỗi?

Lỗi SSD bắt nguồn từ đặc tính vật lý của NAND flash. Mỗi cell lưu dữ liệu dưới dạng điện tích; các chu kỳ program/erase lặp lại làm suy giảm dần khả năng giữ điện tích của cell. Khi mức độ hao mòn tăng, nguy cơ xảy ra read error, retention loss và read-disturb cũng tăng, đặc biệt với NAND mật độ cao như TLC và QLC.

Đây là những đặc tính vốn có của công nghệ flash và trở nên rõ rệt hơn khi ổ đĩa cũ dần hoặc phải chịu hoạt động ghi liên tục. Vì vậy, SSD controller sử dụng các thuật toán ECC tiên tiến như LDPC để khắc phục lỗi do hao mòn và duy trì độ chính xác của dữ liệu trong suốt vòng đời hoạt động của thiết bị.

<details markdown="block">
<summary><i>Retention loss</i></summary>

> **Retention loss** (*sự suy giảm khả năng giữ lại/duy trì*) là hiện tượng NAND flash không còn giữ điện tích đủ lâu để biểu diễn chính xác dữ liệu đã lưu. Sau thời gian dài, đặc biệt khi cell đã hao mòn, dữ liệu có thể khó đọc chính xác hơn.
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>Read-disturb</i></summary>

> **Read-disturb** (*nhiễu do đọc*) là hiện tượng các thao tác đọc lặp lại tại một vùng NAND có thể làm thay đổi điện tích ở các cell lân cận, gây lỗi dữ liệu. Một vùng được đọc rất nhiều lần có thể khiến các cell gần đó cần được kiểm tra hoặc làm mới dữ liệu.
{: .codeBlock }
</details>

---

## 3.3. So sánh ECC trong memory và SSD

Mặc dù system memory và SSD đều sử dụng ECC để đảm bảo data integrity, cơ chế hoạt động của chúng khác nhau về bản chất.

- **Memory ECC**: Bảo vệ dữ liệu đang được sử dụng và xử lý bằng cách phát hiện, sửa lỗi bit ngay khi truy cập, giúp duy trì tính ổn định của hệ thống.
- **SSD ECC**: Bảo vệ dữ liệu đã ghi vào NAND flash, nơi nguy cơ lỗi tăng theo độ hao mòn của cell, retention loss và read-disturb. SSD controller sử dụng các thuật toán ECC phức tạp hơn, kết hợp với wear-leveling, garbage collection và read-retry logic để khôi phục dữ liệu khi NAND lão hóa và raw error rate tăng.

Tóm lại, memory ECC đảm bảo độ chính xác của dữ liệu trong quá trình xử lý, còn SSD ECC duy trì tính toàn vẹn của dữ liệu trong suốt vòng đời lưu trữ. Cả hai đều quan trọng trong server-class system, nhưng xử lý các dạng lỗi khác nhau và hoạt động theo những khoảng thời gian khác nhau.

<table class="hover-table">
  <thead>
    <tr>
      <th>Tiêu chí</th>
      <th>Memory ECC</th>
      <th>SSD ECC</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Mục tiêu</td>
      <td>Bảo vệ dữ liệu đang xử lý</td>
      <td>Bảo vệ dữ liệu đã lưu lâu dài</td>
    </tr>
    <tr>
      <td>Thời điểm</td>
      <td>Khi đọc/ghi runtime</td>
      <td>Liên tục trong vòng đời thiết bị</td>
    </tr>
    <tr>
      <td>Thuật toán</td>
      <td>Hamming / SECDED</td>
      <td>LDPC (chủ yếu)</td>
    </tr>
    <tr>
      <td>Người dùng kiểm soát</td>
      <td>Có (chọn ECC/non-ECC module)</td>
      <td>Không</td>
    </tr>
  </tbody>
</table>

---

# 4. Các phương pháp phát hiện / sửa lỗi

## 4.1. Repetition Code

**Repetition Code** là một dạng ECC đơn giản nhất, trong đó mỗi bit dữ liệu được lặp lại nhiều lần để có thể phát hiện và sửa lỗi khi truyền hoặc lưu trữ dữ liệu.

**Nguyên lý hoạt động**<br>
Ví dụ sử dụng 3-bit Repetition Code, mỗi bit được lặp lại 3 lần. Nếu xảy ra lỗi một bit, hệ thống có thể khôi phục bit gốc bằng phương pháp **Majority Voting** (bỏ phiếu đa số).

<table class="hover-table">
  <thead>
    <tr>
      <th>Bit gốc</th>
      <th>Codeword được truyền</th>
      <th>Khi nhận</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>0</code></td>
      <td><code>000</code> (truyền đúng)</td>
      <td><code>000</code> → <code>0</code></td>
    </tr>
    <tr>
      <td><code>1</code></td>
      <td><code>111</code> (truyền đúng)</td>
      <td><code>111</code> → <code>1</code></td>
    </tr>
    <tr>
      <td><code>1</code></td>
      <td><code>101</code> (truyền sai)</td>
      <td><code>101</code> → <code>1</code></td>
    </tr>
  </tbody>
</table>

**Khả năng phát hiện và sửa lỗi**<br>
Với Repetition Code lặp mỗi bit $n$ lần, trong đó $n$ là số lẻ, giải mã bằng Majority Voting có thể:
- Phát hiện lỗi: khi codeword nhận được khác codeword hợp lệ.
- Sửa tối đa: $\lfloor (n-1)/2 \rfloor$ bit lỗi.

<table class="hover-table">
  <thead>
    <tr>
      <th>Repetition Code</th>
      <th>Số bit truyền cho mỗi bit dữ liệu</th>
      <th>Số bit lỗi tối đa có thể sửa</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>3-bit</td>
      <td>5-bit</td>
      <td>7-bit</td>
    </tr>
    <tr>
      <td>3</td>
      <td>5</td>
      <td>7</td>
    </tr>
    <tr>
      <td>1</td>
      <td>2</td>
      <td>3</td>
    </tr>
  </tbody>
</table>


**Ưu điểm và nhược điểm**<br>
- Ưu điểm: Cấu trúc đơn giản, dễ triển khai, dễ giải mã.
- Nhược điểm: Tốn nhiều bit để truyền hoặc lưu dữ liệu. Với 3-bit Repetition Code, mỗi 1 bit dữ liệu cần 3 bit, tức overhead 200%.

**Tóm lại**: Repetition Code tăng độ tin cậy bằng cách lặp lại dữ liệu và dùng Majority Voting để khôi phục giá trị gốc. Tuy nhiên, do hiệu quả sử dụng bit thấp, nó chủ yếu hữu ích cho các ví dụ cơ bản hoặc những hệ thống đơn giản, thay vì các hệ thống memory ECC hiện đại.

---

## 4.2. Parity checking

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

## 4.3. Hamming code

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

## 4.4. SECDED

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


# 5. ECC trong bộ nhớ DDR

## 5.1. Tổng quan

[DRAM]({{ "/docs/Embedded_Systems_Architecture/Memory/DRAM/" | relative_url }}) được xem là nguồn phát sinh phần lớn lỗi bộ nhớ do có memory array lớn và mật độ lưu trữ ngày càng tăng qua các thế hệ tiêu chuẩn, nhờ sử dụng process node nhỏ hơn. Tuy nhiên, cần triển khai cơ chế bảo vệ end-to-end, từ memory controller đến DRAM, để tăng độ tin cậy của toàn bộ memory subsystem.

Để xử lý lỗi bộ nhớ trong runtime và duy trì system uptime, memory subsystem cần có các tính năng **RAS** (*Reliability, Availability, and Serviceability*). Nếu không có các tính năng RAS, lỗi bộ nhớ có thể khiến hệ thống bị crash. RAS cho phép hệ thống:
- Tiếp tục vận hành khi xảy ra các lỗi có thể sửa (correctable errors).
- Ghi log chi tiết các lỗi không thể sửa (uncorrectable errors) để phục vụ debug trong tương lai.

<figure>
  <img
    src="{{ site.baseurl }}\assets\images\Memory_subsystem_block_diagram_in_a_SoC.png" 
    style="width: 35%; height: auto;"   
  />
  <figcaption>Sơ đồ khối hệ thống con bộ nhớ trong một SoC<br>
  Nguồn: <a href="https://www.synopsys.com/articles/ecc-memory-error-correction.html" target="_blank">Synopsys, "Error Correction Code (ECC) in DDR Memories"</a>
  </figcaption>
</figure>

<details markdown="block">
<summary><i>RAS</i></summary>

> **RAS** là khả năng của hệ thống cung cấp khả năng phục hồi bắt đầu từ phần cứng cơ bản cho đến phần mềm ứng dụng thông qua ba thành phần được gọi chung là các tính năng **RAS** (*RAS features*):
> - **Reliability** (Độ tin cậy): khả năng của hệ thống trong việc phát hiện và sửa chữa lỗi.
> - **Availability** (Độ sẵn sàng): hệ thống đảm bảo hoạt động liên tục với mức độ suy giảm tối thiểu như thế nào.
> - **Serviceability** (Khả năng bảo trì): khả năng của hệ thống trong việc chủ động chẩn đoán, sửa chữa, nâng cấp hoặc thay thế các thành phần trên quy mô lớn.
>
> RAS thường được dùng để đánh giá chất lượng, độ bền bỉ và mức độ hoạt động liên tục của một hệ thống (đặc biệt là các máy chủ doanh nghiệp, trung tâm dữ liệu hoặc hệ thống lưu trữ).
{: .codeBlock }
</details>

<details markdown="block">
<summary><i>DDR PHY</i></summary>

> <strong>DDR PHY</strong> là lớp vật lý (Physical Layer) của giao diện bộ nhớ DDR. DDR PHY nằm giữa DDR Controller và chip nhớ DDR, chịu trách nhiệm chuyển đổi tín hiệu số từ controller thành tín hiệu điện tốc độ cao, chính xác để giao tiếp với bộ nhớ (và ngược lại).
{: .codeBlock }
</details>

---

## 5.2. Các cơ chế ECC trong bộ nhớ DDR

### 5.2.1. Side-band ECC

**Side-band ECC** thường được sử dụng trong các hệ thống dùng standard DDR memory như DDR4 và DDR5. ECC code được truyền cùng với actual data nhưng sử dụng các bit riêng để lưu trữ.

Ví dụ, với data width 64-bit, cần thêm 8 bit để lưu ECC. Do đó, DDR4 ECC DIMM thường dùng trong máy chủ doanh nghiệp (enterprise servers) và các trung tâm dữ liệu (data centers) có độ rộng 72-bit. Các DIMM này sử dụng thêm hai DRAM x4 hoặc một DRAM x8 để lưu 8 bit ECC.

Trong cơ chế này, memory controller đọc và ghi ECC code cùng với actual data, không cần các lệnh WR/RD bổ sung. Khi dữ liệu không có lỗi, Side-band ECC chỉ gây ra độ trễ bổ sung tối thiểu so với Inline ECC.

<figure>
  <img
    src="{{ site.baseurl }}\assets\images\WR_and_RD operation_flows_with_Side_band_ECC.png"
    style="width: 90%; height: auto;"
  />
  <figcaption>Các luồng thao tác ghi (WR) và đọc (RD) với side-band ECC<br>
  Nguồn: <a href="https://www.synopsys.com/articles/ecc-memory-error-correction.html" target="_blank">Synopsys, "Error Correction Code (ECC) in DDR Memories"</a>
  </figcaption>
</figure>

<details markdown="block">
<summary><i>Actual data</i></summary>

> **Actual data** là dữ liệu thực tế mà CPU hoặc hệ thống cần lưu trữ và đọc từ memory, phân biệt với *ECC data* là dữ liệu bổ sung dùng để phát hiện và sửa lỗi.
>
> Ví dụ: Khi lưu giá trị <code>10110010</code> vào memory, đây là actual data; các bit ECC được tính từ giá trị này để hỗ trợ kiểm tra lỗi.
{: .codeBlock }
</details>

<details markdown="block">
<summary><i>DIMM</i></summary>

> **DIMM (Dual Inline Memory Module)** là module bộ nhớ RAM dạng thanh, được lắp vào khe cắm trên motherboard hoặc memory board.
>
> Ví dụ: DDR4 ECC DIMM có data width 72-bit, gồm:
> - 64 bit lưu actual data.
> - 8 bit lưu ECC data.
> <figure>
>  <img src="{{ site.baseurl }}\assets\images\DDR4_ECC_DIMMs_Standard_Transcend.png"/>
>  <figcaption>Nguồn: <a href="https://us.transcend-info.com/embedded/product/embedded-dram-modules/ddr4-ecc-dimms-standard" target="_blank">Transcend, "DDR4 ECC DIMMs (Standard)"</a>
>  </figcaption>
></figure>
{: .codeBlock }
</details>

<details markdown="block">
<summary><i>WR & RD</i></summary>

> Trong các tài liệu kỹ thuật, **WR/RD** là viết tắt của hai lệnh/tín hiệu cơ bản điều khiển quá trình đọc và ghi dữ liệu.
> - WR (Write): Lệnh ghi dữ liệu vào memory.
> - RD (Read): Lệnh đọc dữ liệu từ memory.
>
> Trong Inline ECC, actual data và ECC data được lưu ở các vùng riêng trong cùng DRAM channel. Vì vậy, controller cần phát thêm lệnh WR/RD để ghi hoặc đọc ECC data ngoài các lệnh xử lý actual data.
{: .codeBlock }
</details>

---

### 5.2.2. Inline ECC

**Inline ECC** thường được sử dụng trong các hệ thống dùng LPDDR memory. Do LPDDR DRAM có channel width cố định (16-bit đối với một channel LPDDR5/4/4X), Side-band ECC sẽ tốn kém hơn.

Ví dụ, với data width 16-bit, Side-band ECC cần thêm một LPDDR channel 16-bit để lưu ECC code-word 7 hoặc 8 bit. Điều này gây lãng phí dung lượng lưu trữ do ECC code-word không sử dụng hết channel, đồng thời tăng tải trên address command channel và có thể hạn chế hiệu năng.

Inline ECC giải quyết vấn đề này bằng cách lưu ECC code trong cùng DRAM channel với actual data, không cần channel riêng. Vì vậy, tổng data width của memory channel vẫn giữ nguyên.

Trong Inline ECC, một phần dung lượng của memory channel 16-bit được dành riêng để lưu ECC code. Do ECC code không được truyền cùng các lệnh WR/RD của actual data, memory controller phải phát sinh các lệnh WR/RD bổ sung để ghi và đọc ECC data. Vì vậy, mỗi lệnh WR/RD cho actual data đi kèm một lệnh WR/RD bổ sung tương ứng cho ECC data.

Các high-performance controller giảm độ trễ do overhead bằng cách gom ECC data của nhiều địa chỉ liên tiếp vào một lệnh WR/RD ECC. Khi đọc, controller có thể áp dụng các ECC data đã đọc cho actual data tại các địa chỉ tương ứng. Traffic càng tuần tự, độ trễ do các lệnh ECC bổ sung càng thấp.

<figure>
  <img
    src="{{ site.baseurl }}\assets\images\WR_and_RD operation_flows_with_Inline_ECC.png"
    style="width: 90%; height: auto;"
  />
  <figcaption>Các luồng thao tác ghi (WR) và đọc (RD) với side-band ECC<br>
  Nguồn: <a href="https://www.synopsys.com/articles/ecc-memory-error-correction.html" target="_blank">Synopsys, "Error Correction Code (ECC) in DDR Memories"</a>
  </figcaption>
</figure>

{: .highlight }
> Ví dụ, giả sử memory có ba địa chỉ liên tiếp:
> <table class="hover-table">
>   <thead>
>     <tr>
>       <th>Address</th>
>       <th>Actual data</th>
>       <th>ECC data</th>
>     </tr>
>   </thead>
>   <tbody>
>     <tr>
>       <td>A</td>
>       <td>Data A</td>
>       <td>ECC A</td>
>     </tr>
>     <tr>
>       <td>A + 1</td>
>       <td>Data B</td>
>       <td>ECC B</td>
>     </tr>
>     <tr>
>       <td>A + 2</td>
>       <td>Data C</td>
>       <td>ECC C</td>
>     </tr>
>   </tbody>
> </table>
>
> Controller có thể đọc ECC A, ECC B và ECC C bằng một lệnh RD bổ sung, thay vì phát ba lệnh riêng biệt.
> Khi actual data được đọc, controller sử dụng:
> - ECC A để kiểm tra Data A.
> - ECC B để kiểm tra Data B.
> - ECC C để kiểm tra Data C.
>
> Nếu phát hiện lỗi thuộc phạm vi mà ECC hỗ trợ sửa, controller có thể sửa dữ liệu tương ứng.
>
> Lưu ý: ECC data phải được ghép đúng với actual data tại địa chỉ tương ứng. Việc gom nhiều ECC data vào một lệnh giúp giảm overhead, chứ không có nghĩa là một ECC code có thể sửa lỗi cho nhiều địa chỉ khác nhau.


<details markdown="block">
<summary><i>LPDDR memory</i></summary>

> **LPDDR (Low-Power Double Data Rate)** là dòng DRAM được thiết kế để tiêu thụ ít điện năng, thường dùng trong smartphone, tablet và các thiết bị di động.
>
> LPDDR ưu tiên hiệu quả năng lượng và có cấu trúc channel với độ rộng dữ liệu được quy định theo từng chuẩn, chẳng hạn channel 16-bit trong LPDDR4/4X/5.
> <figure>
>  <img src="{{ site.baseurl }}\assets\images\LPDDR_DRAM_Samsung_Semiconductor_Global.png"/>
>  <figcaption>Nguồn: <a href="https://semiconductor.samsung.com/dram/lpddr/" target="_blank">Samsung Semiconductor Global, "LPDDR | DRAM"</a>
>  </figcaption>
></figure>
{: .codeBlock }
</details>

<details markdown="block">
<summary><i>Address command channel</i></summary>

> A**ddress command channel** là đường truyền các lệnh điều khiển và thông tin địa chỉ giữa memory controller và DRAM. Thông tin này cho DRAM biết cần thực hiện thao tác gì, chẳng hạn đọc hay ghi, và truy cập vị trí memory nào. Khi có quá nhiều lệnh điều khiển cần truyền, hiệu năng memory có thể bị ảnh hưởng.
{: .codeBlock }
</details>

<details markdown="block">
<summary><i>Traffic</i></summary>

> Trong memory subsystem, **traffic** là luồng các thao tác đọc/ghi dữ liệu giữa memory controller và memory.
> - **Sequential traffic**: Truy cập các địa chỉ liên tiếp, ví dụ A, A+1, A+2.
> - **Random traffic**: Truy cập các địa chỉ không liên tiếp, ví dụ A, B, X.
> Với Inline ECC, sequential traffic giúp controller thu thập ECC data của nhiều địa chỉ vào cùng một lệnh, giảm số lệnh ECC bổ sung và độ trễ.
{: .codeBlock }
</details>

---

### 5.2.3. On-die ECC

Qua mỗi thế hệ DDR, DRAM thường tăng dung lượng và sử dụng process technology nhỏ hơn để cải thiện tốc độ cũng như hiệu quả sản xuất. Tuy nhiên, dung lượng và tốc độ cao hơn cùng process technology nhỏ hơn làm tăng khả năng xảy ra single-bit errors trong DRAM memory array.

Để tăng cường độ tin cậy của memory channel, DDR5 DRAM tích hợp thêm vùng lưu trữ ECC. **On-die ECC** là một tính năng RAS nâng cao, hỗ trợ DDR5 hoạt động ở tốc độ cao hơn. Với mỗi 128 bit data, DDR5 DRAM sử dụng thêm 8 bit để lưu ECC code.

DRAM tự tính ECC cho dữ liệu ghi (WR data) và lưu ECC code vào vùng lưu trữ bổ sung. Khi đọc (RD), DRAM đọc cả actual data và ECC code, sau đó có thể sửa single-bit error trong các bit dữ liệu được đọc.

On-die ECC tăng cường khả năng bảo vệ trước single-bit errors bên trong DDR5 memory array. Tuy nhiên, cơ chế này không bảo vệ các lỗi xảy ra trên DDR channel. Vì vậy, On-die ECC được kết hợp với Side-band ECC để tăng cường RAS và cung cấp khả năng bảo vệ end-to-end cho memory subsystem.

<figure>
  <img
    src="{{ site.baseurl }}\assets\images\WR_and_RD operation_flows_with_On_die_ECC.png"
    style="width: 90%; height: auto;"
  />
  <figcaption>Các luồng thao tác ghi (WR) và đọc (RD) với side-band ECC<br>
  Nguồn: <a href="https://www.synopsys.com/articles/ecc-memory-error-correction.html" target="_blank">Synopsys, "Error Correction Code (ECC) in DDR Memories"</a>
  </figcaption>
</figure>

<details markdown="block">
<summary><i>Process technology</i></summary>

> **Process technology** là công nghệ chế tạo bán dẫn, thường gắn với kích thước đặc trưng của các cấu trúc transistor trên chip.
>
> Trong DRAM, việc thu nhỏ process technology giúp tăng mật độ tích hợp và hỗ trợ cải thiện hiệu năng, hiệu quả sản xuất. Tuy nhiên, process technology nhỏ hơn kết hợp với dung lượng và tốc độ DRAM cao hơn có thể làm tăng khả năng xảy ra single-bit errors trong memory array.
{: .codeBlock }
</details>
---

### 5.2.4. Link-ECC

**Link-ECC** là tính năng của LPDDR5, cung cấp khả năng bảo vệ trước single-bit errors trên LPDDR5 link hoặc channel.

Khi ghi dữ liệu, memory controller tính ECC cho WR data và truyền ECC trên các bit được chỉ định cùng với dữ liệu. DRAM tự tính ECC từ dữ liệu nhận được, so sánh với ECC nhận từ controller và sửa single-bit errors nếu phát hiện. Khi đọc dữ liệu, vai trò của controller và DRAM được đảo ngược.

Link-ECC không bảo vệ trước single-bit errors xảy ra trong memory array. Tuy nhiên, khi kết hợp Link-ECC với Inline ECC, LPDDR5 tăng cường độ tin cậy của memory channel và cung cấp khả năng bảo vệ end-to-end trước single-bit errors.

<figure>
  <img
    src="{{ site.baseurl }}\assets\images\WR_and_RD operation_flows_with_Link_ECC.png"
    style="width: 90%; height: auto;"
  />
  <figcaption>Các luồng thao tác ghi (WR) và đọc (RD) với side-band ECC<br>
  Nguồn: <a href="https://www.synopsys.com/articles/ecc-memory-error-correction.html" target="_blank">Synopsys, "Error Correction Code (ECC) in DDR Memories"</a>
  </figcaption>
</figure>

---

### 5.3. So sánh các cơ chế ECC trong bộ nhớ DDR

4 cơ chế ECC trong bộ nhớ DDR khác nhau chủ yếu ở vị trí lưu trữ ECC code, phạm vi bảo vệ và cách xử lý dữ liệu khi đọc/ghi.

Bảng so sánh tổng quan: 

<table class="hover-table">
  <thead>
    <tr>
      <th>Tiêu chí</th>
      <th>Side-band ECC</th>
      <th>Inline ECC</th>
      <th>On-die ECC</th>
      <th>Link-ECC</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Memory thường sử dụng</td>
      <td>Standard DDR (DDR4/DDR5)</td>
      <td>LPDDR</td>
      <td>DDR5</td>
      <td>LPDDR5</td>
    </tr>
    <tr>
      <td>Vị trí lưu ECC</td>
      <td>DRAM riêng, bổ sung ngoài vùng lưu actual data</td>
      <td>Một vùng dung lượng riêng trong cùng DRAM channel với actual data</td>
      <td>Vùng lưu trữ ECC bên trong DRAM chip</td>
      <td>ECC được truyền trên các bit được chỉ định của link/channel</td>
    </tr>
    <tr>
      <td>Thành phần tính toán và xử lý ECC</td>
      <td>Memory controller</td>
      <td>Memory controller</td>
      <td>DRAM tự xử lý nội bộ</td>
      <td>Memory controller và DRAM phối hợp</td>
    </tr>
    <tr>
      <td>Bảo vệ lỗi trong memory array</td>
      <td>Có</td>
      <td>Có</td>
      <td>Có</td>
      <td>Không</td>
    </tr>
    <tr>
      <td>Bảo vệ lỗi trên DDR/LPDDR channel</td>
      <td>Có</td>
      <td>Có</td>
      <td>Không</td>
      <td>Có</td>
    </tr>
    <tr>
      <td>Lệnh WR/RD bổ sung cho ECC</td>
      <td>Không</td>
      <td>Có</td>
      <td>Không</td>
      <td>Không</td>
    </tr>
    <tr>
      <td>Ảnh hưởng đến độ trễ</td>
      <td>Thấp khi dữ liệu không có lỗi</td>
      <td>Có overhead do các lệnh ECC bổ sung</td>
      <td>Xử lý ECC diễn ra bên trong DRAM</td>
      <td>Bổ sung khả năng kiểm tra/sửa lỗi trên link</td>
    </tr>
    <tr>
      <td>Mục đích chính</td>
      <td>Bảo vệ dữ liệu end-to-end giữa controller và memory</td>
      <td>Bảo vệ end-to-end mà không cần channel riêng cho ECC</td>
      <td>Bảo vệ dữ liệu bên trong DDR5 memory array</td>
      <td>Bảo vệ dữ liệu truyền qua LPDDR5 link</td>
    </tr>
  </tbody>
</table>

Có thể phân biệt bốn cơ chế theo hai vị trí phát sinh lỗi:
- **Lỗi trong memory array**: [On-die ECC]({{ "/docs/Embedded_Systems_Architecture/Debug/ECC/#523-on-die-ecc" | relative_url }}) bảo vệ bên trong DDR5 DRAM; [Inline ECC]({{ "/docs/Embedded_Systems_Architecture/Debug/ECC/#522-inline-ecc" | relative_url }}) cung cấp cơ chế bảo vệ dữ liệu được lưu trong memory.
- **Lỗi trên memory channel**: [Side-band ECC]({{ "/docs/Embedded_Systems_Architecture/Debug/ECC/#521-side-band-ecc" | relative_url }}) bảo vệ dữ liệu end-to-end; [Link-ECC]({{ "/docs/Embedded_Systems_Architecture/Debug/ECC/#524-link-ecc" | relative_url }}) bảo vệ quá trình truyền trên LPDDR5 link.

Vì mỗi cơ chế có phạm vi bảo vệ khác nhau, nên các cơ chế ECC trên có thể kết hợp theo 2 cách:
- **On-die ECC + Side-band ECC**: Tăng cường bảo vệ cho DDR5: [On-die ECC]({{ "/docs/Embedded_Systems_Architecture/Debug/ECC/#523-on-die-ecc" | relative_url }}) xử lý lỗi bên trong DRAM, [Side-band ECC]({{ "/docs/Embedded_Systems_Architecture/Debug/ECC/#521-side-band-ecc" | relative_url }}) bảo vệ end-to-end giữa controller và memory.
- **Inline ECC + Link-ECC**: Tăng cường bảo vệ cho LPDDR5: [Inline ECC]({{ "/docs/Embedded_Systems_Architecture/Debug/ECC/#522-inline-ecc" | relative_url }}) bảo vệ dữ liệu trong memory subsystem, [Link-ECC]({{ "/docs/Embedded_Systems_Architecture/Debug/ECC/#524-link-ecc" | relative_url }}) xử lý lỗi trên link/channel.

---

# 6. ECC trong AURIX™ MCU

## 6.1. Tổng quan

ECC trong AURIX™ MCU là cơ chế phần cứng được tích hợp sẵn để bảo vệ dữ liệu lưu trữ trong bộ nhớ flash (non-volatile memory), nhằm tăng độ tin cậy và hỗ trợ các yêu cầu an toàn chức năng (functional safety), chống lại lỗi phần cứng ngẫu nhiên (soft error, bit flip do nhiễu, aging,...).

ECC sẽ thêm các redundancy bit vào dữ liệu khi ghi vào Program Flash (PFlash) hoặc Data Flash (DFlash).
- **PFlash**: Thường dùng để chứa mã chương trình (program code). ECC được tính trên cả nội dung page (32 bytes hay 256 bits) và các bit địa chỉ.
- **DFlash**: Thường dùng để chứa dữ liệu (data). ECC được tính chủ yếu trên nội dung page (8 bytes hay 64 bits).

<table class="hover-table">
  <thead>
    <tr>
      <th>Loại bộ nhớ</th>
      <th>Khả năng sửa lỗi</th>
      <th>Khả năng phát hiện lỗi</th>
      <th>Tên gọi kỹ thuật</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>PFlash</td>
      <td>Sửa lỗi 1 bit và 2 bit</td>
      <td>Phát hiện lỗi 3 bit</td>
      <td><strong>DECTED</strong> (Double Error Correction, Triple Error Detection)</td>
    </tr>
    <tr>
      <td>DFlash</td>
      <td>Sửa lỗi 1, 2 và 3 bit</td>
      <td>Phát hiện lỗi 4 bit</td>
      <td><strong>TECQED</strong> (Triple Error Correction, Quad Error Detection)</td>
    </tr>
  </tbody>
</table>

**SRAM** (volatile memory) thường dùng Hamming code kiểu [SECDED]({{ "/docs/Embedded_Systems_Architecture/Debug/ECC/#23-secded" | relative_url }}) (Single Error Correction, Double Error Detection). **PFlash** thường dùng BCH code để đạt khả năng **DECTED**.

Khi đọc dữ liệu, phần cứng sẽ kiểm tra các redundancy bits này để:
- Phát hiện lỗi bit.
- Sửa lỗi (nếu số bit lỗi nằm trong khả năng của mã).
- Báo cáo lỗi cho phần mềm/hệ thống.

Lưu ý:
- Việc sửa lỗi chỉ xảy ra ở phía đọc (reader nhận dữ liệu đã sửa). Dữ liệu gốc trong flash không bị ghi đè/sửa lại.
- Lỗi được ghi nhận trong các thanh ghi trạng thái và có thể kích hoạt alarm tới Safety Management Unit (SMU).

ECC mặc định đã được bật vì đây là cơ chế an toàn then chốt của phần cứng AURIX. Tuy nhiên, có thể tạm thời tắt để phục vụ mục đích kiểm thử (test), nhưng không khuyến khích tắt trong ứng dụng thực tế.

---

## 6.2. SRAM Error Detection & Correction (EDC/ECC)

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

## 6.3. Các Thanh ghi

> *Giả định: Application firmware chạy trên Core0 (trên RAM).*

### 6.3.1. ECCR - PFI ECC Read Register

ECC Read Register sẽ lưu trữ ECC checksum được đọc trong lần truy cập gần nhất đọc bộ nhớ NVM tại **PFLASH BANK**.
- Offset: <code>0x00000000</code>
- System Reset Value: <code>0x00000000</code>

<table class="hover-table">
  <thead>
    <tr>
      <th>Field</th>
      <th>Bits</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>PFI0_ECCR.RCODE</code></td>
      <td>21:0</td>
      <td>rh</td>
      <td><strong>Error Correction Read Code</strong><br>ECC code, read from the Flash read buffer with last data read operation.</td>
    </tr>
  </tbody>
</table>

---

### 6.3.2. HF_ECCR - DF0 ECC Read Register

ECC Read Register phải lưu trữ ECC checksum đọc được trong lần truy cập gần nhất đọc NVM tại **DF0** (bao gồm cả CFS và UCB) và **DF1** (khi DF1 được cấu hình ở chế độ không phải HSM_exclusive), trong trường hợp thao tác đọc được khởi tạo thông qua giao diện phụ (slave interface) DMU SRI.
- Offset: <code>0x0000040</code>
- Application Reset Value: <code>0x00000000</code>

<table class="hover-table">
  <thead>
    <tr>
      <th>Field</th>
      <th>Bits</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>HF_ECCR.RCODE</code></td>
      <td>21:0</td>
      <td>rh</td>
      <td><strong>Error Correction Read Code</strong><br>ECC checksum read during the last NVM read access.</td>
    </tr>
  </tbody>
</table>

---

### 6.3.3. HF_ECCW - DF0 ECC Write Register

ECC Write Register chứa các bit dùng để vô hiệu hóa quá trình mã hóa ECC (ECC encoding) cho các khối **PFLASH** và **DF0**.
- Offset: <code>0x0000004C</code>
- Application Reset Value: <code>0x00000000</code>

<table class="hover-table">
  <thead>
    <tr>
      <th>Field</th>
      <th>Bits</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>HF_ECCW.WCODE</code></td>
      <td>21:0</td>
      <td>rh</td>
      <td><strong>Error Correction Write Code</strong><br>22-bit ECC code for the current 64-bit (for DFLASH) or 256-bit (for PFLASH) write buffer to be written into the assembly buffer instead of a generated ECC.</td>
    </tr>
    <tr>
      <td><code>HF_ECCW.PECENCDIS</code></td>
      <td>29:28</td>
      <td>rh</td>
      <td><strong>PFLASH ECC Encoding Disable</strong>
        <ul>
          <li>$00_B$, $01_B$, $10_B$: The ECC code is automatically calculated.</li>
          <li>$11_B$: The ECC code is taken from WCODE.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>


---

### 6.3.4. Các thanh ghi và thông tin khác

- Alarm Sources Configuration Register, page 1240/2080, AURIX TC3xx Family User's Manual Part 1
- Error Information Register x, page 1243/2080, AURIX TC3xx Family User's Manual Part 1
- SRAM Error Detection & Correction (EDC/ECC), page 1244/2080, AURIX TC3xx Family User's Manual Part 1
- CPUx Flash Configuration Register 3, page 328/2080, AURIX TC3xx Family User's Manual Part 1


---

## 6.4. Cách chèn lỗi vào PFLASH của AURIX™ TC3xx MCU

### 6.4.1. Cách 1

Tham khảo từ: [Infineon - Community, "AURIX™ MCU: Inject faults in PFLASH"](https://community.infineon.com/t5/Knowledge-Base-Articles/AURIX-MCU-Inject-faults-in-PFLASH/ta-p/329326)

1. Programming data với chức năng tạo ECC tự động được bật (<code>HF_ECCW.PECENCDIS</code> = $11_B$).
2. Đọc data vừa được lập trình để hardware tự tính giá trị ECC và lưu vào trong trong <code>PFI0_ECCR.RCODE</code>.
3. Tắt tính năng tạo mã lỗi ECC tự động: <code>HF_ECCW.PECENCDIS</code> = $11_B$.
4. Ghi giá trị ECC tìm được ở bước 2 vào <code>HF_ECCW.WCODE</code>.
5. Thiết lập thêm bits vào dữ liệu đọc được (read data) để tạo các lỗi bit trong data cần lập trình.
6. Reprogram với data trên.

### 6.4.2. Cách 2

Tham khảo từ: [Infineon - Community, "How to inject faults in Pflash of AURIX™ TC3xx microcontrollers?"](https://community.infineon.com/t5/AURIX/How-to-inject-faults-in-Pflash-of-AURIX-TC3xx-microcontrollers/td-p/318836)

1. Ghi data vào vùng non-cacheable address của PFLASH (<code>0xAxxxxxxx</code>).
2. Đọc data vừa được ghi; và đọc giá trị ECC được lưu tại <code>PFI0_ECCR.RCODE</code>.
3. Đặt <code>HF_ECCW.WCODE</code> = giá trị ECC vừa đọc. Đồng thời đặt <code>HF_ECCW.PECENCDIS</code> = $11_B$ (để ECC được lấy từ <code>HF_ECCW.WCODE</code>).
4. Thực hiện lại bước 1 nhưng với data đã được thay đổi N-bit (N=1,2,3). Khi này, data tại vùng PFLASH đó được thay đổi nhưng vẫn giữ giá trị ECC cũ.
5. Đặt lại <code>HF_ECCW.PECENCDIS</code> = $00_B$ để chuyển sang chế độ tự động tính ECC.
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

[12] [Synopsys, "Error Correction Code (ECC) in DDR Memories"](https://www.synopsys.com/articles/ecc-memory-error-correction.html)

[13] [Kingston, "What Is ECC in Memory and SSD? Why It Matters for Servers and Enterprise Systems"](https://www.kingston.com/en/blog/servers-and-data-centers/what-is-ecc-memory-ssd-enterprise)

[14] [GeeksForGeeks, "What is ECC Memory?"](https://www.geeksforgeeks.org/computer-organization-architecture/what-is-ecc-memory/)


---

# Đọc thêm

[1] [Lauterbach - Support, "\[TriCore\] Debugging Safety-Critical Applications"](https://support.lauterbach.com/kb/articles/debugging-safety-critical-applications)

[2] [Abhishek Anand, "Working with Flash memory"](https://abhishek-anand.medium.com/working-with-flash-memory-5187a920f816)
