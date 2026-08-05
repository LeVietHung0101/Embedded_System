---
title: HSM
parent: Embedded Systems Architecture
nav_order: 11
has_children: true
---

<h1>Hardware Security Module (HSM)</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

# Lý do cần HSM

<details markdown="block">
<summary><i>Các thuật ngữ liên quan</i></summary>

> <table class="hover-table">
>   <thead>
>     <tr>
>       <th>Thuật ngữ</th>
>       <th>Giải thích</th>
>     </tr>
>   </thead>
>   <tbody>
>     <tr>
>       <td>external interfaces</td>
>       <td>
>         Các giao diện hoặc cổng kết nối cho phép <b>ECU</b> hoặc hệ thống trên xe giao tiếp với các thiết bị, hệ thống hoặc mạng bên ngoài. Ví dụ: <b>CAN</b>, <b>Ethernet</b>, <b>Bluetooth</b>, <b>Wi-Fi</b>, <b>USB</b>, cổng <b>OBD-II</b> và kết nối <b>Cellular</b>.
>       </td>
>     </tr>
>     <tr>
>       <td>attack surface</td>
>       <td>
>         Tổng hợp tất cả các điểm mà kẻ tấn công có thể khai thác để truy cập hoặc tấn công hệ thống. Số lượng <b>external interfaces</b> và các chức năng kết nối càng nhiều thì <b>attack surface</b> càng lớn.
>       </td>
>     </tr>
>     <tr>
>       <td>electric mobility</td>
>       <td>
>         Lĩnh vực giao thông sử dụng năng lượng điện, bao gồm <b>Electric Vehicle (EV)</b>, <b>Plug-in Hybrid Electric Vehicle (PHEV)</b>, hạ tầng sạc và các dịch vụ liên quan đến phương tiện chạy điện.
>       </td>
>     </tr>
>     <tr>
>       <td>automatic billing</td>
>       <td>
>         Cơ chế tự động tính phí và thanh toán dựa trên dữ liệu sử dụng dịch vụ mà không cần người dùng thao tác thủ công. Ví dụ: tự động thanh toán chi phí sạc <b>EV</b>, phí cầu đường hoặc phí đỗ xe.
>       </td>
>     </tr>
>     <tr>
>       <td>semiconductor manufacturers</td>
>       <td>
>         Các công ty thiết kế và sản xuất <b>semiconductor</b> như <b>MCU</b>, <b>SoC</b>, bộ nhớ và các <b>IC</b> khác. Trong lĩnh vực ô tô, các hãng như <b>Infineon</b>, <b>NXP</b>, <b>Renesas</b>, <b>STMicroelectronics</b> và <b>Texas Instruments</b> thường tích hợp các tính năng bảo mật như <b>HSM</b> vào sản phẩm của họ.
>       </td>
>     </tr>
>   </tbody>
> </table>
{: .codeBlock }
</details>

Hiện nay, ECU đã có các cơ chế security sau:

- Kiểm tra tính xác thực (authenticity) của application trong quá trình startup và khi thực hiện software update.

- Chỉ cho phép sử dụng các security-related diagnostic services sau khi authorization thành công.

Tuy nhiên, khi mức độ networking trong hệ thống điện tử trên xe ngày càng tăng, số lượng external interfaces cũng tăng theo, làm mở rộng attack surface. Đồng thời, networking còn tạo ra nhiều use case mới có liên quan đến security, chẳng hạn như automatic billing trong lĩnh vực electric mobility.

Để đáp ứng nhu cầu security ngày càng cao, các semiconductor manufacturers đã tăng cường hỗ trợ bảo mật ở mức hardware. Vì vậy, HSM hiện đã được tích hợp trên nhiều microcontrollers hiện đại.


---

# Mục đích sử dụng HSM

Việc sử dụng HSM thường hướng đến ba mục tiêu:

* **Tăng hiệu năng (Increased performance):** Việc sử dụng các [hardware accelerated]({{ "/docs/Embedded_Systems_Architecture/HSM/HardwareAccelerator/" | relative_url }}) chuyên dụng giúp giảm thời gian thực hiện các phép tính **cryptographic**, chẳng hạn như **encryption**. Điều này giúp rút ngắn thời gian chờ và giảm tải cho main processor.

