---
title: HSM
parent: Hardware Security
nav_order: 3
---

<h1>Hardware Security Module (HSM)</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

# Tổng quan

## HSM là gì?

Trong automotive, **Hardware Security Modules (HSM)** là một phân vùng silicon độc lập (discrete silicon block) được tích hợp trực tiếp trên cùng một đế chip (die) với application MCU. Về mặt cấu trúc, HSM hoạt động tương tự một processor core bổ sung trong kiến trúc multicore processor.

HSM là một microcontroller độc lập được kết nối với bus của hệ thống máy chủ (Host system) thông qua một dạng firewall và sở hữu các thành phần phần cứng chuyên biệt riêng biệt bao gồm:

- **CPU riêng**: Có khả năng thực thi bất kỳ firmware nào được tối ưu hóa cho các trường hợp cụ thể (programmable); nhờ đó, nó có thể đáp ứng nhiều yêu cầu bảo mật phức tạp hơn hẳn so với một bộ đồng xử lý (coprocessor) đơn thuần.

- **ROM và SRAM/Flash riêng**: Vùng lưu trữ mã chương trình và dữ liệu nhạy cảm được bảo vệ nghiêm ngặt, cách ly hoàn toàn khỏi sự truy cập của Host CPU.

- **Bus nội bộ riêng**: Kết nối trực tiếp đến fused key storage.

- [**Hardware accelerator**]({{ "/docs/Embedded_Systems_Architecture/HSM/HardwareAccelerator/" | relative_url }}): Hỗ trợ tính toán hiệu suất cao cho cả thuật toán đối xứng (AES) và bất đối xứng (RSA, ECC), các công cụ băm (Hash), cùng bộ tạo số ngẫu nhiên phần cứng (TRNG/PRNG); giảm thời gian xử lý các thuật toán cryptographic.

Nhờ ranh giới bảo mật phần cứng này, Host CPU có thể gửi yêu cầu thực hiện các cryptographic operations nhưng secret key sẽ không bao giờ rời khỏi HSM. Điều này biến HSM trở thành "điểm tựa tin cậy phần cứng" (hardware root of trust) cốt lõi cho toàn bộ ECU trên xe; và đáp ứng các cấp độ bảo mật của [EVITA]({{ "/docs/Embedded_Systems_Architecture/HSM/EVITA/" | relative_url }}) (Light, Medium, Full).

<details markdown="block">
<summary><i>Fused key storage</i></summary>

> **Fused key storage**: là vùng lưu trữ khóa bảo mật được ghi một lần vào phần cứng và được bảo vệ để phần mềm thông thường không thể đọc trực tiếp khóa ra ngoài.
> 
> **Fuse** là một phần tử phần cứng có thể được lập trình để chuyển sang trạng thái cố định. Sau khi đã ghi, trạng thái này thường không thể reset về trạng thái ban đầu. Vì vậy nó phù hợp để lưu các giá trị bảo mật cố định. Một số MCU gọi cơ chế này là: 
> - eFuse
> - OTP (One-Time Programmable)
> - Fuse bits
> - Hardware key storage
> - Secure key storage
>
> Một MCU có thể sử dụng fused key storage để lưu:
> - Device Key: Khóa duy nhất của từng MCU.
> - OEM Root Key: Root key được cung cấp bởi OEM.
> - HUK (Hardware Unique Key): Khóa duy nhất gắn với hardware.
> - Key hash / Key identifier: Xác định hoặc kiểm tra khóa.
> - Secure Boot configuration: Cấu hình/bit liên quan đến Secure Boot.
> - Debug authentication configuration: Kiểm soát quyền debug.
> 
> Tuy nhiên, không phải mọi fused storage đều trực tiếp lưu plaintext key. Một số thiết kế chỉ lưu key material đã mã hóa, key derivation seed, hoặc giá trị dùng để tạo ra key.
{: .codeBlock }
</details>

<details markdown="block">
<summary><i>Cryptographic operation</i></summary>

> Cryptographic operation (thao tác bảo mật) là một hành động hoặc quá trình xử lý dữ liệu sử dụng các thuật toán toán học dựa trên nền tảng cryptography nhằm bảo vệ thông tin.
> 
> Các thao tác bảo mật gồm:
> - **Encryption**: Mã hoá plaintext thành ciphertext.
> - **Decryption**: Giải mã ciphertext thành plaintext.
> - **Hashing**: sử dụng thuật toán để ánh xạ dữ liệu có độ dài bất kỳ thành đầu ra có độ dài cố định để lưu trữ và truy xuất thông tin nhanh chóng.
> - **Digital Signing / Signing**: Dùng private key để ký lên dữ liệu nhằm xác thực danh tính người gửi và đảm bảo tính nguyên vẹn của tài liệu.
> - **Verification**: Kiểm tra tính hợp lệ của chữ ký số bằng public key
{: .codeBlock }
</details>

