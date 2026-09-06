---
title: Symmetric Encryption
parent: Encryption
nav_order: 2
---

<h1>Symmetric Encryption</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

# 1. Tổng quan

## 1.1. Symmetric Encryption là gì?

**Symmetric encryption** (mã hoá đối xứng / mã hóa cổ điển / mã hóa một khóa): là một kỹ thuật bảo mật sử dụng **một khóa bí mật dùng chung duy nhất (single shared secret key)** cho cả hai quá trình mã hóa dữ liệu gốc thành ciphertext và giải mã ngược lại. Điều này có nghĩa là cả người gửi và người nhận đều phải sở hữu và bảo vệ cùng một khóa giống hệt nhau.

Công thức tổng quát:

```c
ciphertext = encrypt(plaintext, key)
plaintext  = decrypt(ciphertext, key)
```

Để dễ hình dung, Symmetric Encryption hoạt động **tương tự như một tệp tin zip được bảo vệ bằng mật khẩu**. Mật khẩu dùng để khóa tệp tin cũng chính là mật khẩu duy nhất mà người nhận cần nhập vào để mở khóa và đọc nội dung tệp. 

---

## 1.2. Quy trình hoạt động

Một quy trình Symmetric Encryption đầy đủ trong thực tế được vận hành qua 06 bước:

1.  **Tạo khóa (Key generation)**: Một cryptographic algorithm tạo ra một encryption key ngẫu nhiên và an toàn (thường sử dụng CSPRNG). Cryptographic algorithm (còn được gọi là cipher) là bộ quy tắc toán học quy định cách thức khóa tương tác và biến đổi dữ liệu plaintext để tạo thành ciphertext.

2.  **Trao đổi khóa (Key exchange)**: Người gửi chia sẻ encryption key này cho người nhận thông qua một kênh bảo mật hoặc kết hợp với phương pháp asymmetric encryption.

3.  **Chuẩn bị dữ liệu (Data preparation)**: Encryption algorithm chuẩn bị plaintext (thông điệp gốc) để mã hóa. Tùy thuộc vào loại thuật toán, dữ liệu có thể được phân rã thành từng bit/byte liên tục hoặc đóng gói thành các khối có kích thước cố định.

4.  **Mã hóa dữ liệu (Data encryption)**: Encryption algorithm áp dụng các phép toán logic lên plaintext bằng cách kết hợp với khóa dùng chung, chuyển đổi dữ liệu gốc thành ciphertext không thể đọc được.

5.  **Truyền tải/Lưu trữ ciphertext**: Ciphertext sau đó được gửi đi qua môi trường mạng hoặc được đem đi lưu trữ.

6.  **Giải mã (Decryption)**: Người nhận sử dụng đúng encryption key dùng chung đã trao đổi ở bước 2 để đảo ngược lại quy trình toán học của thuật toán, khôi phục lại plaintext ban đầu.


<details markdown="block">
<summary><i>CSPRNG</i></summary>

> Cryptographically Secure Pseudorandom Number Generator (CSPRNG): Bộ tạo số giả ngẫu nhiên an toàn về mật mã.
{: .codeBlock }
</details>

---

## 1.3. So sánh Symmetric Encryption và Asymmetric Encryption

<table class="hover-table">
  <thead>
    <tr>
      <th>Tiêu chí</th>
      <th>Symmetric Encryption</th>
      <th>Asymmetric Encryption</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Key Architecture</strong><br><i>(Cơ chế khóa)</i></td>
      <td>Sử dụng <strong>một khóa duy nhất (single shared secret key)</strong> đồng thời cho cả hai quá trình mã hóa và giải mã.</td>
      <td>Sử dụng <strong>cặp khóa bất đối xứng (asymmetric key pair)</strong> liên kết theo mặt toán học, gồm: <strong>Public Key</strong> để mã hóa và <strong>Private Key</strong> để giải mã.</td>
    </tr>
    <tr>
      <td><strong>Performance</strong><br><i>(Hiệu năng & Tốc độ xử lý)</i></td>
      <td><strong>Tốc độ xử lý tối ưu và độ trễ thấp</strong>. Cấu trúc thuật toán dựa trên các thao tác bit mức thấp như: thay thế (substitution), hoán vị (transposition) và logic XOR, cho phép phần cứng (CPU) thực thi trực tiếp với chi phí tính toán tối thiểu (không cần thực hiện các phép toán đại số phức tạp).</td>
      <td><strong>Tốc độ xử lý thấp hơn đáng kể</strong> và tiêu tốn nhiều tài nguyên hệ thống do yêu cầu thực thi các phép toán số học mô-đun (modular arithmetic) phức tạp trên số nguyên kích thước lớn.</td>
    </tr>
    <tr>
      <td><strong>Use Cases</strong></td>
      <td>Xử lý <strong>mã hóa dữ liệu khối lượng lớn (Bulk Data Encryption)</strong>, gồm dữ liệu tĩnh (Data at Rest) lưu trữ trên ổ đĩa, cơ sở dữ liệu, và kênh truyền tải dữ liệu (Data in Transit) trong VPN hoặc đường truyền HTTPS.</td>
      <td>Được tối ưu cho các cơ chế:<br>Xác thực danh tính (Authentication);<br>Chữ ký số (Digital Signature);<br>Trao đổi khóa an toàn (Key Exchange / Distribution).</td>
    </tr>
    <tr>
      <td><strong>Hybrid Cryptography</strong><br><i>(Mô hình kết hợp)</i></td>
      <td colspan="2">Trong các giao thức mật mã thực tế (như TLS/SSL), hai phương pháp này được tích hợp đồng thời:<br>Asymmetric Encryption được sử dụng ở giai đoạn bắt tay (Handshake) để xác thực và trao đổi <strong>Session Key</strong>;<br>Sau đó, Symmetric Encryption sẽ tiếp quản toàn bộ quá trình mã hóa dữ liệu giao dịch nhằm bảo đảm hiệu năng hệ thống.</td>
    </tr>
  </tbody>
</table>

---

# 2. Các kỹ thuật Symmetric Encryption cổ điển

Mật mã học cổ điển đóng vai trò là nền tảng sơ khai của toàn bộ hệ thống bảo mật thông tin trước khi public key cryptography ra đời vào những năm 1970. Trong mật mã học cổ điển, các kỹ thuật Symmetric Encryption chủ yếu được chia thành hai nhóm tư duy lớn: **Kỹ thuật Thay thế (Substitution)** và **Kỹ thuật Hoán vị (Transposition)**.

---

## 2.1. Kỹ thuật Thay thế (Substitution Techniques)

Nguyên lý hoạt động cơ bản của kỹ thuật thay thế là **thay thế các chữ cái hoặc nhóm chữ cái** trong plaintext (thông điệp gốc) bằng các chữ cái, con số, ký hiệu hoặc một tập hợp chữ cái khác theo những quy luật nhất định.

### 2.1.1. Mật mã Caesar (Caesar Cipher)

**Quy luật**: Đây là dạng mật mã thay thế đơn giản nhất, dịch chuyển các chữ cái đi một khoảng cố định trong bảng chữ cái.

**Đặc điểm**: Độ dài khóa là 1 và kích thước của không gian khóa (keyspace) tương đương với kích thước của bảng chữ cái (ví dụ: 26 đối với tiếng Anh). Do kích thước keyspace quá nhỏ và tính dễ dự đoán hoàn toàn, mật mã này không có độ phức tạp về mặt mật mã học và dễ dàng bị giải mã.