* **Phân vùng (Partitioning):** Việc phân vùng memory tạo ra một khu vực để lưu trữ dữ liệu bảo mật, ví dụ như **encryption keys**.

* **Tính linh hoạt (Flexibility):** Khả năng **programmability** của HSM cho phép đáp ứng nhiều **use case** khác nhau cũng như các yêu cầu riêng của từng OEM.

---

# Thiết kế và chức năng của HSM

## Thiết kế của HSM

HSM là một subsystem bên trong microcontroller, có thể xem như một processor core bổ sung trong kiến trúc multicore processor.

Đặc điểm của HSM:

- Có RAM và Flash riêng, được bảo vệ khỏi truy cập từ các thành phần còn lại của hệ thống.

- Tích hợp các hardware accelerator để giảm thời gian xử lý các thuật toán cryptographic.

- Có khả năng thực thi phần mềm giống như các processor core khác, tức là programmable.

- Chức năng và giao diện của HSM với phần còn lại của hệ thống được quyết định bởi phần mềm chạy trên HSM, gọi là **HSM firmware**.

## So sánh các phương pháp triển khai Security

<details markdown="block">
<summary><i>Các thuật ngữ liên quan</i></summary>

> <table class="hover-table">
>   <thead>
>     <tr>
>       <th>Thuật ngữ</th>
>       <th>Giải thích</th>
>     </tr>
>   </thead>
>   <tbody>
>     <tr>
>       <td><b>Symmetrical Keys</b></td>
>       <td>Khóa bí mật dùng chung cho cả <b>encryption</b> và <b>decryption</b>. Bên gửi và bên nhận phải sử dụng cùng một khóa. Ví dụ: <b>AES</b>.
>       </td>
>     </tr>
>     <tr>
>       <td><b>Certificates</b></td>
>       <td>Chứng chỉ số dùng để xác thực danh tính của thiết bị hoặc thực thể. Certificate chứa <b>public key</b> và được ký bởi <b>Certificate Authority (CA)</b>.
>       </td>
>     </tr>
>     <tr>
>       <td><b>Concurrency</b></td>
>       <td>Khả năng nhiều tác vụ được thực hiện đồng thời hoặc chồng lấp về thời gian. Trong <b>HSM</b>, các phép tính <b>cryptographic</b> có thể chạy song song với các tác vụ trên <b>main processor</b>, giúp tăng hiệu suất hệ thống.
>       </td>
>     </tr>
>   </tbody>
> </table>
{: .codeBlock }
</details>

Để thấy rõ ưu điểm của HSM, có thể so sánh ba phương pháp triển khai các chức năng security:
- Pure software solution trên main processor.
- [Hardware accelerated]({{ "/docs/Embedded_Systems_Architecture/HSM/HardwareAccelerator/" | relative_url }}) solution trên main processor.
- Solution with HSM.

<table class="hover-table">
  <thead>
    <tr>
      <th>Comparison</th>
      <th>Pure Software Solution<br>(Main Processor)</th>
      <th>Hardware Accelerated Solution<br>(Main Processor)</th>
      <th>Solution with HSM</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Performance</b></td>
      <td>
        Thực hiện hoàn toàn bằng <b>software</b>, tiêu tốn nhiều thời gian xử lý do các thuật toán <b>cryptographic</b> có độ phức tạp tính toán cao.
      </td>
      <td>
        Sử dụng <b>hardware accelerator</b> nên hiệu năng xử lý được cải thiện đáng kể.
      </td>
      <td>
        Hiệu năng tương đương <b>hardware-accelerated solution</b>, đồng thời hỗ trợ <b>concurrency</b>, giúp giảm tải cho <b>main processor</b>.
      </td>
    </tr>
    <tr>
      <td><b>Protection</b></td>
      <td>
        Không có cơ chế <b>partitioning</b> chuyên biệt để bảo vệ dữ liệu bảo mật.
      </td>
      <td>
        Chỉ có thể bảo vệ một số lượng giới hạn <b>symmetrical keys</b>.
      </td>
      <td>
        <b>RAM</b> và <b>Flash</b> được cô lập khỏi phần còn lại của hệ thống. Nếu đủ dung lượng bộ nhớ, <b>HSM</b> có thể lưu trữ nhiều <b>keys</b>, <b>certificates</b> và các dữ liệu bảo mật khác.
      </td>
    </tr>
    <tr>
      <td><b>Flexibility</b></td>
      <td>
        Có thể cập nhật <b>software</b>, nhưng mọi xử lý đều sử dụng tài nguyên của <b>main processor</b>.
      </td>
      <td>
        Chức năng của <b>hardware accelerator</b> là cố định, không thể mở rộng khi có yêu cầu mới.
      </td>
      <td>
        Có thể triển khai thêm chức năng trong <b>HSM firmware</b>, giúp đáp ứng các yêu cầu mới và mang lại <b>flexibility</b> cao nhất.
      </td>
    </tr>
  </tbody>