---

## 1.2. Lý do cần HSM

**1. Sự gia tăng kết nối và diện tấn công (Attack Surface)**

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
>         Các công ty thiết kế và sản xuất chất bán dẫn như <b>MCU</b>, <b>SoC</b>, bộ nhớ và các <b>IC</b> khác. Trong lĩnh vực ô tô, các hãng như <b>Infineon</b>, <b>NXP</b>, <b>Renesas</b>, <b>STMicroelectronics</b> và <b>Texas Instruments</b> thường tích hợp các tính năng bảo mật (như <b>HSM</b>) vào sản phẩm.
>       </td>
>     </tr>
>   </tbody>
> </table>
{: .codeBlock }
</details>

Các ECU đã có các cơ chế security sau:
- Kiểm tra tính xác thực (authenticity) của application trong quá trình startup và khi thực hiện software update.
- Chỉ cho phép sử dụng các security-related diagnostic services sau khi authorization thành công.

Tuy nhiên, các ECU hiện đại đã chuyển dịch thành các nút mạng (node) có tính kết nối cao qua Bluetooth, mạng viễn thông (telematics), diagnostics và OTA. Khi mức độ networking trong hệ thống điện tử trên xe ngày càng tăng, số lượng external interfaces cũng tăng theo, làm mở rộng attack surface. Đồng thời, networking còn tạo ra nhiều use case mới có liên quan đến security, chẳng hạn như automatic billing trong lĩnh vực electric mobility.

Trong khi đó, các giao thức nội bộ truyền thống (CAN, LIN, FlexRay) thiếu cơ chế mã hóa hay xác thực, khiến kẻ tấn công dễ dàng can thiệp dữ liệu hoặc gửi message giả mạo từ bất kỳ node nào trên bus.

**2. Áp lực khắt khe về mặt thời gian thực (Real-Time Constraints)**

"Chain of effects" (từ thời điểm cảm biến nhận tín hiệu đầu vào đến khi có phản hồi vật lý phù hợp) có yêu cầu thời gian chạy cực kỳ ngắn, chỉ cho phép dao động từ 10 µs đến 100 ms. Sự chậm trễ trong xử lý không chỉ làm giảm sự thoải mái của người dùng mà còn gây nguy hiểm trực tiếp đến tính mạng con người đối với các tính năng liên quan đến an toàn.

**3. Sự quá tải tính toán của giải pháp phần mềm**

Thời gian tính toán của các thành phần mã hóa cơ bản (cryptographic primitives) thường lớn hơn nhiều lần so với thời gian thực hiện các hàm xử lý tín hiệu. Nếu thực thi hoàn toàn bằng phần mềm (pure software) trên CPU chính, hệ thống sẽ xuất hiện một bài toán khó khi phân chia công việc trong các lần gọi `main` function:

- Nếu chia nhỏ tác vụ mật mã (cryptographic operation) để xử lý từng chút một qua các chu kỳ, thì tác vụ này sẽ hoàn thành quá chậm, từ đó kéo dài thời gian nhận kết quả lên gấp nhiều lần và tạo ra chi phí vận hành (overhead) cực kỳ lớn.

- Nếu thực hiện quá nhiều bước tính toán của cryptographic operation trong một chu kỳ, thì CPU bị giữ quá lâu cho cryptography, ảnh hưởng các task/function khác và có thể phá vỡ tính real-time của hệ thống.


**4. Yêu cầu cô lập vật lý để bảo vệ khóa (Partitioning)**

Các khóa mật mã không bao giờ được phép hoạt động như các biến phần mềm thông thường vì chúng rất dễ bị rò rỉ nếu CPU chính bị khai thác mã độc. Do đó cần phân vùng bộ nhớ giúp các dữ liệu cần bảo vệ được lưu giữ an toàn, tách biệt hoàn toàn với phần còn lại của application.

**5. Tránh sai lầm muộn màng trong quá trình thiết kế**