Xem thêm: [GeeksforGeeks, "Caesar Cipher in Cryptography"](https://www.geeksforgeeks.org/ethical-hacking/caesar-cipher-in-cryptography/)

{% include caesar-wheel.html %}

### 2.1.2. Mật mã Đơn chữ (Monoalphabetic Ciphers)

**Quy luật**: Sử dụng duy nhất **một quy tắc thay thế cố định** xuyên suốt toàn bộ thông điệp.

**Đặc điểm**: Các chữ cái trong plaintext có thể được ánh xạ đồng nhất sang các con số, biểu tượng đặc biệt, hoặc một thứ tự chữ cái hoàn toàn mới.

Xem thêm: [GeeksforGeeks, "What is Monoalphabetic Cipher?"](https://www.geeksforgeeks.org/computer-networks/what-is-monoalphabetic-cipher/)

### 2.1.3. Mật mã Playfair (Playfair Cipher)

**Quy luật**: Mã hóa dữ liệu theo từng cặp chữ cái (digrams) thay vì từng chữ cái riêng lẻ nhằm hạn chế tần suất xuất hiện tự nhiên của ngôn ngữ.

**Đặc điểm**: Dù cải tiến hơn, việc lặp lại của các chữ cái hoặc các cặp ký tự vẫn có thể làm lộ ra các khuôn mẫu (patterns), cho phép các kỹ thuật giải mã phân tích và bẻ khóa thành công.

Xem thêm: [GeeksforGeeks, "Playfair Cipher with Examples"](https://www.geeksforgeeks.org/dsa/playfair-cipher-with-examples/)

### 2.1.4. Mật mã Hill (Hill Cipher)

**Quy luật**: Hoạt động trên các khối chữ cái (thường là cặp chữ cái - bigrams hoặc bộ ba chữ cái - trigrams) bằng cách áp dụng phương pháp nhân ma trận toán học.

**Đặc điểm**: Thuật toán này có giới hạn đáng kể về kích thước khóa và dễ bị tổn thương trước các cuộc tấn công giải mã khi cố gắng tăng kích thước khóa lớn hơn.

Xem thêm: [GeeksforGeeks, "Hill Cipher"](https://www.geeksforgeeks.org/dsa/hill-cipher/)


### 2.1.5. Mật mã Đa chữ  (Polyalphabetic Ciphers)

**Quy luật**: Thay thế một chữ cái trong plaintext bằng các chữ cái khác nhau tùy thuộc vào vị trí của nó nhằm làm xáo trộn việc phân tích tần suất chữ cái.

**Ví dụ**: **Mật mã Vigenère** hoạt động dựa trên một từ khóa (keyword) có độ dài $$n$$ để quyết định giá trị dịch chuyển cho từng ký tự tương ứng trong plaintext. Kích thước keyspace của nó được mở rộng lên mức $$\text{alphabetSize}^n$$.

Xem thêm: [GeeksforGeeks, "Vigenère Cipher"](https://www.geeksforgeeks.org/dsa/vigenere-cipher/)

### 2.1.6. Mật mã Một lần dùng (One-Time Pad - OTP, hoặc Vernam Cipher)

**Quy luật**: Đây là hệ thống mật mã **an toàn tuyệt đối về mặt lý thuyết mật mã** (theoretically impossible to break).

**Đặc điểm**: Khóa của OTP là một chuỗi ký tự ngẫu nhiên có độ dài **bằng đúng độ dài của thông điệp cần truyền đi**. Khóa chỉ được sử dụng đúng một lần duy nhất cho một thông điệp rồi hủy bỏ hoàn toàn. Kích thước keyspace của OTP cực kỳ khổng lồ, bằng $$\text{alphabetSize}^{\text{plaintextLength}}$$.

Xem thêm: [GeeksforGeeks, "Implementation of Vernam Cipher or One Time Pad Algorithm"](https://www.geeksforgeeks.org/dsa/implementation-of-vernam-cipher-or-one-time-pad-algorithm/)

---

## 2.2. Kỹ thuật Hoán vị (Transposition Techniques)

Khác hoàn toàn với thay thế, kỹ thuật hoán vị **giữ nguyên các chữ cái gốc** của thông điệp nhưng **thay đổi và sắp xếp lại trật tự vị trí** của chúng.

### 2.2.1. Mật mã Đường rào (Rail Fence Cipher)

**Quy luật**: Viết plaintext theo mô hình zig zag (hình răng cưa) trên các hàng (được ví như các thanh rào - rails) của một hàng rào giả định, sau đó đọc lại dữ liệu theo thứ tự các cột tiêu chuẩn.

**Đặc điểm**: Khóa của mật mã này chính là số lượng dòng (thanh rào) được sử dụng để xếp chữ.

Xem thêm: [GeeksforGeeks, "Rail Fence Cipher - Encryption and Decryption"](https://www.geeksforgeeks.org/dsa/rail-fence-cipher-encryption-decryption/)

### 2.2.2. Mật mã Hoán vị cột (Columnar Transposition Cipher)

**Quy luật**: Plaintext được viết dàn đều thành các cột, sau đó trật tự của các cột này sẽ được xáo trộn (hoán vị) theo một thứ tự cụ thể được quy định bởi khóa mã hóa.

**Đặc điểm**: Dù xáo trộn vị trí phức tạp hơn, mật mã này vẫn dễ bị tấn công giải mã bằng cách khai thác các thuộc tính thống kê ngôn ngữ học của các chữ cái đứng cạnh nhau.

Xem thêm: [GeeksforGeeks, "Columnar Transposition Cipher"](https://www.geeksforgeeks.org/dsa/columnar-transposition-cipher/)

---

# 3. Các kỹ thuật Symmetric Encryption hiện đại

Trong kỷ nguyên mật mã học hiện đại, các thuật toán Symmetric Encryption được chia làm hai loại hình cốt lõi dựa trên cách thức xử lý dữ liệu plaintext: **Mã hóa Dòng (Stream Ciphers)** và **Mã hóa Khối (Block Ciphers)**. 

---

## 3.1. Mã hóa Dòng (Stream Ciphers)

### 3.1.1.Nguyên lý

Stream Ciphers tiến hành mã hóa dữ liệu liên tục từng bit hoặc từng byte tại một thời điểm. 

Quá trình bắt đầu bằng việc tạo ra một dòng khóa giả ngẫu nhiên (pseudo-random keystream) dựa trên sự kết hợp giữa secret key và một số ngẫu nhiên chỉ sử dụng một lần (gọi là nonce). Keystream này có độ dài tương ứng với độ dài của plaintext.

Plaintext sau đó được chuyển đổi thành các bit đơn lẻ và kết hợp với keystream thông qua phép toán logic **XOR bitwise** để tạo thành ciphertext. Khi giải mã, bên nhận cũng thực hiện tái tạo keystream tương tự và XOR ngược lại với ciphertext để khôi phục plaintext.

Nhờ cơ chế này, Stream Ciphers cực kỳ tối ưu cho các luồng dữ liệu liên tục có kích thước nhỏ và yêu cầu xử lý theo thời gian thực.
Xem thêm: [GeeksforGeeks, "Stream Ciphers"](https://www.geeksforgeeks.org/computer-networks/stream-ciphers/)

### 3.1.2. Các thuật toán phổ biến

- **RC4 (Rivest Cipher 4)**: Từng là một trong những thuật toán Stream Ciphers được sử dụng rộng rãi nhất nhờ thiết kế tinh gọn, tốc độ xử lý nhanh và khả năng xử lý các luồng dữ liệu có độ dài linh hoạt. Tuy nhiên, do phát hiện nhiều lỗ hổng bảo mật nghiêm trọng theo thời gian, RC4 hiện đã bị cấm bởi các tổ chức tiêu chuẩn mật mã và không còn được xem là an toàn. Xem thêm: [GeeksforGeeks, "What is RC4 Encryption?"](https://www.geeksforgeeks.org/computer-networks/what-is-rc4-encryption/)

- **Salsa20**: Là một thuật toán Stream Ciphersg hiện đại, tốc độ cao và cực kỳ hiệu quả nhờ thiết kế đơn giản nhưng thanh lịch. Salsa20 cung cấp khả năng bảo mật mạnh mẽ trước các hình thức tấn công đã biết, đồng thời đóng vai trò là nền tảng để xây dựng các giao thức mật mã khác. Thuật toán này rất được ưa chuộng trong các ứng dụng cần sự cân bằng tối ưu giữa hiệu suất và độ an toàn. Xem thêm: [PyCryptodome’s documentation, "Salsa20"](https://pycryptodome.readthedocs.io/en/v3.23.0/src/cipher/salsa20.html)

- **Grain-128**: Đây là thuật toán Stream Ciphers siêu nhẹ (lightweight), được thiết kế chuyên biệt để hoạt động trơn tru trên các thiết bị bị hạn chế nghiêm trọng về năng lượng xử lý, bộ nhớ và băng thông truyền tải. Nhờ ưu điểm này, Grain-128 thường được triển khai trên các thẻ nhận dạng tần số vô tuyến (RFID) và mạng cảm biến nhưng vẫn đảm bảo khả năng bảo mật vững chắc. Xem thêm: [hirotaka.yoshid, martin.hell, "Grain-128AEAD"](https://grain-128aead.github.io/)

---

## 3.2. Mã hóa Khối (Block Ciphers)

### 3.2.1. Nguyên lý

Khác với Stream Ciphers, Block Ciphers chia nhỏ thông điệp gốc thành các khối dữ liệu có kích thước cố định (ví dụ: khối 64-bit hoặc 128-bit) và tiến hành mã hóa toàn bộ khối đó bằng secret key.

Kết quả đầu ra là một chuỗi các khối dữ liệu ciphertext theo một thứ tự cụ thể. Khi đến đầu nhận, người nhận sẽ áp dụng chính xác cryptographic key dùng chung đó để giải mã chuỗi khối này trở lại thành plaintext.

Block Ciphers là lựa chọn tối ưu để bảo vệ các khối lượng dữ liệu tĩnh lớn. Cách thức xử lý nhiều khối dữ liệu liên tiếp của thuật toán khối sẽ được điều phối bởi các **Chế độ hoạt động (Modes of Operation)** khác nhau.

### 3.2.2. Các thuật toán phổ biến

- **DES (Data Encryption Standard)**: Được phát triển vào những năm 1970, DES là một trong những thuật toán Block Ciphers tiêu chuẩn đầu tiên trên thế giới. DES chia thông điệp thành các khối 64-bit nhưng chỉ sử dụng độ dài khóa hiệu dụng là 56-bit. Do kích thước khóa quá ngắn trước sự phát triển của công nghệ tính toán, DES dễ dàng bị bẻ gãy bằng phương pháp tấn công vét cạn (brute-force) và hiện đã bị loại bỏ hoàn toàn.Xem thêm: [GeeksforGeeks, "DES Full Form"](https://www.geeksforgeeks.org/computer-networks/des-full-form/)

- **Triple DES (3DES / TDEA)**: Được phát triển nhằm cứu vãn điểm yếu khóa ngắn của DES. Kỹ thuật này áp dụng thuật toán DES ba lần liên tiếp (Mã hóa – Giải mã – Mã hóa) trên mỗi khối dữ liệu để nâng độ mạnh của khóa lên 112-bit. Dù có độ an toàn cao hơn DES, 3DES hiện đã bị [NIST]({{ "/docs/Embedded_Systems_Architecture/Encryption/Symmetric_Encryption/#62-h%C6%B0%E1%BB%9Bng-d%E1%BA%ABn-v%C3%A0-ti%C3%AAu-chu%E1%BA%A9n-c%E1%BB%A7a-nist" | relative_url }}) khai tử (deprecated) và khuyến cáo không sử dụng cho các hệ thống mới do hiệu suất kém và sự xuất hiện của các tiêu chuẩn bảo mật tốt hơn.Xem thêm: [GeeksforGeeks, "Triple DES (3DES)"](https://www.geeksforgeeks.org/computer-networks/triple-des-3des/)

- **AES (Advanced Encryption Standard)**: Được [NIST]({{ "/docs/Embedded_Systems_Architecture/Encryption/Symmetric_Encryption/#62-h%C6%B0%E1%BB%9Bng-d%E1%BA%ABn-v%C3%A0-ti%C3%AAu-chu%E1%BA%A9n-c%E1%BB%A7a-nist" | relative_url }}) công bố (2001) để thay thế trực tiếp cho DES, AES hiện là "tiêu chuẩn vàng" thống trị tuyệt đối trong mật mã học hiện đại. AES hoạt động trên các khối dữ liệu 128-bit và hỗ trợ ba kích thước khóa: 128, 192 và 256 bits. Thuật toán này có khả năng chống bẻ khóa cực tốt và được ứng dụng rộng rãi từ truyền thông bảo mật, mã hóa thiết bị lưu trữ, cho đến quản lý quyền kỹ thuật số (Digital Rights Management - DRM). Xem thêm: [GeeksforGeeks, "Advanced Encryption Standard (AES)"](https://www.geeksforgeeks.org/computer-networks/advanced-encryption-standard-aes/) và [AppliedGo, "AES Rijndael Cipher explained as a Flash animation"](https://www.youtube.com/watch?v=gP4PqVGudtg).

- **Blowfish**: Là một thuật toán Block Ciphers có tốc độ xử lý nhanh, linh hoạt với kích thước khối 64-bit và độ dài khóa có thể thay đổi linh hoạt từ 32 đến 448 bits. Mặc dù vẫn hiệu quả trong một số ứng dụng phần mềm, Blowfish hiện nay hầu như đã bị thay thế bởi AES hoặc Twofish. Xem thêm: [GeeksforGeeks, "Blowfish Algorithm with Examples"](https://www.geeksforgeeks.org/java/blowfish-algorithm-with-examples/)

- **Twofish**: Là thuật toán mã nguồn mở kế thừa trực tiếp từ Blowfish, hỗ trợ kích thước khối 128-bit và độ dài khóa lên tới 256 bits. Twofish có khả năng chống chịu xuất sắc trước các kỹ thuật giải mã và duy trì độ an toàn cao ngay cả khi sức mạnh tính toán chung gia tăng. Nó được xem là một giải pháp thay thế bảo mật đáng tin cậy cho AES trong một số tình huống. Xem thêm: [GeeksforGeeks, "Twofish Encryption Algorithm"](https://www.geeksforgeeks.org/computer-networks/twofish-encryption-algorithm/)

### 3.2.3. Các Chế độ Hoạt động của Block Ciphers (Modes of Operation)

Trong Symmetric Encryption hiện đại, các thuật toán Block Ciphers tiến hành xử lý dữ liệu theo từng khối có kích thước cố định (ví dụ như khối 128-bit ở thuật toán AES). Để mã hóa và xử lý một chuỗi gồm nhiều khối dữ liệu liên tiếp, hệ thống cần sử dụng các **Chế độ hoạt động (Modes of Operation)** khác nhau để điều phối quy trình này. 

#### 3.2.3.1. Electronic Codebook (ECB)

**Quy luật**: Đây là một trong những chế độ hoạt động đơn giản nhất dành cho Block Ciphers. Ở chế độ ECB, mỗi khối dữ liệu plaintext được mã hóa một cách độc lập và riêng biệt bằng cùng một secret key.


**Hạn chế**: Điểm yếu lớn nhất của ECB là **các khối plaintext giống nhau sẽ luôn tạo ra các khối ciphertext hoàn toàn trùng khớp**. Hệ quả là các khuôn mẫu cấu trúc (patterns) của dữ liệu gốc vẫn bị hiển thị rõ ràng trên ciphertext, tạo điều kiện cho kẻ tấn công giải mã và khai thác. Do đó, ECB không được coi là giải pháp an toàn cho hầu hết các nhu cầu bảo mật hiện đại.

Xem thêm: [GeeksforGeeks, "Electronic Code Book (ECB) in Cryptography"](https://www.geeksforgeeks.org/computer-networks/electronic-code-book-ecb-in-cryptography/)

#### 3.2.3.2. Cipher Block Chaining (CBC)

**Quy luật**: Chế độ CBC giải quyết triệt để điểm yếu lộ khuôn mẫu của ECB bằng cách thiết lập một chuỗi liên kết giữa các khối. Trước khi tiến hành mã hóa, **mỗi khối plaintext sẽ được thực hiện phép toán logic XOR với khối ciphertext được tạo ra ngay trước đó**.

**Ưu điểm**: Cơ chế này giúp bổ sung tính ngẫu nhiên cho từng khối dữ liệu. Ngay cả khi các khối văn plaintext ban đầu giống hệt nhau, chúng vẫn sẽ tạo ra các khối ciphertext hoàn toàn khác nhau, ngăn chặn việc lộ khuôn mẫu dữ liệu trên ciphertext.

Xem thêm: [Vitis Security Library, "CBC Mode"](https://xilinx.github.io/Vitis_Libraries/security/2020.1/guide_L1/internals/cbc.html)

#### 3.2.3.3. Cipher Feedback (CFB)

**Quy luật**: Chế độ CFB cho phép chuyển đổi một thuật toán Block Ciphers hoạt động tương tự như một Stream Cipher. Chế độ này sinh ra một keystream giả ngẫu nhiên, sau đó keystream này sẽ được XOR với khối plaintext để tạo ra ciphertext.

**Hạn chế**: Nhược điểm lớn nhất của CFB là **sự lan truyền lỗi (error propagation)**. Nếu một lỗi bit hoặc lỗi dữ liệu xảy ra trên một khối ciphertext bất kỳ trong quá trình truyền tải, lỗi đó sẽ ảnh hưởng dây chuyền và làm sai lệch toàn bộ các khối dữ liệu tiếp theo phía sau nó.

Xem thêm: [Tutorials Point, "Cryptography - Cipher Feedback (CFB) Mode"](https://www.tutorialspoint.com/cryptography/cipher_feedback_mode.htm)

#### 3.2.3.4. Output Feedback (OFB)

**Quy luật**: Tương tự như CFB, OFB cũng là phương pháp chuyển đổi Block Ciphers thành Stream Cipher bằng cách tác động trực tiếp vào plaintext. Điểm khác biệt là OFB **tạo ra một keystream độc lập hoàn toàn**. Dòng khóa độc lập này sau đó mới được mang đi thực hiện phép toán XOR trực tiếp với plaintext để thu được ciphertext. Do keystream được sinh ra độc lập, chế độ này giúp hạn chế tình trạng lan truyền lỗi giữa các khối.

Xem thêm: [Tutorials Point, "Cryptography - Output Feedback (OFB) Mode"](https://www.tutorialspoint.com/cryptography/output_feedback_mode.htm)

#### 3.2.3.5. Counter (CTR)

**Quy luật**: Chế độ CTR chuyển đổi Block Ciphers thành Stream Cipher bằng cách sử dụng một giá trị **counter** làm đầu vào cho thuật toán.

**Ưu điểm**: CTR là chế độ hoạt động có **hiệu suất cực kỳ cao và khả năng xử lý song song vượt trội (highly parallelizable)**. Do việc mã hóa/giải mã mỗi khối chỉ phụ thuộc vào giá trị counter tương ứng mà không cần chờ kết quả của khối trước đó, chế độ CTR cực kỳ lý tưởng cho các tác vụ yêu cầu tốc độ xử lý tối ưu như mã hóa mạng và mã hóa ổ đĩa cứng.

Xem thêm: [Tutorials Point, "Cryptography - Counter (CTR) Mode"](https://www.tutorialspoint.com/cryptography/counter_mode.htm)

---

# 5. Đánh giá Ưu điểm và Thách thức

Symmetric Encryption đóng vai trò then chốt trong việc bảo vệ thông tin kỹ thuật số nhờ sự cân bằng giữa hiệu năng và độ an toàn. Tuy nhiên, việc triển khai nó trong thực tế cũng đi kèm với những thách thức lớn về mặt quản trị và phân phối khóa.

## 5.1. Ưu điểm

- **Tốc độ và hiệu năng tính toán cao**: Thuật toán Symmetric Encryption được thiết kế dựa trên các phép toán logic, hoán vị và xử lý bit đơn giản (như phép XOR) mà processors có thể thực thi cực kỳ nhanh chóng. Chúng không đòi hỏi các phép tính toán đại số mô-đun (modular arithmetic) phức tạp trên các con số khổng lồ như Asymmetric Encryption. Do đó, đây là lựa chọn lý tưởng cho các tác vụ truyền thông thời gian thực hoặc xử lý các dòng dữ liệu lớn.

- **Ít tốn tài nguyên hệ thống (Low overhead)**: Nhờ chi phí tính toán thấp, Symmetric Encryption hoạt động rất mượt mà trên các hệ thống có cấu hình yếu, thiết bị nhúng hoặc thiết bị IoT bị hạn chế về năng lượng và bộ nhớ.

- **Khả năng mở rộng quy mô tốt cho dữ liệu lớn**: Tốc độ xử lý ưu việt của Symmetric Encryption giúp nó dễ dàng mở rộng để mã hóa các khối lượng dữ liệu khổng lồ như databases, backups hoặc các video streams.

- **Độ an toàn mạnh mẽ**: Các thuật toán hiện đại như AES-256 cung cấp khả năng bảo vệ cực kỳ vững chắc trước các cuộc tấn công giải mã và tấn công vét cạn (brute-force), đồng thời có khả năng kháng lại sức mạnh xử lý của máy tính lượng tử (quantum computers) trong tương lai.

## 5.2. Thách thức và Hạn chế

- **Bài toán phân phối khóa (Key Distribution Problem)**: Đây là điểm yếu chí mạng của Symmetric Encryption. Vì cả người gửi và người nhận đều sử dụng chung một secret key, khóa này bắt buộc phải được chuyển giao giữa hai bên một cách tuyệt đối an toàn trước khi quá trình truyền tin bắt đầu. Nếu khóa bị kẻ xấu chặn hoặc đánh cắp trong quá trình trao đổi, toàn bộ dữ liệu bị mã hóa bằng khóa đó sẽ lập tức bị phơi bày.

- **Sự bùng nổ số lượng khóa (Scalability of keys)**: Trong một mạng lưới liên lạc gồm nhiều người dùng, mỗi cặp người dùng cần phải sở hữu một secret key riêng biệt để đảm bảo tính riêng tư. Khi số lượng người dùng tăng lên, số lượng khóa cần tạo lập, phân phối và lưu trữ sẽ tăng nhanh theo cấp số nhân, gây ra áp lực quản trị khổng lồ và thiếu tính khả thi trong các hệ thống quy mô lớn.

- **Không hỗ trợ tính phi thoái thác (Non-repudiation)**: Vì cả hai bên gửi và nhận đều nắm giữ cùng một khóa mã hóa/giải mã giống hệt nhau, hệ thống không thể chứng minh hoặc truy vết chính xác ai là người đã thực sự tạo ra và gửi thông điệp. Do đó, Symmetric Encryption không thể tự thực hiện chức năng ký số hay xác thực nguồn gốc không thể phủ nhận của thông tin.

- **Rủi ro cao khi khóa bị lộ**: Một khi khóa đối xứng bị xâm phạm, kẻ tấn công có quyền truy cập trực tiếp vào toàn bộ kho dữ liệu được bảo vệ bởi khóa đó mà không gặp phải bất kỳ rào cản phòng thủ bổ sung nào.

## 5.3. Mô hình Mã hóa Kết hợp (Hybrid Cryptography)

Để khắc phục hoàn toàn điểm yếu về việc phân phối khóa của Symmetric Encryption mà không làm ảnh hưởng đến hiệu suất hệ thống, mật mã học hiện đại đã phát triển **Mô hình Mã hóa Kết hợp (Hybrid Cryptography)**:

1.  **Giai đoạn bắt tay (Handshake)**: Hệ thống sử dụng **Asymmetric Encryption** (chậm hơn nhưng rất an toàn trong việc trao đổi khóa mà không cần chia sẻ trước private key) để thiết lập kết nối ban đầu và chuyển giao một khóa phiên đối xứng (symmetric session key) được tạo ngẫu nhiên.

2.  **Giai đoạn truyền tải dữ liệu**: Sau khi symmetric session key đã được hai bên thống nhất và lưu giữ an toàn, toàn bộ phiên làm việc hoặc khối lượng dữ liệu giao dịch khổng lồ sau đó sẽ được mã hóa và truyền đi bằng **Symmetric Encryption** nhằm tối ưu hóa tốc độ và tài nguyên hệ thống.

Đây chính là cơ chế vận hành thực tế của các giao thức bảo mật cốt lõi trên Internet ngày nay như **TLS/SSL (HTTPS)** khi duyệt web hoặc các kết nối **VPN**.

---

# 6. Key Management

Quy trình quản lý khóa (Key Management) đóng vai trò sống còn đối với sự an toàn của hệ thống Symmetric Encryption, bởi vì độ bảo mật của toàn bộ cơ chế này phụ thuộc hoàn toàn vào việc giữ bí mật và bảo vệ khóa dùng chung. Nếu khóa bị xâm phạm hoặc bị kẻ xấu chặn được, mọi dữ liệu được mã hóa bằng khóa đó sẽ lập tức bị phơi bày. 

## 6.1. Các nguyên tắc quản lý khóa tốt nhất

- **Tầm quan trọng của việc tạo khóa ngẫu nhiên an toàn**: Khóa bắt buộc phải được tạo ra với độ ngẫu nhiên cực kỳ mạnh mẽ. Các hệ thống cần sử dụng **CSPRNG** để đảm bảo tính không thể dự đoán của khóa, ngăn chặn kẻ tấn công suy đoán ra khóa từ các thuộc tính thống kê.

- **Thực hiện luân chuyển khóa định kỳ (Key Rotation) tự động**: Các tổ chức cần thay đổi khóa theo các khoảng thời gian xác định trước hoặc ngay sau khi có nghi ngờ lộ khóa nhằm giảm thiểu rủi ro bị khai thác. Việc luân chuyển khóa đảm bảo rằng ngay cả khi một khóa bị kẻ xấu đánh cắp, nó cũng sẽ nhanh chóng bị vô hiệu hóa và không thể dùng để giải mã dữ liệu mới. Đồng thời, việc **tự động hóa luân chuyển khóa** giúp hệ thống vận hành liên tục mà không bị gián đoạn, nâng cao hiệu suất hoạt động và giảm thiểu sai sót so với quy trình thủ công.

- **Sử dụng [HSM]({{ "/docs/Embedded_Systems_Architecture/HSM/" | relative_url }})**: Do việc tạo, lưu trữ, phân phối và tiêu hủy khóa rất phức tạp và dễ bị tổn thương, các tổ chức được khuyến nghị sử dụng HSM. HSM là một môi trường phần cứng vật lý chuyên dụng, chống can thiệp trái phép (tamper-resistant), giúp cách ly và bảo vệ các khóa khỏi các hệ thống và phần mềm thông thường. HSM sẽ trực tiếp xử lý các tác vụ mật mã nhạy cảm như tạo khóa, luân chuyển khóa và ký số.

- **Quản lý khóa tập trung (Centralized Key Management)**: Hệ thống quản lý khóa tập trung giúp hợp nhất các quy trình tạo, lưu trữ và phân phối khóa trên một nền tảng duy nhất. Mô hình này cho phép người quản trị dễ dàng thực thi các chính sách bảo mật khóa nhất quán trên quy mô toàn tổ chức, giảm nguy cơ quản lý sai sót và giám sát chặt chẽ những ai có quyền truy cập khóa. Ví dụ: [AWS Key Management Service (AWS KMS)](https://docs.aws.amazon.com/kms/latest/developerguide/overview.html).

- **Kiểm tra và giám sát đặc quyền truy cập khóa**: Các tổ chức cần áp dụng các chính sách kiểm soát truy cập nghiêm ngặt để chỉ cho phép những nhân sự hoặc thiết bị được ủy quyền tiếp cận khóa. Việc **kiểm tra (auditing) thường xuyên** quy trình quản lý khóa sẽ giúp phát hiện sớm các lỗ hổng tiềm ẩn, duy trì tính tuân thủ pháp lý và củng cố hàng rào bảo mật tổng thể.

<details markdown="block">
<summary><i>CSPRNG</i></summary>

> Cryptographically Secure Pseudorandom Number Generator (CSPRNG): Bộ tạo số giả ngẫu nhiên an toàn về mật mã.
{: .codeBlock }
</details>

## 6.2. Hướng dẫn và Tiêu chuẩn của NIST

**National Institute of Standards and Technology ([NIST](https://www.nist.gov/about-nist))** là Viện Tiêu chuẩn và Công nghệ Quốc gia Hoa Kỳ. Đây là một cơ quan được thành lập năm 1901 và thuộc Bộ Thương mại Hoa Kỳ. Tổ chức này chịu trách nhiệm phát triển các tiêu chuẩn đo lường, công nghệ và an ninh mạng nhằm thúc đẩy đổi mới kinh tế.

NIST cung cấp các khung hướng dẫn chặt chẽ giúp các doanh nghiệp triển khai Symmetric Encryption một cách an toàn và hợp chuẩn:

1. **Kích thước khóa tối thiểu đề xuất**: NIST khuyến nghị sử dụng các kích thước khóa lớn và mạnh mẽ như **AES-256** để tăng cường khả năng chống lại các cuộc tấn công vét cạn (brute-force). Ngoài ra, kích thước khóa này cũng giúp hệ thống an toàn trước máy tính lượng tử trong tương lai, vì [thuật toán Grover](https://www.geeksforgeeks.org/dsa/introduction-to-grovers-algorithm/) chỉ có khả năng làm giảm một nửa độ mạnh thực tế của khóa đối xứng (giúp AES-256 giữ được khoảng 128 bit bảo mật thực tế).

2. **Các tiêu chuẩn quan trọng cần tuân thủ**:

    - [NIST SP 800-90A](https://csrc.nist.gov/pubs/sp/800/90/a/r1/final): Tiêu chuẩn quản lý và hướng dẫn về việc tạo số ngẫu nhiên an toàn để tạo ra các khóa chất lượng cao.

    - [NIST SP 800-38A](https://csrc.nist.gov/pubs/sp/800/38/a/final): Tài liệu định nghĩa các chế độ hoạt động của mã hóa khối (block cipher modes of operation), đồng thời các ấn phẩm liên quan của NIST cũng bao gồm các tiêu chuẩn cho chế độ mã hóa xác thực (như GCM).

    - [FIPS 140-3](https://csrc.nist.gov/pubs/fips/140-3/final): Tiêu chuẩn bắt buộc của chính phủ Mỹ dùng để đánh giá và quản lý các mô-đun mật mã (cryptographic modules). Các thuật toán mã hóa khi triển khai thực tế phải được xác thực thông qua Chương trình Xác thực Thuật toán Mật mã (CAVP).

    - [NIST SP 800-57](https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final) & [NIST SP 800-175B](https://csrc.nist.gov/pubs/sp/800/175/b/r1/final): Các bộ tài liệu tiêu chuẩn hướng dẫn toàn diện về vòng đời của khóa (bao gồm các bước tạo, lưu trữ, luân chuyển và tiêu hủy khóa an toàn). Các nguyên tắc này thường được thực thi thông qua một hệ thống quản lý khóa chuyên dụng hoặc thiết bị HSM.

---

# 7. Các hình thức Tấn công vào Symmetric Encryption

Mục tiêu chung của các cuộc tấn công vào hệ thống Symmetric Encryption là tìm cách khôi phục lại plaintext từ ciphertext mà không cần biết trước khóa, hoặc tìm cách giải mã trực tiếp để lấy được chính secret key đó. Nếu một trong hai hướng tấn công này thành công và lấy được secret key, toàn bộ các thông điệp được mã hóa bằng khóa đó trong cả quá khứ lẫn tương lai đều sẽ bị lộ hoàn toàn.

Trong thế giới kỹ thuật số, có hai phương pháp tấn công cốt lõi được áp dụng đối với Symmetric Encryption: **Phân tích mật mã (Cryptanalysis)** và **Tấn công Vét cạn (Brute-Force Attack)**.

## 7.1. Phân tích mật mã (Cryptanalysis)

Phân tích mật mã là phương pháp phân tích nhằm **suy đoán plaintext hoặc tìm ra secret key** bằng cách khai thác các đặc tính của thuật toán mã hóa, các đặc trưng toán học của ciphertext, hoặc phân tích mối quan hệ thống kê giữa các cặp dữ liệu plaintext và ciphertext. 

Dựa trên loại dữ liệu và lượng thông tin mà nhà phân tích mật mã (cryptanalyst) có thể tiếp cận được, các cuộc tấn công Phân tích mật mã được chia thành 5 cấp độ tiêu biểu:

1. **Chỉ có ciphertext (Ciphertext Only)**:
    - *Thông tin kẻ tấn công nắm giữ*: Chỉ biết thuật toán mã hóa và ciphertext thu thập được.
    - *Đặc điểm*: Kẻ tấn công phải phân tích dữ liệu ciphertext để tìm ra các quy luật thống kê hoặc cấu trúc ẩn bên trong nhằm khôi phục plaintext.
2. **Biết trước plaintext (Known Plaintext)**:
    - *Thông tin kẻ tấn công nắm giữ*: Thuật toán mã hóa, ciphertext, và **một hoặc nhiều cặp plaintext - ciphertext tương ứng** đã được tạo ra từ cùng một secret key trước đó.
3. **Chọn trước plaintext (Chosen Plaintext)**:
    - *Thông tin kẻ tấn công nắm giữ*: Thuật toán mã hóa, ciphertext, và **plaintext do chính kẻ tấn công chủ động lựa chọn** để đưa vào hệ thống tạo ra ciphertext tương ứng bằng secret key.
4. **Chọn trước ciphertext (Chosen Ciphertext)**:
    - *Thông tin kẻ tấn công nắm giữ*: Thuật toán mã hóa, ciphertext, và **ciphertext do chính kẻ tấn công chủ động lựa chọn** để đưa vào hệ thống giải mã nhằm thu về plaintext tương ứng.
5. **Chọn trước văn bản (Chosen Text)**:
    - *Thông tin kẻ tấn công nắm giữ*: Thuật toán mã hóa, ciphertext, kết hợp đồng thời cả **plaintext tự chọn (và ciphertext tương ứng)** lẫn **ciphertext tự chọn (và plaintext giải mã tương ứng)**.

## 7.2. Tấn công Vét cạn (Brute-Force Attack)

Khác với Phân tích mật mã cần phân tích thuật toán, tấn công vét cạn là phương pháp thủ công dựa trên sức mạnh tính toán để **thử lần lượt mọi khóa có thể** trên đoạn ciphertext cho đến khi thu được một plaintext có thể đọc hiểu được.

- **Đặc điểm hiệu suất**: Trung bình, kẻ tấn công sẽ cần phải thử khoảng **50% tổng số khóa** trong toàn bộ keyspace để có thể tìm ra khóa đúng.
- **Cơ chế phòng thủ**: Cách duy nhất để vô hiệu hóa tấn công vét cạn là **sử dụng kích thước khóa đủ lớn**. Khi kích thước khóa tăng lên, keyspace sẽ bùng nổ theo cấp số nhân, khiến việc tính toán thử mọi trường hợp trở nên bất khả thi về mặt thời gian và tài nguyên, ngay cả đối với các hệ thống siêu máy tính.

Bảng so sánh kích thước keyspace của một số thuật toán đối xứng:

<table class="hover-table">
  <thead>
    <tr>
      <th>Thuật toán mật mã</th>
      <th>Độ dài khóa (bits / ký tự)</th>
      <th>Keyspace Size</th>
      <th>Trạng thái bảo mật thực tế</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Caesar Cipher</strong></td>
      <td>1 ký tự</td>
      <td><code>alphabetSize</code><br>(ví dụ: 26)</td>
      <td>Cực kỳ yếu, hoàn toàn không có độ phức tạp về mật mã.</td>
    </tr>
    <tr>
      <td><strong>Mật mã Vigenère</strong></td>
      <td><code>n</code> ký tự</td>
      <td><code>alphabetSize</code><sup>n</sup></td>
      <td>Dễ bị thám mã bằng cách phân tích tần suất ngôn ngữ.</td>
    </tr>
    <tr>
      <td><strong>One-Time Pad / Vernam Cipher</strong></td>
      <td>Bằng độ dài plaintext</td>
      <td><code>alphabetSize</code><sup>plaintextSize</sup></td>
      <td>An toàn tuyệt đối về mặt lý thuyết mật mã.</td>
    </tr>
    <tr>
      <td><strong>DES</strong></td>
      <td>56-bit</td>
      <td>2<sup>56</sup></td>
      <td>Đã bị bẻ gãy hoàn toàn do kích thước khóa quá ngắn.</td>
    </tr>
    <tr>
      <td><strong>AES-128</strong></td>
      <td>128-bit</td>
      <td>2<sup>128</sup></td>
      <td>Tiêu chuẩn an toàn hiện tại, nhưng được đánh giá là yếu hơn trước máy tính lượng tử.</td>
    </tr>
    <tr>
      <td><strong>AES-192</strong></td>
      <td>192-bit</td>
      <td>2<sup>192</sup></td>
      <td>Đạt tiêu chuẩn bảo mật cao.</td>
    </tr>
    <tr>
      <td><strong>AES-256</strong></td>
      <td>256-bit</td>
      <td>2<sup>256</sup></td>
      <td>Tiêu chuẩn vàng mật mã hiện đại, có khả năng kháng lượng tử mạnh mẽ.</td>
    </tr>
    <tr>
      <td><strong>ChaCha20</strong></td>
      <td>256-bit</td>
      <td>2<sup>256</sup></td>
      <td>Thuật toán dòng hiện đại với không gian khóa cực lớn và an toàn.</td>
    </tr>
  </tbody>
</table>

---

# 8. Symmetric Encryption trong Kỷ nguyên Hậu Lượng tử (Post-Quantum)

## 8.1. Khả năng chống chịu trước máy tính lượng tử (quantum computers)

### 8.1.1. Tại sao thuật toán Symmetric Encryption vẫn an toàn trước máy tính lượng tử?

Các thuật toán Symmetric Encryption được đánh giá là có khả năng **kháng lượng tử mạnh mẽ (quantum-resistant)** khi sử dụng độ dài khóa đủ lớn. Lý do là bởi các máy tính lượng tử, dù sở hữu sức mạnh xử lý vượt trội, lại có ít lợi thế hơn trong việc bẻ gãy Symmetric Encryption so với các phương pháp Asymmetric Encryption.

### 8.1.2. Tác động của thuật toán Grover

Mối đe dọa lượng tử lớn nhất đối với các hệ thống Symmetric Encryption là [thuật toán Grover](https://www.geeksforgeeks.org/dsa/introduction-to-grovers-algorithm/), một thuật toán giúp tăng tốc độ tìm kiếm vét cạn (brute-force search). Tuy nhiên, thuật toán Grover không bẻ gãy hoàn toàn thuật toán đối xứng mà **chỉ làm giảm một nửa độ mạnh thực tế của khóa**. Hệ quả là một khóa 128-bit (như trong tiêu chuẩn AES-128) sẽ chỉ còn cung cấp mức độ bảo mật thực tế tương đương với khoảng 64-bit trước máy tính lượng tử. Do đó, AES-128 bị coi là yếu hơn và không được khuyến nghị cho bảo mật dài hạn trong bối cảnh lượng tử.

### 8.1.3. Lý do AES-256 vẫn cực kỳ an toàn trong kỷ nguyên Hậu Lượng tử?

Bằng cách **gấp đôi kích thước khóa**, các thuật toán đối xứng có thể giảm thiểu triệt để các lỗ hổng lượng tử tiềm ẩn này. Dưới tác động của thuật toán Grover, **AES-256** vẫn duy trì được khoảng **128 bits bảo mật thực tế**. Mức độ bảo mật này được đánh giá là cực kỳ vững chắc và hoàn toàn an toàn trước máy tính lượng tử. Chính vì vậy, bản thân thuật toán Symmetric Encryption không cần phải thay thế trong kỷ nguyên lượng tử, nhưng việc dịch chuyển sang các khóa 256-bit (như AES-256) là một bước đi thận trọng và rất khuyến khích.

## 8.2. Điểm yếu lượng tử nằm ở đâu?

Trái ngược hoàn toàn với tính bền bỉ của Symmetric Encryption, các thuật toán Asymmetric Encryption xứng phổ biến hiện nay như **RSA** và **ECC** sẽ bị **thuật toán Shor** bẻ gãy hoàn toàn.

Trong các hệ thống lai (hybrid systems) hiện nay, Asymmetric Encryption xứng chịu trách nhiệm cho việc trao đổi khóa ban đầu (handshake), còn Symmetric Encryption dùng để bảo vệ kênh truyền tải dữ liệu. Do đó, phần trao đổi asymmetric key chính là mắt xích yếu nhất và dễ bị lượng tử tấn công nhất.

Để đối phó với mối đe dọa này, quy trình trao đổi asymmetric key trong các hybrid systems bắt buộc phải di trú sang các thuật toán hậu lượng tử mới, tiêu biểu như tiêu chuẩn [ML-KEM (FIPS 203)](https://csrc.nist.gov/pubs/fips/203/final) của NIST.

---

# 9. Các Ứng dụng Thực tế của Symmetric Encryption

## 9.1. Bảo vệ dữ liệu tĩnh (Data at Rest)

Bảo vệ dữ liệu tĩnh là việc mã hóa dữ liệu khi chúng được lưu trữ trên các thiết bị vật lý hoặc môi trường đám mây nhằm chống lại việc tiếp cận vật lý trái phép.

- **Mã hóa cơ sở dữ liệu và lưu trữ đám mây**: Các nhà cung cấp dịch vụ đám mây lớn (như [AWS](https://aws.amazon.com/vi/) và [IBM Cloud](https://www.ibm.com/products/cloud)) khuyến nghị sử dụng thuật toán **AES-256** để mã hóa phía máy chủ đối với các dữ liệu tĩnh, tệp tin và các bản sao lưu (backups) nhằm đảm bảo an toàn tối đa.

- **Phần mềm mã hóa toàn bộ ổ đĩa**: Các công cụ như [BitLocker](https://support.microsoft.com/vi-vn/windows/security/encryption/bitlocker-overview) sử dụng thuật toán Symmetric Encryption để khóa toàn bộ ổ đĩa cứng của máy tính hoặc thiết bị lưu trữ di động. Điều này giúp ngăn chặn việc rò rỉ dữ liệu nhạy cảm trên các thiết bị cá nhân (như điện thoại thông minh, laptop) cũng như trong môi trường doanh nghiệp nếu thiết bị vô tình bị thất lạc hoặc mất cắp.

## 9.2. Bảo vệ dữ liệu truyền tải (Data in Transit)

Dữ liệu khi di chuyển qua các môi trường mạng công cộng rất dễ bị đánh cắp hoặc nghe lén. Symmetric Encryption giúp thiết lập các kênh truyền an toàn với độ trễ cực thấp.

- **Kênh truyền TLS/SSL trong HTTPS**: Khi bạn truy cập một trang web an toàn, hybird systems sẽ sử dụng Asymmetric Encryption để thực hiện bước handshake (xác thực và trao đổi session key). Sau khi đã thống nhất được khóa, phần lớn lưu lượng trao đổi thực tế của HTTPS session phía sau sẽ được bảo vệ bằng Symmetric Encryption để tối ưu hóa tốc độ tải trang.

- **Virtual Private Network (VPN)**: Các giao thức VPN phổ biến (như [OpenVPN](https://openvpn.net/)) sử dụng thuật toán đối xứng mạnh mẽ như AES-256 để xây dựng một đường hầm bảo mật (encrypted tunnel). Kênh truyền này giúp kết nối an toàn các người dùng làm việc từ xa với mạng nội bộ của doanh nghiệp mà không sợ bị can thiệp.

- **Bảo mật mạng không dây Wi-Fi**: Các tiêu chuẩn bảo mật không dây hiện đại như **WPA2** và **WPA3** đều tích hợp các thuật toán đối xứng để mã hóa dữ liệu truyền phát không dây, bảo vệ người dùng trước các cuộc tấn công đánh cắp dữ liệu Wi-Fi.

- **Giao dịch tài chính và thông tin cá nhân**: Symmetric Encryption được ứng dụng rộng rãi để bảo vệ thông tin thẻ, xác thực thông tin đăng nhập và mã hóa dữ liệu trong các giao dịch ngân hàng trực tuyến, thanh toán điện tử, email và tin nhắn.

## 9.3. Xác thực tính toàn vẹn (Authenticity & Integrity Verification)

Không chỉ giữ bí mật thông tin, Symmetric Encryption còn được dùng để chứng minh dữ liệu không bị sửa đổi trái phép trong quá trình truyền tải. Bằng cách kết hợp dữ liệu với một symmetric key dùng chung thông qua các thuật toán Hash, hệ thống sẽ tạo ra **Mã xác thực thông điệp (Message Authentication Code - MAC)** hoặc **HMAC**. Người nhận có thể sử dụng cùng một secret key đó để kiểm tra lại tính toàn vẹn và xác thực nguồn gốc của thông điệp. Nếu dữ liệu bị bất kỳ bên thứ ba nào can thiệp hoặc giả mạo dọc đường, MAC sẽ lập tức bị sai lệch và thông báo lỗi cho hệ thống.

---

# Tham khảo

[1] [GeeksforGeeks, "Symmetric Key Cryptography"](https://www.geeksforgeeks.org/computer-networks/symmetric-key-cryptography/)

[2] [Entrust, "What is Symmetric Encryption?"](https://www.entrust.com/resources/learn/symmetric-encryption)

[3] [Encryption Consulting, "What is Symmetric Encryption?"](https://www.encryptionconsulting.com/education-center/what-is-symmetric-encryption/)

---

# Các nguồn được sử dụng trong bài viết

[1] [GeeksforGeeks, "Caesar Cipher in Cryptography"](https://www.geeksforgeeks.org/ethical-hacking/caesar-cipher-in-cryptography/)

[2] [GeeksforGeeks, "Monoalphabetic Cipher"](https://www.geeksforgeeks.org/computer-networks/what-is-monoalphabetic-cipher/)

[3] [GeeksforGeeks, "Playfair Cipher with Examples"](https://www.geeksforgeeks.org/dsa/playfair-cipher-with-examples/)

[4] [GeeksforGeeks, "Hill Cipher"](https://www.geeksforgeeks.org/dsa/hill-cipher/)

[5] [GeeksforGeeks, "Vigenere Cipher"](https://www.geeksforgeeks.org/dsa/vigenere-cipher/)

[6] [GeeksforGeeks, "Implementation of Vernam Cipher or One Time Pad Algorithm"](https://www.geeksforgeeks.org/dsa/implementation-of-vernam-cipher-or-one-time-pad-algorithm/)

[7] [GeeksforGeeks, "Rail Fence Cipher – Encryption and Decryption"](https://www.geeksforgeeks.org/dsa/rail-fence-cipher-encryption-decryption/)

[8] [GeeksforGeeks, "Columnar Transposition Cipher"](https://www.geeksforgeeks.org/dsa/columnar-transposition-cipher/)

[9] [GeeksforGeeks, "Stream Ciphers"](https://www.geeksforgeeks.org/computer-networks/stream-ciphers/)

[10] [GeeksforGeeks, "What is RC4 Encryption?"](https://www.geeksforgeeks.org/computer-networks/what-is-rc4-encryption/)

[11] [GeeksforGeeks, "DES Full Form"](https://www.geeksforgeeks.org/computer-networks/des-full-form/)

[12] [GeeksforGeeks, "Triple DES (3DES)"](https://www.geeksforgeeks.org/computer-networks/triple-des-3des/)

[13] [GeeksforGeeks, "Advanced Encryption Standard (AES)"](https://www.geeksforgeeks.org/computer-networks/advanced-encryption-standard-aes/)

[14] [GeeksforGeeks, "Blowfish Algorithm with Examples"](https://www.geeksforgeeks.org/java/blowfish-algorithm-with-examples/)

[15] [GeeksforGeeks, "Twofish Encryption Algorithm"](https://www.geeksforgeeks.org/computer-networks/twofish-encryption-algorithm/)

[16] [GeeksforGeeks, "Electronic Code Book (ECB) in Cryptography"](https://www.geeksforgeeks.org/computer-networks/electronic-code-book-ecb-in-cryptography/)

[17] [GeeksforGeeks, "Introduction to Grover’s Algorithm"](https://www.geeksforgeeks.org/dsa/introduction-to-grovers-algorithm/)

[18] [PyCryptodome, "Salsa20"](https://pycryptodome.readthedocs.io/en/v3.23.0/src/cipher/salsa20.html)

[19] [Grain-128AEAD, "Grain-128AEAD Specification"](https://grain-128aead.github.io/)

[20] [AMD Xilinx, "Cipher Block Chaining (CBC) Mode"](https://xilinx.github.io/Vitis_Libraries/security/2020.1/guide_L1/internals/cbc.html)

[21] [Tutorialspoint, "Cryptography Cipher Feedback Mode"](https://www.tutorialspoint.com/cryptography/cipher_feedback_mode.htm)

[22] [Tutorialspoint, "Cryptography Output Feedback Mode"](https://www.tutorialspoint.com/cryptography/output_feedback_mode.htm)

[23] [Tutorialspoint, "Cryptography Counter Mode"](https://www.tutorialspoint.com/cryptography/counter_mode.htm)

[24] [NIST, "About NIST"](https://www.nist.gov/about-nist)

[25] [NIST CSRC, "SP 800-90A Rev. 1 - Recommendation for Random Number Generation Using Deterministic Random Bit Generators"](https://csrc.nist.gov/pubs/sp/800/90/a/r1/final)

[26] [NIST CSRC, "SP 800-38A - Recommendation for Block Cipher Modes of Operation: Methods and Techniques"](https://csrc.nist.gov/pubs/sp/800/38/a/final)

[27] [NIST CSRC, "FIPS 140-3 - Security Requirements for Cryptographic Modules"](https://csrc.nist.gov/pubs/fips/140-3/final)

[28] [NIST CSRC, "SP 800-57 Part 1 Rev. 5 - Recommendation for Key Management: Part 1 – General"](https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final)

[29] [NIST CSRC, "SP 800-175B Rev. 1 - Guideline for Using Cryptographic Standards in the Federal Government: Cryptographic Mechanisms"](https://csrc.nist.gov/pubs/sp/800/175/b/r1/final)

[30] [NIST CSRC, "FIPS 203 - Module-Lattice-Based Key-Encapsulation Mechanism Standard"](https://csrc.nist.gov/pubs/fips/203/final)

[31] [AWS Documentation, "AWS Key Management Service concepts"](https://docs.aws.amazon.com/kms/latest/developerguide/overview.html)

[32] [IBM, "IBM Cloud"](https://www.ibm.com/products/cloud)

[33] [Microsoft Support, "Tổng quan về BitLocker"](https://support.microsoft.com/vi-vn/windows/security/encryption/bitlocker-overview)

[34] [OpenVPN, "OpenVPN Official Website"](https://openvpn.net/)

[35] [AppliedGo, "AES Rijndael Cipher explained as a Flash animation"](https://www.youtube.com/watch?v=gP4PqVGudtg)

---

# Đọc thêm

[1] [pyca/cryptography, "Symmetric encryption"](https://cryptography.io/en/41.0.4/hazmat/primitives/symmetric-encryption/)

[2] [GeeksforGeeks, "Cryptography and its Types"](https://www.geeksforgeeks.org/computer-networks/cryptography-and-its-types/)