</table>

---

# Use Cases of an HSM

<details markdown="block">
<summary><i>Các thuật ngữ liên quan</i></summary>

> <table class="hover-table">
>   <thead>
>     <tr>
>       <th>Thuật ngữ</th>
>       <th>Giải thích</th>
>     </tr>
>   </thead>
>   <tbody>
>    <tr>
>      <td><b>Message Authentication Code (MAC)</b></td>
>      <td>
>        Một giá trị xác thực được tính từ <b>message</b> và một <b>secret key</b>, dùng để kiểm tra tính toàn vẹn (<b>integrity</b>) và tính xác thực (<b>authenticity</b>) của message.
>      </td>
>    </tr>
>    <tr>
>      <td><b>Processor Load</b></td>
>      <td>
>        Mức độ sử dụng tài nguyên xử lý của processor. Processor load càng cao thì CPU càng ít tài nguyên để thực hiện các tác vụ khác.
>      </td>
>    </tr>
>    <tr>
>      <td><b>Communication Overhead</b></td>
>      <td>
>        Phần chi phí bổ sung phát sinh khi truyền dữ liệu giữa các thành phần của hệ thống, chẳng hạn thời gian sao chép dữ liệu, truyền nhận và đồng bộ giữa main processor và HSM.
>      </td>
>    </tr>
>    <tr>
>      <td><b>Electric Vehicles (EV)</b></td>
>      <td>
>        Phương tiện sử dụng động cơ điện và năng lượng từ pin để vận hành, thay vì hoặc kết hợp với động cơ đốt trong.
>      </td>
>    </tr>
>    <tr>
>      <td><b>Vehicle-to-Grid (V2G)</b></td>
>      <td>
>        Công nghệ cho phép <b>electric vehicle</b> giao tiếp hai chiều với lưới điện, hỗ trợ sạc pin hoặc cung cấp điện ngược trở lại lưới khi cần.
>      </td>
>    </tr>
>    <tr>
>      <td><b>ISO 15118</b></td>
>      <td>
>        Tiêu chuẩn quốc tế quy định giao tiếp giữa <b>electric vehicle</b> và <b>charging station</b>, bao gồm xác thực, trao đổi dữ liệu và các chức năng như <b>Plug &amp; Charge</b>.
>      </td>
>    </tr>
>    <tr>
>      <td><b>Network Operator</b></td>
>      <td>
>        Nhà mạng viễn thông - đơn vị quản lý và vận hành hạ tầng mạng hoặc lưới điện, chịu trách nhiệm cung cấp dịch vụ và thực hiện các hoạt động như tính cước (billing) cho người dùng.
>      </td>
>    </tr>
>    <tr>
>      <td><b>Transport Layer Security (TLS)</b></td>
>      <td>
>        Giao thức bảo mật dùng để mã hóa và xác thực dữ liệu truyền qua mạng, giúp đảm bảo tính bảo mật, toàn vẹn và xác thực của kết nối.
>      </td>
>    </tr>
>    <tr>
>      <td><b>Diagnostic over IP (DoIP)</b></td>
>      <td>
>        Giao thức chẩn đoán cho phép truyền các thông điệp <b>UDS</b> qua mạng <b>IP/Ethernet</b> thay vì <b>CAN</b>. DoIP được tiêu chuẩn hóa trong <b>ISO 13400</b>, giúp tăng tốc độ truyền dữ liệu và hỗ trợ chẩn đoán, lập trình ECU trên nền <b>Ethernet</b>.
>      </td>
>    </tr>
>    <tr>
>      <td><b>Internet Protocol Security (IPsec)</b></td>
>      <td>
>        Bộ giao thức bảo mật ở tầng <b>Network Layer</b> dùng để xác thực, mã hóa và bảo vệ các gói dữ liệu IP. <b>IPsec</b> giúp đảm bảo tính bảo mật, toàn vẹn và xác thực của dữ liệu khi truyền qua mạng.
>      </td>
>    </tr>
>   </tbody>
> </table>
{: .codeBlock }
</details>