Việc xác định và lựa chọn cấu hình HSM phù hợp với mô hình đe dọa ngay từ bước Phân tích mối đe dọa và Đánh giá rủi ro ([Threat Assessment and Remediation Analysis - TARA](https://www.mitre.org/news-insights/publication/threat-assessment-and-remediation-analysis-tara)) giúp nhà sản xuất tránh được việc phát hiện quá muộn trong quá trình tích hợp rằng phần cứng không đủ khả năng đáp ứng, ngăn ngừa các lỗi trễ hạn dự án hoặc các đợt chỉnh sửa phần cứng (silicon respin) vô cùng tốn kém.

---

## 1.3. Mục đích sử dụng HSM

Việc tích hợp HSM vào các ECU hướng tới hai mục đích chiến lược:
- Giải quyết triệt để bài toán tối ưu hóa tài nguyên thông qua ba mục tiêu thiết kế cốt lõi.
- Thiết lập "Điểm tựa tin cậy phần cứng" vững chắc cho toàn bộ phương tiện.

**1. Ba mục tiêu cốt lõi của HSM**

- **Tăng hiệu năng (Increased performance):** Việc sử dụng các [hardware accelerated]({{ "/docs/Embedded_Systems_Architecture/HSM/HardwareAccelerator/" | relative_url }}) chuyên dụng giúp giảm thời gian thực hiện các phép tính cryptographic (như encryption). Điều này giúp rút ngắn thời gian chờ và giảm tải cho main processor.

- **Phân vùng (Partitioning):** HSM sở hữu các vùng nhớ RAM và Flash riêng biệt và tách biệt hoàn toàn khỏi Host CPU. Vùng Secure Storage này cho phép HSM cất giữ một số lượng lớn và linh hoạt các encryption keys, certificates và dữ liệu nhạy cảm khác. Mọi phép toán mật mã sử dụng khóa đều được thực thi khép kín bên trong HSM; Host CPU chỉ có thể gửi yêu cầu dịch vụ và nhận kết quả mà tuyệt đối không bao giờ nhìn thấy hoặc tiếp cận được khóa mật mã.

- **Tính linh hoạt (Flexibility):** Tính programmable của HSM cho phép đáp ứng nhiều use case khác nhau cũng như các yêu cầu riêng của từng OEM (dễ dàng cập nhật HSM firmware, tích hợp thêm các thuật toán mật mã mới,...).

**2. Thiết lập "Điểm tựa tin cậy phần cứng" (Hardware Trust Anchor)**

HSM hoạt động như một gốc tin cậy phần cứng (hardware root of trust) hay điểm tựa tin cậy phần cứng (hardware trust anchor) cốt lõi nhất của ECU. Toàn bộ security stack của ECU đều vận hành dựa trên giả định tin cậy vào điểm tựa phần cứng này. Security stack của ECU bao gồm: khởi động an toàn (Secure Boot), cập nhật phần mềm an toàn (Secure Flashing), xác thực thông điệp truyền thông trong xe (SecOC) và quản lý lưu trữ khóa.

Nếu không có HSM, cả khóa bí mật lẫn thuật toán xác thực đều buộc phải thực thi trên application core. Khi đó, bất kỳ lỗ hổng bảo mật hoặc code-execution nào ở application core chính cũng có thể cho phép kẻ tấn công vượt qua cơ chế bảo vệ và đánh cắp khóa.

---

## 1.4. So sánh các phương pháp triển khai security

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
>       <td><b>Concurrency</b><br><i>(Tính đồng thời)</i></td>
>       <td>Khả năng nhiều tác vụ được thực hiện đồng thời hoặc chồng lấp về thời gian. Trong <b>HSM</b>, các phép tính <b>cryptographic</b> có thể chạy song song với các tác vụ trên <b>main processor</b>, giúp tăng hiệu suất hệ thống.
>       </td>
>     </tr>
>   </tbody>
> </table>
{: .codeBlock }
</details>

Để thấy rõ ưu điểm của HSM, có thể so sánh ba phương pháp triển khai các chức năng security:

<table class="hover-table">
  <thead>
    <tr>
      <th>Comparison</th>
      <th>Pure Software Solution<br>(on Main Processor)</th>
      <th>Hardware Accelerated Solution<br>(on Main Processor)</th>
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

## 1.5. Phân biệt HSM với SHE, TPM, TrustZone

Để tránh nhầm lẫn trong thiết kế hệ thống, cần phân biệt rõ HSM với ba công nghệ bảo mật phổ biến sau:

**1. Secure Hardware Extension (SHE):** Là một security standard dành cho automotive MCUs, được ban hành bởi Hiệp hội Phần mềm Nhà sản xuất Đức (Hersteller Initiative Software - HIS). SHE gồm 3 khối cơ bản: vùng lưu trữ thông tin nhạy cảm, bộ mã hóa khối và logic điều khiển kết nối với CPU.

  - **Khác biệt:** SHE hoạt động như một cryptographic coprocessor có chức năng hạn chế và chỉ tập trung vào việc thực thi thuật toán đối xứng AES-128. Về mặt tính năng, SHE chỉ tương đương với cấu hình cơ bản nhất của HSM là **EVITA Light**. SHE không có CPU và RAM nội bộ riêng để lập trình tự do hay xử lý các giao thức mật mã bất đối xứng (như RSA, ECC) phức tạp vốn được hỗ trợ từ cấp độ EVITA Medium và Full.

**2. Trusted Platform Module (TPM):** Là một module phần cứng chuyên dùng cho các nền tảng công nghệ thông tin/máy tính tiêu chuẩn, được định nghĩa bởi tổ chức Trusted Computing Group (TCG).

  - **Khác biệt:** TPM tập trung vào các tính năng bảo mật nền tảng như khởi động an toàn và xác minh tính toàn vẹn của hệ thống. Mặc dù một số bộ phận giải trí (head units) trên xe hơi có thể trang bị TPM, nhưng mạng lưới nội bộ của xe (in-vehicle network) không được thiết kế để giả định hoặc phụ thuộc vào sự hiện diện của module này. Ngược lại, HSM được tối ưu hóa tối đa cho các tác vụ thời gian thực, giao tiếp bus trong xe (như SecOC) và các ràng buộc tài nguyên nghiêm ngặt của ECU.

**3. ARM TrustZone:** là một processor mode giúp phân tách và cô lập secure world và normal world trên cùng một core.

  - **Khác biệt:** ARM TrustZone là giải pháp cô lập dựa trên việc chia sẻ tài nguyên của cùng một core vật lý. Nó rất hữu ích nhưng **không tương đương với một core HSM riêng biệt**. HSM sở hữu một CPU vật lý độc lập với bộ nhớ riêng và "Hardware trust anchors" được neo giữ trực tiếp từ ROM của chính nó, mang lại khả năng chống lại các cuộc tấn công khai thác lỗi phần mềm (như code-execution trên application core) tốt hơn nhiều so với giải pháp chạy chung core.


<details markdown="block">
<summary><i>Hardware Trust Anchors</i></summary>

> **Hardware Trust Anchors**: có chức năng chính là bảo vệ dữ liệu nhạy cảm khỏi sự can thiệp và hỗ trợ các tác vụ mật mã đòi hỏi năng lực tính toán cao. Các Hardware trust anchors đã được chuẩn hóa bao gồm:
> - Hardware Security Modules (HSM)
> - Secure Hardware Extensions (SHE)
> - Trusted Platform Modules (TPM)
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>Secure World / Normal World</i></summary>

> **Secure World** và **Normal World** là hai vùng thực thi (execution environments) được phân tách trên cùng một physical CPU core. CPU có thể chuyển đổi giữa hai world này.
>
> Ví dụ, một CPU ARM có 1 physical core chứa 2 world như sau:
> <table class="hover-table">
>   <thead>
>     <tr>
>       <th>Secure World</th>
>       <th>Normal World</th>
>     </tr>
>   </thead>
>   <tbody>
>     <tr>
>       <td>
>         <ul>
>           <li>Trusted software</li>
>           <li>Secure OS</li>
>           <li>Secure services</li>
>         </ul>
>       </td>
>       <td>
>         <ul>
>           <li>Application</li>
>           <li>Normal OS</li>
>           <li>User applications</li>
>         </ul>
>       </td>
>     </tr>
>   </tbody>
> </table>
{: .codeBlock }
</details>

<table class="hover-table">
  <thead>
    <tr>
      <th>Tiêu chí</th>
      <th>HSM</th>
      <th>SHE</th>
      <th>TPM</th>
      <th>Arm TrustZone</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Bản chất vật lý</th>
      <td>
        <ul>
          <li>Khối silicon độc lập trên cùng một đế chip (die) với MCU chính.</li>
          <li>MCU độc lập kết nối qua firewall.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Tiêu chuẩn/đặc tả của HIS.</li>
          <li>Cryptographic coprocessor.</li>
        </ul>
      </td>
      <td>Module phần cứng chuyên dụng định nghĩa bởi TCG.</td>
      <td>Processor mode giúp cách ly tài nguyên.</td>
    </tr>
    <tr>
      <th>Khả năng lập trình</th>
      <td>Programmable.</td>
      <td>Cố định chức năng phần cứng, không có CPU riêng.</td>
      <td>Chức năng cố định theo chuẩn cấu hình bảo mật.</td>
      <td>Programmable thông qua phần mềm chạy trong vùng an toàn.</td>
    </tr>
    <tr>
      <th>Tài nguyên bộ nhớ</th>
      <td>Sở hữu RAM bảo vệ và phân vùng Flash riêng độc lập.</td>
      <td>Vùng lưu trữ hạn chế, không có CPU và SRAM nội bộ.</td>
      <td>Lưu trữ bảo mật cho khóa và chứng chỉ nền tảng.</td>
      <td>Sử dụng bộ nhớ của CPU chính nhưng phân tách bằng logic.</td>
    </tr>
    <tr>
      <th>Mật mã hỗ trợ</th>
      <td>
        <ul>
          <li>Mật mã đối xứng (AES) và bất đối xứng (RSA, ECC/ECDSA).</li>
          <li>Bộ tạo số ngẫu nhiên TRNG/PRNG.</li>
        </ul>
      </td>
      <td>Hạn chế, chỉ hỗ trợ mật mã đối xứng AES-128 và MAC.</td>
      <td>Thuật toán cơ bản để xác minh tính toàn vẹn và quản lý khóa.</td>
      <td>Đa dạng, do phần mềm và OS vùng bảo mật thực thi.</td>
    </tr>
    <tr>
      <th>Ứng dụng tiêu biểu</th>
      <td>Gateway, V2X, Secure Boot đa giai đoạn, Secure Flashing.</td>
      <td>Cảm biến, bộ chấp hành, ECU đơn giản (tương đương EVITA Light).</td>
      <td>Xác thực khởi động, trang bị trên một số bộ giải trí (head units).</td>
      <td>Các ứng dụng xử lý cao, cần nhiều bộ nhớ (như giải trí, truyền thông).</td>
    </tr>
  </tbody>
</table>

---

# 2. Linking an HSM to an AUTOSAR System

<figure>
  <img
    src="{{ site.baseurl }}\assets\images\Linking_an_HSM_to_an_AUTOSAR_System.png"
  />
  <figcaption>Liên kết HSM với hệ thống AUTOSAR<br>
  </figcaption>
</figure>

---

## 2.1. Software Architecture của AUTOSAR

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

Ngoài các cryptographic services, CSM còn cung cấp quyền truy cập đến một database là **Secure Storage** để lưu trữ các thông tin liên quan đến security (ví dụ như cryptographic keys, certificates và application data). Tùy theo cấu hình, dữ liệu có thể được đọc, ghi hoặc trao đổi thông qua cryptographic protocol. CSM còn hỗ trợ tạo (derive) các cryptographic keys mới từ dữ liệu bảo mật đã được lưu trữ. Để đảm bảo các dữ liệu cần bảo vệ luôn nằm trong database, các cryptographic services sẽ truy cập trực tiếp vào dữ liệu trong database.

Các phép toán cryptographic được thực hiện bởi các **crypto drivers (CRYPTO)**. Có hai loại crypto driver:
- **Software Driver (CRYPTO SW)**: Sử dụng software library chứa các thuật toán cryptographic.
- **Hardware Driver (CRYPTO HSM)**: Hỗ trợ tích hợp cryptographic hardware accelerators và **HSM** vào hệ thống AUTOSAR.

CSM giao tiếp với các crypto drivers thông qua lớp trung gian **Crypto Interface (CRYIF)**. Nhờ CRYIF, các giải pháp software và hardware có thể được sử dụng đồng thời trong cùng một hệ thống.

---

## 2.2. HSM Crypto Driver (CRYPTO HSM)

Nhiệm vụ chính của **HSM crypto driver (CRYPTO HSM)** là nhanh chóng chuyển các yêu cầu xử lý (operational instructions) đến HSM firmware. CRYPTO HSM và HSM firmware giao tiếp với nhau thông qua **shared memory** của microcontroller. Trong shared memory có thể tạo nhiều **HSM channels**, qua đó CRYPTO HSM truyền các operational instructions đến HSM.

Nếu HSM firmware được thiết kế phù hợp thì HSM có thể được truy cập từ nhiều cores của main processor. Cơ chế giao tiếp này cho phép thực hiện secure partitioning giữa hệ thống AUTOSAR và HSM firmware.

Ngoài ra, CRYPTO HSM còn cung cấp nhiều **logical processing units**, được tạo dựa trên chức năng và cấu hình của HSM firmware, giúp truy cập linh hoạt các chức năng của HSM theo từng nhu cầu cụ thể.

## 2.3. Luồng gửi yêu cầu đến HSM

1. **Application**<br>
Khởi tạo một yêu cầu xử lý mật mã (ví dụ: encrypt, decrypt, hash, MAC, signature, hoặc verification).
1. **CSM**<br>
Tiếp nhận yêu cầu, kiểm tra tính hợp lệ của service cũng như Job configuration, sau đó ánh xạ (map) yêu cầu này sang cấu trúc Crypto_JobType.
1. **CryIf)**<br>
Đóng vai trò điều hướng (routing), đưa Job vừa xử lý đến đúng Crypto Driver Object đã được thiết lập sẵn.
1. **Crypto Driver**<br>
Giao tiếp trực tiếp với khối phần cứng HSM để chuyển giao yêu cầu tính toán.
1. **HSM**<br>
Thực thi thuật toán mật mã cơ bản (Crypto primitive) bằng cách sử dụng khóa bảo mật nằm bên trongSecure Storage.
1. **Phản hồi kết quả (Callback & Return)**<br>
Kết quả xử lý, trạng thái và tín hiệu callback được chuyển ngược trở lên các tầng trên theo thứ tự truyền ban đầu.

---

# 3. Software Architecture of a Flexible HSM Firmware Implementation

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


<figure>
  <img
    src="{{ site.baseurl }}\assets\images\Linking_an_HSM_to_an_AUTOSAR_System.png"
  />
  <figcaption>Liên kết HSM với hệ thống AUTOSAR<br>
  </figcaption>
</figure>

## 3.1. Crypto Driver trong HSM

Crypto driver là một modular processing unit có AUTOSAR-standardized interface. **Job Dispatcher** nhận các tác vụ đang chờ (pending tasks) và, tương tự AUTOSAR, phân phối chúng đến các crypto driver tương ứng trong HSM thông qua lớp trung gian **CRYIF**.

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

## 3.2. Memory Management của HSM

Memory management của HSM cũng cần có tính linh hoạt. Các trường hợp sử dụng điển hình gồm:
- **Message authentication**: lưu trữ nhiều symmetrical keys có kích thước nhỏ.
- **TLS với trạm sạc** hoặc **diagnostic tester**: lưu trữ một số lượng nhỏ certificates, nhưng mỗi certificate có kích thước lớn hơn nhiều so với symmetrical key.

Database, còn gọi là Secure Storage, sử dụng các basic software modules hiện có để quản lý memory và lưu trữ an toàn dữ liệu trong nonvolatile memory của HSM. Secure Storage hỗ trợ:
- Redundant data storage (lưu trữ dữ liệu dự phòng).
- Memory partitioning (phân vùng bộ nhớ).

## 3.3. Configuration của HSM Firmware

Tài nguyên computing và memory của HSM hardware là hữu hạn. Vì vậy, HSM firmware cần được cấu hình phù hợp với từng application case để sử dụng hiệu quả các tài nguyên sẵn có. Việc cấu hình bao gồm:
- Kích hoạt hoặc vô hiệu hóa các thuật toán cryptographic.
- Tối ưu memory layout của database.

Các thiết lập này được thực hiện bằng các AUTOSAR configuration tools để hỗ trợ cấu hình thuận tiện hơn.

---

# 4. Use Cases of an HSM

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
>        Giao thức chẩn đoán cho phép truyền các message <b>UDS</b> qua mạng <b>IP/Ethernet</b> thay vì <b>CAN</b>. DoIP được tiêu chuẩn hóa trong <b>ISO 13400</b>, giúp tăng tốc độ truyền dữ liệu và hỗ trợ chẩn đoán, lập trình ECU trên nền <b>Ethernet</b>.
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

---

## 4.1. Use Case 1: Secure Boot

**Secure Boot** là cơ chế kiểm tra tính xác thực (authenticity) của application trong quá trình startup của ECU; nhằm đảm bảo rằng chỉ có firmware hợp lệ, đã được ký (signed) và không bị can thiệp mới được phép chạy trên ECU. 

Tuy nhiên, Secure Boot thường làm kéo dài thời gian khởi động của xe. Việc ứng dụng HSM sẽ đem lại các lợi ích sau:
- HSM có thể giảm đáng kể thời gian này nhờ [hardware accelerator]({{ "/docs/Embedded_Systems_Architecture/HSM/HardwareAccelerator/" | relative_url }}).
- HSM thậm chí có thể thực hiện việc kiểm tra tính xác thực đồng thời với quá trình system startup.

Luồng xử lý của Secure Boot thiết lập nền tảng tin cậy dựa trên HSM:
1. Bootloader đọc firmware image.
1. CSM gửi yêu cầu hash/signature verification.
1. CryIf định tuyến tác vụ đến Crypto Driver của HSM.
1. HSM thực thi xác thực bằng key được bảo vệ trong Secure Stogare.
1. Nếu xác thực thành công, firmware được phép chạy.
1. Nếu xác thực thất bại, ECU sẽ chuyển sang trạng thái an toàn (safe state), chế độ phục hồi (recovery mode) hoặc từ chối thực thi firmware image đó.

Tuy nhiên, cách triển khai này yêu cầu sự phối hợp phức tạp giữa HSM và main processor, đồng thời phải đáp ứng các yêu cầu của automotive OEM.

---

## 4.2. Use Case 2: Message Authentication

Cơ chế **Message Authentication**: Module SecOC cung cấp cơ chế xác thực tính nguyên bản (authenticity) và tính mới (freshness) của PDU bằng cách tính toán và bổ sung MAC và Freshness value vào mỗi PDU.

Tuy nhiên, việc tạo và kiểm tra MAC cho từng message làm tăng processor load trên ECU, đặc biệt với CAN FD, nơi các frame được truyền liên tiếp với tần suất cao. Việc ứng dụng HSM giúp giải phóng tải hoàn toàn cho main processor nhờ khả năng xử lý tốc độ cao các phép tính liên quan đến MAC.

Tuy nhiên, dữ liệu phải được trao đổi giữa main processor và HSM, tạo ra communication overhead. Vì vậy, HSM firmware cần được tối ưu để giảm communication overhead, đặc biệt trong các hệ thống sử dụng CAN FD có tần suất truyền message cao.

Luồng xử lý của một ECU hỗ trợ SecOC có tích hợp HSM:
1. SecOC chuẩn bị PDU.
1. Application gọi `Csm_MacGenerate(jobId, &in, &out)`. jobId được tham chiếu đến key và algorithm được cấu hình sẵn (CMAC-AES128).
1. Csm đưa job vào hàng đợi; CryIf định tuyến đến Crypto Driver và key slot tương ứng.
1. Crypto Driver gửi dữ liệu/yêu cầu đến HSM thông qua host–HSM bridge (shared memory + interrupt).
1. HSM lấy key từ internal secure storage và thực hiện CMAC-AES128 (key không rời khỏi HSM).
1. HSM báo hoàn thành và trả MAC + status; Crypto Driver đọc kết quả MAC. Interrupt hoặc polled mailbox. Crypto Driver kiểm tra status và gửi đến CryIf.
1. Csm callback được gọi → Application nhận MAC và gắn MAC vào SecOC PDU trước khi gửi lên bus.

Steps 1–3 và 5–6 chạy trên Application/Main Core, trong khi Step 4 chạy bên trong HSM.

---

## 4.3. Use Case 3: Vehicle-to-Grid Communication (V2G)

Đối với **electric vehicles**, giao tiếp giữa xe và trạm sạc (**Vehicle-to-Grid**) được quy định bởi tiêu chuẩn [ISO 15118](https://www.iso.org/standard/55365.html). Kênh giao tiếp này sử dụng các thuật toán **cryptographic** để hỗ trợ các hoạt động thanh toán giữa chủ xe và nhà mạng (network operator); và được bảo vệ bằng **Transport Layer Security (TLS)**. ISO 15118 cũng định nghĩa quy trình lưu trữ và cài đặt **certificates** một cách an toàn.

Việc ứng dụng HSM sẽ đem lại các lợi ích sau:
- Giảm tải cho main processor.
- Rút ngắn thời gian thiết lập kết nối **TLS**.
- Cô lập các dữ liệu bảo mật như **private keys** khỏi phần còn lại của hệ thống.

## 4.4. Use Case 4: Vehicle-to-Everything Communication (V2X)

Để bảo vệ các message trao đổi thời gian thực giữa các phương tiện (V2V) và giữa phương tiện với cơ sở hạ tầng (V2I), tiêu chuẩn [IEEE 1609.2](https://standards.ieee.org/ieee/1609.2/10258/) yêu cầu mọi message gửi đi từ xe phải mang một chữ ký số ECDSA. Xe phải phát đi ít nhất 10 messages/second trên mỗi kênh, đồng thời phải liên tục xác thực một lượng lớn chữ ký số từ các phương tiện xung quanh truyền đến.

Tác vụ ký và xác thực chữ ký số thời gian thực đòi hỏi một latency budget cực kỳ ngắn (thường yêu cầu thời gian ký dưới 5 ms). Đây là lý do chính thúc đẩy việc sử dụng các cấu hình HSM cấp độ EVITA Full, nơi tích hợp các bộ tăng tốc bất đối xứng phần cứng hiệu suất cao để đáp ứng được thông lượng khổng lồ này.

---

## 4.5. Xu hướng ứng dụng của HSM

Các use case trên cho thấy **HSM firmware** hiện đã phải đáp ứng nhiều yêu cầu khác nhau. Trong tương lai, HSM còn được kỳ vọng hỗ trợ thêm các ứng dụng như:
- **Diagnostic over IP (DoIP)** được mã hoá bằng **TLS**.
- **Certificate-based diagnostic service** theo tiêu chuẩn ISO để kích hoạt các **security-related diagnostic services**.
- **Mã hóa lưu lượng mạng nội bộ nâng cao:** Sử dụng Internet Protocol Security (IPsec) để bảo vệ dữ liệu truyền thông IP (như luồng video camera hành trình); hoặc MACsec ở tầng liên kết dữ liệu (L2) để mã hóa/xác thực point-to-point trên mạng Ethernet ô tô tốc độ cao.
- **Post-Quantum Readiness:** Sử dụng HSM để triển khai các thuật toán ký số dựa trên trạng thái băm (Stateful Hash-Based Signatures như LMS, XMSS theo tiêu chuẩn NIST SP 800-208) cho việc xác thực firmware signing. Điều này bảo vệ vòng đời xe (kéo dài từ 15 đến 20 năm) an toàn trước kỷ nguyên máy tính lượng tử trong tương lai.

---

## 4.6. Một số HSM phổ biến

Trong lĩnh vực Automotive & Embedded, HSM thường tồn tại dưới 2 dạng chính:
- Hardware Controller IP: Core bảo mật vật lý được tích hợp trực tiếp bên trong vi điều khiển (MCU/SoC).
- HSM Software Stack: Lớp phần mềm chạy độc lập trên HSM core đó, kết nối với hệ điều hành chính (Host CPU) qua chuẩn AUTOSAR CSM/CRYPTO.

<details markdown="block">
<summary><i>Hardware Controller IP</i></summary>

> Hardware Controller IP (Intellectual Property) là khối thiết kế phần cứng đã được tối ưu hóa dùng để điều khiển các thành phần hoặc giao tiếp ngoại vi trong chip. Thay vì tự thiết kế lại từ đầu, các kỹ sư chip sẽ mua hoặc tái sử dụng các khối IP này để tích hợp thẳng vào chip SoC (System on Chip).
{: .codeBlock }
</details>

Một số giải pháp HSM thực tế chuẩn công nghiệp được sử dụng phổ biến hiện nay:

<table class="hover-table">
  <thead>
    <tr>
      <th>Giải pháp HSM</th>
      <th>Loại</th>
      <th>Mô tả</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://www.vector.com/en/product/microsar-hsm/" target="_blank">MICROSAR HSM</a></td>
      <td>Software Stack</td>
      <td>Chuẩn hóa AUTOSAR, SecOC, OTA, giao tiếp Host-HSM.</td>
    </tr>
    <tr>
      <td><a href="https://www.etas.com/ww/en/products-services/cybersecurity-products/escrypt-cycurhsm/" target="_blank">ESCRYPT CycurHSM</a></td>
      <td>Software Stack</td>
      <td>Bảo mật ECU, tối ưu hóa bộ nhớ, đáp ứng chuẩn EVITA.</td>
    </tr>
    <tr>
      <td><a href="https://www.synopsys.com/designware-ip/security-ip/root-of-trust/troot-fx-hw-secure-module.html" target="_blank">Synopsys tRoot Fx HSM</a></td>
      <td>Hardware IP Core</td>
      <td>Thiết kế phần cứng lõi HSM cho nhà sản xuất chip.</td>
    </tr>
    <tr>
      <td><a href="https://www.infineon.com/product-information/aurix-security-solutions" target="_blank">Infineon AURIX HSM</a></td>
      <td>Hardware Module</td>
      <td>Module phần cứng tích hợp sẵn trên chip TC3xx/TC4xx.</td>
    </tr>
    <tr>
      <td><a href="https://www.renesas.com/en/key-technologies/security/automotive-security?srsltid=AfmBOop3YyF26pHzSbM9yCSGQjQ84Hz2HQ1IceXje5z632xyUZUL6sOl" target="_blank">Renesas ICU-M</a></td>
      <td>Hardware + Firmware</td>
      <td>HSM core của Renesas dành cho dòng vi điều khiển RH850, dùng để chạy các tác vụ bảo mật và mã hóa.</td>
    </tr>
  </tbody>
</table>

---

# 5. Các yêu cầu trong tương lai đối với HSM

Các Hardware Security Module (HSM) hiện nay phải đáp ứng nhiều use case. Trong tương lai, sự đa dạng và phạm vi ứng dụng và các thành phần dành riêng cho từng ứng dụng dự kiến tiếp tục tăng. Vì vậy, HSM firmware cần linh hoạt và configurable để đáp ứng các yêu cầu dài hạn.

Các ECU-specific và OEM-specific applications có khả năng ngày càng được chuyển giao (offload) sang HSM khi chúng xử lý nội dung bảo mật (confidential contents) hoặc cần được thực thi với sự bảo vệ khỏi phần còn lại của hệ thống.

Giải pháp cần đáp ứng các yêu cầu này một cách hiệu quả và linh hoạt, bao gồm cả HSM firmware và HSM interface với application. MICROSAR Classic veHSM solution của Vector cung cấp cả hai và dựa trên AUTOSAR design, giúp đơn giản hóa việc integration và configuration của software.

---

# Tham khảo

[1] [Vector, "Hardware Security Modules (HSM) for Automotive ECUs"](https://cdn.vector.com/cms/content/know-how/_technical-articles/Security_HSM_Automobil-Elektronik_201808_PressArticle_EN.pdf)

[2] [Agnile, "HSM Integration for Automotive ECUs: From EVITA Light to Full"](https://agnile.com/blog/hsm-integration-automotive-ecus-evita)

[3] [LinkedIn, "Deep Dive: AUTOSAR HSM Flow APIs"](https://www.linkedin.com/posts/dattatak_deep-dive-autosar-hsm-flow-apis-in-activity-7461460923916947457-2O1K)

[4] [Embedded, "How hardware security modules enable AUTOSAR"](https://www.embedded.com/how-hardware-security-modules-enable-autosar/) 

[5] [AUTOSAR, "AUTOSAR Security Overview"](https://www.autosar.org/fileadmin/standards/R24-11/FO/AUTOSAR_FO_EXP_SecurityOverview.pdf)

[6] [Renesas, "HW/SW Security Mechanisms for Future Automotive Society"](https://www.renesas.com/en/document/whp/hwsw-security-mechanisms-future-automotive-society?srsltid=AfmBOorP0822bjvAIkhGyg1LjkZ3rXLYtyfQKg0KGX3U_gFOZPjBfxpT)