Nhờ khả năng tăng tốc các phép tính cryptographic, cô lập dữ liệu bảo mật và thực thi HSM firmware, HSM được ứng dụng trong nhiều chức năng security của ECU. Các use case dưới đây minh họa những ứng dụng phổ biến của HSM trong lĩnh vực automotive.

## Use Case 1: Secure Boot

**Secure Boot** là cơ chế kiểm tra tính xác thực (**authenticity**) của ECU application trong quá trình startup của ECU. Tuy nhiên, cơ chế này lại làm tăng thời gian khởi động hệ thống.

Việc ứng dụng HSM sẽ đem lại các lợi ích sau:
- HSM có thể giảm đáng kể thời gian này nhờ hardware support.
- HSM thậm chí có thể thực hiện việc kiểm tra tính xác thực đồng thời với quá trình system startup.

Tuy nhiên, cách triển khai này yêu cầu sự phối hợp phức tạp giữa HSM và main processor, đồng thời phải đáp ứng các yêu cầu của automotive OEM.

## Use Case 2: Message Authentication

Message Authentication là cơ chế gắn **Message Authentication Code (MAC)** vào mỗi message để bên nhận có thể xác minh tính xác thực của dữ liệu. Tuy nhiên, việc tạo và kiểm tra MAC cho từng message làm tăng processor load trên ECU, đặc biệt với CAN FD, nơi các frame được truyền liên tiếp với tần suất cao.

Việc sử dụng HSM giúp giảm tải cho main processor bằng cách hỗ trợ xử lý các phép tính liên quan đến MAC. Tuy nhiên, dữ liệu phải được trao đổi giữa main processor và HSM, tạo ra communication overhead. Vì vậy, HSM firmware cần được tối ưu để giảm communication overhead, đặc biệt trong các hệ thống sử dụng CAN FD có tần suất truyền message cao.

## Use Case 3: Vehicle-to-Grid Communication

Đối với **electric vehicles**, giao tiếp giữa xe và trạm sạc (**Vehicle-to-Grid**) được quy định bởi tiêu chuẩn **ISO 15118**. Kênh giao tiếp này sử dụng các thuật toán **cryptographic** để hỗ trợ các hoạt động thanh toán giữa chủ xe và nhà mạng (network operator); và được bảo vệ bằng **Transport Layer Security (TLS)**. **ISO 15118** cũng định nghĩa quy trình lưu trữ và cài đặt **certificates** một cách an toàn.

Việc ứng dụng HSM sẽ đem lại các lợi ích sau:
- Giảm tải cho main processor.
- Rút ngắn thời gian thiết lập kết nối **TLS**.
- Cô lập các dữ liệu bảo mật như **private keys** khỏi phần còn lại của hệ thống.

## Xu hướng ứng dụng của HSM

Các use case trên cho thấy **HSM firmware** hiện đã phải đáp ứng nhiều yêu cầu khác nhau. Trong tương lai, HSM còn được kỳ vọng hỗ trợ thêm các ứng dụng như:
- **Diagnostic over IP (DoIP)** được bảo vệ bằng **TLS**.
- **Certificate-based diagnostic service** theo tiêu chuẩn ISO để kích hoạt các **security-related diagnostic services**.
- Xác thực và bảo vệ lưu lượng dữ liệu bằng **Internet Protocol Security (IPsec)**.

---

# Linking an HSM to an AUTOSAR System

## Software Architecture của AUTOSAR

Trong AUTOSAR, software architecture được chia thành hai phần:
- Application software của ECU.
- **Basic software**.

Basic software cung cấp nhiều dịch vụ nền tảng đa dạng cho application software, ví dụ như:
- Bus communications.
- Diagnostics.
- Memory management.
- **Cryptographic services**.

Module **Crypto Service Manager (CSM)** cung cấp các cryptographic services (phục vụ các chức năng liên quan đến security) sau:
- Symmetrical encryption.
- Asymmetrical encryption.
- Computation of cryptographic checksums.
- Generation and verification of MACs.
- Generation and verification of signatures.
- Generation of random numbers.

Ngoài các cryptographic services, CSM còn cung cấp quyền truy cập đến một **database** để lưu trữ các thông tin liên quan đến security, ví dụ như cryptographic keys, certificates và application data. Tùy theo cấu hình, dữ liệu có thể được đọc, ghi hoặc trao đổi thông qua cryptographic protocol. CSM còn hỗ trợ tạo (derive) các cryptographic keys mới từ dữ liệu bí mật đã được lưu trữ. Để đảm bảo các dữ liệu cần bảo vệ luôn nằm trong database, các cryptographic services sẽ truy cập trực tiếp vào dữ liệu trong database.

Các phép toán cryptographic được thực hiện bởi các **crypto drivers (CRYPTO)**. Có hai loại crypto driver:
- **Software Driver (CRYPTO SW)**: Sử dụng software library chứa các thuật toán cryptographic.
- **Hardware Driver**: Hỗ trợ tích hợp cryptographic hardware accelerators và **HSM** vào hệ thống AUTOSAR.

CSM giao tiếp với các crypto drivers thông qua lớp trung gian **Crypto Interface (CRYIF)**. Nhờ CRYIF, các giải pháp software và hardware có thể được sử dụng đồng thời trong cùng một hệ thống.

## HSM Crypto Driver (CRYPTO HSM)

Nhiệm vụ chính của HSM crypto driver (CRYPTO HSM) là nhanh chóng chuyển các yêu cầu xử lý (operational instructions) đến HSM firmware. CRYPTO HSM và HSM firmware giao tiếp với nhau thông qua shared memory của microcontroller. Trong shared memory có thể tạo nhiều **HSM channels**, qua đó CRYPTO HSM truyền các operational instructions đến HSM.

Nếu HSM firmware được thiết kế phù hợp thì HSM có thể được truy cập từ nhiều cores của main processor. Cơ chế giao tiếp này cho phép thực hiện secure partitioning giữa hệ thống AUTOSAR và HSM firmware.

Ngoài ra, CRYPTO HSM còn cung cấp nhiều logical processing units, được tạo dựa trên chức năng và cấu hình của HSM firmware, giúp truy cập linh hoạt các chức năng của HSM theo từng nhu cầu cụ thể.

---

# Software Architecture of a Flexible HSM Firmware Implementation

<details markdown="block">
<summary><i>Các thuật ngữ liên quan</i></summary>

> <table class="hover-table">
>   <thead>
>     <tr>
>       <th>Thuật ngữ</th>
>       <th>Giải thích</th>
>     </tr>
>   </thead>
>   <tbody>
>     <tr>
>       <td><b>Advanced Encryption Standard (AES) Computations</b></td>
>       <td>
>         Các phép tính sử dụng thuật toán mã hóa đối xứng <b>AES</b>, bao gồm <b>encryption</b>, <b>decryption</b> và các phép toán liên quan như tạo <b>MAC</b>. Do được sử dụng rất phổ biến nên nhiều <b>HSM</b> tích hợp <b>AES hardware accelerator</b> để tăng tốc các phép tính này.
>       </td>
>     </tr>
>     <tr>
>       <td><b>RSA (Asymmetric Cryptographic Algorithm)</b></td>
>       <td>
>         Thuật toán mã hóa bất đối xứng sử dụng một cặp khóa gồm <b>public key</b> và <b>private key</b>. <b>RSA</b> thường được dùng để mã hóa khóa, tạo và xác minh <b>digital signature</b>, cũng như xác thực trong các giao thức bảo mật.
>       </td>
>     </tr>
>     <tr>
>       <td><b>Elliptical Curves Operations</b></td>
>       <td>
>         Các phép toán trên <b>Elliptic Curve Cryptography (ECC)</b>, sử dụng các tính chất toán học của đường cong elliptic để thực hiện mã hóa, trao đổi khóa và tạo <b>digital signature</b>. <b>ECC</b> đạt mức bảo mật tương đương <b>RSA</b> nhưng sử dụng khóa có kích thước nhỏ hơn.
>       </td>
>     </tr>
>   </tbody>
> </table>
{: .codeBlock }
</details>

Software architecture của HSM firmware cần có tính **modular** và **configurable** để hỗ trợ triển khai nhiều use case khác nhau. Vì vậy, HSM firmware có thể được xây dựng theo kiến trúc tương tự AUTOSAR, mang lại các ưu điểm sau:
- Áp dụng khái niệm crypto driver của AUTOSAR dưới dạng các cryptographic extension modules.
- Có thể tái sử dụng các AUTOSAR modules dành cho memory management.
- HSM firmware được cấu hình bằng các tools quen thuộc của AUTOSAR.

## Crypto Driver trong HSM

Crypto driver là một modular processing unit có AUTOSAR-standardized interface. Một thành phần phân phối (Job Dispatcher) nhận các tác vụ đang chờ (pending tasks) và, tương tự AUTOSAR, phân phối chúng đến các crypto driver tương ứng trong HSM thông qua lớp trung gian CRYIF.

Các processing units trong HSM được chia thành ba nhóm:
<table class="hover-table">
  <thead>
    <tr>
      <th>Nhóm</th>
      <th>Chức năng</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Hardware</td>
      <td>Thực hiện các phép toán được hardware accelerated, bao gồm tính toán AES, MAC và tạo random numbers.</td>
    </tr>
    <tr>
      <td>Software</td>
      <td>Thực hiện các thuật toán được cài đặt bằng software, như thuật toán bất đối xứng RSA và các phép toán trên elliptical curves.</td>
    </tr>
    <tr>
      <td>Special Functions</td>
      <td>Thực hiện các chức năng theo yêu cầu của từng OEM hoặc ECU.</td>
    </tr>
  </tbody>
</table>

Kiến trúc này giúp HSM firmware có tính portability cao vì các module phụ thuộc hardware được đóng gói (encapsulated). Ngoài ra, bằng cách tích hợp các software libraries, HSM firmware có thể linh hoạt bổ sung thêm các phép toán cryptographic khác.

## Memory Management của HSM

Memory management của HSM cũng cần có tính linh hoạt. Các trường hợp sử dụng điển hình gồm:
- **Message authentication**: lưu trữ nhiều symmetrical keys có kích thước nhỏ.
- **TLS với trạm sạc** hoặc **diagnostic tester**: lưu trữ một số lượng nhỏ certificates, nhưng mỗi certificate có kích thước lớn hơn nhiều so với symmetrical key.

Database, còn gọi là Secure Storage, sử dụng các basic software modules hiện có để quản lý memory và lưu trữ an toàn dữ liệu trong nonvolatile memory của HSM. Secure Storage hỗ trợ:
- Redundant data storage (lưu trữ dữ liệu dự phòng).
- Memory partitioning (phân vùng bộ nhớ).

## Configuration của HSM Firmware

Tài nguyên computing và memory của HSM hardware là hữu hạn. Vì vậy, HSM firmware cần được cấu hình phù hợp với từng application case để sử dụng hiệu quả các tài nguyên sẵn có. Việc cấu hình bao gồm:
- Kích hoạt hoặc vô hiệu hóa các thuật toán cryptographic.
- Tối ưu memory layout của database.

Các thiết lập này được thực hiện bằng các AUTOSAR configuration tools để hỗ trợ cấu hình thuận tiện hơn.

---

# Tham khảo

[1] [AUTOSAR, "AUTOSAR Security Overview"](https://www.autosar.org/fileadmin/standards/R24-11/FO/AUTOSAR_FO_EXP_SecurityOverview.pdf)

[2] [LinkedIn, "Deep Dive: AUTOSAR HSM Flow APIs"](https://www.linkedin.com/posts/dattatak_deep-dive-autosar-hsm-flow-apis-in-activity-7461460923916947457-2O1K)

[3] [Agnile, "HSM (Hardware Security Module)"](https://agnile.com/resources/glossary/hsm)

[4] [Vector, "Hardware Security Modules (HSM) for Automotive ECUs"](https://cdn.vector.com/cms/content/know-how/_technical-articles/Security_HSM_Automobil-Elektronik_201808_PressArticle_EN.pdf)

[5] [Infineon Technologies, "AURIX™ Hardware Security Module Training"](https://assets.infineon.com/is/content/infineon/infineon/row/public/documents/10/56/Infineon-AURIX_Hardware_Security_Module-Training-EN.pdf?utm_source=chatgpt.com)

[6] [Embedded, "How hardware security modules enable AUTOSAR"](https://www.embedded.com/how-hardware-security-modules-enable-autosar/)